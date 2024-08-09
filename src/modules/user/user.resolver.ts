import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './user.service';
import { User } from '../../database/schemas/users.schema';
import * as jwt from 'jsonwebtoken';
import { UserLoginType, UserRegisterType } from './user.type';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UsersService) {}

  @Mutation(() => UserRegisterType)
  async registerUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('age') age: number,
  ): Promise<UserRegisterType> {
    try {
      const res = await this.userService.create({ email, password, age });
      return {
        email: res.email,
        age: res.age,
        id: res.id,
        statusCode: 200,
        error: null, // No error
      };
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  }

  @Query(() => UserLoginType)
  async loginUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<UserLoginType> {
    try {
      const res = await this.userService.loginUser({ email, password });
      return {
        email: res.email,
        token: res.token, // Assume the response contains a token
        statusCode: 200,
        error: null, // No error
      };
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  @Query(() => [User])
  async usersList(@Context() context): Promise<User[]> {
    const token = context.req.headers.authorization?.split(' ')[1]; // Extract token from Bearer format
    if (!token) {
      throw new Error('Authentication token is missing.');
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret
    } catch (error) {
      throw new Error('Invalid token.');
    }

    return this.userService.findAll();
  }
}
