export type RootStackParamList = {
    AuthNavigator: undefined;
    AppNavigator: undefined; 
}

export type AuthStackParamList = {
    Splash: undefined;
    Home: undefined;
    WalkthroughScreen: undefined;
    SignUpScreen: undefined;
    LoginScreen: (email: string, password: string) => Promise<void>;
    EmailVerificationScreen: { email: string; password: string };
    UploadResumeScreen: undefined;
    ForgetPasswordScreen: undefined;
    MultiStepRegistrationScreen: undefined;
};
  
export type DrawerParamList = {
    Home: undefined;
    ScreeningsScreen: undefined;
    SkillsChecklistScreen: undefined;
    ReferencesScreen: undefined;
    DocumentsScreen: undefined;
    SettingsScreen: undefined;
};

declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
}
  