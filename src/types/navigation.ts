export type RootStackParamList = {
    AuthNavigator: undefined;
    AppNavigator: undefined;
    JobPreviewScreen: { jobId: string };
    SearchJobs: undefined;
}

export type AuthStackParamList = {
    Splash: undefined;
    HomeScreen: undefined;
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
    HomeScreen: undefined;
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
    PersonalDetailsScreen: undefined;
    WorkHistorySection: undefined;
    EducationSection: undefined;
};

export type BottomTabsParamsList = {
    [x: string]: any;
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
  