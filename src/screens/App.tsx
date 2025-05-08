import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '../navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '../context/AuthContext';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../components/common/Toast';

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
    <AuthProvider>
      <RootNavigator />
      <Toast config={toastConfig} />
    </AuthProvider>
    </NavigationContainer>
  </GestureHandlerRootView>
);

export default App;
