import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_RViJZaF61',
      userPoolClientId: '4okh60cmmdo48ioem41tgo3qrh',
      loginWith: {
        email: true,
      },
      // signUpVerificationMethod: "code", // optional
      allowGuestAccess: true,
      userAttributes: {
        email: { required: true },
      },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
});
