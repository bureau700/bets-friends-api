import * as request from 'supertest';
import app from '../src/app';

describe('app', () => {
  describe('/ping', () => {
    it('should return pong', async () => {
      const response = await request(app)
        .get('/ping')
        .expect(200);
      expect(response.text).toEqual('pong');
    });
  });
});
