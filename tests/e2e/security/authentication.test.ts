import request from 'supertest';
import { fail } from 'assert';
import { initApp, Application } from '../../../src/app';
import { USERNAME, PASSWORD } from './constants';

describe('app > security > authentication', () => {
  let app: Application;

  beforeAll(async () => {
    app = await initApp();
  });

  afterAll(async () => {
    await app.connection.close();
  });

  describe('/login', () => {
    const basicAuth = (username: string, password: string) =>
      `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

    describe('when auth granted', () => {
      it('should authenticate user', async () => {
        const response = await request(app)
          .get('/login')
          .set('Authorization', basicAuth(USERNAME, PASSWORD))
          .set('Accept', 'application/json')
          .expect(200);

        // should have a token in the response
        expect(response.body).toHaveProperty('token');

        try {
          const tokenPayload = response.body.token.split('.')[1];
          const decodedPayload = JSON.parse(
            Buffer.from(tokenPayload, 'base64').toString('ascii'),
          );
          expect(decodedPayload).toHaveProperty('username', 'bob');
          expect(decodedPayload).toHaveProperty('iss');
          expect(decodedPayload).toHaveProperty('iat');
          expect(decodedPayload).toHaveProperty('exp');
        } catch (err) {
          fail(err);
        }
      });

      it('can issue another token for the same user', async () => {
        try {
          await request(app)
            .get('/login')
            .set('Authorization', basicAuth(USERNAME, PASSWORD))
            .set('Accept', 'application/json')
            .expect(200);

          await request(app)
            .get('/login')
            .set('Authorization', basicAuth(USERNAME, PASSWORD))
            .set('Accept', 'application/json')
            .expect(200);
        } catch (err) {
          fail(err);
        }
      });
    });

    describe('when auth not granted', () => {
      it('should raise an error', async () => {
        const username = 'bob';
        const password = 'prout';

        await request(app)
          .get('/login')
          .set('Authorization', basicAuth(username, password))
          .set('Accept', 'application/json')
          .expect(401);
      });
    });
  });
});
