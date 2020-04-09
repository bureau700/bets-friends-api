FROM node:12-alpine

WORKDIR /app

COPY . /app

RUN npm run build

CMD npm run test