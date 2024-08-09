// import { MAIL_SENDING_TYPE, SMS_SENDING_TYPE } from '../common/constants';
// import { fetchSecrets } from '../utils';

export const configuration = async () => {
  // if (process.env['NODE_ENV'] !== 'local') {
  //   const secrets = await fetchSecrets();
  //   for (const envKey of Object.keys(secrets)) {
  //     process.env[envKey] = secrets[envKey];
  //   }
  // }
  return Object.freeze({
    APP_NAME: 'Rcc',
    WEBAPP_URL: process.env['WEBAPP_URL'],
    APP_LOGO: '1607946234266_Sqlv5.svg',
    TEMPLATE_PATH: process.cwd() + '/src/views/',
    UPLOAD_DIR: process.cwd() + '/src/uploads/',
    LOG_DIR: process.cwd() + '/logs',
    TOKEN_INFO: {
      EXPIRATION_TIME: {
        ACCESS_TOKEN: 7 * 24 * 60 * 60, // 1d or 24hr
        REFRESH_TOKEN: '7d', // 7 days
        FORGOT_PASSWORD: 3 * 60 * 1000, // 3 mins
        VERIFY_EMAIL: 3 * 60 * 1000, // 3 mins
        OTP: 3 * 60 * 1000, // 3 mins
      },
      ISSUER: process.env['APP_URL'],
    },
    SECRET_KEY: '11d8e9810567496d98ff5285b8afec56', //process.env['SECRET_KEY'],
    SECRET_IV: 'I8zyA4lVhMCaJ5Kk', //process.env['SECRET_IV'],
    JWT_PRIVATE_KEY: process.cwd() + '/keys/jwtRS256.key',
    JWT_PUBLIC_KEY: process.cwd() + '/keys/jwtRS256.key.pub',
    // for private.key file use RS256, SHA256, RSA
    JWT_ALGO: 'RS256',
    SALT_ROUNDS: 10,
    APP_URL: process.env['APP_URL'],
    MONGO: {
      DB_NAME: process.env['DB_NAME'],
      DB_URL: process.env['DB_URL'],
      OPTIONS: {
        user: process.env['DB_USER'],
        pass: process.env['DB_PASSWORD'],
      },
      REPLICA: process.env['DB_REPLICA'],
      REPLICA_OPTION: {
        replicaSet: process.env['DB_REPLICA_SET'],
        authSource: process.env['DB_AUTH_SOURCE'],
        ssl: process.env['DB_SSL'],
      },
    },
    ADMIN_CREDENTIALS: {
      EMAIL: process.env['ADMIN_EMAIL'],
      PASSWORD: process.env['ADMIN_PASSWORD'],
      NAME: process.env['ADMIN_NAME'],
    },
    QUERY_EMAIL: process.env['ADMIN_EMAIL'],
    MAIL: {
      SMTP: {
        HOST: process.env['SMTP_HOST'],
        PORT: process.env['SMTP_PORT'],
        USER: process.env['SMTP_USER'],
        PASSWORD: process.env['SMTP_PASSWORD'],
      },
      SENDGRID: {
        API_USER: process.env['SENDGRID_API_USER'],
        API_KEY: process.env['SENDGRID_API_KEY'],
      },
    },
    BASIC_AUTH: {
      USER_NAME: 'Rcc',
      PASS: 'Rcc@123',
    },
    API_KEY: '1234',
    S3: {
      ACCESS_KEY_ID: process.env['AWS_ACCESS_KEY'],
      SECRET_ACCESS_KEY: process.env['AWS_SECRET_KEY'],
      BUCKET_NAME: process.env['S3_BUCKET_NAME'],
      REGION: process.env['S3_REGION'],
      BUCKET_URL: process.env['BUCKET_URL'],
    },
    REDIS: {
      HOST: process.env['REDIS_HOST'],
      PORT: process.env['REDIS_PORT'],
      PASSWORD: process.env['REDIS_PASSWORD'],
      TTL: 60, // 60s
    },
    TWILIO: {
      ACCOUNT_SID: process.env['TWILIO_ACCOUNT_SID'],
      AUTH_TOKEN: process.env['TWILIO_AUTH_TOKEN'],
      FROM_NUMBER: process.env['TWILIO_FROM_NUMBER'],
    },
    NODE_ENV: process.env['NODE_ENV'],
    PORT: process.env['USER_PORT'],
    USER_PORT: process.env['USER_PORT'],
    PROTOCOL: process.env['PROTOCOL'],
    FCM_SERVER_KEY: process.env['FCM_SERVER_KEY'],
    IS_SINGLE_DEVICE_LOGIN: {
      SUPER_ADMIN: false,
      ADMIN: false,
      SUBADMIN: false,
      USER: true,
    },
    BRANCH_IO: {
      URL: process.env['BRANCH_IO_URL'],
      KEY: process.env['BRANCH_KEY'],
    },
    DEFAULT_PASSWORD: 'String@123',
    DEFAULT_EMAIL: 'string@gmail.com',
    DEFAULT_OTP: '1234',
    DEFAULT_TOKEN: 'asdfghj23456789',
  });
};
