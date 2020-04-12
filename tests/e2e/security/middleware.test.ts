import request from 'supertest';
import { initApp, Application } from '../../../src/app';
import { USERNAME, PASSWORD } from './constants';

describe('app > security > middleware', () => {
  let app: Application;
  let token: string;

  beforeAll(async () => {
    app = await initApp();
  });

  afterAll(async () => {
    await app.connection.close();
  });

  beforeEach(async () => {
    const basicAuth = (username: string, password: string) =>
      `Basic: ${Buffer.from(username + ':' + password).toString('base64')}`;

    const response = await request(app)
      .get('/login')
      .set('Authorization', basicAuth(USERNAME, PASSWORD))
      .set('Accept', 'application/json')
      .expect(200);

    token = response.body.token;
  });

  // Try to call a private endpoint
  describe('/me', () => {
    describe('when token is ok', () => {
      it('access should be granted', async () => {
        const response = await request(app)
          .get('/me')
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .expect(200);

        expect(response.body.username).toEqual(USERNAME);
      });
    });

    describe('when token is not ok', () => {
      it('access should be denied', async () => {
        const wrongToken = token + 'x';

        await request(app)
          .get('/me')
          .set('Authorization', `Bearer ${wrongToken}`)
          .set('Accept', 'application/json')
          .expect(401);
      });
    });
  });
});
