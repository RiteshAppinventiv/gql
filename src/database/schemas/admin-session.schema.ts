import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SessionSchema } from './session.schema';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class AdminSessionHistory extends SessionSchema {}
export type AdminSessionHistoryDocument = AdminSessionHistory & Document;
export const ADMIN_SESSION_HISTORY_MODEL = AdminSessionHistory.name;
export const AdminSessionHistorySchema =
  SchemaFactory.createForClass(AdminSessionHistory);
