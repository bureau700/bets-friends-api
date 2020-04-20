import { Request } from 'express';
import { Req, JsonController, Get, UseBefore } from 'routing-controllers';
import { UserContext } from '../middlewares/user-context';

@JsonController()
@UseBefore(UserContext)
export default class ProfileController {
  @Get('/me')
  async getMe(@Req() req: Request) {
    return req.user;
  }
}
