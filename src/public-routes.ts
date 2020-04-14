import { Request, Response, Router } from 'express';
import { BadRequest, Unauthorized } from 'http-errors';
import bodyParser from 'body-parser';
import { body } from 'express-validator';
import listEndpoints from 'express-list-endpoints';
import { userService } from './services/user-service';
import { handleAsyncErrors, checkValidationErrors } from './express-utils';
import { validationRules } from './services/user-service/constants';

const router = Router();

router.use(bodyParser.json());

router.get('/login', async (req, res) => {
  const getUsernameAndPassword = (authorizationHeader: string): string[] => {
    const [type, value] = authorizationHeader.split(':');
    if (type.toLowerCase() !== 'basic') throw new BadRequest();

    const decodedValue = Buffer.from(value.trim(), 'base64').toString('ascii');

    try {
      const valueArray = decodedValue.split(':');
      if (valueArray.length !== 2) throw new BadRequest();
      return valueArray;
    } catch (err) {
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
    // TODO: simplify this.
    if (err instanceof Unauthorized) {
      res.status(401).send(err);
    } else {
      res.status(500).send(err);
    }
  }
});

router.post(
  '/signup',
  [
    // FIXME: improve error response
    body('username')
      .matches(/^[^\s]+$/i)
      .isLength({
        min: validationRules.username.minLength,
        max: validationRules.username.maxLength,
      }),
    body('password').isLength({
      min: validationRules.password.minLength,
      max: validationRules.password.maxLength,
    }),
  ],
  checkValidationErrors(),
  handleAsyncErrors(async (req: Request, res: Response) => {
    const user = await userService.createUser({
      username: req.body.username,
      password: req.body.password,
    });
    res.status(201).send({ username: user.username });
  }),
);

router.get('/ping', (_req, res) => {
  res.send('pong');
});

router.get('/routes', (req, res) => {
  res.json(listEndpoints(req.appContext));
});

export default router;
