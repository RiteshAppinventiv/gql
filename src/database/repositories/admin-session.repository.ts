import { AbstractRepository } from 'src/providers/database/mongodb/abstract.repository';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AdminSessionHistory, ADMIN_SESSION_HISTORY_MODEL } from '../schemas';
import { toObjectId } from 'src/utils';

@Injectable()
export class AdminSessionRepository extends AbstractRepository<AdminSessionHistory> {
  constructor(
    @InjectModel(ADMIN_SESSION_HISTORY_MODEL)
    adminSessionHistory: Model<AdminSessionHistory>,
    @InjectConnection() connection: Connection,
  ) {
    super(adminSessionHistory, connection);
  }

  /**
   * @function findDeviceLastLogin
   * Find the last login date for a device
   * @returns The last login date, or an empty string if none is found
   */

  async findDeviceLastLogin(params: { userId: string; deviceId?: string }) {
    const query: any = { userId: params.userId, isLogin: false };
    if (params.deviceId) query.deviceId = params.deviceId;

    const projection = { lastLogin: 1, created: 1 };
    const sort = { created: -1 };
    const response = await this.findOne(query, projection, {}, sort);
    return response?.lastLogin || '';
  }

  /**
   * Remove a device by its ID
   * @returns The number of documents updated
   */
  async removeDeviceById(params: { userId: string; deviceId?: string }) {
    const query: any = { userId: toObjectId(params.userId), isLogin: true };
    if (params.deviceId) query.deviceId = params.deviceId;

    const update = {
      $set: { isLogin: false },
      $unset: { deviceId: '', accessTokenKey: '', refreshTokenKey: '' },
    };
    const options = { multi: true };

    return await this.updateMany(query, update, options);
  }

  /**
   * @function findDeviceById
   * Find a device by its ID
   * @returns The device document
   */
  async findDeviceById(params) {
    try {
      const { userId, deviceId, tokenKey } = params;
      const query = { userId: toObjectId(userId), deviceId, isLogin: true };
      if (tokenKey) {
        query['$or'] = [
          { accessTokenKey: tokenKey },
          { refreshTokenKey: tokenKey },
        ];
      }

      const projection = {
        sessionId: '$_id',
        accessTokenKey: 1,
        refreshTokenKey: 1,
        lastLogin: 1,
        deviceId: 1,
        deviceToken:1,
        platform: 1,
        created: 1,
      };

      return await this.findOne(query, projection);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @function findLastLoginById
   * Find the device with the latest login date
   * @returns The device document
   *
   */
  async findLastLoginById(params) {
    try {
      const { userId, deviceId, accessTokenKey } = params;
      const query = { userId, deviceId, isLogin: true };
      if (accessTokenKey) query['accessTokenKey'] = params.accessTokenKey;

      const projection = {
        accessTokenKey: 1,
        lastLogin: 1,
        deviceId: 1,
        deviceToken:1,
        platform: 1,
      };
      const option = {};
      const sortBy = { lastLogin: -1 };
      return await this.findOne(query, projection, option, sortBy);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @function updateUserSession
   */
  async updateAdminSession(sessionId: string, params: any) {
    try {
      const query: any = {};
      query._id = toObjectId(sessionId);

      const update = {};
      if (Object.values(params).length) update['$set'] = params;

      return await this.findOneAndUpdate(query, update);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @function removeAllAdminSession
   */
  async removeAllAdminSession(userId: string) {
    try {
      // const query: Record<string, any> = {};
      // query.userId = toObjectId(userId);
      // return await this.deleteMany(query);
    } catch (error) {
      throw error;
    }
  }
}
