import { InternalServerError, Unauthorized } from 'http-errors';
import express from 'express';
import { decodeToken } from './services/user-service/jwt';

const router = express.Router();

router.use((req, _res, next) => {
  const authorizationHeader = req.get('Authorization') || '';

  try {
    // FIXME: improve this split.
    const [type, value] = authorizationHeader.split(' ');
    if (type.toLowerCase() !== 'bearer') throw new Unauthorized();

    const decodedToken = decodeToken(value.trim());
    if (!decodedToken.username) {
      throw new Unauthorized();
    }

    req.user = {
      username: decodedToken.username,
    };
  } catch (err) {
    if (err.code === 'ERR_JWS_VERIFICATION_FAILED') {
      throw new Unauthorized();
    } else {
      throw new InternalServerError();
    }
  }

  next();
});

router.get('/me', async (req, res) => {
  res.json(req.user);
});

export default router;
