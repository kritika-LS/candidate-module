// navigation/BottomTabs.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabsParamsList } from '../../types/navigation';
import CustomTabBar from './CustomTabBar';
import { MyJobs } from '../../screens/MyJobs';
import ProfileScreen from '../../screens/ProfileScreen';
import HomeDrawer from '../HomeDrawer';
import SearchJobsDrawer from '../SearchJobsDrawer';

const Tab = createBottomTabNavigator<BottomTabsParamsList>();

const tabScreens: {
  name: keyof BottomTabsParamsList;
  component: React.ComponentType<any>;
}[] = [
  {
    name: 'Home',
    component: HomeDrawer,
  },
  {
    name: 'Search Jobs',
    component: SearchJobsDrawer,
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
