import 'default.test.js';

describe('Products Router', () => {
    it('should return a list of products on GET /products', async () => {
      const response = await request.get('/products');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
    });
  
    it('should return a specific product on GET /products/:id', async () => {
      const productId = '123456';
      const response = await request.get(`/products/${productId}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.id).to.equal(productId);
    });
  
    it('should create a new product on POST /products', async () => {
      const newProduct = { title: 'New Product', price: 19.99 };
      const response = await request.post('/products').send(newProduct);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.title).to.equal(newProduct.title);
    });
  });