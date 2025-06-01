import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, Button, ScrollView, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList, RootStackParamList } from '../../types/navigation';
import DashboardGreetingsCard from '../../components/features/Dashboard/DashboardGreetingsCard/DashboardGreetingsCard';
import CandidateInfoCard from '../../components/features/Dashboard/CandidateInfoCard/CandidateInfoCard';
import PendingActionItem from '../../components/features/Dashboard/PendingActionItem/PendingActionItem';
import JobCard from '../../components/features/JobCard';
import { Job } from '../../models/types/Dashboard';
import { JobDetails } from '../../models/types/jobDetails';
import { styles } from './styles';
import { TextStyle } from '../../components/common/Text';
import Icon from '../../components/common/Icon/Icon';
import { theme } from '../../theme';
import { DashboardStats } from '../../components/features/Dashboard/DashboardStats';
import { fetchRecommendedJobs } from '../../store/thunk/jobs.thunk';
import { clearJobsError } from '../../store/slices/jobs.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchPendingActions } from '../../store/thunk/pendingActions.thunk';
import { fetchDashboardStatistics } from '../../store/thunk/dashboardStats.thunk';
import { fetchCandidate } from '../../store/thunk/candidate.thunk';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchCandidatePersonalDetails } from '../../store/thunk/candidatePersonalDetails.thunk';
import { useAuth } from '../../context/AuthContext';
import DashboardStatsSkeleton from '../../components/features/Dashboard/DashboardStats/DashboardStatsSkeleton';
import CandidateInfoCardSkeleton from '../../components/features/Dashboard/CandidateInfoCard/CandidateInfoCardSkeleton';
import JobCardSkeleton from '../../components/features/JobCard/JobCardSkeleton';
import { CandidatePoolJobsApiResponse } from '../../models/types/candidatePoolJobs';
import { convertJobToJobDetails } from '../SearchJobs';
import { useSearchJobs } from '../../hooks/useSearchJobs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = DrawerScreenProps<DrawerParamList, 'HomeScreen'>;
type SearchJobsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SearchJobs'>;
type SortByOption = 'RELEVANCE' | 'NEWEST' | 'PAYRATE';

const sortByOptions: { label: string; value: SortByOption }[] = [
  { label: 'Relevance', value: 'RELEVANCE' },
  { label: 'Newest', value: 'NEWEST' },
  { label: 'Highest Pay', value: 'PAYRATE' },
];

const mapJobToJobDetails = (job: Job): JobDetails => ({
  jobId: job.jobId,
  appliedDate: '',
  jobReferenceNumber: job.jobReferenceNumber,
  externalJobId: '',
  enterpriseId: '',
  facilityName: job.facilityName,
  clientEnterpriseId: null,
  facilityEnterpriseId: null,
  mspEnterpriseId: null,
  enterpriseUserId: 0,
  jobDescriptionUrl: null,
  jobDescriptionText: '',
  jobTitle: job.jobTitle,
  jobCategory: '',
  skillData: [],
  payRateType: '',
  payRateTypeFullText: null,
  payRateMinimum: job.payRateMinimum ? parseFloat(job.payRateMinimum) : null,
  payRateMaximum: job.payRateMaximum ? parseFloat(job.payRateMaximum) : null,
  overallYearsOfExperienceMinimum: job.overallYearsOfExperienceMinimum ? parseFloat(job.overallYearsOfExperienceMinimum) : null,
  overallYearsOfExperienceMaximum: job.overallYearsOfExperienceMaximum ? parseFloat(job.overallYearsOfExperienceMaximum) : null,
  jobExperienceLevel: job.jobExperienceLevel,
  jobExperienceLevelFullText: null,
  currency: '',
  jobType: job.jobType,
  workFrom: '',
  workFromFullText: null,
  country: job.country,
  state: job.state,
  city: job.city,
  zipCode: '',
  latitude: null,
  longitude: null,
  shiftType: '',
  shiftStartTime: '',
  shiftEndTime: '',
  shiftTimezone: null,
  shiftDetails: job.shiftDetails,
  minimumEducation: null,
  minimumEducationFullText: null,
  numberOfOpenings: job.numberOfOpenings,
  postedOn: job.postedOn,
  refreshedOn: '',
  validFrom: job.validFrom,
  duration: job.duration,
  validTill: job.validTill,
  benefits: null,
  additionalFields: null,
  checklistId: null,
  status: '',
  statusFullText: null,
  numberOfViews: 0,
  socialMediaUrl: null,
  allowedToWorkInOtherJobs: '',
  limitForApplications: null,
  limitForShortlists: null,
  interviewConfigurations: null,
  interviewStopCriteria: null,
  numberOfCalendarSchedulesToBlock: null,
  expiryMinutesForAcceptingSchedules: null,
  jobEducationalQualifications: [],
  candidateProcessStatus: null
});

