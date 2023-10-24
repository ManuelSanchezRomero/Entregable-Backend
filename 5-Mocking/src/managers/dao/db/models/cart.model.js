import mongoose from 'mongoose';

const cartProductSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
});

const cartSchema = new mongoose.Schema({
  id: String,
  products: [cartProductSchema],
});

const CartModel = mongoose.model('Cart', cartSchema);

export default CartModel;
