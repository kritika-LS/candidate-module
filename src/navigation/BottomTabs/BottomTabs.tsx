// navigation/BottomTabs.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screens/HomScreen';
import { ProfileScreen } from '../../screens/ProfileScreen';
import { BottomTabsParamsList } from '../../types/navigation';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

const tabScreens: {
  name: keyof BottomTabsParamsList;
  component: React.ComponentType<any>;
  icon: string;
}[] = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: 'home',
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    icon: 'person-outline',
  },
];

const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
      {tabScreens.map(({ name, component }) => (
        <Tab.Screen key={name} name={name} component={component} />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabs;
