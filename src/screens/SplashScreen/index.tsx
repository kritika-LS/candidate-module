import React from 'react';
import AnimatedSplash from '../../components/features/Splash/AnimatedSplash';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleAnimationFinish = () => {
    navigation.replace('WalkthroughScreen');
  };

  return <AnimatedSplash onAnimationFinish={handleAnimationFinish} />;
};

export default SplashScreen;
