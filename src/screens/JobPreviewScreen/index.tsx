import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Header } from '../../components/common/Header';
import JobCard from '../../components/features/JobCard';
import JobDescriptionCard from './JobDescriptionCard';
import JobOverviewCard from './JobOverviewCard';
import SkillsChecklistCard from './SkillsChecklistCard';
import BenefitsCard from './BenefitsCard';
import SocialMediaCard from './SocialMediaCard';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { fetchJobDetails } from '../../store/thunk/jobDetails.thunk';
import { RootState } from '../../store';
import { ApiError } from '../../models/types/common';
import { TextStyle } from '../../components/common/Text';
import { theme } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { EmptyJobs } from '../../components/features/EmptyJobs';
import CustomModal from '../../components/common/Modal';
import { withdrawApplication } from '../../store/thunk/withdrawApplication.thunk';
import { fetchDashboardStatistics } from '../../store/thunk/dashboardStats.thunk';
import { fetchCandidatePoolJobs } from '../../store/thunk/candidatePoolJobs.thunk';
import Toast from 'react-native-toast-message';
import { fetchSkillChecklistResponses } from '../../store/thunk/fetchSkillChecklistResponses.thunk';
import { applyForJob } from '../../store/thunk/applyJob.thunk';
import { fetchRecommendedJobs } from '../../store/thunk/jobs.thunk';
import JobPreviewSkeleton from './JobPreviewSkeleton';

type JobPreviewScreenRouteParams = {
  jobId: string;
  currentTab?: string;
};

type JobPreviewScreenRouteProp = RouteProp<{ JobPreview: JobPreviewScreenRouteParams }, 'JobPreview'>;

