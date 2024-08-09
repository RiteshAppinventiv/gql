export const SWAGGER = {
  PATH: 'api-docs',
  TITLE: 'Rcc Admin APIs',
  DESCRIPTION: 'APIs Documentation for Rcc App.',
  VERSION: '1.0',
  AUTH_TYPE: 'basic',
  Add_API_KEY: {
    NAME: 'Authorization',
    IN: 'header',
  },
};

export const API_PREFIX = '/admin/api/v1';

export const STATUS = {
  INACTIVE: 'INACTIVE',
  ACTIVE: 'ACTIVE',
  DELETED: 'DELETED',
  BLOCKED: 'BLOCKED',
  AUTO_DELETE: "AUTO_DELETE"
};

export const COUPON_TYPE = {
  PUBLIC: 'Public',
  PRIVATE: 'Private'
};

export const COUPON_DISCOUNT_TYPE = {
  PERCENTAGE: 'Percentage',
  FLAT: 'Flat'
};

export const CHALLENGE_STATUS = {
  INACTIVE: 'INACTIVE',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  DELETED: 'DELETED',
  BLOCKED: 'BLOCKED',
};

export const PUBLISH_TYPES = {
  SAVE_AS_DRAFT: 'Save as Draft',
  PUBLISHED: 'Published',
};


export const REQUESTED_FORM_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  DECLINED: 'DECLINED',
  DELETED: 'DELETED',
};

export const FEED_TYPE = {
  FEED: 'Feed',
  SHORT_VIDEO: 'Short Video'
};

export enum REQUESTED_FORM_ENUM {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  DELETED = 'DELETED',
};



export const IN_STATUS = {
  INACTIVE: 'INACTIVE',
  ACTIVE: 'ACTIVE',
  BLOCKED: 'BLOCKED',
};

export const E_MEDIA_TYPE = {
  VIDEO: 'Video',
  DOCUMENT: 'Document',
  LINK: 'Link',
};

export const SAVE_FORM = {
  SAVE: 'Save',
  SUBMIT: 'Submit',
};

export const MSI_TYPE = {
  FORCE: 'Force',
  OPTIONAL: 'Optional'
};

export const PLATFORM = {
  ANDROID: 'Android',
  IOS: 'IOS'
};


export const FAQ_CATEGORIES = {
  GENERAL: 'General',
  SECURITY: 'Security',
  DATA_MANAGEMENT: 'Data Management',
  CLIENT_ENGAGEMENT: 'Client Engagement',
  WORKFLOW: 'Workflow',
  INTEGRATIONS: 'Integrations',
  PAYMENTS_ACCOUNT_SUBSCRIPTION: 'Payments, Account, and Subscription',
  SCHEDULING: 'Scheduling',
  USER_ACCESS: 'User Access'
};


export const FAQ_ORDER = ["General",
  "Security",
  "Data Management",
  "Client Engagement",
  "Workflow",
  "Integrations",
  "Payments, Account, and Subscription",
  "Scheduling",
  "User Access"]

export const SAVE_CHART_VISIT_FORM = {
  SAVE: 'Save',
  SUBMIT: 'Submit',
  SEND: 'Send'
};

export const MEDIA_TYPES = {
  FORM: 'Form'
}

export const CATEGORY = {
  WAIVERS: 'Waivers',
  VIATL_SIGNS: 'Vital Signs & More',
  QUESTIONNAIRE: 'Questionnaire',
  MEDICAL_HISTORY: 'Medical History',
  LIFYSTYLE_TRACKER: 'Lifestyle Tracker',
  INTAKE_FORMS: 'Intake Forms',
  TREATMENT_PLAN_AND_PROTOCOLS: 'Treatement Plan & Protocols',
  HEALTHY_RECOMMENDATION: 'Healthy Recommendation',
  EDUCATIONAL_MEDIA: 'Educational Media',
  DIET_TRACKER: 'Diet Tracker',
  CHART_VISIT_NOTES: 'Chart Visit Notes',
  TO_DO_LIST: 'To-Do list',
  MY_REQUESTED_FORMS: 'My Requested Forms'
};

export const REACH_LIMIT_TYPE = {
  STEPS: 'Steps',
  CALORIES: 'Calories',
  DISTANCE: 'Distance',
};

