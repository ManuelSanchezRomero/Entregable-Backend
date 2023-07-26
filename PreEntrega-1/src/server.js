import express from 'express';
import ProductRouter from './routes/productsRoutes.js';
import CartRouter from './routes/cartRoutes.js';

const app = express();
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

app.use('/products', ProductRouter);
app.use('/carts', CartRouter);