import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomScreen';
import WalkthroughScreen from '../screens/Walkthrough';
import { SignUpScreen } from '../screens/SignUpScreen';
import { theme } from '../theme';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  WalkthroughScreen: undefined;
  SignUpScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator
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
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="WalkthroughScreen" component={WalkthroughScreen} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
