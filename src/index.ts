import { initApp } from './app';

const port = process.env.PORT || 4000;

async function start() {
  const app = await initApp();

  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}`),
  );
}

start();
