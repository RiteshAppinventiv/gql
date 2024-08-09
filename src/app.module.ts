import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { DataBaseModule } from './providers/database';
import { configuration } from './config/configuration';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './modules/user/user.module';
import { RedisModule } from './providers/redis';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './middleware';
import { EncryptionModule } from './providers/encryption';
import { AuthModule } from './modules/auth/auth.module';
import { AdminRepository } from './database/repositories/admin.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env['NODE_ENV'] === 'local'
          ? join(__dirname, `../${process.env.NODE_ENV}.env`)
          : undefined,
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/gql',
      context: ({ req }) => ({ req }), // Pass the request to the context
    }),
    EncryptionModule,
    DataBaseModule,
    RedisModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AdminRepository,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: AuthInterceptor,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TransformInterceptor,
    // },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService,
    private readonly adminRepository: AdminRepository,
  ) { }

  async onApplicationBootstrap() {
    const adminData = {
      fullName: this.configService.get<string>('ADMIN_CREDENTIALS.NAME'),
      email: this.configService.get<string>('ADMIN_CREDENTIALS.EMAIL'),
      password: this.configService.get<string>('ADMIN_CREDENTIALS.PASSWORD'),
      // userType: USER_TYPE.SUPER_ADMIN,
      // permissions: Object.values(APP_RESOURCES).map((resource) => ({
      //   resource,
      //   actions: Object.values(APP_ACTIONS),
      // })),
    };

    const step1 = await this.adminRepository.isEmailExist(adminData.email);
    if (!step1) this.adminRepository.create(adminData);
  }
}