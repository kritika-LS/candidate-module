// export type RootStackParamList = {
//     AuthNavigator: undefined;
//     MainStack: undefined;
//     AppNavigator: { screen: keyof BottomTabsParamsList };
//     JobPreviewScreen: { jobId: string };
//     SearchJobs: undefined;
//     Walkthrough: { onDone: () => void };
//     BasicInformationScreen: undefined;
//     AddressDetailsScreen: undefined;
//     ProfessionalDetailsScreen: undefined;
//     PortfolioScreen: undefined;
//     JobPreferencesScreen: undefined;
//     SubmittalInformationScreen: undefined;
//     EmergencyContactAddressScreen: undefined;
//     AddWorkHistory: undefined;
//     CertificateScreen: undefined;
//     LicenseScreen: undefined;
//     ReferenceSectionScreen: undefined;
//     ChartingSystemScreen: undefined;
//     BackgroundInformationScreen: undefined;
//     PersonalDetailsScreen: undefined;
//     WorkHistorySection: undefined;
//     EducationSection: undefined;
//     SkillsChecklistScreen: undefined;
//     ScreeningsScreen: undefined;
//     SettingsScreen: undefined;
//     SingleSkillChecklist: {checklistId:any, checklistData:any};
//     MyScreenings: undefined;
//     EmailVerificationScreen: { email: string, password: string; };
// }

export type RootStackParamList = {
    AuthNavigator: undefined;
    MainStack: {
        screen?: keyof MainStackParamList;
        params?: MainStackParamList[keyof MainStackParamList];
    };
    Walkthrough: { onDone: () => void };
}

export type MainStackParamList = {
    AppNavigator: {
        screen?: keyof BottomTabsParamsList;
        params?: any;
    };
    JobPreviewScreen: { jobId: string };
    SearchJobs: undefined;
    Walkthrough: { onDone: () => void };
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
    PersonalDetailsScreen: undefined;
    WorkHistorySection: undefined;
    EducationSection: undefined;
    SkillsChecklistScreen: undefined;
    ScreeningsScreen: undefined;
    SettingsScreen: undefined;
    SingleSkillChecklist: {checklistId:any, checklistData:any};
    MyScreenings: undefined;
    EmailVerificationScreen: { email: string, password: string; };
    NotificationsScreen: undefined;
    ScreeningScheduler: undefined;
}

export type AuthStackParamList = {
    LoginScreen: undefined;
    SignUpScreen: undefined;
    EmailVerificationScreen: { email: string, password: string; };
    UploadResumeScreen: undefined;
    ForgetPasswordScreen: undefined;
    MultiStepRegistrationScreen: undefined;
    RegistrationASuccessScreen: undefined;
}

export type BottomTabsParamsList = {
    Home: undefined;
    'Search Jobs': undefined;
    'My Jobs': undefined;
    Profile: undefined;
}

export type DrawerParamList = {
    HomeScreen: undefined;
    SearchJobs: undefined;
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

declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
}
  