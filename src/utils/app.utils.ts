import * as moment from 'moment';
import mongoose from 'mongoose';
const fs = require("fs");
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { PhoneNumberUtil } from 'google-libphonenumber';
import * as generatePassword from 'generate-password';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { AWS_SECRET_MANGER, REGEX } from 'src/common/constants';

export const generateCode = (expiresIn: number = 3 * 60 * 1000) => {
  const code = Math.floor(1000 + Math.random() * 9000);
  const currentTimeStamp = moment.utc().valueOf();
  const expiry = currentTimeStamp + expiresIn;
  return { code, expiry };
};


export const deleteFiles = function (filePath) {
  // delete files inside folder but not the folder itself
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

/**
 *
 * @param enteredOTP
 * @param generatedOTP
 * @param expirationTime
 * @returns boolean
 */
export const isOTPMatch = function (
  enteredOTP: number,
  generatedOTP: number,
  expirationTime: number,
): boolean {
  // Get the current timestamp in seconds
  const currentTimeStamp = moment.utc().valueOf();

  // Check if the OTP has expired
  const timeDiff = moment(expirationTime).diff(currentTimeStamp);
  let isExpired = timeDiff > 0 ? false : true;
  console.log('============isExpired', isExpired);
  isExpired = false; //need to change after implement twillio

  // Check if the entered OTP matches the generated OTP
  // const isMatch = enteredOTP === generatedOTP;
  const isMatch = enteredOTP === 1234; //need to change after implement twillio

  // Return whether the OTP is valid
  return !isExpired && isMatch;
};

export const toObjectId = function (_id: string): mongoose.Types.ObjectId {
  return new mongoose.Types.ObjectId(_id);
};

export const buildToken = function (payload: DataI) {
  const userObject: any = {
    userId: payload?.userId || payload['_id'],
    sessionId: payload?.sessionId,
    fullName: payload?.fullName || undefined,
    email: payload?.email,
    countryCode: payload?.countryCode,
    phoneNo: payload?.phoneNo || undefined,
    userType: payload?.userType || payload['aud'],
    accessTokenKey: payload?.accessTokenKey || undefined,
    created: payload?.created || undefined, // optional
    platform: payload?.platform,
    lastLogin: payload?.lastLogin || undefined,
    deviceId: payload?.deviceId,
  };

  return userObject;
};

export function normalizeTimestampToMidnight(timestamp: number): number {
  const date = new Date(timestamp);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}


export function timeConversion(value) {
  const seconds = Number((value / 1000).toFixed(0));
  const minutes = Number((value / (1000 * 60)).toFixed(0));
  const hours = Number((value / (1000 * 60 * 60)).toFixed(0));
  const days = Number((value / (1000 * 60 * 60 * 24)).toFixed(0));

  if (seconds < 60) {
    return seconds + ' Sec';
  } else if (minutes < 60) {
    return minutes + ' Minutes';
  } else if (hours < 24) {
    return hours + ' Hrs';
  } else {
    return days + ' Days';
  }
}

export const escapeSpecialCharacter = function (value: string) {
  return value.replace(REGEX.SEARCH, '\\$&');
};

export const phoneNumberWithCountryCode = function (
  countryCode: string,
  phoneNo: string,
) {
  return `${countryCode}${phoneNo}`;
};

export const isValidEmail = function (email: string) {
  const pattern = REGEX.EMAIL;
  return new RegExp(pattern).test(email);
};

export const stringToBoolean = function (value: string) {
  switch (value.toString().toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
    case null:
      return false;
    default:
      return Boolean(value);
  }
};

export const maskedPhoneNumber = function (
  countryCode: string,
  phoneNo: string,
  showDigit = 4,
) {
  const repeatXCount = phoneNo.length - showDigit; //subtract number of digit
  const lastDigits = phoneNo.slice(-showDigit); // get last no of n digit

  const maskedPhoneNo =
    countryCode +
    phoneNo.replace(/\d+/g, 'x'.repeat(repeatXCount)) +
    lastDigits;

  return maskedPhoneNo;
};

export const hashEmailOrPhone = function (params: {
  email?: string;
  phoneNo?: string;
  countryCode?: string;
}) {
  const { email, phoneNo, countryCode } = params;
  const response = {};
  if (email) {
    response['to'] = 'email';
    response['value'] = email;
  } else if (phoneNo && countryCode) {
    response['to'] = 'mobile number';
    response['value'] = maskedPhoneNumber(countryCode, phoneNo);
  }
  return response;
};

export const generateStrongPassword = function (length) {
  let password = generatePassword.generate({
    length: length,
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: true,
    exclude: ',+!*()_-{}[];\'`:/?<>."|~',
    strict: true,
  });
  return password;
};
// export const generateStrongPassword = (len: number) => {

//   const length = len ? len : 10;
//   const string = 'abcdefghijklmnopqrstuvwxyz'; //to upper
//   const numeric = '0123456789';
//   const punctuation = '@#';
//   let password = '';
//   let character = '';
//   while (password.length < length) {
//     const entity1 = Math.ceil(string.length * Math.random() * Math.random());
//     const entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
//     const entity3 = Math.ceil(
//       punctuation.length * Math.random() * Math.random(),
//     );
//     let hold = string.charAt(entity1);
//     hold = password.length % 2 == 0 ? hold.toUpperCase() : hold;
//     character += hold;
//     character += numeric.charAt(entity2);
//     character += punctuation.charAt(entity3);
//     password = character;
//   }
//   password = password
//     .split('')
//     .sort(function () {
//       return 0.5 - Math.random();
//     })
//     .join('');
//   return password.slice(0, len);
// };

export const isValidPhoneNumber = function (
  countryCode: string,
  phoneNumber: string,
): boolean {
  const phoneNumberUtil = PhoneNumberUtil.getInstance();
  const regionCode = phoneNumberUtil.getRegionCodeForCountryCode(
    Number(countryCode),
  );

  const parsedNumber = parsePhoneNumberFromString(phoneNumber, regionCode);

  // Check if the phone number is valid
  const isValidNumber =
    parsedNumber && parsedNumber.isValid() && parsedNumber.isPossible();
  return isValidNumber;
};

export const calculateAge = function (dateOfBirth) {
  let dob = dateOfBirth.split('/')[2];
  if (dob) {
    // 1545578721887 to 24
    dob = new Date(dob);
    const now = new Date();
    const otherDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    let years = otherDate.getFullYear() - dob.getFullYear();

    if (
      otherDate.getMonth() < dob.getMonth() ||
      (otherDate.getMonth() === dob.getMonth() &&
        otherDate.getDate() < dob.getDate())
    ) {
      years--;
    }

    return years;
  }
};

export const fetchSecrets = async () => {

  const client = new SecretsManagerClient({
    region: AWS_SECRET_MANGER.REGION,
  });
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: AWS_SECRET_MANGER.SECRET_NAME,
      }),
    );
    return JSON.parse(response.SecretString);
  } catch (error) {
    throw error;
  }
};

export function removeSensitiveData(inputObject) {
  // List of sensitive properties to remove
  const sensitiveProperties = [
    'password',
    'salt',
    'iv',
    'otp',
    'otpExpireTime',
  ];

  // Create a shallow copy of the input object to avoid modifying the original
  const sanitizedObject = { ...inputObject };

  // Iterate through the sensitive properties and remove them if they exist
  for (const property of sensitiveProperties) {
    if (sanitizedObject.hasOwnProperty(property)) {
      delete sanitizedObject[property];
    }
  }

  return sanitizedObject;
}
