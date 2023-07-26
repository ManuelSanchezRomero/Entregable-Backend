import express from "express";
import CartManager from "../managers/cartManager.js";
const router = express.Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
    const cart = await cartManager.createCart();
    res.json(cart);
    });

router.get("/:cid", async (req, res) => {
    const cart = await cartManager.getCart(req.params.cid);
    if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart.products);
    });

router.post("/:cid/product/:pid", async (req, res) => {
    const cart = await cartManager.addProductToCart(
        req.params.cid,
        req.params.pid,
        req.body.quantity
    );
    if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart);
    });

export default router;
