import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import AuthNavigator from './AuthNavigator';
import BottomTabs from './BottomTabs/BottomTabs';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WalkthroughWrapper from './WalkthroughWrapper';
import SplashScreen from '../screens/SplashScreen';
import JobPreviewScreen from '../screens/JobPreviewScreen';
import WalkthroughScreen from '../screens/auth/Walkthrough';
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
import HomeScreen from '../screens/HomScreen';
import WorkHistorySection from '../screens/ProfileScreen/WorkHistory/WorkHistory';
import { AddEducationForm } from '../screens/ProfileScreen/Education/AddEducationForm';
import EducationSection from '../screens/ProfileScreen/Education';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isAuthenticated, isLoading, isRegistered } = useAuth();
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [hasSeenWalkthrough, setHasSeenWalkthrough] = useState<boolean | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkWalkthrough = async () => {
      const seen = await AsyncStorage.getItem('hasSeenWalkthrough');
      setHasSeenWalkthrough(seen === 'true');
    };
    checkWalkthrough();
  }, []);

  console.log({isAuthenticated});
  console.log({isRegistered});
  console.log({hasSeenWalkthrough});

  // Show splash screen while loading initial states
  if (isSplashVisible || isLoading || hasSeenWalkthrough === null || (isAuthenticated && isRegistered === null)) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated && isRegistered ? (
        <>
          <Stack.Screen name="AppNavigator" component={BottomTabs} />
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
        </>
      ) : !hasSeenWalkthrough ? (
        <Stack.Screen name="Walkthrough">
          {props => <WalkthroughScreen {...props} onDone={() => setHasSeenWalkthrough(true)} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;