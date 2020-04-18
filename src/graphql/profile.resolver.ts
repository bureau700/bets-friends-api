import { Ctx, Query, Resolver } from 'type-graphql';
import UserModel from '../entity/UserModel';
import { Context } from './server';

@Resolver()
export default class ProfileResolver {
  @Query(() => UserModel)
  async viewer(@Ctx() ctx: Context): Promise<UserModel> {
    const user = await UserModel.findByUsername(ctx.user.username);
    if (!user) throw new Error('User not found!');
    return user;
  }
}
