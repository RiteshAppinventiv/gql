import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
// import {
//   // AdminSessionService,
//   // AdminAuthService,
//   UserAuthService,
//   ClinicianAuthService,
//   ClinicianSessionService,
//   UserSessionService,
// } from '../services';
import { ERROR, STATUS, userType } from 'src/common/constants';
import { buildToken } from 'src/utils';
import { AdminSessionService } from '../services/admin-session.service';
import { AdminAuthService } from '../services/admin-auth.service';
import { UserSessionService } from '../services/user-session.service';
import { AdminRepository } from '@/database/repositories/admin.repository';
import { UserRepository } from '@/database/repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly adminAuthService: AdminAuthService,
    private readonly adminRepository: AdminRepository,
    private readonly adminSessionService: AdminSessionService,
    private readonly userRepository: UserRepository,
    private readonly userSessionService: UserSessionService,


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
  /**This function run by jwt */
  async validate(payload: JwtPayload) {
    try {
      if (!payload) throw new UnauthorizedException(ERROR.UNAUTHORIZED_ACCESS);
      this.validateTokenData(payload);
      if (payload.aud === userType.PATIENT) {
        const { step1, sessionData } = await this.validateUserSession(payload);
        const user = { ...sessionData, ...step1 };
        return user;
      }
      else {
        const { step1, sessionData } = await this.validateAdminSession(payload);
        console.log("///////////////////")
        const user = buildToken({ ...sessionData, ...step1 });

        return user;
      }
    } catch (error) {
      console.log("errorrrr",error)
      if (error && error.name === 'TokenExpiredError') {
        throw new ForbiddenException(ERROR.BAD_TOKEN);
      }
      throw error;
    }
  }

  async validateUserSession(payload: JwtPayload) {
    try {
      const step1 = await this.userRepository.findUserById(payload.sub);
      if (!step1) throw new HttpException(ERROR.BAD_TOKEN, 403);
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
      //  if (!sessionData) throw new UnauthorizedException(ERROR.SESSION_EXPIRED);
      if (!sessionData) throw new ForbiddenException(ERROR.TOKEN_EXPIRED);
      return { step1, sessionData };
    } catch (error) {
      throw error;
    }
  }
  
  async validateAdminSession(payload: JwtPayload) {
    try {
      console.log("1111111111111111111")

      const step1 = await this.adminRepository.findAdminById(payload.sub);
      console.log("1111111111111",step1)
      console.log("2222222222222")

      if (!step1) throw new HttpException(ERROR.BAD_TOKEN, 403);

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

      if (!sessionData) {
        throw new ForbiddenException(ERROR.TOKEN_EXPIRED);
      }
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
    const allowedUserTypes = Object.values(userType);
    //  [
    //   userType.SUPER_ADMIN,
    //   userType.ADMIN,
    //   userType.USER,
    //   userType.SUBADMIN,
    // ];

    const isValidPayload =
      payload &&
      payload.iss &&
      payload.sub &&
      payload.aud &&
      payload.prm &&
      allowedUserTypes.includes(payload.aud);
    if (!isValidPayload) {
      throw new ForbiddenException(ERROR.BAD_TOKEN);
    }
    return true;
  }
}
