import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigService } from './mongodb-config.service';
import { MODELS } from 'src/database/schemas';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature(MODELS),
  ],
  exports: [MongooseModule],
})
export class MongoDBServiceModule {}
