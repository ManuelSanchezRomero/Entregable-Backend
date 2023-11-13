import path from 'path';
import ProductModel from '../models/product.model';

export const getAllProducts = async (options) => {
  try {
    const {
      limit = 10,
      page = 1,
      sort = '',
      category = null,
      status = null,
    } = options;

    const skip = (page - 1) * limit;
    const sortOptions = {};

    if (sort === 'asc') {
      sortOptions.price = 1;
    } else if (sort === 'desc') {
      sortOptions.price = -1;
    }

    const query = {};

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status === 'available';
    }

    const totalCount = await ProductModel.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    const products = await ProductModel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec();

    return buildProductsResponse(products, page, totalPages);
  } catch (error) {
    console.error(error);
    return buildErrorResponse();
  }
};

const buildProductsResponse = (products, page, totalPages) => ({
  status: 'success',
  payload: products,
  totalPages,
  prevPage: page > 1 ? page - 1 : null,
  nextPage: page < totalPages ? page + 1 : null,
  page,
  hasPrevPage: page > 1,
  hasNextPage: page < totalPages,
  prevLink: page > 1 ? `?page=${page - 1}` : null,
  nextLink: page < totalPages ? `?page=${page + 1}` : null,
});

const buildErrorResponse = () => ({
  status: 'error',
  payload: [],
  totalPages: 0,
  prevPage: null,
  nextPage: null,
  page: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevLink: null,
  nextLink: null,
});
  
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

      // Verifica si el usuario es "premium" antes de permitir la creación del producto
      if (user.role !== 'premium' && !productObj.owner) {
        throw new Error('Los usuarios no premium deben especificar un propietario al crear un producto.');
      }

      // Asigna como propietario al crear
      if (!productObj.owner) {
        productObj.owner = user._id;
      }


      const newProduct = await ProductModel.create(productObj);
      return newProduct;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const updateProduct = async (user, id, productObj) => {
    try {
      const existingProduct = await ProductModel.findById(id);
  
      if (!existingProduct) {
        return null;
      }
  
      // Verificar permisos para modificar
      if (user.role === 'premium' && user._id.equals(existingProduct.owner)) {
        await ProductModel.findByIdAndUpdate(id, productObj);
      }
      return existingProduct;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const deleteProductById = async (user, id) => {
    try {
      const existingProduct = await ProductModel.findById(id);
      if (!existingProduct) {
        return null;
      }
      // Verificar permisos para eliminar
      if (user.role === 'premium' && user._id.equals(existingProduct.owner)) {
        await ProductModel.findByIdAndDelete(id);
      }
      return existingProduct;
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