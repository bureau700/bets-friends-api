import { Router } from 'express';
import { userService } from './services/user-service';
import { BadRequest, Unauthorized } from 'http-errors';

const router = Router();

router.get('/login', async (req, res) => {
  const getUsernameAndPassword = (authorizationHeader: string): string[] => {
    const [type, value] = authorizationHeader.split(':');
    if (type.toLowerCase() !== 'basic') throw new BadRequest();

    let decodedValue = Buffer.from(value.trim(), 'base64').toString('ascii');

    try {
      const valueArray = decodedValue.split(':');
      if (valueArray.length !== 2) throw new BadRequest();
      return valueArray;
    } catch (err) {
      console.error(err);
      throw new BadRequest();
    }
  };

  try {
    const [username, password] = getUsernameAndPassword(
      req.get('Authorization') || '',
    );
    const token = await userService.authenticate(username, password);
    res.send(token);
  } catch (err) {
    console.error(err);
    if (err instanceof Unauthorized) {
      res.status(401).send(err);
    } else {
      res.status(500).send(err);
    }
  }
});

router.get('/ping', (_req, res) => {
  res.send('pong');
});

export default router;
