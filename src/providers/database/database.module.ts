import { Module } from '@nestjs/common';
import { MongoDBServiceModule } from './mongodb/mongodb.module';

@Module({
  imports: [MongoDBServiceModule],
  exports: [MongoDBServiceModule],
})
export class DataBaseModule {}
