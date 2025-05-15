// navigation/ProfileStack.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileDrawer from './ProfileDrawer';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileDrawer" component={ProfileDrawer} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
