import request from 'supertest';
import faker from 'faker';
import { initApp, Application } from '../../../src/app';

describe('app > security > signup', () => {
  let app: Application;

  beforeAll(async () => {
    app = await initApp();
  });

  afterAll(async () => {
    await app.connection.close();
  });

  describe('/signup', () => {
    it('should create a new user', async () => {
      const username = faker.internet.userName();
      const password = faker.internet.password();

      await request(app)
        .post('/signup')
        .set('Accept', 'application/json')
        .send({ username, password })
        .expect(201); // Created.
    });

    describe('when username already exists', () => {
      let username: string;
      let password: string;

      beforeEach(async () => {
        username = faker.internet.userName();
        password = faker.internet.password();

        await request(app)
          .post('/signup')
          .set('Accept', 'application/json')
          .send({ username, password })
          .expect(201); // Created.
      });

      it('should not create another user', async () => {
        await request(app)
          .post('/signup')
          .set('Accept', 'application/json')
          .send({ username, password })
          .expect(409); // Conflict.
      });

      it('should return an error', async () => {
        const response = await request(app)
          .post('/signup')
          .set('Accept', 'application/json')
          .send({ username, password });

        expect(response.body).toEqual({
          code: 409,
          message: 'User already exists',
        });
      });
    });

    describe('when data is not valid', () => {
      let username: string;
      let password: string;

      beforeEach(async () => {
        username = faker.internet.userName();
        password = faker.internet.password();
      });

      it('should return an error if username is too short', async () => {
        username = 'a';
        const response = await request(app)
          .post('/signup')
          .set('Accept', 'application/json')
          .send({ username, password });

        expect(response.body).toEqual({
          code: 422,
          message: 'validation error',
        });
      });

      it('should return an error if username is too long', async () => {
        username = 'a'.repeat(100);
        const response = await request(app)
          .post('/signup')
          .set('Accept', 'application/json')
          .send({ username, password });

        expect(response.body).toEqual({
          code: 422,
          message: 'validation error',
        });
      });

      it('should return an error if username contains forbidden characters', async () => {
        username = 'a 4fff';
        const response = await request(app)
          .post('/signup')
          .set('Accept', 'application/json')
          .send({ username, password });

        expect(response.body).toEqual({
          code: 422,
          message: 'validation error',
        });
      });

      it('should return an error if password is too short', async () => {
        password = 'a';
        const response = await request(app)
          .post('/signup')
          .set('Accept', 'application/json')
          .send({ username, password });

        expect(response.body).toEqual({
          code: 422,
          message: 'validation error',
        });
      });

      it('should return an error if password is too long', async () => {
        password = 'a'.repeat(100);
        const response = await request(app)
          .post('/signup')
          .set('Accept', 'application/json')
          .send({ username, password });

        expect(response.body).toEqual({
          code: 422,
          message: 'validation error',
        });
      });
    });
  });
});
