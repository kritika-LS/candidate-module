import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import AuthNavigator from './AuthNavigator';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/SplashScreen';
import WalkthroughScreen from '../screens/auth/Walkthrough';
import MainStack from './MainNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isAuthenticated, isLoading, isRegistered } = useAuth();
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [hasSeenWalkthrough, setHasSeenWalkthrough] = useState<boolean | null>(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkWalkthrough = async () => {
      const seen = await AsyncStorage.getItem('hasSeenWalkthrough');
      setHasSeenWalkthrough(seen ? true : false);
    };
    checkWalkthrough();
  }, [isAuthenticated]);

  // Show splash screen while loading initial states
  if (isSplashVisible || isLoading) {
    return <SplashScreen />;
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasSeenWalkthrough ? (
        <Stack.Screen name="Walkthrough">
          {props => <WalkthroughScreen {...props} onDone={() => setHasSeenWalkthrough(true)} />}
        </Stack.Screen>
      ) : isAuthenticated && isRegistered ? (
        <Stack.Screen name="MainStack" component={MainStack} />
      ) : (
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;