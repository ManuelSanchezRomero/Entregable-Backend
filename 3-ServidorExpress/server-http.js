import { createServer } from 'http';
import { products } from './db.js';

const server = createServer((req, res)=>{
    if(req.url === '/products'){
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(products));
    }
    if(req.url === '/home'){
        res.end('<h1>Inicio</h1>')
    }
});

server.listen(8080, ()=>{
    console.log('Server ok en puerto 8080');
})