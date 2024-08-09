import { Exclude, Expose } from 'class-transformer';

export class OtpResponseDto {
  @Expose()
  otp: string;

  @Expose()
  otpExpireTime: string;
}

class CommonAuthSerializer {
  @Exclude()
  password: string;

  @Exclude()
  salt: string;

  @Expose()
  _id: string;

  @Expose()
  fullName: string;

  @Expose()
  email: string;

  @Expose()
  userType: string;

  @Expose()
  status: string;

  @Expose()
  otp: number;

  @Expose()
  otpExpireTime: number;

  @Expose()
  accessToken: string;

  @Expose()
  isOtpMatch: boolean;
  @Expose()
  to: string;
  @Expose()
  value: string;
}

export class AdminAuthResponseDto extends CommonAuthSerializer {
  @Expose()
  profilePicture: string;
  @Expose()
  permissions: string[];

  @Expose()
  permissionActions: string[];
}

export class UserAuthResponseDto extends CommonAuthSerializer {
  @Expose()
  plan: string;

  @Expose()
  countryCode: string;

  @Expose()
  googleId: string;

  @Expose()
  facebookId: string;

  @Expose()
  appleId: string;

  @Expose()
  isFacebookLogin: boolean;

  @Expose()
  isGoogleLogin: boolean;

  @Expose()
  isAppleLogin: boolean;

  @Expose()
  isSocialAccount: boolean;

  @Expose()
  profileImageOrVideos: string[];

  @Expose()
  isProfileCompleted?: boolean;

  @Expose()
  completedSteps: number;

  @Expose()
  isAdmin?: boolean;

  @Expose()
  handicap: string;

  @Expose()
  nationality: string;

  @Expose()
  homeGolfCourse: string;

  @Expose()
  interests: string[];

  @Expose()
  isEmailVerified: boolean;

  @Expose()
  isPhoneNoVerified: boolean;

  @Expose()
  isAccountVerified: boolean;
}
