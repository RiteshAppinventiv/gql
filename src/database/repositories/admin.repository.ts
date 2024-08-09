import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { STATUS, USER_TYPE } from 'src/common/constants';
import { AbstractRepository } from 'src/providers/database/mongodb/abstract.repository';
import { escapeSpecialCharacter, toObjectId } from 'src/utils';
import { Admin, ADMIN_MODEL } from '../schemas';

@Injectable()
export class AdminRepository extends AbstractRepository<Admin> {
  protected readonly logger = new Logger(AdminRepository.name);

  constructor(
    @InjectModel(ADMIN_MODEL) userModel: Model<Admin>,
    @InjectConnection() connection: Connection,
  ) {
    super(userModel, connection);
  }

  async isEmailExist(email: string) {
    const filterQuery = { email, status: { $eq: STATUS.ACTIVE } };

    const projection = {
      createdAt: 0,
      updatedAt: 0,
    };

    return this.findOne(filterQuery, projection);
  }
  async findByEmail(email: string) {
    const filterQuery = { email };

    filterQuery['status'] = { $eq: STATUS.ACTIVE };

    const projection = {
      createdAt: 0,
      updatedAt: 0,
    };

    return this.findOne(filterQuery, projection);
  }

  async findAdminById(userId: string) {
    const filterQuery = {
      _id: toObjectId(userId),
      status: { $eq: STATUS.ACTIVE },
    };

    const projection = {
      createdAt: 0,
      updatedAt: 0,
      location: 0,
    };

    return this.findOne(filterQuery, projection);
  }

  /**
   * @function updateUserDetails
   */
  async updateAdminDetails(adminId: string, params: any) {
    try {
      const query: any = {};
      query._id = toObjectId(adminId);

      const update = {};
      if (Object.values(params).length) update['$set'] = params;

      return await this.findOneAndUpdate(query, update);
    } catch (error) {
      throw error;
    }
  }

  async changePassword(params: Auth.ChangePassword) {
    try {
      const query: any = {};
      const update: any = {};
      if (params?.userId) {
        query._id = toObjectId(params.userId);
      }

      update['$set'] = {
        password: params.password,
        salt: params.salt,
      };
      return await this.updateOne(query, update, {});
    } catch (error) {
      throw error;
    }
  }

  /**
   * @function deleteById
   */
  async deleteById(userId: string) {
    try {
      const query = { _id: toObjectId(userId) };

      const update = {
        status: STATUS.DELETED,
      };
      return await this.findOneAndUpdate(query, update);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * @function blockUnblockUser
   */
  async blockUnblockUser(userId: string, status: string) {
    try {
      const query = { _id: toObjectId(userId) };

      const update = {
        status: status,
      };
      return await this.findOneAndUpdate(query, update);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
