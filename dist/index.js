'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
app.get('/ping', (_req, res) => {
  res.contentType('text/plain');
  res.json('pong');
});
app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}`),
);
