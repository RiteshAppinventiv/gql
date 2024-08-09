import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SUCCESS } from 'src/common/constants';
import {
  CurrentUser,
  ResponseMessage,
  SwaggerResponseDto,
} from 'src/common/decorators';
import { DeviceParamsDto, OnlyIDParamDTO } from 'src/common/dtos';
import { BasicAuthGuard, JwtAuthGuard } from 'src/middleware';
import { hashEmailOrPhone } from 'src/utils';
import { AdminEndPoint } from '../constants';
import {
  AdminChangePasswordDto,
  AdminForgotPasswordDto,
  AdminLoginDto,
  AdminProfileDto,
  AdminResendOtpDto,
  AdminResetPasswordDto,
  AdminValidateResetOtpDto,
} from '../dtos';
import { AdminAuthService } from '../services/admin-auth.service';

@ApiTags('Admin_Authentication_APIs')
@SwaggerResponseDto()
@Controller(AdminEndPoint.PREFIX)
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @ApiOperation({ summary: 'Login api for admin.' })
  @ApiBasicAuth()
  @Post(AdminEndPoint.LOGIN)
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(SUCCESS.LOGIN)
  async login(
    @Body() data: AdminLoginDto,
    @Headers() deviceParamsDto: DeviceParamsDto,
  ) {
    try {
      const result = await this.adminAuthService.login(data, deviceParamsDto);
      delete result?.password;
      delete result?.salt;
      return result;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Admin Forgot password api.' })
  @ApiBasicAuth()
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post(AdminEndPoint.FORGOT_PASSWORD)
  @ResponseMessage(SUCCESS.FORGOT_PASSWORD)
  async forgotPassword(@Body() body: AdminForgotPasswordDto) {
    try {
      const result = await this.adminAuthService.forgotPassword(body);
      const response = { id: result._id, otp: result.otp };
      const responseData = hashEmailOrPhone(body);
      // setting argument in message
      response['args'] = responseData;
      return response;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Resend OTP to email api for admin' })
  @ApiBasicAuth()
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post(AdminEndPoint.RESEND_OTP)
  @ResponseMessage(SUCCESS.SEND_OTP)
  async resendOtpToEmail(@Body() body: AdminResendOtpDto) {
    try {
      const result = await this.adminAuthService.resendOtpToEmail(body);
      const response = { otp: result.otp, id: result._id };
      const responseData = hashEmailOrPhone(body);
      // setting argument in message
      response['args'] = responseData;
      return response;
    } catch (error) {
      throw error;
    }
  }
  @ApiOperation({ summary: 'Validate Reset Password OTP for admin.' })
  @ApiBasicAuth()
  @SwaggerResponseDto()
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post(AdminEndPoint.VALIDATE_RESET_PWD_OTP)
  @ResponseMessage(SUCCESS.VALID__EMAIL_OTP)
  async validateOTP(@Body() body: AdminValidateResetOtpDto) {
    try {
      const result = await this.adminAuthService.validateResetPasswordOtp(body);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Admin Reset Password api.' })
  @ApiBasicAuth()
  @SwaggerResponseDto()
  @UseGuards(BasicAuthGuard)
  @Post(AdminEndPoint.RESET_PASSWORD)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(SUCCESS.RESET_PASSWORD)
  async resetPassword(@Body() body: AdminResetPasswordDto) {
    try {
      await this.adminAuthService.resetPassword(body);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Admin logout api' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(AdminEndPoint.LOGOUT)
  @ResponseMessage(SUCCESS.LOGOUT)
  async logout(@CurrentUser() admin: TokenData) {
    try {
      await this.adminAuthService.logout(admin);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Admin change password api' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(AdminEndPoint.CHANGE_PASSWORD)
  @ResponseMessage(SUCCESS.CHANGE_PASSWORD)
  async changePassword(
    @CurrentUser() admin: TokenData,
    @Body() data: AdminChangePasswordDto,
  ) {
    try {
      await this.adminAuthService.changePassword(admin, data);
    } catch (error) {
      throw error;
    }
  }
  @ApiOperation({ summary: 'Admin profile update api' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(AdminEndPoint.UPDATE_PROFILE)
  @ResponseMessage(SUCCESS.PROFILE_UPDATED)
  async updateProfile(
    @CurrentUser() admin: TokenData,
    @Body() data: AdminProfileDto,
  ) {
    try {
      return await this.adminAuthService.editProfile(admin.userId, data);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Admin profile api' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(AdminEndPoint.PROFILE)
  @ResponseMessage(SUCCESS.GET_ADMIN_PROFILE)
  async adminProfile(@CurrentUser() admin: TokenData) {
    try {
      const result = await this.adminAuthService.adminProfile(admin.userId);
      delete result?.password;
      delete result?.salt;
      return result;
    } catch (error) {
      throw error;
    }
  }
}
