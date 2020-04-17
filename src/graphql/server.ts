import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { userService, User } from '../services/user-service';

export type Context = {
  req: express.Request<any>;
  user: User;
};

export async function createGraphQLServer() {
  const schema = await buildSchema({
    resolvers: [`${__dirname}/**/*.resolver.ts`],
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

    formatError: (err) => {
      console.error(err);

      // Don't give the specific errors to the client.
      if (err.message.startsWith('Database Error: ')) {
        return new Error('Internal server error');
      }

      // Otherwise return the original error.  The error can also
      // be manipulated in other ways, so long as it's returned.
      return err;
    },

    context: async ({ req }) => {
      const user = userService.getUserByAuthorizationHeader(
        req.get('Authorization') || '',
      );

      const context = {
        req,
        user,
      };

      return context;
    },
  });
}
