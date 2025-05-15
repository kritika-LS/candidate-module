import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../../types/navigation';
import DashboardGreetingsCard from '../../components/features/Dashboard/DashboardGreetingsCard/DashboardGreetingsCard';
import CandidateInfoCard from '../../components/features/Dashboard/CandidateInfoCard/CandidateInfoCard';
import PendingActionItem from '../../components/features/Dashboard/PendingActionItem/PendingActionItem';
import JobCard from '../../components/features/JobCard';
import { Job } from '../../models/types/Dashboard';
import { styles } from './styles';
import { TextStyle } from '../../components/common/Text';
import Icon from '../../components/common/Icon/Icon';
import { theme } from '../../theme';
import { DashboardStats } from '../../components/features/Dashboard/DashboardStats';

const pendingActions = [
  { id: '1', text: 'You have a pending Skills Checklist' },
  { id: '2', text: 'Personal information is incomplete' },
  { id: '3', text: 'You have a pending onboarding for Registered Nurse at Starlight Medical Center' },
];

const jobData: Job[] = [
  {
    id: 'j1',
    title: 'Registered Nurse',
    type: 'Travel',
    companyName: 'Starlight Medical Center',
    location: 'Syracuse, NY, US',
    reference: 'RE-1032YPL',
    rate: '$2484 - $2681',
    experience: '0-2 years',
    shift: '3x12 Day',
    openings: 1,
    startDate: 'Dec 02, 2024',
    endDate: 'Mar 02, 2025',
    duration: '3 Months',
    postedAgo: '2 days ago',
  },
  {
    id: 'j2',
    title: 'Registered Nurse',
    type: 'Travel',
    companyName: 'Starlight Medical Center',
    location: 'Syracuse, NY, US',
    reference: 'RE-1032YPL',
    rate: '$2484 - $2681',
    experience: '0-2 years',
    shift: '3x12 Day',
    openings: 1,
    startDate: 'Dec 02, 2024',
    endDate: 'Mar 02, 2025',
    duration: '3 Months',
    postedAgo: '2 days ago',
  },
];

type Props = DrawerScreenProps<DrawerParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <DashboardGreetingsCard firstName='Jane' lastName='Cooper' />

      {/* <View> */}
        <DashboardStats />
      {/* </View> */}

      <View style={styles.body}>

        <View style={styles.section}>
          <CandidateInfoCard firstName='Jane' lastName='Cooper' />
        </View>

        <View style={styles.pendingActionSection}>
          <View style={styles.pendingActionHeader}>
            <Icon name='alert-circle' size={12} color={theme.colors.status.error} />
            <TextStyle size='xs' color={theme.colors.status.error} style={{marginLeft: 6}}>Pending Actions</TextStyle>
            <View style={styles.pendingTasks}>
              <TextStyle size='xs' color={theme.colors.secondary.dark}>03</TextStyle>
            </View>
          </View>
          {pendingActions.map((item) => (
            <PendingActionItem key={item.id} text={item.text} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Jobs for you</Text>
          {jobData.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </View>
        
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
