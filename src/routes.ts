import { Router } from 'express';
import { userService } from './services/user-service';

const router = Router();

router.get('/login', async (req, res) => {
  try {
    const token = await userService.authenticate('neolitec', 'password');
    res.send(token);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/ping', (_req, res) => {
  res.send('pong');
});

export default router;
