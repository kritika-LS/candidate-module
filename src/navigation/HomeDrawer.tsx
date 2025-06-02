import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerParamList } from '../types/navigation';
import CustomDrawer from '../components/CustomDrawer/CustomDrawer';
import { ScreeningsScreen } from '../screens/ScreeningsScreen';
import { SkillsChecklistScreen } from '../screens/SkillsChecklistScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomScreen';
import DrawerHeader from '../components/CustomDrawer/DrawerHeader';

const Drawer = createDrawerNavigator<DrawerParamList>();

const HomeDrawer = () => (
  <Drawer.Navigator
    screenOptions={{
      header: () => <DrawerHeader />,
      headerTitle: '',
      drawerType: 'front',
      overlayColor: 'rgba(0,0,0,0.3)',
      drawerStyle: { height: '100%', width: '70%' },
    }}
    // @ts-ignore
    sceneContainerStyle={{ backgroundColor: 'transparent' }}
    drawerContent={(props) => <CustomDrawer {...props} />}
  >
    <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    {/* <Drawer.Screen name="ScreeningsScreen" component={ScreeningsScreen} />
    <Drawer.Screen name="SkillsChecklistScreen" component={SkillsChecklistScreen} />
    <Drawer.Screen name="SettingsScreen" component={SettingsScreen} /> */}
  </Drawer.Navigator>
);

export default HomeDrawer; 