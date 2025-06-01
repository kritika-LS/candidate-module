import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerParamList } from '../types/navigation';
import CustomDrawer from '../components/CustomDrawer/CustomDrawer';
import { ScreeningsScreen } from '../screens/ScreeningsScreen';
import { SkillsChecklistScreen } from '../screens/SkillsChecklistScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { SearchJobs } from '../screens/SearchJobs';
import { View, TouchableOpacity } from 'react-native';
import Icon from '../components/common/Icon/Icon';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

const Drawer = createDrawerNavigator<DrawerParamList>();

const SearchJobsHeader = () => {
  const navigation = useNavigation();

  const handleMenuPress = () => {
    //@ts-ignore
    navigation.openDrawer();
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, marginTop: 50 }}>
      <TouchableOpacity onPress={handleMenuPress}>
        <Icon name='menu' color={theme.colors.text.light} />
      </TouchableOpacity>
    </View>
  );
};

const SearchJobsDrawer = () => (
  <Drawer.Navigator
    screenOptions={{
      header: () => <SearchJobsHeader />,
      headerTitle: '',
      drawerType: 'front',
      overlayColor: 'rgba(0,0,0,0.3)',
      drawerStyle: { height: '100%' },
    }}
    // @ts-ignore
    sceneContainerStyle={{ backgroundColor: 'transparent' }}
    drawerContent={(props) => <CustomDrawer {...props} />}
  >
    <Drawer.Screen name="SearchJobs" component={SearchJobs} />
    <Drawer.Screen name="ScreeningsScreen" component={ScreeningsScreen} />
    <Drawer.Screen name="SkillsChecklistScreen" component={SkillsChecklistScreen} />
    <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
  </Drawer.Navigator>
);

export default SearchJobsDrawer; 