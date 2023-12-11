export const errorMessages = {
    PRODUCT_CREATION_ERROR: 'Error al crear el producto',
    CART_ADD_ERROR: 'Error al agregar el producto al carrito',
  };
  
  export const errorHandler = (message, res) => {
    res.status(500).json({ error: message });
  };
  