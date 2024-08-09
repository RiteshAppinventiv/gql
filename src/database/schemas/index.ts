
import { USER_MODEL, UserSchema } from './users.schema';
import { USER_SESSION_HISTORY_MODEL, UserSessionHistorySchema } from './user-session.schema';
import { AdminSessionHistorySchema, ADMIN_SESSION_HISTORY_MODEL, } from './admin-session.schema';
import { ADMIN_MODEL, AdminSchema } from './admin.schema';

export const MODELS = [
    { name: USER_MODEL, schema: UserSchema },
    { name: USER_SESSION_HISTORY_MODEL, schema: UserSessionHistorySchema },
    { name: ADMIN_SESSION_HISTORY_MODEL, schema: AdminSessionHistorySchema },
    { name: ADMIN_MODEL, schema: AdminSchema },
]

export * from './admin-session.schema';
export * from './admin.schema';
export * from './users.schema';
export * from './user-session.schema';