export const HEALTHY_RECOMMENDATION_ENUM = {
  NUTRITION: 'Nutrition',
  LIFESTYLE: 'Lifestyle',
  YOGA: 'Yoga',
  HERBS: 'Herbs',
  EXERCISE: 'Exercise',
  BODYWORK: 'Bodywork',
  OTHERS: 'Others',
};

export const EVENTS = {
  USER_CREATED: 'user:created',
  ADMIN_PUSH_NOTIFICATION: 'admin_push_notification',
  MATCH_FOUND: 'MATCH_FOUND',
  SUPERLIKE: 'SUPERLIKE',
  REJECT: 'REJECT',
  BOOST: 'BOOST',
  LIKE: 'LIKE',
  BOOST_REFRESHED: 'BOOST_REFRESHED',
  SWIPE_AGAIN: 'SWIPE_AGAIN',
  PROFILE_VERIFIED: 'PROFILE_VERIFIED',
  CHAT_NOTIFICATION: 'CHAT_NOTIFICATION',
  GROUP_CHAT_NOTIFICATION: 'GROUP_CHAT_NOTIFICATION',
};

export const VALIDATION_CRITERIA = {
  FIRST_NAME_MIN_LENGTH: 3,
  FIRST_NAME_MAX_LENGTH: 10,
  MIDDLE_NAME_MIN_LENGTH: 3,
  MIDDLE_NAME_MAX_LENGTH: 10,
  LAST_NAME_MIN_LENGTH: 3,
  LAST_NAME_MAX_LENGTH: 10,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  COUNTRY_CODE_MIN_LENGTH: 1,
  COUNTRY_CODE_MAX_LENGTH: 5,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 20,
  PHONE_NO_MAX_LENGTH: 13,
  PHONE_NO_MIN_LENGTH: 5,
  LATITUDE_MIN_VALUE: -90,
  LATITUDE_MAX_VALUE: 90,
  LONGITUDE_MIN_VALUE: -180,
  LONGITUDE_MAX_VALUE: 180,
  TITLE_MAX_VALUE: 50,
  DESCRIPTION_MAX_VALUE: 200,
};

export const EMAIL_TEMPLATE = {
  TITLE: 'Rcc',
  APP_LOGO:
    'https://appinventiv-development.s3.amazonaws.com/1607946234266_Sqlv5.svg',
  SOCIAL_LINK: {
    FB: 'https://www.facebook.com',
    INSTAGRAM: 'https://www.instagram.com',
    TWITTER: 'https://twitter.com',
  },
  SUBJECT: {
    ACCOUNT_BLOCKED: 'Account Blocked',
    CONTACT_US: 'Help & Support ',
    FORGOT_PASSWORD: 'Reset Password Request',
    INVITE: 'Invitation for Rcc!',
    RESET_PASSWORD: 'Reset password link',
    RESEND_OTP: 'Resend Otp Request',
    RESEND_EMAIL: 'Resend Email Request',
    SUBADMIN_ACCOUNT_DETAILS: 'Your Sub admin Account Details',
    SUBADMIN_EMAIL_CHANGE: ' Your email has been updated',
    VERIFY_OTP: 'Verify Otp',
    VERIFICATION_REJECTED: 'Verification Process Rejected',
    VERIFY_EMAIL: 'Verify email address',
    VERIFY_UPDATED_EMAIL: 'Verify Your Updated Email Address',
    VERIFY_UPDATED_PHONE: 'Verify Your Updated Phone Number',
    WELCOME: 'Welcome to Rcc!',
    GENERAL_QUERY_EMAIL: 'General Query',
    PATIENT_ACCOUNT_DETAILS: 'Your Account Details',
  },
  BCC_MAIL: ['rcc@gmail.com'],
  FROM_MAIL: 'developer@yopmail.com',
};
export const MAIL_SENDING_TYPE = {
  SENDGRID: 1,
  SMTP: 2,
  AMAZON: 3,
};

export const SMS_SENDING_TYPE = {
  TWILIO: 1,
  AWS_SDK: 2,
};

export const CONTENT_TYPE = {
  PRIVACY_POLICY: 'Privacy Policy',
  TERMS_AND_CONDITIONS: 'Terms & Condition',
  COMMUNITY_GUIDELINES: 'Community Guidelines',
  DATA_POLICY: 'Data Policy',
  COPYRIGHT_POLICY: 'Copyright Policy',
  ABOUT_US: 'About Us'
};

