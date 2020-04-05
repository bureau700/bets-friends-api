import express from 'express';

const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

export default app;
