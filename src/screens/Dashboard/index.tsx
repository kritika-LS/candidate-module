import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import DashboardGreetingsCard from '../../components/features/Dashboard/DashboardGreetingsCard/DashboardGreetingsCard';
import CandidateInfoCard from '../../components/features/Dashboard/CandidateInfoCard/CandidateInfoCard';
import PendingActionItem from '../../components/features/Dashboard/PendingActionItem/PendingActionItem';
import JobCard from '../../components/features/JobCard';
import { Job } from '../../models/types/Dashboard';

const pendingActions = [
  { id: '1', text: 'You have a pending Skills Checklist' },
  { id: '2', text: 'Personal information is incomplete' },
  { id: '3', text: 'You have a pending onboarding for Registered Nurse at Starlight Medical Center' },
];

const jobData: Job = {
  id: 'j1',
  title: 'Registered Nurse',
  type: 'Travel',
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
};

const DashboardScreen = () => (
  <ScrollView style={styles.container}>
    {/* <DashboardGreetingsCard /> */}
    <View style={styles.section}>
      {/* <CandidateInfoCard /> */}
    </View>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pending Actions</Text>
      {pendingActions.map((item) => (
        <PendingActionItem key={item.id} text={item.text} />
      ))}
    </View>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Jobs for you</Text>
      <JobCard job={jobData} />
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default DashboardScreen;