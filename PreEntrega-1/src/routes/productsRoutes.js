import { getAllProducts, getProductById, createProduct, updateProduct, deleteProductById } from '../managers/productManager.js';
import { Router} from "express"

const router = Router();

router.get('/', async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await getAllProducts();
        const limitedProducts = limit ? products.slice(0, limit) : products;
        res.json(limitedProducts);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await getProductById(Number(pid));
        if (!product) return res.status(404).send('Product not found');
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

router.post('/', async (req, res) => {
    const {
        title,
        description,
        code,
        price,
        status = true,
        stock,
        category,
        thumbnails,
    } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).send('Missing required fields');
    }
    try {
        const newProduct = await createProduct({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails,
        });
        res.json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const productObj = req.body;
    try {
        await updateProduct(Number(pid), productObj);
        res.send('Product updated');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        await deleteProductById(Number(pid));
        res.send('Product deleted');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

export default router;