import Ticket from '../managers/dao/db/models/ticket.model.js';
import CartModel from '../managers/dao/db/models/cart.model.js';  // Importa CartModel

const finalize = async (req, res, next) => {
  try {
    const { cartId, purchaserEmail } = req.body;

    const cartProducts = await getProductsFromCart(cartId);
    const totalAmount = calculateTotalAmount(cartProducts);

    const ticket = await generateTicket(cartId, purchaserEmail, totalAmount);

    res.status(200).json({ success: true, ticket });
  } catch (error) {
    console.error('Error finalizing purchase:', error);
    res.status(500).json({ success: false, error: 'Error finalizing purchase' });
  }
};

const getProductsFromCart = async (cartId) => {
  const cart = await CartModel.findById(cartId).populate('products.product');
  return cart.products;
};

const calculateTotalAmount = (products) => {
  let totalAmount = 0;
  products.forEach(product => {
    totalAmount += product.quantity * product.product.price;  // Use product.product.price
  });
  return totalAmount;
};

const generateTicket = async (cartId, purchaserEmail, totalAmount) => {
  try {
    const ticket = new Ticket({
      code: generateUniqueCode(),
      purchase_datetime: new Date(),
      amount: totalAmount,
      purchaser: purchaserEmail
    });

    await ticket.save();
    return ticket;
  } catch (error) {
    console.error('Error generating ticket:', error);
    throw new Error('Error generating ticket');
  }
};

const generateUniqueCode = () => {
  return Math.random().toString(36).substr(2, 9);
};

export default finalize;
