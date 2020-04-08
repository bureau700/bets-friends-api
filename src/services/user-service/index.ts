import UserModel from '../../entity/UserModel';
import TokenModel from '../../entity/TokenModel';
import { createToken } from './jwt';
import { encodePassword } from './password';

export class UserService {
  /**
   * Authenticate user.
   * @param username username
   * @param password user password
   */
  public async authenticate(username: string, password: string) {
    const user = await UserModel.findByUsername(username);
    if (!user) throw new Error('Not found');
    if (user.password === encodePassword(password)) {
      // Create token
      const token = new TokenModel();
      token.token = createToken(username);
      token.user = user;
      await token.save();
      return token;
    } else {
      return this._handlePublicError(
        `Authentication error (bad password): ${username}`,
      );
    }
  }

  public async createUser(user: UserModel) {
    if (user.password) user.password = encodePassword(user.password);
    return UserModel.save(user);
  }

  // FIXME: manage this.
  private _handlePublicError(logMessage: string) {
    console.error(logMessage);
    throw new Error('Authentication error.');
  }
}

export const userService = new UserService();