export const MIME_TYPE = {
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  CSV1: 'application/vnd.ms-excel',
  CSV2: 'text/csv',
  CSV3: 'data:text/csv;charset=utf-8,%EF%BB%BF',
  XLS: 'application/vnd.ms-excel',
};

export const REGEX = {
  EMAIL: /^\w+([.-]\w+)*@\w+([.-]\w+)*\.\w{2,5}$/i,
  URL: /^(https?|http|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i,
  SSN: /^(?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/, // US SSN
  ZIP_CODE: /^[0-9]{5}(?:-[0-9]{4})?$/,
  PASSWORD:
    /(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=.*[@#$%^&+=_?&%$!~./+-:;])(?=[^0-9]*[0-9]).{8,20}$/, // Minimum 8 characters, At least 1 lowercase alphabetical character, At least 1 uppercase alphabetical character, At least 1 numeric character, At least one special character
  COUNTRY_CODE: /^\d{1,4}$/,
  MOBILE_NUMBER: /^\d{6,16}$/,
  STRING_REPLACE: /[-+ ()*_$#@!{}|\/^%`~=?,.<>:;'"]/g,
  SEARCH: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
  MONGO_ID: /^[a-f\d]{24}$/i,
  DOBRegex: /^(\d{2})\/(\d{2})\/(\d{4})$/,
};

export const VERSION_UPDATE_TYPE = {
  NORMAL: 'NORMAL',
  FORCEFULLY: 'FORCEFULLY',
};

export const NOTIFICATION_TYPE = {
  ALL: 'ALL',
  ORDER_APPLIED: 'ORDER_APPLIED',
  ORDER_REJECTED: 'ORDER_REJECTED',
  SOCIAL_NOTIFICATION: 'SOCIAL_NOTIFICATION',
  PROMO_OFFERS: 'PROMO_OFFERS',
};

export const GRAPH_TYPE = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY',
};

export const MONTHS = [
  { index: 1, day: 31, week: 5 },
  { index: 2, day: 28, week: 4 },
  { index: 2, day: 29, week: 5 },
  { index: 3, day: 31, week: 5 },
  { index: 4, day: 30, week: 5 },
  { index: 5, day: 31, week: 5 },
  { index: 6, day: 30, week: 5 },
  { index: 7, day: 31, week: 5 },
  { index: 8, day: 31, week: 5 },
  { index: 9, day: 30, week: 5 },
  { index: 10, day: 31, week: 5 },
  { index: 11, day: 30, week: 5 },
  { index: 12, day: 31, week: 5 },
];

export const MONTH_NAME = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const WEEK_NAME = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const LANGUAGES = ['en', 'hi'];

export const TOKEN_TYPE = {
  USER_LOGIN: 'USER_LOGIN', // login/signup
  ADMIN_LOGIN: 'ADMIN_LOGIN',
  OTP_VERIFY: 'OTP_VERIFY',
  FORGOT_EMAIL: 'FORGOT_EMAIL',
};

export const timeZones = ['IST'];

export const DISTANCE_MULTIPLIER = {
  MILE_MULTIPLIER: 0.0006213727366498,
  KM_TO_MILE: 0.621372737,
  MILE_TO_METER: 1609.34,
  METER_TO_MILE: 0.000621371,
  METER_TO_KM: 0.001,
};

export const fileUploadExts = [
  '.mp4',
  '.flv',
  '.mov',
  '.avi',
  '.wmv',
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.svg',
  '.mp3',
  '.aac',
  '.aiff',
  '.m4a',
  '.ogg',
];

export const MEDIA_TYPE = {
  IMAGE: 'IMAGE',
  AUDIO: 'AUDIO',
  TEXT: 'TEXT',
};

export const SALT_ROUNDS = 10;

export const userType = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  SUBADMIN: 'SUB_ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  PATIENT: 'PATIENT',
  CLINICIAN: 'CLINICIAN',
};

export const FORM_MODULE = {
  WAIVERS: 'Waivers',
  VIATL_SIGNS: 'Vital Signs & More',
  QUESTIONNAIRE: 'Questionnaire',
  MEDICAL_HISTORY: 'Medical History',
  LIFYSTYLE_TRACKER: 'Lifestyle Tracker',
  INTAKE_FORMS: 'Intake Forms',
  CHART_VISIT_NOTES: 'Chart Visit Notes',
  TREATMENT_PLAN_AND_PROTOCOLS: 'Treatement Plan & Protocols'
};

export const QUEUES = {
  DELAY_NON_DELAY: "delay-non-delay",
  EMAIL_QUEUE: 'email-queue',
  NOTIFICATION_QUEUE: 'notification-queue',
  TASKS_SCHEDULER_QUEUE: 'tasksSchedulerQueue',
  UNDELIVERED_MESSAGE_QUEUE: 'undeliveredMessageQueue',
  FILE_UPLOAD: 'file-upload',
  PUSH_NOTIFIACTION_IOS: "-push-notification-ios-v4",
  PUSH_NOTIFIACTION_ANDROID: "-push-notification-android-v4",
  PUSH_NOTIFIACTION_WEB: "-push-notification-web-v4",
  DATABASE_INSERT: "-data-base-insertion-v1",
  CHALLENGE_QUEUE: 'challengeQUeue'

};
export const QUEUE_JOBS = {
  SENDGRID: 'sendgrid',
  SMTP: 'smtp',
  UPLOAD: 'upload',
  CHALLENGE_END: 'challengeEnd'
};

export enum APP_RESOURCES {
  DASHBOARD = 'dashboard',
  USER_MANAGEMENT = 'user_management',
  CLINICIAN_MANAGEMENT = 'clinician_management',
  INTRO_SCREEN_MANAGEMENT = 'intro_screen_management',
  REPORT_MANAGEMENT = 'report_management',
  STATIC_CONTENT_MANAGEMENT = 'static_content_management',
  INTEREST_MANAGEMENT = 'interest_management',
  SUBADMIN_MANAGEMENT = 'subadmin_management',
  SUBSCRIPTION_MANAGEMENT = 'subscription_management',
  NOTIFICATION_MANAGEMENT = 'notification_management',
}

export const ADMIN_APP_RESOURCES = {
  CLINICIAN: "Clinician Management",
  PATIENT: "Patient",
  APPOINTMENT: "Appointment Management",
  CATEGORY: "Category Management",
  CHART_VISIT: "Chart Visit Notes",
  DIET_TRACKER_MANAGEMENT: "Diet Tracker Management",
  INTAKE_FORM: "Intake Form Management",
  LIFESTYLE: "Lifestyle Tracker",
  MEDICAL: "Medical History",
  QUESTIONNAIRE: "Questionnaire",
  TREATMENT_PLAN: "Treatment Plan and Protocol",
  TRANSACTION: "Transaction Management",
  VITAL_SIGN: "Vital Signs",
  WAIVER: "Waiver Management",
  EDUCATIONAL_MEDIA: "Educational Media",
  HEALTHY_RECOMMENDATION: "Healthy Recommendation",
  STATIC_CONTENT: "Static Content Management",
  NOTIFICATION: "Notification Management",
  EARNING: "Earning Management",
  REQUESTED_FORMS: "Requested Form Management",
  SUBSCRIPTION_PLAN: "Subscription Plan Management",
  ROLES_PERMISSION: "Roles & Permissions Management",
  REPORTED_CONTENT: "Reported Content Management",
  CHALLENGE_PERMISSION: 'Challenge/Task Management',
  VERSION: 'Version Management',
  COUPON_MANAGEMENT: 'Coupon Management'
};

export enum ADMIN_APP_ACTIONS {
  ALL = 'all',
  ADD = 'add',
  EDIT = 'edit',
  VIEW = 'view',
  LIST_ACTIONS = 'listActions',
}

export enum APP_ACTIONS {
  READ = 'read',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export const REDIS_KEY_PREFIX = {
  EXPIRE_OTP_TIME: 90,
  VERIFY_OTP: "VERIFY_OTP",
  EXPIRE_KEY: "EXPIRE_KEY"
};

export const PERMISSION = {
  VIEW_REQ_FORMS: `${ADMIN_APP_RESOURCES.REQUESTED_FORMS}:${ADMIN_APP_ACTIONS.VIEW}`,
  EDIT_REQ_FORMS: `${ADMIN_APP_RESOURCES.REQUESTED_FORMS}:${ADMIN_APP_ACTIONS.EDIT}`,
  ACTION_REQ_FORMS: `${ADMIN_APP_RESOURCES.REQUESTED_FORMS}:${ADMIN_APP_ACTIONS.LIST_ACTIONS}`,

  VIEW_REPORTED_CONTENT: `${ADMIN_APP_RESOURCES.REPORTED_CONTENT}:${ADMIN_APP_ACTIONS.VIEW}`,
  EDIT_REPORTED_CONTENT: `${ADMIN_APP_RESOURCES.REPORTED_CONTENT}:${ADMIN_APP_ACTIONS.EDIT}`,
  ACTION_REPORTED_CONTENT: `${ADMIN_APP_RESOURCES.REPORTED_CONTENT}:${ADMIN_APP_ACTIONS.LIST_ACTIONS}`,

  VIEW_SUBADMIN: `${ADMIN_APP_RESOURCES.ROLES_PERMISSION}:${ADMIN_APP_ACTIONS.VIEW}`,
  ADD_SUBADMIN: `${ADMIN_APP_RESOURCES.ROLES_PERMISSION}:${ADMIN_APP_ACTIONS.ADD}`,
  ACTION_SUBADMIN: `${ADMIN_APP_RESOURCES.ROLES_PERMISSION}:${ADMIN_APP_ACTIONS.LIST_ACTIONS}`,
  EDIT_SUBADMIN: `${ADMIN_APP_RESOURCES.ROLES_PERMISSION}:${ADMIN_APP_ACTIONS.EDIT}`,

  ADD_CHALLENGE: `${ADMIN_APP_RESOURCES.CHALLENGE_PERMISSION}:${ADMIN_APP_ACTIONS.ADD}`,
  EDIT_CHALLENGE: `${ADMIN_APP_RESOURCES.CHALLENGE_PERMISSION}:${ADMIN_APP_ACTIONS.EDIT}`,
  ACTION_CHALLENGE: `${ADMIN_APP_RESOURCES.CHALLENGE_PERMISSION}:${ADMIN_APP_ACTIONS.LIST_ACTIONS}`,
  VIEW_CHALLENGE: `${ADMIN_APP_RESOURCES.CHALLENGE_PERMISSION}:${ADMIN_APP_ACTIONS.VIEW}`,

  ADD_NOTIFICATION: `${ADMIN_APP_RESOURCES.NOTIFICATION}:${ADMIN_APP_ACTIONS.ADD}`,
  EDIT_NOTIFICATION: `${ADMIN_APP_RESOURCES.NOTIFICATION}:${ADMIN_APP_ACTIONS.EDIT}`,
  VIEW_NOTIFICATION: `${ADMIN_APP_RESOURCES.NOTIFICATION}:${ADMIN_APP_ACTIONS.VIEW}`,
  ACTION_NOTIFICATION: `${ADMIN_APP_RESOURCES.NOTIFICATION}:${ADMIN_APP_ACTIONS.LIST_ACTIONS}`,

  ADD_ROLE: `${ADMIN_APP_RESOURCES.ROLES_PERMISSION}:${ADMIN_APP_ACTIONS.ADD}`,
  EDIT_ROLE: `${ADMIN_APP_RESOURCES.REQUESTED_FORMS}:${ADMIN_APP_ACTIONS.EDIT}`,
  VIEW_ROLE: `${ADMIN_APP_RESOURCES.REQUESTED_FORMS}:${ADMIN_APP_ACTIONS.VIEW}`,
  ACTION_ROLE: `${ADMIN_APP_RESOURCES.REQUESTED_FORMS}:${ADMIN_APP_ACTIONS.LIST_ACTIONS}`,

  ADD_SUBS: `${ADMIN_APP_RESOURCES.SUBSCRIPTION_PLAN}:${ADMIN_APP_ACTIONS.ADD}`,
  EDIT_SUBS: `${ADMIN_APP_RESOURCES.SUBSCRIPTION_PLAN}:${ADMIN_APP_ACTIONS.EDIT}`,
  VIEW_SUBS: `${ADMIN_APP_RESOURCES.SUBSCRIPTION_PLAN}:${ADMIN_APP_ACTIONS.VIEW}`,
  ACTION_SUBS: `${ADMIN_APP_RESOURCES.SUBSCRIPTION_PLAN}:${ADMIN_APP_ACTIONS.LIST_ACTIONS}`,

  ADD_EARNINGS: `${ADMIN_APP_RESOURCES.EARNING}:${ADMIN_APP_ACTIONS.ADD}`,
  EDIT_EARNINGS: `${ADMIN_APP_RESOURCES.EARNING}:${ADMIN_APP_ACTIONS.EDIT}`,
  VIEW_EARNINGS: `${ADMIN_APP_RESOURCES.EARNING}:${ADMIN_APP_ACTIONS.VIEW}`,
  ACTION_EARNINGS: `${ADMIN_APP_RESOURCES.EARNING}:${ADMIN_APP_ACTIONS.LIST_ACTIONS}`,

  ADD_CLINICIAN: `${ADMIN_APP_RESOURCES.CLINICIAN}:${ADMIN_APP_ACTIONS.ADD}`,
  EDIT_CLINICIAN: `${ADMIN_APP_RESOURCES.CLINICIAN}:${ADMIN_APP_ACTIONS.EDIT}`,
  VIEW_CLINICIAN: `${ADMIN_APP_RESOURCES.CLINICIAN}:${ADMIN_APP_ACTIONS.VIEW}`,
  ACTION_CLINICIAN: `${ADMIN_APP_RESOURCES.CLINICIAN}:${ADMIN_APP_ACTIONS.LIST_ACTIONS}`,

  ADD_PATIENT: `${ADMIN_APP_RESOURCES.PATIENT}:${ADMIN_APP_ACTIONS.ADD}`,
  EDIT_PATIENT: `${ADMIN_APP_RESOURCES.PATIENT}:${ADMIN_APP_ACTIONS.EDIT}`,
  VIEW_PATIENT: `${ADMIN_APP_RESOURCES.PATIENT}:${ADMIN_APP_ACTIONS.VIEW}`,
  ACTION_PATIENT: `${ADMIN_APP_RESOURCES.PATIENT}:${ADMIN_APP_ACTIONS.LIST_ACTIONS}`,

  ADD_APPOINTMENT: `${ADMIN_APP_RESOURCES.APPOINTMENT}:${ADMIN_APP_ACTIONS.ADD}`,
  EDIT_APPOINTMENT: `${ADMIN_APP_RESOURCES.APPOINTMENT}:${ADMIN_APP_ACTIONS.EDIT}`,
  VIEW_APPOINTMENT: `${ADMIN_APP_RESOURCES.APPOINTMENT}:${ADMIN_APP_ACTIONS.VIEW}`,
  ACTION_APPOINTMENT: `${ADMIN_APP_RESOURCES.APPOINTMENT}:${ADMIN_APP_ACTIONS.LIST_ACTIONS}`,

  ADD_CATEGORY: `${ADMIN_APP_RESOURCES.CATEGORY}:${ADMIN_APP_ACTIONS.ADD}`,
  EDIT_CATEGORY: `${ADMIN_APP_RESOURCES.CATEGORY}:${ADMIN_APP_ACTIONS.EDIT}`,
  VIEW_CATEGORY: `${ADMIN_APP_RESOURCES.CATEGORY}:${ADMIN_APP_ACTIONS.VIEW}`,
  ACTION_CATEGORY: `${ADMIN_APP_RESOURCES.CATEGORY}:${ADMIN_APP_ACTIONS.LIST_ACTIONS}`,


  VIEW_CONTENT: `${ADMIN_APP_RESOURCES.STATIC_CONTENT}:${ADMIN_APP_ACTIONS.VIEW}`,

  VIEW_HEALTHY_RECOMM: `${ADMIN_APP_RESOURCES.HEALTHY_RECOMMENDATION}:${ADMIN_APP_ACTIONS.VIEW}`,

  VIEW_EDUCATION_MEDIA: `${ADMIN_APP_RESOURCES.EDUCATIONAL_MEDIA}:${ADMIN_APP_ACTIONS.VIEW}`,


  // UPDATE_DASHBOARD: `${ADMIN_APP_RESOURCES.DASHBOARD}:${APP_ACTIONS.UPDATE}`,
  // VIEW_USER: `${ADMIN_APP_RESOURCES.USER_MANAGEMENT}:${APP_ACTIONS.READ}`,
  // CREATE_USER: `${ADMIN_APP_RESOURCES.USER_MANAGEMENT}:${APP_ACTIONS.CREATE}`,
  // UPDATE_USER: `${ADMIN_APP_RESOURCES.USER_MANAGEMENT}:${APP_ACTIONS.UPDATE}`,
  // DELETE_USER: `${ADMIN_APP_RESOURCES.USER_MANAGEMENT}:${APP_ACTIONS.DELETE}`,
  // VIEW_INTRO_SCREEN: `${ADMIN_APP_RESOURCES.INTRO_SCREEN_MANAGEMENT}:${APP_ACTIONS.READ}`,
  // CREATE_INTRO_SCREEN: `${ADMIN_APP_RESOURCES.INTRO_SCREEN_MANAGEMENT}:${APP_ACTIONS.CREATE}`,
  // UPDATE_INTRO_SCREEN: `${ADMIN_APP_RESOURCES.INTRO_SCREEN_MANAGEMENT}:${APP_ACTIONS.UPDATE}`,
  // DELETE_INTRO_SCREEN: `${ADMIN_APP_RESOURCES.INTRO_SCREEN_MANAGEMENT}:${APP_ACTIONS.DELETE}`,
  // VIEW_INTEREST: `${ADMIN_APP_RESOURCES.INTEREST_MANAGEMENT}:${APP_ACTIONS.READ}`,
  // CREATE_INTEREST: `${ADMIN_APP_RESOURCES.INTEREST_MANAGEMENT}:${APP_ACTIONS.CREATE}`,
  // UPDATE_INTEREST: `${ADMIN_APP_RESOURCES.INTEREST_MANAGEMENT}:${APP_ACTIONS.UPDATE}`,
  // DELETE_INTEREST: `${ADMIN_APP_RESOURCES.INTEREST_MANAGEMENT}:${APP_ACTIONS.DELETE}`,
  // VIEW_SUBADMIN: `${ADMIN_APP_RESOURCES.SUBADMIN_MANAGEMENT}:${APP_ACTIONS.READ}`,
  // CREATE_SUBADMIN: `${ADMIN_APP_RESOURCES.SUBADMIN_MANAGEMENT}:${APP_ACTIONS.CREATE}`,
  // UPDATE_SUBADMIN: `${ADMIN_APP_RESOURCES.SUBADMIN_MANAGEMENT}:${APP_ACTIONS.UPDATE}`,
  // DELETE_SUBADMIN: `${ADMIN_APP_RESOURCES.SUBADMIN_MANAGEMENT}:${APP_ACTIONS.DELETE}`,
  // VIEW_REPORT: `${ADMIN_APP_RESOURCES.REPORT_MANAGEMENT}:${APP_ACTIONS.READ}`,
  // CREATE_REPORT: `${ADMIN_APP_RESOURCES.REPORT_MANAGEMENT}:${APP_ACTIONS.CREATE}`,
  // UPDATE_REPORT: `${ADMIN_APP_RESOURCES.REPORT_MANAGEMENT}:${APP_ACTIONS.UPDATE}`,
  // DELETE_REPORT: `${ADMIN_APP_RESOURCES.REPORT_MANAGEMENT}:${APP_ACTIONS.DELETE}`,
  // VIEW_CLINICIAN: `${ADMIN_APP_RESOURCES.CLINICIAN_MANAGEMENT}:${APP_ACTIONS.READ}`,
};

export const JOB_SCHEDULE_TIME = {
  BOOST_EXPIRATION: 12 * 60 * 60 * 1000, //12 hour
  CHECK_RESET_LIKE_COUNT: 1 * 60 * 60 * 1000, //1 hour
  CHECK_USER_INACTIVE_COUNT: '0 11 * * *', // Run at 10 AM every day,
  MIDNIGHT_CRON: '1 0 * * *', //12:01 midnight
  EVERY_IST_OF_MONTH: '0 0 1 * *', // EVERY 1st day of month
  //for testing
  // BOOST_EXPIRATION: 5 * 60 * 1000, //10 min
  // CHECK_RESET_LIKE_COUNT: 2 * 60 * 1000, //1 hour
  // MIDNIGHT_CRON: '*/2 * * * *', //every 2 minute midnight
  // EVERY_IST_OF_MONTH: '*/10 * * * *', //  every 30 min day of month
};

export const FREE_USER = {
  DEFAULT_LIKES: 25,
  DEFAULT_SUPERLIKE: 1,
};
export const DEEPLINK = {
  DEFAULT_FALLBACK_URL: 'https://www.google.com',
  // for android deeplink
  ANDROID_SCHEME: 'com.golff.buddy://', // scheme:// + app url + ?token=&type=
  // for ios user deeplink
  IOS_SCHEME: 'com.golff.buddy.app://', // ustandbyuser:///appointment@token=&status=
  // for ios sp deeplink
  IOS_STORE_LINK: 'itms-apps://itunes.apple.com/app/id6443873802',
  APP_STORE_LINK: 'https://www.apple.com/in/app-store/',
  ANDROID_PACKAGE_NAME: 'com.golff.buddy', // when app is not installed redirect to google playstore
};
export const defaultOTP = 1234;

export const HEALTHY_RECOMMENDATION = {
  ALL: 'ALL',
  CLINICIAN: 'CLINICIAN',
};


export const AUDIENCE = {
  ALL: 'ALL',
  CLINICIAN: 'CLINICIAN',
  PATIENT: 'PATIENT'
};

export const NOTIFICATION_STATUS = {
  SENT: 'Sent',
  PENDING: 'Pending',
};

export const AWS_SECRET_MANGER = {
  REGION: 'us-east-1',
  SECRET_NAME: `Rcc/${process.env['NODE_ENV']}-env`
};

export const FILTER_MEDIA = {
  VIDEO: 'Video',
  OTHER: 'Other',
  ALL: 'All'
}

export const APPOINTMENT_STATUS_ENUM = {
  UPCOMING: 'UPCOMING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NOW: 'NOW',
  PENDING: 'PENDING',
  NO_SHOW: 'NO_SHOW'
};

export const APPOINTMENT_STATUS = {
  ACCEPT: 'ACCEPTED',
  RESCHEDULE: 'RE_SCHEDULED',
  RE_SCHEDULED_BY_CLINICIAN: 'RE_SCHEDULED_BY_CLINICIAN',
  RE_SCHEDULED_BY_PATIENT: 'RE_SCHEDULED_BY_PATIENT',
  CANCELLED: 'CANCELLED',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED',
  NO_SHOW: 'NO_SHOW',
  NOW: 'NOW',
};


export const NOTIFICATION_DESCRIPTION_AND_TITLE = {
  SHARED_HEALTHY_RECOMMENDATION: {
    TITLE: "New Healthy Recommendation shared",
    DESCRIPTION: " has been shared a new healthy recommendation."
  },
  FORM_SUBMITTED: {
    TITLE: "Form Submitted",
    DESCRIPTION: " has been submitted form."
  },
  SHARED_EDUCATION_MEDIA: {
    TITLE: "New Education media shared",
    DESCRIPTION: " has been shared a new education media."
  },
  SHARED_VISIT_NOTES: {
    TITLE: "New Chart Visit Notes shared",
    DESCRIPTION: " has shared a new Chart Visit Notes."
  },
  SHARED_DIET_TRACKER_FORM: {
    TITLE: "New Diet-tracker form  shared",
    DESCRIPTION: " has been shared a new Diet-tracker form."
  },
  SHARED_ALL_OTHER_FORM: {
    TITLE: "New ",
    TITLE1: "form  shared",
    DESCRIPTION: " has been shared a new ",
    DESCRIPTION1: "form."
  },
  SHARED_PRESCRIPTION: {
    TITLE: "New Prescription  shared",
    DESCRIPTION: " has been shared a new prescription."
  },
  APPOINTMENT_RESCHEDULED: {
    TITLE: "Appointment rescheduled",
    DESCRIPTION: " has been rescheduled your appointment."
  },
  SETTING_UPDATED: {
    TITLE: "Setting Updated",
    DESCRIPTION: "Your notification setting has been updated successfully"
  },
  CHALLENGE_CREATED: {
    TITLE: "New Challenge Available",
    DESCRIPTION: " is available. Enroll now!"
  },
  CHALLENGE_WILL_BEGIN: {
    TITLE: "Challenge Starting Soon",
    DESCRIPTION: " will be live in few minutes."
  },
  CHALLENGE_WILL_END: {
    TITLE: "Challenge Ending Soon",
    DESCRIPTION: " will end soon."
  },
}


export const TRANSACTION_TYPE = {
  CREDITED: 'Credited',
  DEBITED: 'Debited'
};

export const ACTION_TYPE = {
  APPOINTMENT_BOOKING: 'Appointment Booking',
  SUBSCRIPTION_PLAN_UPGRADE: 'Subscription Plan Upgrade',
  CHALLENGE_COMPLETED: 'Challenge Completed'
};
