import * as core from 'express-serve-static-core';
import request from 'supertest';
import { initApp, Application } from '../../src/app';

describe('app', () => {
  let app: Application;

  beforeEach(async () => {
    app = await initApp();
  });

  afterEach(async () => {
    await app.connection.close();
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
