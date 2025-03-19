import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {Order} from "@/models/Order";
import { MailerSend, Recipient, EmailParams } from "mailersend";


export default async function handler(req,res) {
  {/* mlsn.2af048a5f70859e7aa7fdfec0513606fd56008ac04b75caae1ba98dda573fe45 */}
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }
  const {
    name,contactNumber,
    district,streetAddress,city,
    pickupFromStore,deliveryFee,total,Final,weightTotal,
    cartProducts, email,
  } = req.body;
  await mongooseConnect();
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({_id:uniqueIds});
  
  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toString() === productId);
    const quantity = productsIds.filter(id => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'Rs',
          product_data: {name:productInfo.title},
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,name,contactNumber,city,pickupFromStore,deliveryFee,total,Final,weightTotal,
    streetAddress,district,paid:false,
  });
  
  const session = '/thank';

  res.json({
    url:session
  })

}