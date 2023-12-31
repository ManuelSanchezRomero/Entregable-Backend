import 'default.test.js';

describe('Sessions Router', () => {
    it('should return a list of sessions on GET /sessions', async () => {
      const response = await request.get('/sessions');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
    });
  
    it('should return a specific session on GET /sessions/:id', async () => {
      const sessionId = '345678';
      const response = await request.get(`/sessions/${sessionId}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.id).to.equal(sessionId);
    });
  
    it('should create a new session on POST /sessions', async () => {
      const newSession = { userId: 'user123' };
      const response = await request.post('/sessions').send(newSession);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.userId).to.equal(newSession.userId);
    });
  });