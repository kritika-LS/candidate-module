import { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import React from 'react';

export const navigationRef = 
  React.createRef<NavigationContainerRef<RootStackParamList>>();

export function navigate(name: keyof RootStackParamList, params?: any) {
  navigationRef.current?.navigate(name, params);
}
