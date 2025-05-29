// navigation/BottomTabs.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screens/HomScreen';
import { ProfileScreen } from '../../screens/ProfileScreen';
import { BottomTabsParamsList } from '../../types/navigation';
import CustomTabBar from './CustomTabBar';
import { SearchJobs } from '../../screens/SearchJobs';
import { MyJobs } from '../../screens/MyJobs';

const Tab = createBottomTabNavigator();

const tabScreens: {
  name: any;
  component: React.ComponentType<any>;
}[] = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'Search Jobs',
    component: SearchJobs,
  },
  {
    name: 'My Jobs',
    component: MyJobs,
  },
  {
    name: 'Profile',
    component: ProfileScreen,
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
