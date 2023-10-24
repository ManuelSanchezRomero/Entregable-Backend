import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import ProductRouter from './routes/products.routes.js';
import CartRouter from './routes/cart.routes.js';

import Mocking from './routes/moking.routes.js';
import { errorHandler, errorMessages } from './routes/error';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado con éxito a MongoDB usando Mongoose.');
  } catch (error) {
    console.error('No se pudo conectar a la BD usando Mongoose: ' + error);
    process.exit(1);
  }
};
connectMongoDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

app.use('/products', ProductRouter);
app.use('/carts', CartRouter);
app.use('/products', ProductRouter);
app.use('/carts', CartRouter);
app.use('/mocking', Mocking);
app.use(errorHandler); 