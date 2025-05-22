import React, { useState } from 'react';
import { View, SafeAreaView, Dimensions, ScrollView, Pressable, FlatList } from 'react-native';
import { TabView, SceneRendererProps, NavigationState } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import { TextStyle } from '../../components/common/Text';
import { theme } from '../../theme';
import JobCard from '../../components/features/JobCard';
import { EmptyJobs } from '../../components/features/EmptyJobs';

const screenWidth = Dimensions.get('window').width;

const placeholderJobs = [
  {
    jobId: '1',
    jobTitle: 'Registered Nurse',
    jobType: 'Travel',
    facilityName: 'Starlight Medical Center',
    city: 'Syracuse',
    state: 'NY',
    country: 'US',
    jobReferenceNumber: 'RE-1032YPL',
    payRateMinimum: '$2484',
    payRateMaximum: '$2681',
    overallYearsOfExperienceMinimum: '0',
    overallYearsOfExperienceMaximum: '2',
    jobExperienceLevel: '0-2 years',
    shiftDetails: '3x12',
    numberOfOpenings: 1,
    validFrom: 'Dec 02, 2024',
    validTill: 'Mar 02, 2025',
    duration: '3 Months',
    postedOn: '2 days ago',
  },
  // Add more jobs as needed
];

const TABS: RouteType[] = [
  { key: 'saved', title: 'Saved Jobs' },
  { key: 'applications', title: 'Applications' },
  { key: 'onboardings', title: 'Onboardings' },
  { key: 'assignments', title: 'Assignments' },
];

type TabKey = 'saved' | 'applications' | 'onboardings' | 'assignments';

type RouteType = { key: TabKey; title: string };

type JobsByTabType = Record<TabKey, typeof placeholderJobs>;

export const MyJobs = () => {
  const navigation = useNavigation<any>();
  const [index, setIndex] = useState(0);
  const [routes] = useState<RouteType[]>(TABS);

  // Placeholder data for each tab
  const jobsByTab: JobsByTabType = {
    saved: placeholderJobs,
    applications: [],
    onboardings: [],
    assignments: [],
  };

  const renderScene = ({ route }: { route: RouteType }) => {
    const jobs = jobsByTab[route.key] || [];
    if (!jobs.length) return <EmptyJobs />;
    return (
      <FlatList
        data={jobs}
        keyExtractor={item => item.jobId}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => navigation.navigate('JobPreviewScreen', { jobId: item.jobId })}
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
            // Show count for each tab
            const count = jobsByTab[route.key]?.length || 0;
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
                    backgroundColor: focused ? theme.colors.primary.main : '#eee',
                    borderRadius: 10,
                    marginLeft: 6,
                    paddingHorizontal: 7,
                    paddingVertical: 2,
                  }}
                >
                  <TextStyle style={{ color: focused ? '#fff' : '#888', fontSize: 12 }}>
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
        onIndexChange={setIndex}
        initialLayout={{ width: screenWidth }}
        renderTabBar={renderTabBar}
        style={{ backgroundColor: '#f4f6fa' }}
      />
    </SafeAreaView>
  );
};

export default MyJobs;