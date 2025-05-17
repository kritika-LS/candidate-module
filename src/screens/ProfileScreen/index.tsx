import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Overview } from './Overview';
import ProfileDrawer from '../../navigation/ProfileDrawer';
import CandidateInfoCard from '../../components/features/Dashboard/CandidateInfoCard/CandidateInfoCard';
import { Button, Dimensions, Pressable, SafeAreaView, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { TabView } from 'react-native-tab-view';
import { TextStyle } from '../../components/common/Text';
import { theme } from '../../theme';
import Icon from '../../components/common/Icon/Icon';
import CustomModal from '../../components/common/Modal';
import { AccordionItem, Route } from '../../types/profile';
import { PersonalDetails } from './PersonalDetails';
import HistoryListCard from '../../components/features/HistoryListCard';
import UploadFileModal from '../../components/features/UploadFileModal';

const screenWidth = Dimensions.get('window').width;

const Drawer = createDrawerNavigator();

const WorkHistorySection = () => {
    return (
        <ScrollView style={styles.sectionContainer}>
            {/* <TextStyle style={styles.sectionHeader}>Work History</TextStyle> */}
            {/* Work history content goes here */}
            {/* <TextStyle>Work history content will be displayed here</TextStyle> */}
            <HistoryListCard
                listIcon={'office-building'}
                title='Registered Nurse'
                subtitle1='ICU'
                subtitle2='Trauma Hospital'
                workSpaceName='Springfield Memorial Hospital - 867567'
                ratio='1:4'
                startDate='Jan 2020'
                endDate='Present'
                location='New York, NY'
                pillText={'Travel'}
                onEdit={() => console.log('Edit pressed')}
                onDelete={() => console.log('Delete pressed')}
            />
        </ScrollView>
    );
};

const EducationSection = () => {
    return (
        <ScrollView style={styles.sectionContainer}>
            <HistoryListCard
                listIcon={'bookshelf'}
                title='Bachelor of Science in Nursing '
                subtitle1='Bachelors'
                subtitle2='Full-Time'
                workSpaceName='Sapphire School of Medical Sciences'
                startDate='Dec 20, 2019'
                endDate='Oct 20, 2024'
                location='Pembroke Pines, Illinois, US'
                onEdit={() => console.log('Edit pressed')}
                onDelete={() => console.log('Delete pressed')}
            />
        </ScrollView>
    );
};

const OverviewSection = () => {
    return (
        <ScrollView style={styles.sectionContainer}>
            <View style={styles.profileCompletionContainer}>
                <TextStyle style={styles.sectionHeader}>Profile Completion</TextStyle>
                <View style={styles.completionItems}>
                    <TextStyle style={styles.completionItem}>Overview</TextStyle>
                    <TextStyle style={styles.completionItem}>Personal Details</TextStyle>
                    <TextStyle style={styles.completionItem}>Work History</TextStyle>
                    <TextStyle style={styles.completionItem}>Education</TextStyle>
                </View>
            </View>
        </ScrollView>
    );
};

export const ProfileScreen = () => {

    const [index, setIndex] = useState(0);
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
                <WorkHistorySection />
            );
        case 'Education':
            return (
                <EducationSection />
            );
        case 'ProfessionalInformation':
            return (
                <TextStyle>ProfessionalInformation</TextStyle>
            );
        default:
            return null;
        }
    };

    const renderScrollableTabBar = (props:any) => {
      const { navigationState, jumpTo } = props;
    
      return (
        <View style={styles.tabBarContainer}>
          {navigationState.routes.map((route:any, index: number) => {
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
      );
    };
    
    return (
        // <ProfileDrawer />
        <SafeAreaView style={styles.container}>

            { !expandedItem ?
                <View style={styles.candidateInfoCard}>
                    <CandidateInfoCard firstName='Jane' lastName='Cooper' />
                </View> : null
            }
            {/* <Button title="Open Modal" onPress={() => setModalVisible(true)} /> */}

            
            {/* <UploadFileModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onUpload={() => {
                    console.log('Upload clicked');
                    setModalVisible(false);
                }}
                uploadProgress={90} // Example progress value
                uploading={false} // Set to true if uploading
            /> */}

            {/* <CustomModal
                isVisible={modalVisible}
                title="Unsaved Changes"
                onClose={() => setModalVisible(false)}
                primaryButtonText="Save"
                secondaryButtonText="No"
                onPrimaryPress={() => {
                console.log('Yes clicked');
                setModalVisible(false);
                }}
                onSecondaryPress={() => {
                console.log('No clicked');
                setModalVisible(false);
                }}
            >
                <TextStyle size='xs' color={theme.colors.text.light} style={{width: "80%"}}>You have unsaved changes. Do you want to save before exiting?</TextStyle>
            </CustomModal> */}

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
