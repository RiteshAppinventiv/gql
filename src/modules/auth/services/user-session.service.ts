import { Injectable } from '@nestjs/common';
import { UsersSessionRepository } from 'src/database/repositories/user-session.repository';

@Injectable()
export class UserSessionService {
  constructor(private userSessionRepo: UsersSessionRepository) {}

  async createUserLoginHistory(params: DataI) {
    try {
      const loginHistory: LoginHistoryRequest = {
        userId: params.userId || params['_id'],
        fullName: params?.fullName,
        email: params.email,
        userType: params.userType,
        status: params.status,
        isLogin: params.isLogin || true,
        lastLogin: new Date().getTime(),
        deviceId: params.deviceId,
        platform: params.platform,
        accessTokenKey: params.accessTokenKey,
        refreshTokenKey: params?.refreshTokenKey,
        timezone: params?.timezone || 'IST',
        language: params?.language || 'en',
        created: params?.created || new Date().getTime(),
      };
      console.log('login', loginHistory);
      return await this.userSessionRepo.create(loginHistory);
    } catch (error) {
      throw error;
    }
  }

  async findDeviceById(params: {
    tokenKey: string;
    deviceId: string;
    userId: string;
  }) {
    try {
      return await this.userSessionRepo.findDeviceById(params);
    } catch (err) {
      throw err;
    }
  }

  async removeDeviceById(params: { deviceId?: string; userId: string }) {
    try {
      return await this.userSessionRepo.removeDeviceById(params);
    } catch (err) {
      throw err;
    }
  }

  async updateUserSession(sessionId: string, params) {
    try {
      return await this.userSessionRepo.updateUserSession(sessionId, params);
    } catch (err) {
      throw err;
    }
  }

  async findUserTokenById(params: { userId: string }) {
    try {
      return await this.userSessionRepo.findUserTokenById(params);
    } catch (err) {
      throw err;
    }
  }
}
