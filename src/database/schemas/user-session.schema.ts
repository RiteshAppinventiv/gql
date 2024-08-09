import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SessionSchema } from './session.schema';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class UserSessionHistory extends SessionSchema {}
export type UserSessionHistoryDocument = UserSessionHistory & Document;
export const USER_SESSION_HISTORY_MODEL = UserSessionHistory.name;
export const UserSessionHistorySchema =
  SchemaFactory.createForClass(UserSessionHistory);
