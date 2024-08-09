import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AdminAuthService } from './services/admin-auth.service';
import { Admin } from '../../database/schemas/admin.schema';
import { AdminLoginType } from './auth.type';

@Resolver(() => Admin)
export class AdminAuthResolver {
  constructor(private adminAuthService: AdminAuthService) { }

  @Query(() => AdminLoginType)
  async loginAdmin(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context
  ): Promise<AdminLoginType> {
    try {
      let headers:any = context.req.headers;
      const res = await this.adminAuthService.login({ email, password }, headers);
      return {...res,statusCode:200};
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }
}
