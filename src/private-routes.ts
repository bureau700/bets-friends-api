import express from 'express';
import { createGraphQLServer } from './graphql/server';
import { userService } from './services/user-service';

const router = express.Router();

router.use((req, _res, next) => {
  const authorizationHeader = req.get('Authorization') || '';
  req.user = userService.getUserByAuthorizationHeader(authorizationHeader);
  next();
});

export async function privateRouter(app: any) {
  const graphQLServer = await createGraphQLServer();
  graphQLServer.applyMiddleware({ app, disableHealthCheck: true });

  router.get('/me', async (req, res) => {
    res.json(req.user);
  });

  return router;
}
