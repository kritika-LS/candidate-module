import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Overview } from './Overview';
import ProfileDrawer from '../../navigation/ProfileDrawer';
import CandidateInfoCard from '../../components/features/Dashboard/CandidateInfoCard/CandidateInfoCard';
import { Dimensions, Pressable, SafeAreaView, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { TabView } from 'react-native-tab-view';
import { TextStyle } from '../../components/common/Text';
import { theme } from '../../theme';
import Icon from '../../components/common/Icon/Icon';

const screenWidth = Dimensions.get('window').width;

// ----- Type Definitions -----
type Route = {
    key: string;
    title: string;
    icon: string;
};

type AccordionItem = {
    title: string;
    completed: boolean;
    content: React.ReactNode;
};

const Drawer = createDrawerNavigator();

const PersonalDetailsSection = () => {
    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    
    const accordionItems: AccordionItem[] = [
        {
            title: 'Basic Information',
            completed: false,
            content: (
                <View style={styles.accordionContent}>
                    <TextStyle style={styles.sectionTitle}>Upload Picture</TextStyle>
                    <TextStyle style={styles.subTitle}>Accepted File Formats: PNG, JPEG, JPG up to 10 MB</TextStyle>
                    
                    <View style={styles.formGroup}>
                        <TextStyle style={styles.label}>First Name *</TextStyle>
                        <TextInput 
                            style={styles.input}
                            value="Alex"
                        />
                    </View>
                    
                    <View style={styles.formGroup}>
                        <TextStyle style={styles.label}>Middle Name</TextStyle>
                        <TextInput 
                            style={styles.input}
                            placeholder="Enter middle name"
                        />
                    </View>
                    
                    <View style={styles.formGroup}>
                        <TextStyle style={styles.label}>Profile Title *</TextStyle>
                        <TextInput 
                            style={styles.input}
                            value="Registered Nurse"
                        />
                    </View>
                    
                    <View style={styles.formGroup}>
                        <TextStyle style={styles.label}>Overall Experience *</TextStyle>
                        <TextInput 
                            style={styles.input}
                            value="2"
                        />
                    </View>
                    
                    <View style={styles.formGroup}>
                        <TextStyle style={styles.label}>Email Address *</TextStyle>
                        <TextInput 
                            style={styles.input}
                            value="Janecooper@example.com"
                        />
                    </View>
                    
                    <View style={styles.formGroup}>
                        <TextStyle style={styles.label}>Alternate Email Address</TextStyle>
                        <TextInput 
                            style={styles.input}
                            placeholder="Enter alternate email address"
                        />
                    </View>
                    
                    <View style={styles.formGroup}>
                        <TextStyle style={styles.label}>Mobile Number *</TextStyle>
                        <View style={styles.phoneInput}>
                            <View style={styles.countryCode}>
                                <TextStyle>US (+1)</TextStyle>
                            </View>
                            <TextInput 
                                style={[styles.input, {flex: 1}]}
                                placeholder="Enter mobile number"
                            />
                        </View>
                    </View>
                    
                    <View style={styles.formGroup}>
                        <TextStyle style={styles.label}>Alternate Mobile Number</TextStyle>
                        <View style={styles.phoneInput}>
                            <View style={styles.countryCode}>
                                <TextStyle>US (+1)</TextStyle>
                            </View>
                            <TextInput 
                                style={[styles.input, {flex: 1}]}
                                placeholder="Enter mobile number"
                            />
                        </View>
                    </View>
                    
                    <View style={styles.formGroup}>
                        <TextStyle style={styles.label}>Known As</TextStyle>
                        <TextInput 
                            style={styles.input}
                            placeholder="Enter known as"
                        />
                    </View>
                </View>
            )
        },
        {
            title: 'Address Details',
            completed: false,
            content: <View style={styles.accordionContent}><TextStyle>Address Details Form</TextStyle></View>
        },
        {
            title: 'Professional Details',
            completed: false,
            content: <View style={styles.accordionContent}><TextStyle>Professional Details Form</TextStyle></View>
        },
        {
            title: 'Portfolio',
            completed: false,
            content: <View style={styles.accordionContent}><TextStyle>Portfolio Form</TextStyle></View>
        },
        {
            title: 'Job Preferences',
            completed: false,
            content: <View style={styles.accordionContent}><TextStyle>Job Preferences Form</TextStyle></View>
        },
        {
            title: 'Submittal Information',
            completed: false,
            content: <View style={styles.accordionContent}><TextStyle>Submittal Information Form</TextStyle></View>
        },
        {
            title: 'Emergency Contact and Address',
            completed: false,
            content: <View style={styles.accordionContent}><TextStyle>Emergency Contact Form</TextStyle></View>
        }
    ];

    return (
        <ScrollView style={styles.personalDetailsContainer}>
            <TextStyle style={styles.sectionHeader}>Personal Details</TextStyle>
            
            {accordionItems.map((item, index) => (
                <View key={index} style={styles.accordionItem}>
                    <TouchableOpacity 
                        style={styles.accordionHeader}
                        onPress={() => setExpandedItem(expandedItem === item.title ? null : item.title)}
                    >
                        <View style={styles.accordionTitleContainer}>
                            {/* {item.completed ? (
                                <Icon name="check-circle" size={20} color={theme.colors.status.success} />
                            ) : (
                                <View style={styles.incompleteCircle} />
                            )} */}
                            <TextStyle style={styles.accordionTitle}>{item.title}</TextStyle>
                        </View>
                        <Icon 
                            name={expandedItem === item.title ? "chevron-up" : "chevron-down"} 
                            size={20} 
                            color={theme.colors.text.light} 
                        />
                    </TouchableOpacity>
                    
                    {expandedItem === item.title && item.content}
                </View>
            ))}
        </ScrollView>
    );
};

const WorkHistorySection = () => {
    return (
        <ScrollView style={styles.sectionContainer}>
            <TextStyle style={styles.sectionHeader}>Work History</TextStyle>
            {/* Work history content goes here */}
            <TextStyle>Work history content will be displayed here</TextStyle>
        </ScrollView>
    );
};

const EducationSection = () => {
    return (
        <ScrollView style={styles.sectionContainer}>
            <TextStyle style={styles.sectionHeader}>Education</TextStyle>
            {/* Education content goes here */}
            <TextStyle>Education content will be displayed here</TextStyle>
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

    const [routes] = useState<Route[]>([
        { key: 'Overview', title: 'Overview', icon: 'account-circle-outline' },
        { key: 'PersonalDetails', title: 'Personal Details', icon: 'home-outline' },
        { key: 'Work History', title: 'WorkHistory', icon: 'briefcase-outline' },
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
                <PersonalDetailsSection />
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

            <View style={styles.candidateInfoCard}>
                <CandidateInfoCard firstName='' lastName='' />
            </View>

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
