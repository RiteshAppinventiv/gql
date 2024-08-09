import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
// import {
//   // AdminSessionService,
//   // AdminAuthService,
//   UserAuthService,
//   UserSessionService,
// } from '../services';
import { ERROR, STATUS, userType } from 'src/common/constants';
import { buildToken } from 'src/utils';
import { AdminAuthService } from '../services/admin-auth.service';
import { AdminSessionService } from '../services/admin-session.service';
import { UserRepository } from '@/database/repositories/user.repository';
import { UserSessionService } from '../services/user-session.service';
import { AdminRepository } from '@/database/repositories/admin.repository';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refreshToken',
) {
  constructor(
    private readonly configService: ConfigService,
    // private readonly userAuthService: UserAuthService,
    private readonly adminAuthService: AdminAuthService,
    private readonly userRepository: UserRepository,
    private readonly adminRepository: AdminRepository,
    private readonly userSessionService: UserSessionService,

    private readonly adminSessionService: AdminSessionService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: fs
        .readFileSync(configService.get<string>('JWT_PUBLIC_KEY'))
        .toString(),
      algorithms: [configService.get('JWT_ALGO')],
    });
  }

  /**This function run by jwt module */
  // async validate(payload: any) {
  //   try {
  //     if (!payload) throw new UnauthorizedException(ERROR.UNAUTHORIZED_ACCESS);
  //     this.validateTokenData(payload);
  //     if (
  //       payload.aud === userType.CLINICIAN ||
  //       payload.aud === userType.PATIENT
  //     ) {
  //       const { step1, sessionData } = await this.validateUserSession(payload);
  //       const user = buildToken({ ...sessionData, ...step1 });
  //       return 'user';
  //     } else {
  //       const { step1, sessionData } = await this.validateAdminSession(payload);
  //       const user = buildToken({ ...sessionData, ...step1 });
  //       return user;
  //     }
  //   } catch (error) {
  //     if (error && error.name === 'TokenExpiredError') {
  //       throw new UnauthorizedException(ERROR.TOKEN_EXPIRED);
  //     }
  //     throw error;
  //   }
  // }

  async validateUserSession(payload) {
    try {
      console.log("-------------payload-------------",payload);
      const step1 = await this.userRepository.findUserById(payload.sub);
      if (!step1) throw new UnauthorizedException(ERROR.BAD_TOKEN);
      // if (step1.status === STATUS.INACTIVE || step1.status === STATUS.DELETED) {
      //   await this.userAuthService.removeSession({
      //     userId: payload.sub,
      //     deviceId: payload.deviceId,
      //     userType: payload.aud,
      //   });
      //   throw new UnauthorizedException(ERROR.BLOCKED);
      // }
      const sessionData = await this.userSessionService.findDeviceById({
        tokenKey: payload.prm,
        deviceId: payload.deviceId,
        userId: payload.sub,
      });
      if (!sessionData) {
        throw new UnauthorizedException(ERROR.SESSION_EXPIRED);
      }
      return { step1, sessionData };
    } catch (error) {
      throw error;
    }
  }
  async validateAdminSession(payload) {
    try {
      const step1 = await this.adminRepository.findAdminById(payload.sub);
      if (!step1) throw new UnauthorizedException(ERROR.BAD_TOKEN);

      if (step1.status === STATUS.INACTIVE || step1.status === STATUS.DELETED) {
        await this.adminAuthService.removeSession({
          userId: payload.sub,
          deviceId: payload.deviceId,
          userType: payload.aud,
        });
        throw new UnauthorizedException(ERROR.BLOCKED);
      }
      const sessionData = await this.adminSessionService.findDeviceById({
        tokenKey: payload.prm,
        deviceId: payload.deviceId,
        userId: payload.sub,
      });

      if (!sessionData) throw new UnauthorizedException(ERROR.SESSION_EXPIRED);
      return { step1, sessionData };
    } catch (error) {
      throw error;
    }
  }

  /**

    @function validateTokenData
    @params JwtPayload
    @throws UnauthorizedException if the token payload is invalid.
*/

  validateTokenData(payload: JwtPayload): boolean {
    const allowedUserTypes = [
      userType.SUPER_ADMIN,
      userType.ADMIN,
      userType.USER,
      userType.PATIENT,
      userType.CLINICIAN,
      userType.SUBADMIN,
    ];

    const isValidPayload =
      payload &&
      payload.iss &&
      payload.sub &&
      payload.aud &&
      payload.prm &&
      allowedUserTypes.includes(payload.aud);
    if (!isValidPayload) {
      throw new UnauthorizedException(ERROR.BAD_TOKEN);
    }
    return true;
  }
}
