import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongoConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    // console.log(this.configService.get('MONGO'),'lllllllllllllllllllllll')
    const MONGO = this.configService.get('MONGO');
    const { DB_URL } = MONGO;
    const uri = `${DB_URL}`;
    return { uri };
  }
}
