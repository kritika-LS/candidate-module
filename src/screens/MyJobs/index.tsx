// MyJobs.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import { TabView, SceneRendererProps, NavigationState } from 'react-native-tab-view';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextStyle } from '../../components/common/Text';
import { theme } from '../../theme';
import JobCard from '../../components/features/JobCard';
import { EmptyJobs } from '../../components/features/EmptyJobs';
import { RootState } from '../../store';
import { Job } from '../../models/types/Dashboard';
import { JobDetails } from '../../models/types/jobDetails';
import { fetchDashboardStatistics } from '../../store/thunk/dashboardStats.thunk';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchCandidatePoolJobs } from '../../store/thunk/candidatePoolJobs.thunk';
import LottieView from 'lottie-react-native';

const screenWidth = Dimensions.get('window').width;

type TabKey = 'saved' | 'applications' | 'onboardings' | 'assignments';

type RouteType = {
  key: TabKey;
  title: string;
};

type JobsByTabType = Record<TabKey, Job[]>;

const TABS: RouteType[] = [
  { key: 'saved', title: 'Saved Jobs' },
  { key: 'applications', title: 'Applications' },
  { key: 'onboardings', title: 'Onboardings' },
  { key: 'assignments', title: 'Assignments' },
];

export const MyJobs = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const dispatch = useAppDispatch();
  const { jobs: currentFetchedJobs, loading, error } = useAppSelector(
    (state: RootState) => state.candidatePoolJobs,
  );

  const dashboardStats = useAppSelector((state: RootState) => state?.dashboardStats?.statistics?.responsePayload) || {};

  const [index, setIndex] = useState(0);
  const [routes] = useState<RouteType[]>(TABS);
  const [jobsByTab, setJobsByTab] = useState<JobsByTabType>({
    saved: [],
    applications: [],
    onboardings: [],
    assignments: [],
  });

  // Use a ref to store the current tab index to avoid stale closures in useCallback dependencies
  const currentTabIndexRef = React.useRef(index);
  useEffect(() => {
    currentTabIndexRef.current = index;
  }, [index]);


  const fetchJobs = useCallback((tabIndexToFetch: number = currentTabIndexRef.current) => { // Use parameter or ref
    const currentTabKey = routes[tabIndexToFetch].key; // Use the passed index or ref's index
    let candidateProcessStatus: 'S' | 'A' | undefined;
    let enterpriseProcessStatus: 'O' | 'AS' | undefined;

    switch (currentTabKey) {
      case 'saved':
        candidateProcessStatus = 'S';
        break;
      case 'applications':
        candidateProcessStatus = 'A';
        break;
      case 'onboardings':
        enterpriseProcessStatus = 'O';
        break;
      case 'assignments':
        enterpriseProcessStatus = 'AS';
        break;
      default:
        break;
    }

    dispatch(
      fetchCandidatePoolJobs({
        page: 0,
        pageSize: 10,
        candidateProcessStatus,
        enterpriseProcessStatus,
      }),
    );
    dispatch(fetchDashboardStatistics());
  }, [dispatch, routes]); // Dependencies only include stable references

  // Effect to handle initial tab navigation and trigger API call
  useEffect(() => {
    if (route.params && (route.params as any).initialTab) {
      const initialTabKey = (route.params as any).initialTab;
      const tabIndex = TABS.findIndex(tab => tab.key === initialTabKey);
      if (tabIndex !== -1) {
        setIndex(tabIndex);
        // Immediately fetch jobs for the initial tab after setting the index
        fetchJobs(tabIndex); // Pass the specific index to fetch for
      }
    } else {
      // If no initialTab param, fetch jobs for the default (first) tab
      fetchJobs(0);
    }
  }, [route.params, fetchJobs]); // Add fetchJobs to dependencies to re-run when it changes

  useEffect(() => {
    if (!loading && !error) {
      setJobsByTab(prev => ({
        ...prev,
        [routes[index].key]: currentFetchedJobs,
      }));
    }
  }, [currentFetchedJobs, index, routes, loading, error]);

  const renderScene = ({ route }: { route: RouteType }) => {
    const jobs = jobsByTab[route.key] || [];
    const isActiveTab = route.key === routes[index].key;
    const currentTabError = isActiveTab ? error : null;
    const currentTabLoading = isActiveTab ? loading : false;

    if (currentTabLoading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <LottieView
            source={require('../../../assets/animations/Loader 1.json')}
            autoPlay
            loop
            style={{ width: 100, height: 100 }}
          />
        </View>
      );
    }

    if (!jobs.length && (currentTabError || !currentTabLoading)) {
      let noJobsText = '';
      let ctaTitle: string | undefined;
      let onCtaPress: (() => void) | undefined;

      switch (route.key) {
        case 'saved':
          noJobsText = `You have not saved any jobs yet. Start searching for jobs and save the ones you’re interested in to view them here.`;
          ctaTitle = "Search Jobs";
          onCtaPress = () => navigation.navigate('SearchJobs');
          break;
        case 'applications':
          noJobsText = `You have not applied to any jobs yet. Start searching for jobs and apply to track your applications here.`;
          ctaTitle = "Search Jobs";
          onCtaPress = () => navigation.navigate('SearchJobs');
          break;
        case 'onboardings':
          noJobsText = `You have no onboardings yet.`;
          break;
        case 'assignments':
          noJobsText = `You have no assignments yet.`;
          break;
        default:
          noJobsText = `No jobs found.`;
          break;
      }

      return (
        <EmptyJobs
          noJobsText={noJobsText}
          ctaTitle={ctaTitle}
        />
      );
    }

    return (
      <FlatList
        data={jobs}
        keyExtractor={item => item.jobId}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => navigation.navigate('JobPreviewScreen', {
              jobId: item.jobId,
              currentTab: route.key
            })}
            currentTab={route.key as TabKey}
            fetchJobs={fetchJobs}
          />
        )}
      />
    );
  };

  const renderTabBar = (props: SceneRendererProps & { navigationState: NavigationState<RouteType> }) => {
    const { navigationState, jumpTo } = props;
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 0, alignItems: 'center' }}
        style={{ maxHeight: 60, minHeight: 40, backgroundColor: '#fff' }}
      >
        <View style={{ flexDirection: 'row', width: '100%' }}>
          {navigationState.routes.map((route, idx) => {
            let count = 0;
            switch (route.key) {
              case 'saved':
                count = dashboardStats.totalSavedJobs || 0;
                break;
              case 'applications':
                count = dashboardStats.totalAppliedJobs || 0;
                break;
              case 'onboardings':
                count = dashboardStats.totalOnboardedJobs || 0;
                break;
              default:
                break;
            }

            const focused = navigationState.index === idx;
            const color = focused ? theme.colors.primary.main : theme.colors.text.light;
            return (
              <Pressable
                key={route.key}
                onPress={() => jumpTo(route.key)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  borderBottomWidth: focused ? 2 : 0,
                  borderBottomColor: theme.colors.primary.main,
                  marginRight: 2,
                }}
              >
                <TextStyle style={{ color, fontWeight: '600', fontSize: 14 }}>
                  {route.title}
                </TextStyle>
                <View
                  style={{
                    backgroundColor: focused ? theme.colors.primary.main : theme.colors.grey[400],
                    borderRadius: 10,
                    marginLeft: 6,
                    paddingHorizontal: 7,
                    paddingVertical: 2,
                  }}
                >
                  <TextStyle style={{ color: '#fff', fontSize: 12 }}>
                    {count}
                  </TextStyle>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f4f6fa' }}>
      <View style={{ backgroundColor: theme.colors.primary.main, padding: 18, paddingTop: 24 }}>
        <TextStyle style={{ color: '#fff', fontSize: 22, fontWeight: '700' }}>My Jobs</TextStyle>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(newIndex) => {
          setIndex(newIndex);
          fetchJobs(newIndex); // Call fetchJobs when tab changes via manual swipe/click
        }}
        initialLayout={{ width: screenWidth }}
        renderTabBar={renderTabBar}
        style={{ backgroundColor: '#f4f6fa' }}
      />
    </SafeAreaView>
  );
};

export default MyJobs;