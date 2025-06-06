export const APP_CONSTANTS = {
  APP_NAME: 'Hummingbird',
  API_TIMEOUT: 90000,
  STORAGE_KEYS: {
    AUTH_TOKEN: '@auth_token',
    USER_DATA: '@user_data',
  },
};

export const AUTH_CONSTANTS = {
  ONBOARD_ID: 35647,
  CUSTOMER_ID: 1,
  AUTH_TOKEN:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiI3ODdmYWNiOS1hZjg2LTQwOGYtYTc1OS1kNzAwOWM5YTZmOWQiLCJpYXQiOiI0LzgvMjAyNSA5OjU0OjI0IEFNIiwiVXNlcklkIjoiMzU2ODAiLCJFbWFpbCI6ImhpbWFiaW5kdS55ZXJwdWxhKzQwQGxhbmNlc29mdC5jb20iLCJVbmlxdWVHVUlEIjoiOWVlNjZmMDYtZGNkYi00OTQ1LTg4ZGQtNDBkZjM4NDU5MDgwIiwiZXhwIjoxNzQ5Mzc2NDY0LCJpc3MiOiJKV1RBdXRoZW50aWNhdGlvblNlcnZlciIsImF1ZCI6IkpXVFNlcnZpY2VQb3N0bWFuQ2xpZW50In0.C9lE77_dSGmqYWLoTRzjeHAGsHIocxsynFpaNdQpwuk',
} as const;

export type OnboardId = typeof AUTH_CONSTANTS.ONBOARD_ID;
export type AuthToken = typeof AUTH_CONSTANTS.AUTH_TOKEN;

export const DEEP_LINK_CONFIG = {
  URL_SCHEME: 'hummingbird',

  DOMAIN: 'deeplinks.thehummingbird.solutions',

  PREFIXES: ['hummingbird://', 'https://deeplinks.thehummingbird.solutions'],

  PARAMS: {
    ACCESS_KEY: 'ak',
    SOURCE_TYPE: 'st',
  },

  PATHS: {
    AUTH: '/auth',
    LOGIN: '/login',
  },

  DEFAULTS: {
    ACCESS_KEY: 'test-access-key',
    SOURCE_TYPE: 'web',
  },
};
export interface DeepLinkAuthParams {
  accessKey: string;
  sourceType: string;
}

export type DeepLinkHandler = (params: DeepLinkAuthParams) => void;
export interface IDeepLinkService {
  initialize(): void;
  cleanup(): void;
  registerHandler(handler: DeepLinkHandler): void;
  unregisterHandler(handler: DeepLinkHandler): void;
  simulateDeepLink(accessKey: string, sourceType: string): void;
}

export const APP_IDENTIFIERS = {
  IOS_BUNDLE_ID: 'com.hummingbird',
  ANDROID_PACKAGE_NAME: 'com.hummingbird',
};

export const DEFAULT_VALUES = {
    genderItems: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ],
    nationalityItems: [
        { label: 'American', value: 'american' },
        { label: 'Canadian', value: 'canadian' },
        { label: 'India', value: 'india' },
    ],
    ethnicityItems: [
        { label: 'Asian', value: 'asian' },
        { label: 'Hispanic', value: 'hispanic' },
        { label: 'Caucasian', value: 'caucasian' },
    ],
    militaryItems: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' },
        { label: 'I do not wish to disclose', value: 'i do not wish to disclose' },
    ],
    workplacePreferenceItems: [
        { label: 'Remote', value: 'R' },
        { label: 'Onsite', value: 'O' },
        { label: 'Hybrid', value: 'H' },
    ],
};

export const defaultTimeZoneItems = [
  { label: 'UTC-12:00', value: 'utc-12' },
  { label: 'UTC-11:00', value: 'utc-11' },
  { label: 'UTC-10:00', value: 'utc-10' },
  { label: 'UTC-09:00', value: 'utc-9' },
  { label: 'UTC-08:00', value: 'utc-8' },
  { label: 'UTC-07:00', value: 'utc-7' },
  { label: 'UTC-06:00', value: 'utc-6' },
  { label: 'UTC-05:00', value: 'utc-5' },
  { label: 'UTC-04:00', value: 'utc-4' },
  { label: 'UTC-03:00', value: 'utc-3' },
  { label: 'UTC-02:00', value: 'utc-2' },
  { label: 'UTC-01:00', value: 'utc-1' },
  { label: 'UTC+00:00', value: 'utc+0' },
  { label: 'UTC+01:00', value: 'utc+1' },
  { label: 'UTC+02:00', value: 'utc+2' },
  { label: 'UTC+03:00', value: 'utc+3' },
  { label: 'UTC+04:00', value: 'utc+4' },
  { label: 'UTC+05:00', value: 'utc+5' },
  { label: 'UTC+06:00', value: 'utc+6' },
  { label: 'UTC+07:00', value: 'utc+7' },
  { label: 'UTC+08:00', value: 'utc+8' },
  { label: 'UTC+09:00', value: 'utc+9' },
  { label: 'UTC+10:00', value: 'utc+10' },
  { label: 'UTC+11:00', value: 'utc+11' },
  { label: 'UTC+12:00', value: 'utc+12' },
]

export const defaultShiftItems = [
  { label: 'Day', value: 'day' },
  { label: 'Night', value: 'night' },
  { label: 'Float', value: 'float' },
];

export const defaultWageExpectationItems = [
  { label: 'Hourly', value: 'hourly' },
  { label: 'Daily', value: 'da' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Fortnighty', value: 'fortnighty' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Half-Yearly', value: 'half_yearly' },
  { label: 'End of Project', value: 'end_of_project' },
];

export const defaultEmploymentTypeItems = [
  { label: 'Travel', value: 'travel' },
  { label: 'Per Diem', value: 'per_diem' },
  { label: 'Permanent', value: 'permanent' },
  { label: 'Interim Leadership', value: 'Interim_leadership' },
]