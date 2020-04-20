import request from 'supertest';

export async function getToken(
  app: any,
  username: string,
  password: string,
): Promise<string> {
  const authorizationHeader = `Basic ${Buffer.from(
    `${username}:${password}`,
  ).toString('base64')}`;

  const response = await request(app)
    .get('/login')
    .set('Authorization', authorizationHeader)
    .set('Accept', 'application/json')
    .expect(200);

  return response.body.token;
}
