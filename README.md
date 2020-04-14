# Bets Friends API

This is a GraphQL API.
Authentication is still in REST.

## Getting started

    npm install

Then create a `.env` file with:

    DATABASE_URL=postgres://user:password@database-server/database-name
    JWT_SECRET=jwt-secret
    SECURITY_SALT=security-salt

Run the server with:

    npm start

## Run in production mode

Build the server:

    npm run build

Run the server in production mode:

    npm run start:dist
