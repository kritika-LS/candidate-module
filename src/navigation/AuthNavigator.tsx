import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomScreen';
import WalkthroughScreen from '../screens/auth/Walkthrough';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { theme } from '../theme';
import { EmailVerificationScreen } from '../screens/auth/EmailVerificationScreen';
import { UploadResumeScreen } from '../screens/UploadResumeScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { ForgetPasswordScreen } from '../screens/auth/ForgetPasswordScreen';
import MultiStepRegistrationScreen from '../screens/MultiStepRegistrationScreen';
import { AuthStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AppNavigator = ({ isAfterLogout = false }: { isAfterLogout?: boolean }) => (
  <Stack.Navigator
    // initialRouteName={"Splash"}
    screenOptions={{
        headerShown: false,
        contentStyle: {
        backgroundColor: theme.colors.background.default,
        },
        animation: 'slide_from_right',
        navigationBarColor: theme.colors.primary.main,
        headerStyle: {
        backgroundColor: theme.colors.primary.main,
        },
        headerTintColor: theme.colors.text.light,
        headerTitleStyle: {
        fontFamily: theme.typography.fontFamily.medium,
        color: theme.colors.text.light,
        },
  }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="WalkthroughScreen" component={WalkthroughScreen} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="EmailVerificationScreen" component={EmailVerificationScreen} />
    <Stack.Screen name="UploadResumeScreen" component={UploadResumeScreen} />
    <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
    <Stack.Screen name="MultiStepRegistrationScreen" component={MultiStepRegistrationScreen} />
    {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
  </Stack.Navigator>
);

export default AppNavigator;
