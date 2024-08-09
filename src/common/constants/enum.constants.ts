export enum LOGIN_TYPE {
  FACEBOOK = 'FACEBOOK',
  GOOGLE = 'GOOGLE',
  APPLE = 'APPLE',
  NORMAL = 'NORMAL',
}

export enum GENDER {
  MAN = 'Man',
  WOMAN = 'Woman',
  TRANSGENDER = 'Transgender',
  NBNC = 'Non-Binary/Non-Confirming',
  NTR = 'Prefer not to respond',
}

export enum PROFESSIONAL_CREDS {
  AHC = 'Ayurvedic Health Counselor',
  AD = 'Ayurvedic Doctor',
  AP = 'Acupuncture Physician',
  CA = 'Certified Acupuncturist',
  CCH = 'Certified Classical Homeopathy',
  CCSP = 'Certified Chiropractic Sports Physician',
  CFMP = 'Certified Functional Medicine Practitioner',
  CHC = 'Certified Health Coach',
  CNC = 'Nutritional Coach Certification ',
  CRNP = 'Certified Registered Nurse Practitioner',
  DAC = 'Doctor of Acupuncture',
  DC = 'Doctor of Chiropractic',
  DDS = 'Doctor of Dentistry',
  DMD = 'Doctor of Medical Dentistry',
  DO = 'Doctor of Osteopathy',
  DOM = 'Doctor of Oriental Medicine',
  FMCHC = 'Functional Medicine Certified Health Coach',
  FNP = 'Family Nurse Practitioner',
  LAC = 'Licensed Acupuncturist',
  LMT = 'Licensed Massage Therapist',
  LN = 'Licensed Nutritionist',
  LNC = 'Licensed Nutritionist Counselor',
  MD = 'Doctor of Medicine',
  MDH = 'Homeopathic Doctor (AZ)',
  MFCC = 'Marriage, Family and Child Counselor',
  MNNP = 'Master of Nursing, Nurse Practitioner',
  MPH = 'Master of Public Health',
  MSN = 'Master of Nursing',
  MSW = 'Master of Social Work',
  NDNMD = 'Doctor of Naturopathy',
  NP = 'Nurse Practitioner',
  OD = 'Doctor of Optometry',
  OMD = 'Doctor of Oriental Medicine',
  PA = 'Physician Assistant',
  PAC = 'Physician Assistant Certified',
  PHD = 'Doctor of Philosophy',
  PSYD = 'Doctor of Psychiatry',
  PT = 'Physical Therapist',
  RD = 'Registered Dietitian',
  RN = 'Registered Nurse',
  PharmD = 'Doctor of Pharmacy',
}

export enum PRONOUNS {
  SHE = 'She/Her',
  HE = 'He/His',
  THEY = 'They/Their',
}
export enum PLAN {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PLUS = 'PLUS',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
}

export enum USER_TYPE {
  PATIENT = 'PATIENT',
  CLINICIAN = 'CLINICIAN',
  ADMIN = 'ADMIN',
  SUB_ADMIN = 'SUB_ADMIN'
}

export enum DEVICE_TYPE {
  ANDROID = 'a',
  IOS = 'i',
  WEB = 'w',
}
export const SORT_ORDER = {
  ASC: 1,
  DESC: -1,
};

export enum ENVIRONMENT {
  PRODUCTION = 'prod',
  DEV = 'dev',
  QA = 'qa',
  STAGING = 'stg',
}
export enum PROFILE_STEPS {
  STEP_ONE = 1,
  STEP_TWO = 2,
  STEP_THREE = 3,
}

export enum ACCOUNT_DELETED_BY {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum DistanceUnit {
  KM = 'km',
  MILES = 'miles',
}

export enum SWIPE_ACTION {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  UP = 'UP',
}
export enum SWIPE_STATUS {
  LIKED = 'LIKED',
  REJECTED = 'REJECTED',
  SUPERLIKE = 'SUPERLIKE',
}

export enum HEALTHY_RECOMMENDATION_TYPE {
  ALL = 'ALL',
  CLINICIAN = 'CLINICIAN',
}
export enum APPOINTMENT_MODE {
  PERSON = 'In-Clinic',
  IN_CLINIC = 'In-Clinic',
  VISIT = 'Tele-Visit',
  TELE_VISIT = 'Tele-Visit',
}

// export const APPOINTMENT_STATUS = {
//   ACCEPT: 'ACCEPTED',
//   CANCELLED: 'CANCELLED',
//   PENDING: 'PENDING',
//   COMPLETED: 'COMPLETED',
// };

export const RESCHEDULE_STATUS = {
  ACCEPT: 'ACCEPTED',
  CANCELLED: 'CANCELLED',
  PENDING: 'PENDING'
};

export enum NOTIFICATION_ACTION { 
  READ = "READ",
  DELETE = "DELETE"
}