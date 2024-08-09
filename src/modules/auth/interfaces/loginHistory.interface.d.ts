declare interface Device {
  platform?: string;
  deviceId?: string;
  deviceType?: string;
  remoteAddress?: string;
  accessTokenKey?: string;
  timezone?: number;
  language?: string;
  lastLogin?: number;
}

declare interface TokenData extends Device {
  userId: string;
  sessionId?: string;
  fullName?: string;
  email?: string;
  userType?: string;
  countryCode?: string;
  phoneNo?: string;
  status?: number;
  created?: number;
  _id?: string;
}

declare interface verifyEmail {
  _id: string;
}

declare interface LoginHistoryRequest extends Device {
  userId: string;
  email: string;
  fullName?: string;
  userType: string;
  status: string;
  accessTokenKey: string;
  refreshTokenKey?: string;
  isLogin?: boolean;
  created?: number;
}

declare interface GenerateLoginHistoryWithTokenOptions {
  result: DataI;
  headers: {
    deviceid?: string;
    devicetype?: string;
    language?: string;
    timezone?: string;
  };
}
