import * as core from 'express-serve-static-core';
import request from 'supertest';
import { initApp } from '../src/app';

describe('app', () => {
  let app: core.Express;

  beforeEach(async () => {
    app = await initApp();
  });

  describe('/ping', () => {
    it('should return pong', async () => {
      const response = await request(app)
        .get('/ping')
        .expect(200);
      expect(response.text).toEqual('pong');
    });
  });
});
