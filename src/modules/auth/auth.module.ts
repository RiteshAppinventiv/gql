import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as fs from 'fs';
// import {
//   AdminRepository,
//   AdminSessionRepository,
//   UsersRepository,
//   UsersSessionRepository,
// } from 'src/database/repositories';
// import { AdminAuthController } from './controllers';
import { BasicStrategy, JwtStrategy, RefreshTokenStrategy } from './strategies';
// import {
//   AdminRepository,
//   AdminRolesRepository,
//   AdminSessionRepository,
// } from 'src/database/repositories';
import { AdminAuthService } from './services/admin-auth.service';
import { AdminSessionService } from './services/admin-session.service';
import { AdminAuthController } from './controllers/admin-auth.controller';
import { UserSessionService } from './services/user-session.service';
import { UsersSessionRepository } from '@/database/repositories/user-session.repository';
import { AdminRepository } from '@/database/repositories/admin.repository';
import { AdminSessionRepository } from '@/database/repositories/admin-session.repository';
import { UserRepository } from '@/database/repositories/user.repository';
import { AdminAuthResolver } from './auth.resolver';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const privateKey = fs.readFileSync(
          configService.get('JWT_PRIVATE_KEY'),
          'utf8',
        );
        const publicKey = fs.readFileSync(
          configService.get('JWT_PUBLIC_KEY'),
          'utf8',
        );
        const signOptions = {
          expiresIn: configService.get(
            'TOKEN_INFO.EXPIRATION_TIME.ACCESS_TOKEN',
          ),
          issuer: configService.get('TOKEN_INFO.ISSUER'),
          algorithm: configService.get('JWT_ALGO'),
        };
        const options: JwtModuleOptions = {
          privateKey,
          publicKey,
          signOptions,
        };
        return options;
      },
      inject: [ConfigService],
    }),
    PassportModule,
  ],  
  providers: [
    BasicStrategy,
    JwtStrategy,
    AdminAuthResolver,
    RefreshTokenStrategy,
    AdminAuthService,
    AdminRepository,
    AdminSessionService,
    AdminSessionRepository,
    UsersSessionRepository,
    UserSessionService,
    UserRepository,
  ],
  exports: [AdminAuthService],
})
export class AuthModule { }
