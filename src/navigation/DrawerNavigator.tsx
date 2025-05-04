// navigation/DrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomScreen'; // double-check spelling
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: '#0F162A',
          width: 260,
        },
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#0F162A',
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      {/* Add other screens like Documents, Settings here */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
