import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import ProfileScreen from '../screens/ProfileScreen';
// import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomScreen';
import { DrawerParamList } from '../types/navigation';
import CustomDrawer from '../components/CustomDrawer/CustomDrawer';
import { ScreeningsScreen } from '../screens/ScreeningsScreen';
import { SkillsChecklistScreen } from '../screens/SkillsChecklistScreen';
import { ReferencesScreen } from '../screens/ReferencesScreen';
import { DocumentsScreen } from '../screens/DocumentsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import BottomTabs from './BottomTabs/BottomTabs';


const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: true }}
    drawerContent={(props) => <CustomDrawer {...props} />}
  >
    <Drawer.Screen name="BottomTabs" component={BottomTabs} options={{ title: false }} />
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="ScreeningsScreen" component={ScreeningsScreen} />
    <Drawer.Screen name="SkillsChecklistScreen" component={SkillsChecklistScreen} />
    <Drawer.Screen name="ReferencesScreen" component={ReferencesScreen} />
    <Drawer.Screen name="DocumentsScreen" component={DocumentsScreen} />
    <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
