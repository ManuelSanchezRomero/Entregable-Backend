import 'default.test.js';

describe('Carts Router', () => {
    it('should return a list of carts on GET /carts', async () => {
      const response = await request.get('/carts');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
    });
  
    it('should return a specific cart on GET /carts/:id', async () => {
      const cartId = '789012';
      const response = await request.get(`/carts/${cartId}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.id).to.equal(cartId);
    });
  
    it('should create a new cart on POST /carts', async () => {
      const newCart = { products: [] };
      const response = await request.post('/carts').send(newCart);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.products).to.be.an('array');
    });
  });