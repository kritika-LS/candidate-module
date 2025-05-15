import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Overview } from '../screens/ProfileScreen/Overview';
import { PersonalDetails } from '../screens/ProfileScreen/PersonalDetails';

const Drawer = createDrawerNavigator();

const ProfileDrawer = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Overview" component={Overview} />
      <Drawer.Screen name="PersonalDetails" component={PersonalDetails} />
    </Drawer.Navigator>
  );
};

export default ProfileDrawer;
