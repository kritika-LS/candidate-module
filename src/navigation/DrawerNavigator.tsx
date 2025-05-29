import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import ProfileScreen from '../screens/ProfileScreen';
// import SettingsScreen from '../screens/SettingsScreen'
import { DrawerParamList } from '../types/navigation';
import CustomDrawer from '../components/CustomDrawer/CustomDrawer';
import { ScreeningsScreen } from '../screens/ScreeningsScreen';
import { SkillsChecklistScreen } from '../screens/SkillsChecklistScreen';
import { ReferencesScreen } from '../screens/ReferencesScreen';
import { DocumentsScreen } from '../screens/DocumentsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import BottomTabs from './BottomTabs/BottomTabs';
import { StyleSheet, Text, View } from 'react-native';
import DrawerHeader from '../components/CustomDrawer/DrawerHeader';
import PersonalDetailsForm from '../screens/ProfileScreen/PersonalDetails/BasicInformationScreen';
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
import JobPreviewScreen from '../screens/JobPreviewScreen';
import { PersonalDetailsScreen } from '../screens/ProfileScreen/PersonalDetails/PersonalDetailsScreen';
import HomeScreen from '../screens/HomScreen';
import WorkHistorySection from '../screens/ProfileScreen/WorkHistory/WorkHistory';
import { AddEducationForm } from '../screens/ProfileScreen/Education/AddEducationForm';
import EducationSection from '../screens/ProfileScreen/Education';


const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      header: () => <DrawerHeader />,
      headerTitle: '',
    }}
    drawerContent={(props) => <CustomDrawer {...props} />}
  >
    <Drawer.Screen name="BottomTabs" component={BottomTabs} options={{ title: '' }} />
    <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    <Drawer.Screen name="ScreeningsScreen" component={ScreeningsScreen} />
    <Drawer.Screen name="SkillsChecklistScreen" component={SkillsChecklistScreen} />
    <Drawer.Screen name="ReferencesScreen" component={ReferencesScreen} />
    <Drawer.Screen name="DocumentsScreen" component={DocumentsScreen} />
    <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
    <Drawer.Screen name="BasicInformationScreen" component={BasicInformationScreen} />
    <Drawer.Screen name="AddressDetailsScreen" component={AddressDetailsScreen} />
    <Drawer.Screen name="ProfessionalDetailsScreen" component={ProfessionalDetailsScreen} />
    <Drawer.Screen name="PortfolioScreen" component={PortfolioScreen} />
    <Drawer.Screen name="JobPreferencesScreen" component={JobPreferencesScreen} />
    <Drawer.Screen name="SubmittalInformationScreen" component={SubmittalInformationScreen} />
    <Drawer.Screen name="EmergencyContactAddressScreen" component={EmergencyContactAddressScreen} />
    <Drawer.Screen name="WorkHistorySection" component={WorkHistorySection} />
    <Drawer.Screen name="AddWorkHistory" component={AddWorkHistory} />
    <Drawer.Screen name="CertificateScreen" component={Certificate} />
    <Drawer.Screen name="LicenseScreen" component={License} />
    <Drawer.Screen name="ReferenceSectionScreen" component={ReferenceSection} />
    <Drawer.Screen name="ChartingSystemScreen" component={ChartingSystem} />
    <Drawer.Screen name="BackgroundInformationScreen" component={BackgroundInformation} />
    <Drawer.Screen name="JobPreviewScreen" component={JobPreviewScreen} />
    <Drawer.Screen name="PersonalDetailsScreen" component={PersonalDetailsScreen} />
    <Drawer.Screen name="EducationSection" component={EducationSection} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
