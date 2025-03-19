// pages/api/products.js
import Shopify from 'shopify-api-node';

const shopify = new Shopify({
  shopName: 'Neo Creative',
  apiKey: '4cf7b12efe9e2bf80d7528e865fb91e8',
  password: '0588b72ff59980a32638420c6e78a366',
});

export default async function handler(req, res) {
  try {
    const products = await shopify.product.list();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
}
