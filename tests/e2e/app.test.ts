import request from 'supertest';
import { initApp, Application } from '../../src/app';

describe('app', () => {
  let app: Application;

  beforeAll(async () => {
    app = await initApp();
  });

  afterAll(async () => {
    await app.connection.close();
  });

  describe('/ping', () => {
    it('should return pong', async () => {
      const response = await request(app).get('/ping').expect(200);
      expect(response.body).toEqual('pong');
    });
  });
});
