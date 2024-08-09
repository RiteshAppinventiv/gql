import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SALT_ROUNDS } from 'src/common/constants';
import { Password } from 'src/utils';

export type UserDocument = User & Document;

@ObjectType()
@Schema()
export class User extends Document{
  @Field()
  @Prop()
  email: string;

  @Field(() => Int)
  @Prop()
  age: number;

  @Field()
  @Prop()
  password: string;

  @Prop()
  salt?: string;

  @Prop({ type: Number, default: Date.now, index: true })
  created?: number;
  
}

// export const CatSchema = SchemaFactory.createForClass(Cat);
export const USER_MODEL =
User.name;
export const UserSchema = SchemaFactory.createForClass(
    User,
);

UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = Password.generateSalt(SALT_ROUNDS);
  const hashedPassword = await Password.toHash(this.password, salt);
  this.password = hashedPassword;
  this.salt = salt;

  next();
});