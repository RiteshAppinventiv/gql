import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserRepository } from 'src/database/repositories/user.repository';

@Module({
  controllers:[],
  providers: [UserRepository,UsersService, UserResolver],
})
export class UserModule {}
