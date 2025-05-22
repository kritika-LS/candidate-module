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
    RegistrationASuccessScreen: undefined;
    PersonalDetailsScreen: undefined;
    JobPreviewScreen: undefined;
};
  
export type DrawerParamList = {
    Home: undefined;
    ScreeningsScreen: undefined;
    SkillsChecklistScreen: undefined;
    ReferencesScreen: undefined;
    DocumentsScreen: undefined;
    SettingsScreen: undefined;
    BottomTabs: undefined;
    BasicInformationScreen: undefined;
    AddressDetailsScreen: undefined;
    ProfessionalDetailsScreen: undefined;
    PortfolioScreen: undefined;
    JobPreferencesScreen: undefined;
    SubmittalInformationScreen: undefined;
    EmergencyContactAddressScreen: undefined;
    AddWorkHistory: undefined;
    CertificateScreen: undefined;
    LicenseScreen: undefined;
    ReferenceSectionScreen: undefined;
    ChartingSystemScreen: undefined;
    BackgroundInformationScreen: undefined;
    JobPreviewScreen: undefined;
};

export type BottomTabsParamsList = {
    Home: undefined;
    'Search Jobs': undefined;
    'My Jobs': undefined;
    Profile: undefined;
}

declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
}
  