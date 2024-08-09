import {
  AdminChangePasswordDto,
  AdminForgotPasswordDto,
  AdminLoginDto,
  AdminProfileDto,
  AdminResendOtpDto,
  AdminResetPasswordDto,
  AdminValidateResetOtpDto,
} from '../dtos';
// import { ERROR, SALT_ROUNDS, STATUS, TOKEN_TYPE } from '@/common/constants';
import { ERROR, SALT_ROUNDS, STATUS, TOKEN_TYPE } from 'src/common/constants';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { generateCode, isOTPMatch, Password, toObjectId } from 'src/utils';
import { randomBytes } from 'crypto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DeviceParamsDto } from 'src/common/dtos';
import { AdminSessionService } from './admin-session.service';
import { EncryptionService } from '@/providers/encryption/encryption.service';
import { AdminRepository } from '@/database/repositories/admin.repository';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly adminRepository: AdminRepository,
    private readonly jwtService: JwtService,
    private readonly adminSessionService: AdminSessionService,
    // private readonly mailService: MailService,
    private readonly encryptionService: EncryptionService,


  ) { }

  /**
   * Removes session information for a user.
   * @param {TokenData} params containing the user ID and device ID
   */
  async removeSession(params: TokenData) {
    try {
      const isSingleSession: boolean = this.configService.get(
        `IS_SINGLE_DEVICE_LOGIN.${params.userType}`,
      );
      if (isSingleSession) {
        await this.adminSessionService.removeDeviceById({
          userId: params.userId,
        });
      } else {
        await this.adminSessionService.removeDeviceById({
          userId: params.userId,
          deviceId: params.deviceId,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }: AdminLoginDto, headers: DeviceParamsDto) {
    try {
      const step1:any = await this.adminRepository.isEmailExist(email);
      if (!step1) throw new BadRequestException(ERROR.EMAIL_NOT_REGISTERED);

      if (step1.status === STATUS.INACTIVE)
        throw new UnauthorizedException(ERROR.BLOCKED);
      //check password;
      const isPasswordMatch = await Password.compare(
        step1.password,
        password,
        step1.salt,
      );
      if (!isPasswordMatch)
        throw new BadRequestException(ERROR.INCORRECT_PASSWORD);
      if (!step1 && !isPasswordMatch)
        throw new BadRequestException(ERROR.INVALID_CREDENTIALS);
      //remove existing session of user
      await this.removeSession({
        userId: step1._id,
        deviceId: headers['deviceid'],
        userType: step1.userType,
      });
      // create login history
      const { accessToken, refreshToken } =
        await this.generateLoginHistoryWithToken({
          result: step1,
          headers: headers,
        });
      return {
        ...step1,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async validateResetPasswordOtp({ email, otp }: AdminValidateResetOtpDto) {
    try {
      const step1 = await this.adminRepository.isEmailExist(email);
      if (!step1) throw new BadRequestException(ERROR.EMAIL_NOT_REGISTERED);

      // parse the reset password token and compare it with the provided OTP
      const generatedOTP = Number(step1.otp);
      if (otp !== generatedOTP)
        throw new BadRequestException(ERROR.INVALID_OTP);

      // check if the OTP has expired
      const isOtpMatched = isOTPMatch(otp, generatedOTP, step1.otpExpireTime);
      if (!isOtpMatched) throw new BadRequestException(ERROR.OTP_EXPIRED);
      return { _id: step1._id, email: step1.email, isOtpMatch: isOtpMatched };
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword({ email }: AdminForgotPasswordDto) {
    try {
      const step1:any = await this.adminRepository.isEmailExist(email);
      if (!step1) throw new BadRequestException(ERROR.EMAIL_NOT_REGISTERED);

      if (step1.status === STATUS.INACTIVE)
        throw new UnauthorizedException(ERROR.BLOCKED);

      const { code, expiry } = generateCode();

      const toUpdate = { otp: code, otpExpireTime: expiry };

      const result = await this.adminRepository.updateAdminDetails(
        step1._id,
        toUpdate,
      );
      const appUrl = process.env['ADMIN_URL'];
      // await this.mailService.forgotPasswordMail({
      //   email: email,
      //   link: `${appUrl}account/reset-password/${step1._id}?email=${email}`,
      //   // link: `https://shoonadevadmin.appskeeper.in/account/reset-password/${step1._id}?email=${email}`
      // }); //"?email="+params.email
      return result;
    } catch (error) {
      throw error;
    }
  }
  /**
   * @function resendOtpToEmail
   * Function to resend OTP to admin's registered email
   */

  async resendOtpToEmail({ email }: AdminResendOtpDto) {
    try {
      const step1:any = await this.adminRepository.isEmailExist(email);
      if (!step1) throw new BadRequestException(ERROR.EMAIL_NOT_REGISTERED);

      if (step1.status === STATUS.INACTIVE)
        throw new UnauthorizedException(ERROR.BLOCKED);

      const { code, expiry } = generateCode();

      const toUpdate = { otp: code, otpExpireTime: expiry };

      const result = await this.adminRepository.updateAdminDetails(
        step1._id,
        toUpdate,
      );

      // await this.mailService.resendOtp({ email, otp: code });

      return result;
    } catch (error) {
      throw error;
    }
  }
  async resetPassword({
    id,
    newPassword,
    confirmPassword,
  }: AdminResetPasswordDto) {
    try {
      if (newPassword !== confirmPassword)
        throw new BadRequestException(ERROR.NEW_CONFIRM_PASSWORD);
      const step1:any = await this.adminRepository.findAdminById(id);
      if (!step1) throw new BadRequestException(ERROR.USER_NOT_FOUND);

      if (step1.status === STATUS.INACTIVE)
        throw new UnauthorizedException(ERROR.BLOCKED);

      // generate a new salt for the user's password
      const salt = Password.generateSalt(SALT_ROUNDS);
      // update the user's password with the new salt
      const hashedPassword = await Password.toHash(newPassword, salt);

      await this.adminRepository.changePassword({
        userId: step1._id,
        password: hashedPassword,
        salt,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @function logout
   * @params {TokenData}
   *
   */
  async logout(tokenData: TokenData) {
    try {
      console.log('22', tokenData);

      return await this.removeSession(tokenData);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @function issueFreshToken
   * @params {TokenData}
   *
   */
  async issueFreshToken(result: TokenData) {
    try {
      const accessTokenKey = randomBytes(64).toString('hex');
      const refreshTokenKey = randomBytes(64).toString('hex');
      const currentTime = new Date().getTime();

      const tokenData = {
        userId: result.userId,
        accessTokenKey: accessTokenKey,
        refreshTokenKey: refreshTokenKey,
        type: TOKEN_TYPE.USER_LOGIN,
        userType: result?.userType,
        deviceId: result.deviceId,
        platform: result.platform,
        created: currentTime,
      };
      const { accessToken, refreshToken } = await this.createToken(tokenData);

      const toUpdate = {
        accessTokenKey,
        refreshTokenKey,
        created: currentTime,
      };
      await this.adminSessionService.updateAdminSession(
        result.sessionId,
        toUpdate,
      );

      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  /**
   * @function changePassword
   * @params {TokenData}
   * @params {AdminChangePasswordDto}
   *
   */
  async changePassword(
    tokenData: TokenData,
    { oldPassword, newPassword, confirmPassword }: AdminChangePasswordDto,
  ) {
    try {
      if (newPassword !== confirmPassword)
        throw new BadRequestException(ERROR.NEW_CONFIRM_PASSWORD);

      const step1:any = await this.adminRepository.findAdminById(tokenData.userId);

      const isPasswordMatch = await Password.compare(
        step1.password,
        oldPassword,
        step1.salt,
      );

      if (!isPasswordMatch)
        throw new BadRequestException(ERROR.INCORRECT_OLD_PASSWORD);

      // generate a new salt for the user's password
      const salt = Password.generateSalt(SALT_ROUNDS);
      // update the user's password with the new salt
      const hashedPassword = await Password.toHash(newPassword, salt);

      await this.adminRepository.changePassword({
        userId: step1._id,
        password: hashedPassword,
        salt,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @function editProfile
   * @param adminId
   * @param params:
   * @returns
   */
  async adminProfile(adminId: string) {
    try {
      // const result = await this.adminRepository.findAdminById(adminId);
      // console.log("result",result)
      const result = await this.adminRepository.findAdminById(adminId)
      // let data;
      // data = await this.axiosService.getData({
      //   url: `${this.configService.get('NOTIFICATION_APP_URL')}api/v1/notification/unread-count`,
      //   payload: {
      //     id: adminId
      //   },
      // });
      // let unreadCount = 0
      // if (data && data.statusCode === 200) {
      //   const decryptedData = this.encryptionService.decryptData(data.data);
      //   unreadCount = decryptedData["result"].unreadCount
      // }
      // result.unreadCount = unreadCount
      return result;
    } catch (error) {
      throw error;
    }
  }
  /**
   * @function editProfile
   * @param adminId
   * @param params:
   * @returns
   */
  async editProfile(adminId: string, payload: AdminProfileDto) {
    try {
      const toUpdate = {
        fullName: payload.fullName,
        profilePicture: payload?.profilePicture,
        countryCode: payload?.countryCode,
        phoneNo: payload?.phoneNo,
      };
      const result = await this.adminRepository.updateAdminDetails(
        adminId,
        toUpdate,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Generates login history and access token for the user
   * @param result - user object
   * @param headers - device parameters
   * @returns access token, refresh token
   */
  async generateLoginHistoryWithToken({
    result,
    headers,
  }: GenerateLoginHistoryWithTokenOptions) {
    const { deviceid, devicetype, timezone } = headers;
    const accessTokenKey = randomBytes(64).toString('hex');
    const refreshTokenKey = randomBytes(64).toString('hex');
    const currentTime = new Date().getTime();
    const tokenData = {
      userId: result._id,
      accessTokenKey: accessTokenKey,
      refreshTokenKey: refreshTokenKey,
      type: TOKEN_TYPE.USER_LOGIN,
      userType: result?.userType,
      deviceId: deviceid,
      platform: devicetype,
      created: currentTime,
    };
    const { accessToken, refreshToken } = await this.createToken(tokenData);

    // create login history
    await this.adminSessionService.createAdminLoginHistory({
      ...result,
      ...tokenData,
      isLogin: true,
      timezone: timezone || 'IST',
      language: headers['language'] || 'en',
    });
    return { accessToken, refreshToken };
  }

  /**
@function createToken
@description Creates a JSON Web Token (JWT) using the provided payload data and sign options.
@param {Object} data - An object containing user information like userId, deviceType, deviceId, accessTokenKey, type, and userType.
@param {Object} signOptions - Optional object containing options for signing the JWT.
@returns {string} A signed JWT string.
@throws {BadRequestException} if the access token cannot be generated.
*/
  createToken = async (
    data: {
      userId: string;
      deviceType?: string;
      deviceId?: string;
      accessTokenKey?: string;
      refreshTokenKey?: string;
      type: string;
      userType: string;
    },
    signOptions: JwtSignOptions = {},
  ) => {
    const accessTokenPayload = {
      aud: data.userType, // audience - who this token is intended for
      sub: data.userId, // subject - who this token is about
      userId: data.userId, // subject - who this token is about
      platform: data.deviceType, // device platform information
      deviceId: data.deviceId, // unique device identifier
      type: data.type, // token type
      iat: Math.floor(Date.now() / 1000), // issued at time in seconds
      prm: data.accessTokenKey, // additional payload data
    };
    const refreshTokenPayload = {
      aud: data.userType, // audience - who this token is intended for
      sub: data.userId, // subject - who this token is about
      userId: data.userId, // subject - who this token is about
      platform: data.deviceType, // device platform information
      deviceId: data.deviceId, // unique device identifier
      type: data.type, // token type
      iat: Math.floor(Date.now() / 1000), // issued at time in seconds
      prm: data.refreshTokenKey, // additional payload data
    };
    const accessToken = await this.jwtService.sign(accessTokenPayload);
    const refreshToken = await this.jwtService.sign(refreshTokenPayload, {
      expiresIn: this.configService.get(
        'TOKEN_INFO.EXPIRATION_TIME.REFRESH_TOKEN',
      ),
      ...signOptions,
    });

    if (!accessToken || !refreshToken)
      throw new BadRequestException(ERROR.TOKEN_GENERATE_ERROR);
    return { accessToken, refreshToken };
  };
}
