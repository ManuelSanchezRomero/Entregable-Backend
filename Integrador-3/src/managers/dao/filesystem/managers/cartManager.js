import fs from "fs";

    class CartManager {
    constructor() {
        this.carts = [];
    }

    async createCart() {
        const cart = {
        id: this.generateId(),
        products: [],
        };
        this.carts.push(cart);
        await this.saveCartsToFile();
        return cart;
    }

    async getCart(cartId) {
        const cart = this.carts.find((c) => c.id === cartId);
        if (!cart) {
        return null;
        }
        return cart;
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        const cart = await this.getCart(cartId);
        if (!cart) {
        return null;
        }
        const existingProduct = cart.products.find((p) => p.product === productId);
        if (existingProduct) {
        existingProduct.quantity += quantity;
        } else {
        cart.products.push({ product: productId, quantity });
        }
        await this.saveCartsToFile();
        return cart;
    }

    generateId() {
        return Date.now().toString();
    }

    async loadCartsFromFile() {
        try {
        const data = await fs.promises.readFile("carts.json");
        this.carts = JSON.parse(data);
        } catch (err) {
        console.log("Could not load carts from file");
        }
    }

    async saveCartsToFile() {
        try {
        await fs.promises.writeFile("carts.json", JSON.stringify(this.carts));
        } catch (err) {
        console.log("Could not save carts to file");
        }
    }
    }

export default CartManager;
