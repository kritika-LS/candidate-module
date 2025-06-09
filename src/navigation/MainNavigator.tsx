import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import BottomTabs from './BottomTabs/BottomTabs';
import { SkillsChecklistScreen } from '../screens/SkillsChecklistScreen';
import { ScreeningsScreen } from '../screens/ScreeningsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import JobPreviewScreen from '../screens/JobPreviewScreen';
import BasicInformationScreen from '../screens/ProfileScreen/PersonalDetails/BasicInformationScreen';
import AddressDetailsScreen from '../screens/ProfileScreen/PersonalDetails/Address';
import ProfessionalDetailsScreen from '../screens/ProfileScreen/PersonalDetails/ProfessionalDetails';
import PortfolioScreen from '../screens/ProfileScreen/PersonalDetails/Portfolio';
import JobPreferencesScreen from '../screens/ProfileScreen/PersonalDetails/JobPreferences';
import SubmittalInformationScreen from '../screens/ProfileScreen/PersonalDetails/SubmittalInformation';
import EmergencyContactAddressScreen from '../screens/ProfileScreen/PersonalDetails/EmergencyContactAndAddress';
import AddWorkHistory from '../screens/ProfileScreen/WorkHistory/AddWorkForm';
import Certificate from '../screens/ProfileScreen/ProfessionalInformation/Certificate';
import License from '../screens/ProfileScreen/ProfessionalInformation/License';
import ReferenceSection from '../screens/ProfileScreen/ProfessionalInformation/Reference';
import ChartingSystem from '../screens/ProfileScreen/ProfessionalInformation/ChartingSystem';
import BackgroundInformation from '../screens/ProfileScreen/ProfessionalInformation/BackgroundInformation';
import { PersonalDetailsScreen } from '../screens/ProfileScreen/PersonalDetails/PersonalDetailsScreen';
import WorkHistorySection from '../screens/ProfileScreen/WorkHistory/WorkHistory';
import EducationSection from '../screens/ProfileScreen/Education';
import { SingleSkillChecklist } from '../screens/SkillsChecklistScreen/SingleSkillChecklist';
import { MyScreenings } from '../screens/MyScreenings';
import { EmailVerificationScreen } from '../screens/auth/EmailVerificationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppNavigator" component={BottomTabs} />
      <Stack.Screen name="SkillsChecklistScreen" component={SkillsChecklistScreen} />
      <Stack.Screen name="ScreeningsScreen" component={ScreeningsScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="JobPreviewScreen" component={JobPreviewScreen} />
      <Stack.Screen name="BasicInformationScreen" component={BasicInformationScreen} />
      <Stack.Screen name="AddressDetailsScreen" component={AddressDetailsScreen} />
      <Stack.Screen name="ProfessionalDetailsScreen" component={ProfessionalDetailsScreen} />
      <Stack.Screen name="PortfolioScreen" component={PortfolioScreen} />
      <Stack.Screen name="JobPreferencesScreen" component={JobPreferencesScreen} />
      <Stack.Screen name="SubmittalInformationScreen" component={SubmittalInformationScreen} />
      <Stack.Screen name="EmergencyContactAddressScreen" component={EmergencyContactAddressScreen} />
      <Stack.Screen name="WorkHistorySection" component={WorkHistorySection} />
      <Stack.Screen name="AddWorkHistory" component={AddWorkHistory} />
      <Stack.Screen name="CertificateScreen" component={Certificate} />
      <Stack.Screen name="LicenseScreen" component={License} />
      <Stack.Screen name="ReferenceSectionScreen" component={ReferenceSection} />
      <Stack.Screen name="ChartingSystemScreen" component={ChartingSystem} />
      <Stack.Screen name="BackgroundInformationScreen" component={BackgroundInformation} />
      <Stack.Screen name="PersonalDetailsScreen" component={PersonalDetailsScreen} />
      <Stack.Screen name="EducationSection" component={EducationSection} />
      <Stack.Screen name="SingleSkillChecklist" component={SingleSkillChecklist} />
      <Stack.Screen name="MyScreenings" component={MyScreenings} />
      <Stack.Screen name="EmailVerificationScreen" component={EmailVerificationScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;