import express from 'express';
import CartManager from '../managers/dao/db/cart.manager';
import ProductModel from '../managers/dao/db/product.model';

const router = express.Router();
const cartManager = new CartManager();

router.post('/', async (req, res) => {
  const cart = await cartManager.createCart();
  res.json(cart);
});

router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCart(cid);
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }
  res.json(cart.products);
});

router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const cart = await cartManager.addProductToCart(cid, pid, quantity);
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found or Product not found' });
  }

  res.json(cart);
});

export default router;
