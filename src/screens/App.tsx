import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '../navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '../context/AuthContext';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../components/common/Toast';
import { store } from '../store';
import {Provider} from 'react-redux';
import { navigationRef } from '../navigation/navigationRef';

const App = () => (
  <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
      <AuthProvider>
        <RootNavigator />
        <Toast config={toastConfig} />
      </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  </Provider>
);

export default App;
