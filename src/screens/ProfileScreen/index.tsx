import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { OverviewSection } from './Overview';
import CandidateInfoCard from '../../components/features/Dashboard/CandidateInfoCard/CandidateInfoCard';
import { Dimensions, Pressable, SafeAreaView, View, ScrollView } from 'react-native';
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

const screenWidth = Dimensions.get('window').width;

const Drawer = createDrawerNavigator();

export const ProfileScreen = () => {

    const dispatch = useAppDispatch();

    const [index, setIndex] = useState(1);
    const [expandedItem, setExpandedItem] = useState<string | null>(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [routes] = useState<Route[]>([
        { key: 'Overview', title: 'Overview', icon: 'account-circle-outline' },
        { key: 'PersonalDetails', title: 'Personal Details', icon: 'home-outline' },
        { key: 'WorkHistory', title: 'Work History', icon: 'briefcase-outline' },
        { key: 'Education', title: 'Education', icon: 'tune' },
        { key: 'ProfessionalInformation', title: 'Professional Information', icon: 'tune' }
    ]);

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
                    <WorkHistory />
                );
            case 'Education':
                return (
                    <Education />
                );
            case 'ProfessionalInformation':
                return (
                    <>
                    <ProfessionalInformation expandedItem={expandedItem} setExpandedItem={setExpandedItem} />
                    </>
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
                                <TextStyle style={[styles.tabText, { color }]}>{route.title}</TextStyle>
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

    return (
        <SafeAreaView style={styles.container}>

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