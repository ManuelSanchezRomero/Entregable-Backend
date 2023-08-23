import CartModel from './models/cart.model';
import ProductModel from './models/product.model';

class CartManager {
  async createCart() {
    const cart = new CartModel({
      id: this.generateId(),
      products: [],
    });
    await cart.save();
    return cart;
  }

  async getCart(cartId) {
    try {
      const cart = await CartModel.findById(cartId).populate('products.product');
      return cart;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        return null;
      }

      const existingProductIndex = cart.products.findIndex((p) => p.product.toString() === productId);
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        const product = await ProductModel.findById(productId);
        if (!product) {
          return null;
        }
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  generateId() {
    return Date.now().toString();
  }
}

export default CartManager;
