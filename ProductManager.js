class ProductManager {
  constructor() {
    this.products = [];
    this.autoIncrementId = 1;
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Error: todos los campos son obligatorios");
      return;
    }

    if (this.products.some((product) => product.code === code)) {
      console.log("Error: el código del producto ya existe");
      return;
    }

    const newProduct = {
      id: this.autoIncrementId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    console.log("Producto agregado con éxito:", newProduct);
    return newProduct;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.log("Error: Producto no encontrado");
    }
    return product;
  }
}

/* --------------------------------- EJEMPLO -------------------------------- */

// const productManager = new ProductManager();
// const exampleProduct = {
//   title: "Producto 1",
//   description: "ejemplo",
//   price: 20,
//   thumbnail: "ejemplo.jpg",
//   code: "ejemplo1",
//   stock: 10,
// };

// productManager.addProduct(exampleProduct);
