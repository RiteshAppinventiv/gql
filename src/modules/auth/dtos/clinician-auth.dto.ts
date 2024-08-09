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
  isString,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  GENDER,
  LOGIN_TYPE,
  PROFESSIONAL_CREDS,
  PRONOUNS,
  USER_TYPE,
  VALIDATION_CRITERIA,
  VALIDATION_MESSAGE,
} from 'src/common/constants';

class ClinicianEmailDto {
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

export class ClinicianSignupDto {
  @ApiProperty({
    example: 'Krishna ',
    description: 'clinic name',
  })
  @IsString()
  @IsNotEmpty()
  readonly clinicName: string;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  readonly country: string;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  readonly state: string;

  @ApiProperty({
    example: 'Delhi ',
    description: 'clinic address',
  })
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty({
    example: '281501',
    description: 'user zipcode',
  })
  @IsString()
  @IsNotEmpty()
  readonly zipCode: string;

  @ApiProperty({
    example: '1',
    description: 'user year of practice',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly yearOfPractice: number;

  @ApiProperty({
    example: 'Virat Kohli',
    description: 'user full name',
  })
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  // @IsEnum(PROFESSIONAL_CREDS, { each: true })
  readonly professionalCreds: string;

  // @ApiProperty({
  //   example: 'physician',
  //   description: "clinician speciality"
  // })
  // @IsString()
  // @IsOptional()
  // readonly speciality: string;

  @ApiProperty({
    example: ['physician', 'surgeon'],
    description: 'Array of clinician specialties',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly speciality: string[];

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'User email',
  })
  @ValidateIf((o) => o.email)
  @IsEmail({}, { message: VALIDATION_MESSAGE.INVALID_EMAIL_ADDRESS })
  @IsNotEmpty({ message: VALIDATION_MESSAGE.INVALID_EMAIL_ADDRESS })
  @Transform((param) => param.value.toLowerCase())
  readonly email: string;

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

export class ClinicianVerifyEmail {
  @ApiProperty({
    example: '64d5c96f0be6aa201862d4a7',
    description: 'clinician _Id',
  })
  readonly clinicianId: string;
}
export class VerifyClinicianAccountDto extends ClinicianEmailDto {
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

/**
 * LoginDto object for user login
 */
export class ClinicianLoginDto extends ClinicianEmailDto {
  @ApiProperty({ example: 'password@123', description: 'User password' })
  @IsNotEmpty({ message: VALIDATION_MESSAGE.INVALID_PASSWORD })
  readonly password: string;
}

export class ClinicianForgotPasswordDto extends ClinicianEmailDto {}

export class ClinicianResetPasswordDto extends ClinicianVerifyEmail {
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
