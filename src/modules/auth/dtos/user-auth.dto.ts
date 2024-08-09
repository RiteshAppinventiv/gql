import {
  IsIn,
  IsNumber,
  IsOptional,
  IsStrongPassword,
  ValidateIf,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  validate,
  isEnum,
  IsEnum,
  IsEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  DEVICE_TYPE,
  GENDER,
  LOGIN_TYPE,
  PRONOUNS,
  USER_TYPE,
  VALIDATION_CRITERIA,
  VALIDATION_MESSAGE,
} from 'src/common/constants';

class EmailDto {
  @ApiPropertyOptional({
    example: 'example@gmail.com',
    description: 'User email',
  })
  @ValidateIf((o) => o.email)
  @IsEmail({}, { message: VALIDATION_MESSAGE.INVALID_EMAIL_ADDRESS })
  @IsNotEmpty({ message: VALIDATION_MESSAGE.INVALID_EMAIL_ADDRESS })
  @Transform((param) => param.value.toLowerCase())
  readonly email: string;
}

export class SignupDto {
  // @ApiProperty({
  //   description: 'Type of the device',
  //   enum: Object.values(DEVICE_TYPE),
  //   example: DEVICE_TYPE.ANDROID,
  // })
  // @IsNotEmpty()
  // @IsIn(Object.values(DEVICE_TYPE))
  // readonly deviceType: DEVICE_TYPE;

  // @ApiProperty({
  //   description: 'Device identifier',
  //   example: 'abcd1234',
  // })
  // @IsString()
  // @IsNotEmpty()
  // readonly deviceId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsEnum(GENDER, { each: true })
  gender?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  // @IsEnum(Object.values(USER_TYPE))
  @IsEnum(USER_TYPE, { each: true })
  userType?: string;

  @ApiPropertyOptional({})
  readonly dob: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsEnum(Object.values(PRONOUNS))
  pronouns?: string;

  @ApiProperty({
    example: 'Virat Kohli',
    description: 'user full name',
  })
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  // @ApiPropertyOptional({
  //   example: 'physician',
  //   description: "clinician speciality"
  // })
  // @IsString()
  // @IsOptional()
  // readonly speciality: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'User email',
  })
  @ValidateIf((o) => o.email)
  @IsEmail({}, { message: VALIDATION_MESSAGE.INVALID_EMAIL_ADDRESS })
  @IsNotEmpty({ message: VALIDATION_MESSAGE.INVALID_EMAIL_ADDRESS })
  @Transform((param) => param.value.toLowerCase())
  readonly email: string;

  @ApiPropertyOptional({
    description: 'User phone number without country code',
    example: '1234567890',
  })
  @ValidateIf((o) => o.phoneNo)
  @IsNotEmpty({ message: VALIDATION_MESSAGE.INVALID_PHONE_NO })
  readonly phoneNo: string;

  @ApiPropertyOptional({
    description: 'Country code',
    example: '+91',
  })
  @ValidateIf((o) => o.phoneNo)
  @IsString()
  @IsNotEmpty()
  @MinLength(VALIDATION_CRITERIA.COUNTRY_CODE_MIN_LENGTH)
  @MaxLength(VALIDATION_CRITERIA.COUNTRY_CODE_MAX_LENGTH)
  readonly countryCode: string;

  @ApiProperty({
    description: 'User password',
    minLength: VALIDATION_CRITERIA.PASSWORD_MIN_LENGTH,
    example: 'Password@123',
  })
  @IsNotEmpty({ message: VALIDATION_MESSAGE.INVALID_PASSWORD })
  @IsStrongPassword(
    {
      minLength: VALIDATION_CRITERIA.PASSWORD_MIN_LENGTH,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    },
    {
      message: VALIDATION_MESSAGE.INVALID_PASSWORD,
    },
  )
  readonly password?: string;

  @ApiProperty({
    description: 'Confirm password',
    example: 'Password@123',
  })
  @IsNotEmpty()
  readonly confirmPassword?: string;
}

export class VerifyAccountDto extends EmailDto {
  @ApiPropertyOptional({
    example: 'example@gmail.com',
    description: 'User email',
  })
  @ValidateIf((o) => o.email)
  @IsEmail({}, { message: VALIDATION_MESSAGE.INVALID_EMAIL_ADDRESS })
  @IsNotEmpty({ message: VALIDATION_MESSAGE.INVALID_EMAIL_ADDRESS })
  @Transform((param) => param.value.toLowerCase())
  readonly email: string;
}

export class ResendOtpDto extends EmailDto {}
/**
 * LoginDto object for user login
 */
export class LoginDto extends EmailDto {
  @ApiProperty({ example: 'password@123', description: 'User password' })
  @IsNotEmpty({ message: VALIDATION_MESSAGE.INVALID_PASSWORD })
  readonly password: string;

  // @ApiProperty({
  //   description: 'Type of the device',
  //   enum: Object.values(DEVICE_TYPE),
  //   example: DEVICE_TYPE.ANDROID,
  // })
  // @IsNotEmpty()
  // @IsIn(Object.values(DEVICE_TYPE))
  // readonly deviceType: DEVICE_TYPE;

  // @ApiProperty({
  //   description: 'Device identifier',
  //   example: 'abcd1234',
  // })
  // @IsString()
  // @IsNotEmpty()
  // readonly deviceId: string;
}

/**
 * SocialLoginDto object for social login
 */
export class SocialLoginDto {
  @ApiProperty({
    enum: Object.values(LOGIN_TYPE),
    default: LOGIN_TYPE.GOOGLE,
    example: LOGIN_TYPE.GOOGLE,
    description: 'Social login type',
  })
  @IsNotEmpty()
  @IsIn(Object.values(LOGIN_TYPE))
  readonly loginType: LOGIN_TYPE;

  @ApiProperty({
    example: '1234567890',
    description: 'Social login user ID',
  })
  @IsNotEmpty()
  readonly socialId: string;

  @ApiPropertyOptional({
    example: 'example@gmail.com',
    description: 'User email',
  })
  @IsEmail({}, { message: VALIDATION_MESSAGE.INVALID_EMAIL_ADDRESS })
  @Transform((param) => param.value.toLowerCase())
  readonly email: string;
}

export class ForgotPasswordDto extends EmailDto {}

export class ResetPasswordDto extends EmailDto {
  @ApiProperty({
    description: 'New password',
    minLength: VALIDATION_CRITERIA.PASSWORD_MIN_LENGTH,
    example: 'Password@123',
  })
  @IsNotEmpty({ message: VALIDATION_MESSAGE.INVALID_PASSWORD })
  @IsStrongPassword(
    {
      minLength: VALIDATION_CRITERIA.PASSWORD_MIN_LENGTH,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    },
    {
      message: VALIDATION_MESSAGE.INVALID_PASSWORD,
    },
  )
  readonly newPassword: string;

  @ApiProperty({
    description: 'Confirm new password',
    example: 'Password@123',
  })
  @IsNotEmpty()
  readonly confirmPassword: string;
}

export class ValidateOtpDto extends EmailDto {
  @ApiProperty({
    description: 'OTP received by user',
    example: 1234,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly otp: number;
}

export class ValidateLoginOtpDto extends OmitType(EmailDto, [
  'email',
] as const) {
  @ApiProperty({
    description: 'OTP received by user',
    example: 1234,
  })
  @IsNotEmpty()
  @IsNumber()
  otp: number;
}
