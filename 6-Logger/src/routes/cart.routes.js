import express from 'express';
import CartManager from '../managers/dao/db/managers/cart.manager';
import {verifyUserRole} from '../middleware/verify.middleware';
import finalize from '../middleware/finalize.middleware';

const router = express.Router();
const cartManager = new CartManager();

router.post('/', async (req, res) => {
  const cart = await cartManager.createCart();
  res.json(cart);
});

router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCart(cid);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await cartManager.addProductToCart(cid, pid, quantity);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found or Product not found' });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.removeProductFromCart(cid, pid);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found or Product not found' });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.put('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const products = req.body.products || [];
    const cart = await cartManager.updateCart(cid, products);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await cartManager.updateProductQuantity(cid, pid, quantity);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found or Product not found' });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.removeAllProductsFromCart(cid);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const { _id, email, firstName, lastName, role } = req.user;

      res.status(200).json(userDTO);
    } catch (error) {
      console.error('Error getting current user:', error);
      res.status(500).json({ success: false, error: 'Error getting current user' });
    }
  }
);

router.post('/:cid/purchase', verifyUserRole('user'), finalize);


export default router;