const JobPreviewScreen = () => {
  const route = useRoute<JobPreviewScreenRouteProp>();
  const navigation = useNavigation<any>();
  const { jobId } = route.params;
  const dispatch = useAppDispatch();
  const jobDetails = useAppSelector((state: RootState) => state?.jobDetails?.data);
  const loading = useAppSelector((state: RootState) => state?.jobDetails?.loading);

  const checklistData = useAppSelector(state => state.skillChecklist.all.items);

  const [isWithdrawModalVisible, setIsWithdrawModalVisible] = useState(false);
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [hideApplyButton, setHideApplyButton] = useState(false);
  const [modalJobTitle, setModalJobTitle] = useState<string>('');

  const refetchCurrentJobDetails = useCallback(() => {
    if (jobId) {
      dispatch(fetchJobDetails(jobId));
    }
  }, [dispatch, jobId]);

  useEffect(() => {
    if (jobId) {
      dispatch(fetchJobDetails(jobId));
    }
  }, [jobId, dispatch]);

  const handleWithdrawConfirm = async () => {
    if (!jobId) {
      Toast.show({
        type: 'error',
        text1: 'Job ID is missing, cannot withdraw application.',
      });
      setIsWithdrawModalVisible(false);
      return;
    }
    try {
      await dispatch(withdrawApplication(jobId)).unwrap();
      Toast.show({ type: 'success', text1: 'Application withdrawn successfully!' });
      setIsWithdrawModalVisible(false);
      dispatch(fetchDashboardStatistics());
      dispatch(fetchCandidatePoolJobs({ page: 0, pageSize: 10, candidateProcessStatus: 'A' }));
      navigation.goBack();
    } catch (err: unknown) {
      const apiError = err as ApiError;
      console.error('Withdraw application failed:', apiError.message);
      Toast.show({
        type: 'error',
        text1: 'Withdrawal Failed',
        text2: apiError.message || 'Could not withdraw application.',
      });
    }
  };

  const handleApplyWithChecklist = useCallback((checklistId: string, jobTitle: string) => {
    setModalJobTitle(jobTitle);
    setShowChecklistModal(true);
  }, []);

  const handleSkipAndApply = async () => {
    try {
      setShowChecklistModal(false);
      if (jobId) {
        await dispatch(applyForJob(jobId));
        await dispatch(fetchRecommendedJobs({ 
          page: 0, 
          pageSize: 10, 
          sortBy: 'RELEVANCE',
          job_category: 'Healthcare'
        }));
        Toast.show({ type: 'success', text1: `Successfully applied for "${jobDetails?.jobTitle || 'Unknown'}"!` });
      }
    } catch (error) {
      console.error('Failed to apply for job:', error);
    }
  };

  useEffect(() => {
    if(jobDetails?.checklistId) {
      dispatch(fetchSkillChecklistResponses({
        pageFrom: 0,
        pageSize: 10,
        checklistId: jobDetails?.checklistId || '',
      }))
    }
  }, [jobDetails?.checklistId, dispatch]);

  if (loading) {
    return (
      <View style={{flex: 1}}>
        <Header showBackButton title="Job Details" />
        <JobPreviewSkeleton />
      </View>
    );
  }
  if (!jobDetails) {
    return (
      <View style={{flex: 1}}>
        <Header showBackButton title="Job Details" />
        <EmptyJobs noJobsText="Job details not found." />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
      <Header showBackButton title="Job Details" />
      <ScrollView contentContainerStyle={[styles.scrollViewContent, { paddingTop: 16 }]}> 
        <JobCard
          job={jobDetails}
          fetchJobs={refetchCurrentJobDetails}
          onPress={() => {}}
          screen={'JobPreviewScreen'}
          currentTab={route?.params?.currentTab as 'applications' | 'saved' | 'onboardings' | 'assignments' | undefined}
          onApplyWithChecklist={handleApplyWithChecklist}
        />
        <JobDescriptionCard description={jobDetails?.jobDescriptionText || ''} />
        <JobOverviewCard jobData={jobDetails} />
        <SkillsChecklistCard skills={jobDetails?.skillData || []} />
        <BenefitsCard benefits={jobDetails.benefits || ''} />
        <SocialMediaCard url={jobDetails.socialMediaUrl || ''} />
      </ScrollView>
      {route?.params?.currentTab === 'applications' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.withdrawButton} onPress={() => setIsWithdrawModalVisible(true)}>
            <TextStyle size='sm' color={theme.colors.blue.light}>Withdraw</TextStyle>
          </TouchableOpacity>
        </View>
      )}

      <CustomModal
        isVisible={isWithdrawModalVisible}
        onClose={() => setIsWithdrawModalVisible(false)}
        title="Withdraw Application"
        primaryButtonText="Yes"
        onPrimaryPress={handleWithdrawConfirm}
        secondaryButtonText="No"
        onSecondaryPress={() => setIsWithdrawModalVisible(false)}
      >
        <TextStyle size='md'>Are you sure you want to withdraw your application?</TextStyle>
      </CustomModal>

      {/* Checklist Modal */}
      <CustomModal
        isVisible={showChecklistModal}
        onClose={() => setShowChecklistModal(false)}
        title={modalJobTitle}
        primaryButtonText="Complete"
        onPrimaryPress={() => {
          setShowChecklistModal(false);
          navigation.navigate('SingleSkillChecklist', { checklistId: jobDetails?.checklistId, checklistData: checklistData?.[0], hideDraftButton: true });
        }}
        secondaryButtonText="Skip"
        onSecondaryPress={handleSkipAndApply}
      >
        <TextStyle size="md" style={{ marginBottom: 16 }}>
          Boost your application with a quick skills checklist. Would you like to complete it now?
        </TextStyle>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
    paddingBottom: 40,
  },
  buttonContainer: {
    paddingTop: 10,
    paddingBottom: 28,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.text.white,
    borderTopWidth: 0.7,
    borderTopColor: theme.colors.grey[300],
  },
  applyButton: {
    flex: 1,
    marginRight: 8,
  },
  notInterestedButton: {
    flex: 1,
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: theme.colors.text.light,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.text.light,
  },
  withdrawButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: theme.colors.blue.light,
    borderRadius: 24,
    alignItems: 'center',
    alignSelf: 'flex-end',
  }
});

export default JobPreviewScreen;