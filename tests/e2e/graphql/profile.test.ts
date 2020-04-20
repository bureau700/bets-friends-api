import request from 'supertest';
import gql from 'fake-tag';
import { initApp, Application } from '../../../src/app';
import { USERNAME, PASSWORD } from '../constants';
import { getToken } from '../common';
import { GQLRequester } from './utils';

describe('app > graphql > profile', () => {
  let app: Application;
  let token: string;
  let requester: GQLRequester;

  beforeAll(async () => {
    app = await initApp();
  });

  afterAll(async () => {
    await app.connection.close();
  });

  beforeEach(async () => {
    token = await getToken(app, USERNAME, PASSWORD);
    requester = new GQLRequester({ app, token });
  });

  // Try to call a private endpoint
  describe('get profile', () => {
    describe('when token is ok', () => {
      it('access should be granted', async () => {
        const response = await requester
          .query(
            gql`
              {
                viewer {
                  username
                }
              }
            `,
          )
          .expect(200);

        expect(response.body).toHaveProperty('data', {
          viewer: {
            username: USERNAME,
          },
        });
      });
    });
  });
});
