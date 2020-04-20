import {
  JsonController,
  HeaderParam,
  Get,
  BadRequestError,
  Post,
  Body,
  HttpCode,
} from 'routing-controllers';
import { userService } from '../../services/user-service';
import { SignupRequest } from './types';

@JsonController()
export default class AuthenticationController {
  @Get('/login')
  async login(@HeaderParam('authorization') authorization: string) {
    try {
      const [username, password] = this.getUsernameAndPassword(authorization);
      const token = await userService.authenticate(username, password);
      return token;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @HttpCode(201)
  @Post('/signup')
  async signup(@Body({ validate: true }) signupRequest: SignupRequest) {
    const user = await userService.createUser({
      username: signupRequest.username,
      password: signupRequest.password,
    });

    return { username: user.username };
  }

  private getUsernameAndPassword(authorizationHeader: string): string[] {
    const [type, value] = authorizationHeader.split(/\s+/);
    if (type.toLowerCase() !== 'basic') throw new BadRequestError();

    const decodedValue = Buffer.from(value.trim(), 'base64').toString('ascii');

    try {
      const valueArray = decodedValue.split(':');
      if (valueArray.length !== 2) throw new BadRequestError();
      return valueArray;
    } catch (err) {
      throw new BadRequestError();
    }
  }
}
