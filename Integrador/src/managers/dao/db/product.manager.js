import path from 'path';
import ProductModel from './models/product.model';

export const getAllProducts = async () => {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  export const getProductById = async (id) => {
    try {
      const product = await ProductModel.findById(id);
      return product || false;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const createProduct = async (productObj) => {
    try {
      const newProduct = await ProductModel.create(productObj);
      return newProduct;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const updateProduct = async (id, productObj) => {
    try {
      await ProductModel.findByIdAndUpdate(id, productObj);
    } catch (error) {
      console.error(error);
    }
  };
  
  export const deleteProductById = async (id) => {
    try {
      await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      console.error(error);
    }
  };
  
  export const deleteAllProducts = async () => {
    try {
      await ProductModel.deleteMany();
    } catch (error) {
      console.error(error);
    }
  };