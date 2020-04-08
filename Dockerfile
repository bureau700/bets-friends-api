FROM node:12-alpine

WORKDIR /app

# COPY package.json /app
# RUN npm install

# This may be faster to do that.
VOLUME . /app

# This is needed to run the tests
RUN npm run build

CMD npm run test