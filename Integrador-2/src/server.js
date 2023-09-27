import express from 'express';
import __dirname from './path.js';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';


import ProductRouter from './routes/products.routes.js';
import CartRouter from './routes/cart.routes.js';



const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'))


const connectMongoDB = async ()=>{
  try {
      await mongoose.connect('mongodb+srv://ManuelSanchez:sanack12@cluster0.mnnpwqf.mongodb.net/?retryWrites=true&w=majority');
      console.log("Conectado con exito a MongoDB usando Moongose.");
    } catch (error) {
      console.error("No se pudo conectar a la BD usando Moongose: " + error);
      process.exit();
  }
};
connectMongoDB();

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

app.use('/products', ProductRouter);
app.use('/carts', CartRouter);