import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { STATUS } from 'src/common/constants';
import { AbstractRepository } from 'src/providers/database/mongodb/abstract.repository';
import { escapeSpecialCharacter, toObjectId } from 'src/utils';
import { User, USER_MODEL } from '../schemas';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectModel(USER_MODEL) userModel: Model<User>,
    @InjectConnection() connection: Connection,
  ) {
    super(userModel, connection);
  }

  async isEmailExist(email: string) {
    const filterQuery = { email, status: { $ne: STATUS.DELETED } };

    const projection = {
      createdAt: 0,
      updatedAt: 0,
    };

    return this.findOne(filterQuery, projection);
  }
  async findByEmail(email: string) {
    const filterQuery = { email };

    filterQuery['status'] = { $ne: STATUS.DELETED };

    const projection = {
      createdAt: 0,
      updatedAt: 0,
    };

    return this.findOne(filterQuery, projection);
  }


  /**
   * @function updateUserDetails
   */
  async updateUserDetails(userId: string, params: any) {
    try {
      const query: any = {};
      query._id = toObjectId(userId);

      const update = {};
      if (Object.values(params).length) update['$set'] = params;

      return await this.findOneAndUpdate(query, update);
    } catch (error) {
      throw error;
    }
  }

  async changePassword(params: any) {
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

  async findUserById(userId: string) {
    const filterQuery = {
      _id: toObjectId(userId),
    };
    const projection = {
      createdAt: 0,
      updatedAt: 0,
    };

    const populateQuery = undefined;
    // {
    //   path: 'interests',
    //   select: 'name',
    // };
    const options = {
      lean: true,
    };
    const sort = {};

    return this.findOne(filterQuery, projection, options, sort, populateQuery);
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

  async userList(params: any) {
    try {
      const { limit, pageNo } = params;
      const aggPipe = [];
      // Stage 1: Match documents based on search criteria
      const match: any = {};

      if (params.searchKey) {
        params.searchKey = escapeSpecialCharacter(params.searchKey);

        match['$or'] = [
          { fullName: { $regex: params.searchKey, $options: 'i' } },
          { email: { $regex: params.searchKey, $options: 'i' } },
          { roleName: { $regex: params.searchKey, $options: 'i' } },
        ];
      }
      if (params.fromDate && !params.toDate)
        match.created = { $gte: params.fromDate };
      if (params.toDate && !params.fromDate)
        match.created = { $lte: params.toDate };
      if (params.fromDate && params.toDate)
        match.created = { $gte: params.fromDate, $lte: params.toDate };

      if (params.status)
        match.status = { $ne: STATUS.DELETED, $in: params.status };
      else match.status = { $ne: STATUS.DELETED };
      aggPipe.push({ $match: match });
      // Stage 2: Sort documents
      let sort = {};
      params.sortBy && params.sortOrder
        ? (sort = { [params.sortBy]: params.sortOrder })
        : (sort = { createdAt: -1 });
      aggPipe.push({ $sort: sort });

      if (limit && pageNo) {
        // Stage 3: Add skip and limit
        const [skipStage, limitStage] = this.addSkipLimit(limit, pageNo);
        aggPipe.push(skipStage, limitStage);
      }

      const options = { collation: true };

      const project: any = {
        updatedAt: 0,
        otp: 0,
        password: 0,
        salt: 0,
        otpExpireTime: 0,
      };
      // Stage 4: Project selected fields
      aggPipe.push({
        $project: project,
      });

      const pageCount = true;
      return await this.paginate(
        aggPipe,
        params.limit,
        params.pageNo,
        options,
        pageCount,
      );
    } catch (error) {
      throw error;
    }
  }
}
