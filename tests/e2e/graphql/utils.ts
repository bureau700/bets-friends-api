import * as core from 'express-serve-static-core';
import request, { Test } from 'supertest';

export class GQLRequester {
  app: core.Express;

  token: string;

  constructor({ app, token }: { app: core.Express; token: string }) {
    this.app = app;
    this.token = token;
  }

  query(q: string): Test {
    return request(this.app)
      .post('/graphql')
      .set('Authorization', `Bearer ${this.token}`)
      .send({ query: q });
  }
}
