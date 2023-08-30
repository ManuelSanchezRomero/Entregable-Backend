import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
  deleteAllProducts,
} from '../managers/dao/db/product.manager';

const router = express.Router();

router.get('/', async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await getAllProducts();
    const limitedProducts = limit ? products.slice(0, Number(limit)) : products;
    res.json(limitedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  const productObj = req.body;
  try {
    const newProduct = await createProduct(productObj);
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const productObj = req.body;
  try {
    await updateProduct(id, productObj);
    res.send('Product updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProductById(id);
    res.send('Product deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.delete('/', async (req, res) => {
  try {
    await deleteAllProducts();
    res.send('All products deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

export default router;
