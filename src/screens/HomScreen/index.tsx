import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, ScrollView, ActivityIndicator } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../../types/navigation';
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

type Props = DrawerScreenProps<DrawerParamList, 'HomeScreen'>;

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

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const {isRegistered } = useAuth();
  const dispatch = useAppDispatch();
  const jobs = useAppSelector((state) => state?.jobs?.jobs) as unknown as CandidatePoolJobsApiResponse;
  const pendingActionsData = useAppSelector((state) => state?.pendingActions?.actions) as unknown as { responsePayload: Record<string, { pending: boolean; messages: string[] }> };

  const jobData: JobDetails[] = (jobs?.responsePayload || []).map(mapJobToJobDetails);

  const [open, setOpen] = useState(false);
  const [sortByOption, setSortByOption] = useState('Relevance');
  const [items, setItems] = useState([
    { label: 'Relevance', value: 'Relevance' },
    { label: 'Newest', value: 'Newest' },
    { label: 'Highest Pay', value: 'PayRate' },
  ]);

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
    const sortBy = sortByOption === 'Newest' ? 'NEWEST' : 
                  sortByOption === 'Highest Pay' ? 'PAYRATE' : 'RELEVANCE';
    
    await dispatch(fetchRecommendedJobs({ 
      page: 0, 
      pageSize: 10, 
      sortBy,
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
    <ScrollView style={styles.container}>
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
            <Text style={styles.sectionTitle}>{jobs?.totalResults || 0} Jobs for you</Text>
            <View>
              <TextStyle size='sm' style={styles.sortByText}>
                Sort by
              </TextStyle>
              <DropDownPicker
                open={open}
                value={sortByOption}
                items={items}
                setOpen={setOpen}
                setValue={setSortByOption}
                setItems={setItems}
                style={styles.dropdown}
                listItemLabelStyle={styles.dropdownLabel}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={styles.dropdownLabel}
              />
            </View>
          </View>

          {loading ? (
            // Show 3 skeleton job cards while loading
            Array(3).fill(0).map((_, index) => (
              <JobCardSkeleton key={index} />
            ))
          ) : (
            jobData.map((job) => (
              <JobCard key={job.jobId} job={job} fetchJobs={fetchJobs} />
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;