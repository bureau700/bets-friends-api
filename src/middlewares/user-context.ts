import { NextFunction, Request, Response } from 'express';
import {
  ExpressMiddlewareInterface,
  UnauthorizedError,
} from 'routing-controllers';
import { userService } from '../services/user-service';

export function userContext(req: Request, _res: Response, next: NextFunction) {
  const authorizationHeader = req.get('Authorization') || '';
  req.user = userService.getUserByAuthorizationHeader(authorizationHeader);
  if (!req.user) throw new UnauthorizedError();
  next();
}

export class UserContext implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    userContext(req, res, next);
  }
}
