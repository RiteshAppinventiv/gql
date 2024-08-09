import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DEVICE_TYPE, USER_TYPE } from 'src/common/constants';

@ObjectType() // GraphQL decorator
@Schema({
  timestamps: true,
  versionKey: false,
})
export class SessionSchema {
  @Field(() => ID) // GraphQL ID field
  @Prop({ type: Types.ObjectId })
  userId: Types.ObjectId;

  @Field({ nullable: true }) // GraphQL field
  @Prop()
  fullName?: string;

  @Field() // GraphQL field
  @Prop()
  email: string;

  @Field(() => String) // GraphQL field with enum type
  @Prop({ type: String, enum: Object.values(USER_TYPE) })
  userType: string;

  @Field() // GraphQL field
  @Prop()
  status: string;

  @Field() // GraphQL field
  @Prop()
  accessTokenKey: string;

  @Field() // GraphQL field
  @Prop()
  refreshTokenKey: string;

  @Field({ nullable: true }) // GraphQL field
  @Prop()
  isLogin?: boolean;

  @Field({ nullable: true }) // GraphQL field
  @Prop()
  lastLogin?: number;

  @Field({ nullable: true }) // GraphQL field
  @Prop()
  remoteAddress?: string;

  @Field() // GraphQL field
  @Prop()
  deviceToken: string;
  
  @Field() // GraphQL field
  @Prop()
  deviceId: string;

  @Field(() => String) // GraphQL field with enum type
  @Prop({ type: String, enum: Object.values(DEVICE_TYPE) })
  platform: DEVICE_TYPE;

  @Field({ nullable: true }) // GraphQL field
  @Prop()
  timezone?: string;

  @Field({ nullable: true }) // GraphQL field
  @Prop()
  language?: string;

  @Field() // GraphQL field
  @Prop()
  created: number;
}

export const SessionSchemaSchema = SchemaFactory.createForClass(SessionSchema);
