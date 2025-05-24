import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, ScrollView, ActivityIndicator } from 'react-native';
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
import { fetchRecommendedJobs } from '../../store/thunk/jobs.thunk';
import { clearJobsError } from '../../store/slices/jobs.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchPendingActions } from '../../store/thunk/pendingActions.thunk';
import { fetchDashboardStatistics } from '../../store/thunk/dashboardStats.thunk';
import { fetchCandidate } from '../../store/thunk/candidate.thunk';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchCandidatePersonalDetails } from '../../store/thunk/candidatePersonalDetails.thunk';
import LottieView from 'lottie-react-native';

type Props = DrawerScreenProps<DrawerParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {

  const dispatch = useAppDispatch();
  const jobs = useAppSelector((state) => state.jobs.jobs);
  const pendingActionsData = useAppSelector((state) => state.pendingActions.actions) as unknown as { responsePayload: Record<string, { pending: boolean; messages: string[] }> };

  //@ts-ignore
  const jobData: Job[] = jobs?.responsePayload || [];

  console.log({jobData})

  const [open, setOpen] = useState(false);
  const [sortByOption, setSortByOption] = useState('Relevance');
  const [items, setItems] = useState([
    { label: 'Relevance', value: 'Relevance' },
    { label: 'Newest', value: 'Newest' },
    { label: 'Highest Pay', value: 'PayRate' },
  ]);

  const [loading, setLoading] = useState(true);

  const pendingActions = Object.entries(pendingActionsData?.responsePayload || {})
    .filter(([, value]) => (value as { pending: boolean; messages: string[] }).pending && (value as { pending: boolean; messages: string[] }).messages.length > 0)
    .flatMap(([, value]) => (value as { pending: boolean; messages: string[] }).messages)
    .map((message, index) => ({ id: String(index + 1), text: message }));

  const pendingActionsCount = pendingActions.length;

  const fetchJobs = useCallback(async () => {
    const sortBy = sortByOption === 'Newest' ? 'NEWEST' : 
                  sortByOption === 'Highest Pay' ? 'PAYRATE' : 'RELEVANCE';
    
    await dispatch(fetchRecommendedJobs({ 
      page: 0, 
      pageSize: 10, 
      sortOrder: 'Desc', 
      sortBy,
      jobCategory: 'Healthcare'
    }));
  }, [dispatch, sortByOption]);

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    try {
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
  }, [dispatch, fetchJobs]);

  useEffect(() => {
    fetchInitialData();
    return () => {
      dispatch(clearJobsError());
    };
  }, [fetchInitialData]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <LottieView
          source={require('../../../assets/animations/Loader 1.json')}
          autoPlay
          loop
          style={{ width: 100, height: 100 }}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <DashboardGreetingsCard />

      {/* <View> */}
        <DashboardStats />
      {/* </View> */}

      <View style={styles.body}>

        <View style={styles.section}>
          <CandidateInfoCard />
        </View>

        {pendingActions.length > 0 && (
          <View style={styles.pendingActionSection}>
            <View style={styles.pendingActionHeader}>
              <Icon name='alert-circle' size={12} color={theme.colors.status.error} />
              <TextStyle size='xs' color={theme.colors.status.error} style={{marginLeft: 6}}>Pending Actions</TextStyle>
              <View style={styles.pendingTasks}>
                <TextStyle size='xs' color={theme.colors.secondary.dark}>{pendingActionsCount < 10 ? `0${pendingActionsCount}` : pendingActionsCount}</TextStyle>
              </View>
            </View>
            {pendingActions.map((item) => (
              <PendingActionItem key={item.id} text={item.text} />
            ))}
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.jobHeader}>
            <Text style={styles.sectionTitle}>{jobData.length || 0} Jobs for you</Text>
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

          {jobData.map((job) => (
            <JobCard key={job.jobId} job={job} />
          ))}
        </View>

      </View>
    </ScrollView>
  );
};

export default HomeScreen;