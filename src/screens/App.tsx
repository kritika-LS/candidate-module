import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '../navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '../context/AuthContext';

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  </GestureHandlerRootView>
);

export default App;
