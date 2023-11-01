
import fs from 'fs/promises';
import path from 'path';

const productsFilePath = path.resolve('fs', 'products.json');

export const getAllProducts = async () => {
    try {
        const products = await fs.readFile(productsFilePath, 'utf-8');
        return JSON.parse(products);
    } catch (error) {
        console.log(error);
        return [];
    }
    };

export const getProductById = async (id) => {
    try {
        const products = await getAllProducts();
        return products.find((prod) => prod.id === id) || false;
    } catch (error) {
        console.log(error);
    }
    };

export const createProduct = async (productObj) => {
    try {
        const products = await getAllProducts();
        const maxId = products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0;
        const product = { id: maxId + 1, ...productObj };
        products.push(product);
        await fs.writeFile(productsFilePath, JSON.stringify(products));
        return product;
    } catch (error) {
        console.log(error);
    }
    };

export const updateProduct = async (id, productObj) => {
    try {
        const products = await getAllProducts();
        const productIndex = products.findIndex((prod) => prod.id === id);
        if (productIndex === -1) throw new Error(`Product with ID ${id} not found`);
        products[productIndex] = { ...products[productIndex], ...productObj };
        await fs.writeFile(productsFilePath, JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
    };

export const deleteProductById = async (id) => {
    try {
        const products = await getAllProducts();
        const filteredProducts = products.filter((prod) => prod.id !== id);
        if (filteredProducts.length === products.length) throw new Error(`Product with ID ${id} not found`);
        await fs.writeFile(productsFilePath, JSON.stringify(filteredProducts));
    } catch (error) {
        console.log(error);
    }
    };

export const deleteAllProducts = async () => {
    try {
        await fs.unlink(productsFilePath);
    } catch (error) {
        console.log(error);
    }
    };
