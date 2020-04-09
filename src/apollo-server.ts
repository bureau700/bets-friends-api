import { ApolloServer } from 'apollo-server-express';

const server = new ApolloServer({
  // typeDefs: [...domains.typeDefs, dateTypeDef],
  // resolvers: [...domains.resolvers, dateResolvers],
  // dataSources: () => dataSources,
  debug: true,
  introspection: true,
  // formatError: err => {
  //   // Don't give the specific errors to the client.
  //   if (err.message.startsWith('Database Error: ')) {
  //     return new Error('Internal server error');
  //   }

  //   // Otherwise return the original error.  The error can also
  //   // be manipulated in other ways, so long as it's returned.
  //   return err;
  // },

  // See: https://www.apollographql.com/docs/apollo-server/performance/apq/
  // persistedQueries: false,

  // Build the context from the inbound request.
  // context: ({ req, connection }) => {
  //   if (connection) {
  //     return connection.context;
  //   }

  //   const token =
  //     typeof req.headers.token === 'string' ? req.headers.token : '';

  //   return {
  //     apiToken: token,
  //     apiFactory: ApiFactory.create({
  //       token,
  //     }),
  //   } as Context;
  // },
});

export default server;
