declare namespace Auth {
  export interface VerifyOTP {
    email?: string;
    phoneNo?: string;
    countryCode?: string;
    otp: number;
  }
  export interface ResetPassword {
    email?: string;
    phoneNo?: string;
    countryCode?: string;
    newPassword: string;
    confirmPassword: string;
  }

  export interface ChangePassword {
    userId?: string;
    email?: string;
    password: string;
    salt: string;
  }

  export interface SocialLogin {
    loginType?: string;
    socialId: string;
    email?: string;
    fullName?: string;
    isFacebookLogin?: boolean;
    isEmailVerified?: boolean;
    isAccountVerified?: boolean;
    isSocialAccount?: boolean;
    googleId?: string;
    appleId?: string;
    facebookId?: string;
    isGoogleLogin?: boolean;
    isAppleLogin?: boolean;
  }
}

declare interface JwtPayload {
  aud: string;
  sub: string;
  iss: string;
  iat: number;
  platform?: string;
  deviceId?: string;
  prm: string;
}

declare interface SignupViaEmail {
  email: string;
  password: string;
  confirmPassword: string;
}

declare interface SignupViaPhone {
  countryCode: string;
  phoneNo: string;
}
