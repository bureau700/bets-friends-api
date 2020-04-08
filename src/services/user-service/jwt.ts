import { JWK, JWT } from 'jose';

const jwtSecret = process.env.JWT_SECRET;

export function createToken(username: string): string {
  if (!jwtSecret) {
    console.error("JWT secret null. Authentication can't be processed.");

    // FIXME: send unauthorized.
    throw new Error('Authentication error.');
  }

  const payload = { username };

  const key = JWK.asKey({
    kty: 'oct',
    k: jwtSecret,
  });

  return JWT.sign(payload, key, {
    algorithm: 'PS256',
    expiresIn: '30 days',
    header: {
      typ: 'JWT',
    },
    issuer: 'https://betsfriends.net',
  });
}
