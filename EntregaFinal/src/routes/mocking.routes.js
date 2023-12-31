import express from 'express';
const router = express.Router();
import { generateMockProducts } from '../service/error/mocking';

router.get('/mockingproducts', (req, res) => {
  const mockProducts = generateMockProducts();
  res.json(mockProducts);
});

export default router;
