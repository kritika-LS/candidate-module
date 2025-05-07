import React, { useEffect, useState } from 'react';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WalkthroughScreen from '../screens/auth/Walkthrough';
import SplashScreen from '../screens/SplashScreen';

const RootNavigator = () => {
  const { isAuthenticated } = useAuth();
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

  const handleWalkthroughDone = async () => {
    await AsyncStorage.setItem('hasSeenWalkthrough', 'true');
    setHasSeenWalkthrough(true);
  };

  if (isSplashVisible || hasSeenWalkthrough === null) {
    return <SplashScreen />;
  }

  return (
    <>
      {!hasSeenWalkthrough ? (
        <WalkthroughScreen onDone={handleWalkthroughDone} />
      ) : isAuthenticated ? (
        <DrawerNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default RootNavigator;
