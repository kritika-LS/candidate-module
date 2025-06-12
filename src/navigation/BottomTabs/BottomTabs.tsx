// navigation/BottomTabs.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabsParamsList } from '../../types/navigation';
import CustomTabBar from './CustomTabBar';
import { MyJobs } from '../../screens/MyJobs';
import ProfileScreen from '../../screens/ProfileScreen';
import HomeScreen from '../../screens/HomScreen';
import { SearchJobs } from '../../screens/SearchJobs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../../components/CustomDrawer/CustomDrawer';
import DrawerHeader from '../../components/CustomDrawer/DrawerHeader';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<BottomTabsParamsList>();
const Drawer = createDrawerNavigator();

interface DrawerNavigatorProps {
  component: React.ComponentType<any>;
  showSearchBar?: boolean;
}

const DrawerNavigator: React.FC<DrawerNavigatorProps> = ({ component: Component, showSearchBar = true }) => (
  <Drawer.Navigator
    screenOptions={{
      header: () => <DrawerHeader showSearchBar={showSearchBar} />,
      headerTitle: '',
      drawerType: 'front',
      overlayColor: 'rgba(0,0,0,0.3)',
      drawerStyle: { height: '100%', width: '70%' },
    }}
    drawerContent={(props) => <CustomDrawer {...props} />}
  >
    <Drawer.Screen name="Main" component={Component} />
  </Drawer.Navigator>
);

const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen 
        name="Home" 
        component={(props: BottomTabScreenProps<BottomTabsParamsList, 'Home'>) => (
          <DrawerNavigator component={HomeScreen} {...props} />
        )} 
      />
      <Tab.Screen 
        name="Search Jobs" 
        component={(props: BottomTabScreenProps<BottomTabsParamsList, 'Search Jobs'>) => (
          <DrawerNavigator component={SearchJobs} showSearchBar={false} {...props} />
        )} 
      />
      <Tab.Screen 
        name="My Jobs" 
        component={(props: BottomTabScreenProps<BottomTabsParamsList, 'My Jobs'>) => (
          <DrawerNavigator component={MyJobs} {...props} />
        )} 
      />
      <Tab.Screen 
        name="Profile" 
        component={(props: BottomTabScreenProps<BottomTabsParamsList, 'Profile'>) => (
          <DrawerNavigator component={ProfileScreen} {...props} />
        )} 
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
