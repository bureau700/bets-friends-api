import crypto from 'crypto';

export function encodePassword(password: string) {
  const salt = process.env.SECURITY_SALT;

  if (!salt) {
    throw new Error('SECURITY_SALT not defined.');
  }

  return crypto.createHmac('sha256', salt).update(password).digest('hex');
}
