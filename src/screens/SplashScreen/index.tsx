import React from 'react';
import AnimatedSplash from '../../components/features/Splash/AnimatedSplash';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenNames } from '../../utils/ScreenConstants';
import { AuthStackParamList } from '../../types/navigation';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Splash'>;

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleAnimationFinish = () => {
    navigation.replace(ScreenNames.WalkthroughScreen);
  };

  return <AnimatedSplash onAnimationFinish={handleAnimationFinish} />;
};

export default SplashScreen;
