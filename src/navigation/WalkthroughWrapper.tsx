import React from 'react';
import WalkthroughScreen from '../screens/auth/Walkthrough';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalkthroughWrapper = () => {
  const navigation = useNavigation();

  const handleDone = async () => {
    await AsyncStorage.setItem('hasSeenWalkthrough', 'true');
    //@ts-ignore
    navigation.navigate('AppNavigator');
  };

  return <WalkthroughScreen onDone={handleDone} />;
};

export default WalkthroughWrapper; 