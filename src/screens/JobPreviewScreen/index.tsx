import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Header } from '../../components/common/Header';
import JobCard from '../../components/features/JobCard';
import { Button } from '../../components/common/Button';
import JobDescriptionCard from './JobDescriptionCard';
import JobOverviewCard from './JobOverviewCard';
import SkillsChecklistCard from './SkillsChecklistCard';
import BenefitsCard from './BenefitsCard';
import SocialMediaCard from './SocialMediaCard';
import { mockJob, mockDescription, mockOverview, mockSkills, mockBenefits, mockSocialUrl } from './mockData';

const JobPreviewScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
      <Header showBackButton title="Job Details" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <JobCard job={mockJob} />
        <JobDescriptionCard description={mockDescription} />
        <JobOverviewCard overview={mockOverview} />
        <SkillsChecklistCard skills={mockSkills} />
        <BenefitsCard benefits={mockBenefits} />
        <SocialMediaCard url={mockSocialUrl} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }}>
          <Button title="Apply" onPress={() => {}} style={{ flex: 1, marginRight: 8 }} />
          <Button title="Not Interested" onPress={() => {}} variant="secondary" style={{ flex: 1, marginLeft: 8 }} />
        </View>
      </ScrollView>
    </View>
  );
};

export default JobPreviewScreen; 