import { Injectable } from '@nestjs/common';
import { AdminSessionRepository } from 'src/database/repositories/admin-session.repository';

@Injectable()
export class AdminSessionService {
  constructor(private adminSessionRepo: AdminSessionRepository) {}

  async createAdminLoginHistory(params: DataI) {
    try {
      const loginHistory: LoginHistoryRequest = {
        userId: params.userId || params['_id'],
        fullName: params?.fullName,
        email: params.email,
        userType: params.userType, // const { step1, sessionData } = await this.validateAdminSession(payload);

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
      return await this.adminSessionRepo.create(loginHistory);
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
      return await this.adminSessionRepo.findDeviceById(params);
    } catch (err) {
      throw err;
    }
  }

  async removeDeviceById(params: { deviceId?: string; userId: string }) {
    try {
      return await this.adminSessionRepo.removeDeviceById(params);
    } catch (err) {
      throw err;
    }
  }

  async updateAdminSession(sessionId: string, params) {
    try {
      return await this.adminSessionRepo.updateAdminSession(sessionId, params);
    } catch (err) {
      throw err;
    }
  }


  async updateData(query, update) {
    try {
      return await this.adminSessionRepo.findOneAndUpdate(query, update);
     }
    catch (err) {
      throw err;  
    }
  }
}
