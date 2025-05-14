import SplashScreen from "../screens/SplashScreen";

export const ScreenNames = {
    SplashScreen: 'Spash',
    HomeScreen: 'Home',
    WalkthroughScreen: 'WalkthroughScreen',
    SignUpScreen: 'SignUpScreen',
    LoginScreen: 'LoginScreen',
    EmailVerificationScreen: 'EmailVerificationScreen',
    UploadResumeScreen: 'UploadResumeScreen',
    ForgetPasswordScreen: 'ForgetPasswordScreen',
    MultiStepRegistrationScreen: "MultiStepRegistrationScreen",
    RegistrationASuccessScreen: "RegistrationASuccessScreen",
    ProfileScreen: "ProfileScreen",
} as const;

export type ScreenNameTypes = typeof ScreenNames[keyof typeof ScreenNames];