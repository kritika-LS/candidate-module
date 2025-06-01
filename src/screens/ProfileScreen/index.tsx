import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { OverviewSection } from './Overview';
import CandidateInfoCard from '../../components/features/Dashboard/CandidateInfoCard/CandidateInfoCard';
import { Dimensions, Pressable, SafeAreaView, View, ScrollView, Text } from 'react-native';
import { styles } from './styles'; // Make sure this path is correct
import { TabView } from 'react-native-tab-view';
import { TextStyle } from '../../components/common/Text';
import { theme } from '../../theme';
import { Route } from '../../types/profile';
import { PersonalDetails } from './PersonalDetails';
import HistoryListCard from '../../components/features/HistoryListCard';
import UploadFileModal from '../../components/features/UploadFileModal';
import WorkHistorySection from './WorkHistory';
import EducationSection from './Education';
import { fetchCandidateWorkHistory } from '../../store/thunk/candidateWorkHistory.thunk';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchCandidateEducations } from '../../store/thunk/candidateEducation.thunk';
import { fetchCandidateProfessionalInfo } from '../../store/thunk/candidateProfessionalInfo.thunk';
import { fetchCandidateReferences } from '../../store/thunk/candidateReferences.thunk';
import { ProfessionalInformation } from './ProfessionalInformation';
import WorkHistory from './WorkHistory/WorkHistory';
import Education from './Education/Education';
import ProfileDrawer from '../../components/CustomDrawer/ProfileDrawer';
import { useNavigation, useRoute, DrawerActions } from '@react-navigation/native';
import Icon from '../../components/common/Icon/Icon';
import AddWorkHistory from './WorkHistory/AddWorkForm';
import { AddEducationForm } from './Education/AddEducationForm';

const screenWidth = Dimensions.get('window').width;

const Drawer = createDrawerNavigator();

const tabKeys = ['Overview', 'PersonalDetails', 'WorkHistory', 'Education', 'ProfessionalInformation', 'Reference'];

const ProfileTabContent = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useAppDispatch();

    const [index, setIndex] = useState(0);
    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [routes] = useState<Route[]>([
        { key: 'Overview', title: 'Overview', icon: 'chart-bar' },
        { key: 'PersonalDetails', title: 'Personal Details', icon: 'account-outline' },
        { key: 'WorkHistory', title: 'Work History', icon: 'briefcase-outline' },
        { key: 'Education', title: 'Education', icon: 'school-outline' },
        { key: 'ProfessionalInformation', title: 'Professional Information', icon: 'license' },
        { key: 'Reference', title: 'Reference', icon: 'account-multiple-outline' },
    ]);

    useEffect(() => {
        // @ts-ignore
        if (route && typeof route === 'object' && 'params' in route && route.params && typeof route.params === 'object' && 'tab' in route.params) {
            // @ts-ignore
            const tabIdx = tabKeys.indexOf(route.params.tab);
            if (tabIdx !== -1) setIndex(tabIdx);
        }
    }, [route]);

    const renderScene = ({ route }: { route: any }) => {
        switch (route.key) {
            case 'Overview':
                return (
                    <OverviewSection />
                );
            case 'PersonalDetails':
                return (
                    <PersonalDetails expandedItem={expandedItem} setExpandedItem={setExpandedItem} />
                );
            case 'WorkHistory':
                return (
                    <WorkHistorySection />
                );
            case 'Education':
                return (
                    <EducationSection />
                );
            case 'ProfessionalInformation':
                return (
                    <ProfessionalInformation expandedItem={expandedItem} setExpandedItem={setExpandedItem} />
                );
            case 'Reference':
                return (
                    <ProfessionalInformation expandedItem={expandedItem} setExpandedItem={setExpandedItem} />
            );
            default:
                return null;
        }
    };

    const renderScrollableTabBar = (props: any) => {
        const { navigationState, jumpTo } = props;

        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 0, alignItems: 'center' }}
                style={{ maxHeight: 60, minHeight: 40 }}
            >
                <View style={styles.tabBarContainer}>
                    {navigationState.routes.map((route: any, index: number) => {
                        const focused = navigationState.index === index;
                        const color = focused ? theme.colors.primary.main : theme.colors.text.light;

                        return (
                            <Pressable
                                key={route.key}
                                onPress={() => jumpTo(route.key)}
                                style={styles.tabItem}
                            >
                                <View style={styles.flexRow}>
                                    <Icon name={route.icon} color={color} size={16} />
                                    <TextStyle style={[styles.tabText, { color }, styles.iconSpacing]}>{route.title}</TextStyle>
                                </View>
                                {focused && <View style={styles.activeIndicator} />}
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    dispatch(fetchCandidateWorkHistory()),
                    dispatch(fetchCandidateEducations()),
                    dispatch(fetchCandidateProfessionalInfo()),
                    dispatch(fetchCandidateReferences()),
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [dispatch]);

    // Custom header with menu icon and profile title
    const handleMenuPress = () => {
        // @ts-ignore
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <SafeAreaView style={[styles.container, { flex: 1, backgroundColor: '#fff' }]}> {/* White background */}
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.primary.main, paddingHorizontal: 16, paddingTop: 40, paddingBottom: 30 }}>
                <Pressable onPress={handleMenuPress} style={{ marginRight: 16 }}>
                    <Icon name="menu" color="#fff" size={28} />
                </Pressable>
                <TextStyle size="lg" variant="bold" color="#fff">Profile</TextStyle>
            </View>
            {!expandedItem ?
                <View style={styles.candidateInfoCard}>
                    <CandidateInfoCard showCompleteButton={false} />
                </View> : null
            }
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: screenWidth }}
                renderTabBar={renderScrollableTabBar}
            />
        </SafeAreaView>
    );
};

const ProfileScreen = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerType: 'front',
                overlayColor: 'rgba(0,0,0,0.3)',
                drawerStyle: { height: '100%' },
            }}
            // @ts-ignore
            sceneContainerStyle={{ backgroundColor: 'transparent' }}
            drawerContent={(props) => <ProfileDrawer {...props} />}
        >
            <Drawer.Screen name="ProfileTabContent" component={ProfileTabContent} />
        </Drawer.Navigator>
    );
};

export default ProfileScreen;