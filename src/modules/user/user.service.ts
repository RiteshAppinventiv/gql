import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER_MODEL, User, UserDocument } from '../../database/schemas/users.schema';
import { UserLoginType, UserRegisterType } from './user.type';
import * as jwt from 'jsonwebtoken';  // Changed to ES module import
import { UserRepository } from 'src/database/repositories/user.repository';
import { ERROR, STATUS } from 'src/common/constants';
import { Password } from 'src/utils';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectModel(USER_MODEL) private userModel: Model<UserDocument>
  ) { }

  async create(params: UserRegisterType): Promise<any> {
    try {
    const step1 = await this.userRepository.isEmailExist(params.email);
    console.log("step1step1", step1)
    if (step1) {
      throw new BadRequestException(ERROR.EMAIL_ALREADY_EXIST);
    }
    if (!step1) return this.userRepository.create(params);
  } catch (error) {
    throw error;
  }
  }
  

  async loginUser(params: UserLoginType): Promise<any> {
    const step1: any = await this.userRepository.isEmailExist(params.email);
    if (!step1) {
      throw new BadRequestException('User not found');
    }

    if (step1.status === STATUS.INACTIVE)
      throw new UnauthorizedException(ERROR.BLOCKED);
    //check password;
    const isPasswordMatch = await Password.compare(
      step1.password,
      params.password,
      step1.salt,
    );
    if (!isPasswordMatch)
      throw new BadRequestException(ERROR.INCORRECT_PASSWORD);
    if (!step1 && !isPasswordMatch)
      throw new BadRequestException(ERROR.INVALID_CREDENTIALS);
    //remove existing session of user
    // await this.removeSession({
    //   userId: step1._id,
    //   deviceId: headers['deviceid'],
    //   userType: step1.userType,
    // });
    // create login history
    // const { accessToken, refreshToken } =
    //   await this.generateLoginHistoryWithToken({
    //     result: step1,
    //     headers: headers,
    //   });

    const token = jwt.sign({ id: step1._id }, process.env.JWT_SECRET);
    return { ...step1, token };

  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