const HomeScreen: React.FC<Props> = () => {
    const navigation = useNavigation<SearchJobsNavigationProp>();
    const scrollViewRef = useRef();
  const {isRegistered } = useAuth();
  const dispatch = useAppDispatch();
  const {jobsObject, jobs} = useAppSelector((state) => state?.jobs) as unknown as CandidatePoolJobsApiResponse;
  const pendingActionsData = useAppSelector((state) => state?.pendingActions?.actions) as unknown as { responsePayload: Record<string, { pending: boolean; messages: string[] }> };

  const jobData: JobDetails[] = (jobs || []).map(mapJobToJobDetails);
  const {
      sortByOption,
      setSortByOption,
      hasMoreJobs,
      isLoadingMore,
      showSortDropdown,
      loadMoreJobs,
      PAGE_SIZE,
      setCurrentPage,
      setHasMoreJobs,
      setShowSortDropdown,
    } = useSearchJobs();

  const [loading, setLoading] = useState(true);

  // Function to map pending action messages to target screens
  const getTargetScreenForMessage = (message: string) => {
    if (message.includes("Work history is incomplete")) {
      return { screen: 'WorkHistory', tabIndex: 2 }; // Index 2 for Work History tab
    }
    if (message.includes("Education details are incomplete")) {
      return { screen: 'Education', tabIndex: 3 }; // Index 3 for Education tab
    }
    if (message.includes("Professional Information is incomplete")) {
      return { screen: 'ProfessionalInformation', tabIndex: 4 }; // Index 4 for Professional Information tab
    }
    if (message.includes("Personal Details are incomplete")) { // Assuming this might be a message
        return { screen: 'PersonalDetails', tabIndex: 1 }; // Index 1 for Personal Details tab
    }
    // Add more conditions for other pending actions
    return { screen: 'Overview', tabIndex: 0 }; // Default to Overview or a suitable default
  };

  const pendingActions = Object.entries(pendingActionsData?.responsePayload || {})
    .filter(([, value]) => (value as { pending: boolean; messages: string[] }).pending && (value as { pending: boolean; messages: string[] }).messages.length > 0)
    .flatMap(([, value]) => (value as { pending: boolean; messages: string[] }).messages)
    .map((message, index) => ({ 
      id: String(index + 1), 
      text: message ,
      ...getTargetScreenForMessage(message),
    }));

  const pendingActionsCount = pendingActions.length;

  const fetchJobs = useCallback(async () => {
    console.log("tag 10")
    await dispatch(fetchRecommendedJobs({ 
      page: 0, 
      pageSize: 10, 
      sortBy: sortByOption,
      job_category: 'Healthcare'
    }));
  }, [dispatch, sortByOption]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      await dispatch(fetchCandidate()).unwrap();
      await Promise.all([
        fetchJobs(),
        dispatch(fetchPendingActions()),
        dispatch(fetchDashboardStatistics()),
        dispatch(fetchCandidate()),
        dispatch(fetchCandidatePersonalDetails()),
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isNearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;

    if (isNearBottom && hasMoreJobs && !isLoadingMore) {
      loadMoreJobs();
    }
  };

  const handleSortByChange = (option: SortByOption) => {
      setSortByOption(option);
      setShowSortDropdown(false);
      setCurrentPage(0);
      setHasMoreJobs(true);
    };

  useEffect(() => {
    fetchInitialData();
    return () => {
      dispatch(clearJobsError());
    };
  }, [isRegistered]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <ScrollView
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={styles.container} >
      <DashboardGreetingsCard />

      {loading ? (
        <DashboardStatsSkeleton />
      ) : (
        <DashboardStats />
      )}

      <View style={styles.body}>
        <View style={styles.section}>
          {loading ? (
            <CandidateInfoCardSkeleton />
          ) : (
            <CandidateInfoCard />
          )}
        </View>

        {!loading && pendingActions.length > 0 && (
          <View style={styles.pendingActionSection}>
            <View style={styles.pendingActionHeader}>
              <Icon name='alert-circle' size={12} color={theme.colors.status.error} />
              <TextStyle size='xs' color={theme.colors.status.error} style={{marginLeft: 6}}>Pending Actions</TextStyle>
              <View style={styles.pendingTasks}>
                <TextStyle size='xs' color={theme.colors.secondary.dark}>{pendingActionsCount < 10 ? `0${pendingActionsCount}` : pendingActionsCount}</TextStyle>
              </View>
            </View>
            {pendingActions.map((item) => (
              <PendingActionItem
                key={item.id}
                text={item.text}
                item={item}
                targetScreen={item.screen}
                targetTabIndex={item.tabIndex}
              />
            ))}
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.jobHeader}>
            <Text style={styles.sectionTitle}>{jobsObject?.totalResults || 0} Jobs for you</Text>
            <View>
            <View style={styles.sortContainer}>
              <View style={styles.sortRow}>
              <Text style={styles.sortLabel}>Sort by</Text>
              <TouchableOpacity
                style={styles.sortDropdown}
                onPress={() => setShowSortDropdown(!showSortDropdown)}
              >
                <Icon name="swap-vertical" size={20} color={theme.colors.text.light} />
                <Text style={styles.sortValue}>{sortByOptions.find(option => option.value === sortByOption)?.label || 'Relevance'}</Text>
                <Icon name="chevron-down" size={20} color={theme.colors.text.light} />
              </TouchableOpacity>
            </View>

            {showSortDropdown && (
              <View style={styles.suggestionsContainer}>
                {sortByOptions.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    style={styles.suggestionItem}
                    onPress={() => handleSortByChange(item.value)}
                  >
                    <TextStyle variant="regular" size="sm">
                      {item.label}
                    </TextStyle>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            </View>
            </View>
          </View>

          {loading ? (
            // Show 3 skeleton job cards while loading
            Array(3).fill(0).map((_, index) => (
              <JobCardSkeleton key={index} />
            ))
          ) : (
            jobData.map((job) => (
              <JobCard
                key={job.jobId}
                job={job}
                fetchJobs={() => {
                  fetchJobs();
                }}
                onPress={() => navigation.navigate('JobPreviewScreen', { jobId: job.jobId })}
              />
            ))
          )}
          {isLoadingMore && (
              <View style={{ padding: 16 }}>
                <ActivityIndicator size="small" />
              </View>
            )}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;