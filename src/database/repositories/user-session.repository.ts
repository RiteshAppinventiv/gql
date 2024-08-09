import { AbstractRepository } from 'src/providers/database/mongodb/abstract.repository';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { UserSessionHistory, USER_SESSION_HISTORY_MODEL } from '../schemas';
import { toObjectId } from 'src/utils';

@Injectable()
export class UsersSessionRepository extends AbstractRepository<UserSessionHistory> {
  constructor(
    @InjectModel(USER_SESSION_HISTORY_MODEL)
    userSessionHistory: Model<UserSessionHistory>,
    @InjectConnection() connection: Connection,
  ) {
    super(userSessionHistory, connection);
  }

  async findDeviceLastLogin(params) {
    try {
      const query: any = {};
      query['userId'] = params.userId;
      if (params.deviceId) query.deviceId = params.deviceId;
      query.isLogin = false;
      const projection = { lastLogin: 1, created: 1 };
      const sort = { created: -1 };
      const response = await this.findOne(query, projection, {}, sort);
      return response ? response.lastLogin : '';
    } catch (error) {
      throw error;
    }
  }

  /**
   * @function removeDeviceById
   */
  async removeDeviceById(params) {
    try {
      const query: any = {};
      query['userId'] = toObjectId(params.userId);
      if (params.deviceId) query.deviceId = params.deviceId;
      query.isLogin = true;
      const update = {};
      update['$set'] = { isLogin: false };
      update['$unset'] = {
        deviceId: '',
        accessTokenKey: '',
        refreshTokenKey: '',
      };

      const options = { multi: true };

      return await this.updateMany(query, update, options);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @function findDeviceById
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
        platform: 1,
        created: 1,
      };
      return await this.findOne(query, projection);
    } catch (error) {
      throw error;
    }
  }
  async findUserTokenById(params) {
    try {
      const { userId } = params;
      const query = { userId: toObjectId(userId), isLogin: true };
      // if (tokenKey) {
      //   query['$or'] = [
      //     { accessTokenKey: tokenKey },
      //     { refreshTokenKey: tokenKey },
      //   ];
      // }

      const projection = {
        sessionId: '$_id',
        accessTokenKey: 1,
        refreshTokenKey: 1,
        lastLogin: 1,
        deviceId: 1,
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
   */
  async findLastLoginById(params) {
    try {
      const { userId, deviceId, tokenKey } = params;
      const query = { userId, deviceId, isLogin: true };
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
        platform: 1,
        created: 1,
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
  async updateUserSession(sessionId: string, params: any) {
    try {
      const query: any = {};
      query._id = toObjectId(sessionId);

      const update = {};
      if (Object.values(params).length) update['$set'] = params;

      return await this.updateMany(query, update);
    } catch (error) {
      throw error;
    }
  }

  // /**
  //  * @function updateUserSession
  //  */
  // async removeAllUserSession(userId: string) {
  //   try {
  //     const query: Record<string, any> = {};
  //     query.userId = toObjectId(userId);

  //     return await this.deleteMany(query);
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  /**
   * @function currentlyLoggedInDevice
   * @description return all deviceIds of user in which user currently logged in
   */
  async currentlyLoggedInDevice(userIds: Types.ObjectId[]) {
    try {
      const query = {
        userId: { $in: userIds },
        isLogin: true,
        deviceId: { $exists: true, $ne: '' },
      };

      const projection = {
        sessionId: '$_id',
        lastLogin: 1,
        deviceId: 1,
        platform: 1,
      };

      return await this.find(query, projection);
    } catch (error) {
      throw error;
    }
  }
}
