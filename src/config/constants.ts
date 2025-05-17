export const APP_CONSTANTS = {
  APP_NAME: 'Hummingbird',
  API_TIMEOUT: 30000,
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
