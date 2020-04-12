import { JWK, JWT } from 'jose';
import { Unauthorized } from 'http-errors';

const jwtSecret = process.env.JWT_SECRET;

export type TokenPayload = {
  username?: string;
};

function checkJwtSecret() {
  if (!jwtSecret) {
    console.error("JWT secret null. Authentication can't be processed.");

    // FIXME: send unauthorized.
    throw new Unauthorized();
  }
}

export function createToken(username: string): string {
  checkJwtSecret();

  const payload: TokenPayload = { username };

  const key = JWK.asKey({
    kty: 'oct',
    k: jwtSecret,
  });

  return JWT.sign(payload, key, {
    // algorithm: 'PS256',
    expiresIn: '30 days',
    header: {
      typ: 'JWT',
    },
    issuer: 'https://betsfriends.net',
  });
}

export function decodeToken(token: string) {
  checkJwtSecret();

  const key = JWK.asKey({
    kty: 'oct',
    k: jwtSecret,
  });

  return JWT.verify(token, key) as TokenPayload;
}
