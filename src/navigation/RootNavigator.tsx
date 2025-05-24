import React, { useEffect, useState } from 'react';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WalkthroughScreen from '../screens/auth/Walkthrough';
import SplashScreen from '../screens/SplashScreen';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchCandidate } from '../store/thunk/candidate.thunk';
import { ScreenNames } from '../utils/ScreenConstants';

const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [hasSeenWalkthrough, setHasSeenWalkthrough] = useState<boolean | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    const checkAuthorization = async () => {
      if (isAuthenticated) {
        try {
          const response = await dispatch(fetchCandidate()).unwrap();
          // Check if the response has a status key and it's not 401
          if (response?.status && response.status !== 401) {
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
          }
        } catch (error: any) {
          // If the API call fails or returns 401, user is not authorized
          setIsAuthorized(false);
        }
      }
    };
    checkAuthorization();
  }, [isAuthenticated, dispatch]);

  const handleWalkthroughDone = async () => {
    await AsyncStorage.setItem('hasSeenWalkthrough', 'true');
    setHasSeenWalkthrough(true);
  };

  // Show splash screen while loading initial states
  if (isSplashVisible || isLoading || hasSeenWalkthrough === null || (isAuthenticated && isAuthorized === null)) {
    return <SplashScreen />;
  }

  return (
    <>
      {!hasSeenWalkthrough ? (
        <WalkthroughScreen onDone={handleWalkthroughDone} />
      ) : isAuthenticated && isAuthorized ? (
        <DrawerNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default RootNavigator;