const fs = require("fs").promises;

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.autoIncrementId = 1;
    this.initialize();
  }

  async initialize() {
    try {
      await this.loadProducts();
    } catch (error) {
      console.log("Error al cargar los productos", error);
    }
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      this.products = JSON.parse(data);
      this.autoIncrementId = this.products.length + 1;
    } catch (error) {
      console.log("Error al cargar los productos", error);
    }
  }

  async saveProducts() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.log("Error al guardar los productos", error);
    }
  }

  validateProduct(product) {
    const { title, description, price, thumbnail, stock } = product;
    return !!(title && description && price && thumbnail && stock);
  }

  isDuplicateCode(code) {
    return this.products.some((product) => product.code === code);
  }

  async addProduct(product) {
    if (!this.validateProduct(product)) {
      console.log("Error: todos los campos son obligatorios");
      return;
    }

    if (this.isDuplicateCode(product.code)) {
      console.log("Error: el código del producto ya existe");
      return;
    }

    const newProduct = {
      ...product,
      id: this.autoIncrementId,
    };
    this.products.push(newProduct);
    this.autoIncrementId++;
    await this.saveProducts();
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

  async updateProduct(id, updatedFields) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      console.log("Error: Producto no encontrado");
      return;
    }

    const product = this.products[index];
    const updatedProduct = { ...product, ...updatedFields };
    this.products[index] = updatedProduct;
    await this.saveProducts();
  }

  async deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      console.log("Error: Producto no encontrado");
      return;
    }
    this.products.splice(index, 1);
    await this.saveProducts();
  }
}

const productManager = new ProductManager("products.json");

/* ----------------------------- Ejemplo de uso: ---------------------------- */
// const ejemploProducto = {
//   title: "Producto 1",
//   description: "ejemplo",
//   price: 20,
//   thumbnail: "ejemplo.jpg",
//   code: "ejemplo1",
//   stock: 10,
// };
// productManager.addProduct(ejemploProducto);
// console.log(productManager.getProducts());
