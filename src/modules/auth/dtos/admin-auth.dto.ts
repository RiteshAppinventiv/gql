import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  IsNumber,
  Length,
  IsOptional,
  IsString,
  ValidateIf,
  MinLength,
  MaxLength,
} from 'class-validator';
import { VALIDATION_CRITERIA, VALIDATION_MESSAGE } from 'src/common/constants';

export class AdminLoginDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'admin email' })
  @IsEmail({}, { message: VALIDATION_MESSAGE.INVALID_EMAIL_ADDRESS })
  @IsNotEmpty()
  @Transform((param) => param.value.toLowerCase())
  readonly email: string;

  @ApiProperty({ example: 'password@123', description: 'Admin password' })
  @IsNotEmpty()
  readonly password: string;
}

export class AdminForgotPasswordDto extends PickType(AdminLoginDto, [
  'email',
] as const) {}

export class AdminResendOtpDto extends PickType(AdminLoginDto, [
  'email',
] as const) {}
class NewConfirmPasswordDto {
  @ApiProperty({
    description: 'New password',
    minLength: VALIDATION_CRITERIA.PASSWORD_MIN_LENGTH,
    example: 'Password@123',
  })
  @IsNotEmpty({ message: VALIDATION_MESSAGE.NEW_PASSWORD_REQUIRED })
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
  @IsNotEmpty({ message: VALIDATION_MESSAGE.CONFIRM_PASSWORD_REQUIRED })
  readonly confirmPassword: string;
}
export class AdminResetPasswordDto extends NewConfirmPasswordDto {
  @ApiProperty({
    description: 'Unique identifier of the resource',
    example: '61d9cfbf17ed7311c4b3e485',
    required: true,
  })
  @IsNotEmpty()
  readonly id: string;
}

export class AdminValidateResetOtpDto extends PickType(AdminLoginDto, [
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

export class AdminProfileDto {
  @ApiPropertyOptional({
    description: 'User full name',
    example: 'John Doe',
  })
  @IsOptional()
  @Length(VALIDATION_CRITERIA.NAME_MIN_LENGTH)
  fullName: string;

  @ApiPropertyOptional({
    description: 'URL of the admin profile picture',
    example: 'https://example.com/profile-picture.jpg',
  })
  @IsString()
  @IsOptional()
  readonly profilePicture?: string;

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
}

export class AdminChangePasswordDto extends NewConfirmPasswordDto {
  @ApiProperty({ example: 'Password@123', description: 'Old Password' })
  @IsNotEmpty({ message: VALIDATION_MESSAGE.OLD_PASSWORD_REQUIRED })
  readonly oldPassword: string;
}
