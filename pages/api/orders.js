import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  const { method } = req;

  await mongooseConnect();

  switch (method) {
    case 'GET':
      if (req.query.id) {
        return handleGetOrderById(req, res);
      } else {
        return handleGetAllOrders(req, res);
      }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handleGetOrderById(req, res) {
  try {
    const { id } = req.query; // Extract 'id' from query params

    if (!id) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


async function handleGetAllOrders(req, res) {
  try {
    const orders = await Order.find({}, null, { sort: { '_id': -1 }});
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}