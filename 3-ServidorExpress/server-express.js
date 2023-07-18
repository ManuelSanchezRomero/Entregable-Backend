import express from 'express';
import { products } from './db.js';


const app = express();
const PORT= 8080;


app.get('/', (req, res) => {
    res.send('Inicio');
});

app.get('/products', (req, res) => {
    const { limit } = req.query;
    
    if(limit > 0 && limit <= products.length){
        const productosLimitados = products.slice(0, limit);
        res.status(200).json(productosLimitados);
    }else{
        res.json(products);
    }
});


app.get('/products/:id', (req, res) => {
        const { id } = req.params;
        console.log(id);
        const product = products.find(p => p.id === Number(id));
        if(product){
            res.status(200).json(product);
        } else{
            res.status(404).json({message: 'Error'});
        }
    });

    app.listen(PORT, ()=>{
        console.log(`server  en puerto ${PORT}`);
    })