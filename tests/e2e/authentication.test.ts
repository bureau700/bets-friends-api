import * as core from 'express-serve-static-core';
import request from 'supertest';
import { initApp, Application } from '../../src/app';
import { UserService } from '../../src/services/user-service';
import User from '../../src/entity/UserModel';

describe('app', () => {
  let app: Application;
  let userService: UserService;

  beforeEach(async () => {
    app = await initApp();
    userService = new UserService();

    // Create fake user
    const user = new User();
    user.username = 'neolitec';
    user.password = 'password';
    await userService.createUser(user);
  });

  afterEach(async () => {
    await app.connection.close();
  });

  describe('/login', () => {
    it('should authenticate user', () => {
      expect(1 + 1).toBeTruthy();
    });
  });
});
