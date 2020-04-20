import express from 'express';
import * as core from 'express-serve-static-core';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UnauthorizedError } from 'routing-controllers';
import { userService, User } from '../services/user-service';

export type Context = {
  req: express.Request<core.Params>;
  user: User;
};

export async function createGraphQLServer() {
  const schema = await buildSchema({
    resolvers: [`${__dirname}/**/*.resolver.{ts,js}`],
  });

  return new ApolloServer({
    schema,
    debug: true,
    introspection: true,

    // Disable this for deployments.
    // FIXME: detect environment.
    playground: true,

    // Add information on all resolvers performance in Apollo debugger
    tracing: false,

    // See: https://www.apollographql.com/docs/apollo-server/performance/apq/
    persistedQueries: false,

    // Build the context from the inbound request.
    // context: ({ req, connection }) => {
    //   if (connection) {
    //     return connection.context;
    //   }

    //   // FIXME: commented because prevent from getting the schema.
    //   // if (!req.headers.token || typeof req.headers.token !== 'string') {
    //   //   throw new AuthenticationError('Not authorized');
    //   // }

    //   const token =
    //     typeof req.headers.token === 'string' ? req.headers.token : '';

    //   return {
    //     apiToken: token,
    //     apiFactory: ApiFactory.create({
    //       token,
    //     }),
    //   } as Context;
    // },

    // formatError: (err) => {
    //   // Don't give the specific errors to the client.
    //   if (err.message.startsWith('Database Error: ')) {
    //     return new Error('Internal server error');
    //   }

    //   // Otherwise return the original error.  The error can also
    //   // be manipulated in other ways, so long as it's returned.
    //   return err;
    // },

    context: async ({ req }) => {
      const authorizationHeader = req.get('Authorization');
      if (!authorizationHeader) throw new UnauthorizedError();
      const user = userService.getUserByAuthorizationHeader(
        authorizationHeader,
      );

      const context = {
        req,
        user,
      };

      return context;
    },
  });
}
