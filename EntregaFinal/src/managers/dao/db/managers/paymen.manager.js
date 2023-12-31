import stripe from 'stripe';
import { stripeConfig } from '../config';

const stripeClient = stripe(stripeConfig.secretKey);

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, paymentMethod } = req.body;

    //! Crear cliente
    const customer = await stripeClient.customers.create();

    //! Asociar la tarjeta
    await stripeClient.paymentMethods.attach(paymentMethod, { customer: customer.id });

    //! Configurar
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency,
      customer: customer.id,
      payment_method: paymentMethod,
      confirm: true,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el intento de pago' });
  }
};

export default { createPaymentIntent };
