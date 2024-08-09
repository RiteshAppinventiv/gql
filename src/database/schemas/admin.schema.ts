import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  APP_ACTIONS,
  APP_RESOURCES,
  SALT_ROUNDS,
  STATUS,
  USER_TYPE,
} from 'src/common/constants';
import { Password } from 'src/utils';

@ObjectType() // GraphQL decorator
@Schema({
  timestamps: true,
  versionKey: false,
})
export class Admin extends Document {
  @Field(() => ID) // GraphQL ID field
  id: string;

  @Field({ nullable: true }) // GraphQL field
  @Prop({ index: true, trim: true })
  fullName?: string;

  @Field({ nullable: true }) // GraphQL field
  @Prop()
  profilePicture?: string;

  @Field({ nullable: true }) // GraphQL field
  @Prop({ trim: true, index: true })
  email?: string;

  @Field({ nullable: true }) // GraphQL field
  @Prop()
  countryCode?: string;

  @Field({ nullable: true }) // GraphQL field
  @Prop({ index: true, trim: true })
  phoneNo?: string;

  @Field({ nullable: true }) // GraphQL field
  @Prop()
  password?: string;

  @Field({ nullable: true }) // GraphQL field
  @Prop()
  salt?: string;

  @Field(() => String, { nullable: true }) // GraphQL field with enum type
  @Prop({
    type: String,
    enum: Object.values(USER_TYPE),
    default: USER_TYPE.ADMIN,
  })
  userType?: USER_TYPE;

  @Field(() => String, { nullable: true }) // GraphQL field with enum type
  @Prop({ type: String, enum: Object.values(STATUS), default: STATUS.ACTIVE })
  status?: string;

  @Field(() => [Permission], { nullable: true }) // GraphQL field for permissions
  @Prop({
    type: [
      {
        resource: { type: String, enum: Object.values(APP_RESOURCES) },
        actions: [{ type: String, enum: Object.values(APP_ACTIONS) }],
      },
    ],
  })
  permissions?: [{ resource: string; actions: string[] }];

  @Field({ nullable: true }) // GraphQL field
  @Prop()
  otp?: number;

  @Field({ nullable: true }) // GraphQL field
  @Prop()
  otpExpireTime?: number;

  @Field({ nullable: true }) // GraphQL field
  @Prop({ type: Number, default: Date.now, index: true })
  created?: number;
}

@ObjectType() // Define the Permission type for GraphQL
export class Permission {
  @Field(() => String)
  resource: string;

  @Field(() => [String])
  actions: string[];
}

export const ADMIN_MODEL = Admin.name;
export const AdminSchema = SchemaFactory.createForClass(Admin);

AdminSchema.pre<Admin>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = Password.generateSalt(SALT_ROUNDS);
  const hashedPassword = await Password.toHash(this.password, salt);
  this.password = hashedPassword;
  this.salt = salt;

  next();
});
