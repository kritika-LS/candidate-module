// index.tsx
import React, { useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Icon from '../../../common/Icon/Icon';
import { theme } from '../../../../theme';
import { useAppSelector } from '../../../../hooks/useAppDispatch';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  count: number;
  bgColor: string;
  ScreenName: string; // This prop is not directly used for navigation in StatCard but is part of the data structure
  navigateToTab?: 'saved' | 'applications' | 'onboardings' | 'assignments'; // New prop for tab navigation
};

const StatCard = ({ icon, label, count, bgColor, navigateToTab, ScreenName }: StatCardProps) => {
  const navigation = useNavigation<any>(); // Initialize useNavigation hook

  const handlePress = () => {
    if (navigateToTab) {
      navigation.navigate('My Jobs', { initialTab: navigateToTab }); // Navigate to MyJobs with initialTab parameter
    }
    if(ScreenName) {
      navigation.navigate(ScreenName)
    }
  };

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: bgColor }]} activeOpacity={0.8}>
      <View style={styles.countsection}>
        <View style={[styles.iconCircle]}>{icon}</View>
        <Text style={styles.count}>{count}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export const DashboardStats = () => {
  const listRef = useRef<FlatList>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const dashboardStats = useAppSelector((state) => state?.dashboardStats?.statistics?.responsePayload) || {};

  const data: StatCardProps[] = [
    {
      icon: <Icon name="bookmark-outline" size={12} />,
      label: 'Saved',
      count: dashboardStats.totalSavedJobs || 0,
      bgColor: '#d9f3e3',
      ScreenName: '',
      navigateToTab: 'saved', // Specify target tab
    },
    {
      icon: <Icon name="briefcase-outline" size={12} />,
      label: 'Applied',
      count: dashboardStats.totalAppliedJobs || 0,
      bgColor: '#d6e8fa',
      ScreenName: '',
      navigateToTab: 'applications', // Specify target tab
    },
    {
      icon: <Icon name="bell-outline" size={12} />,
      label: 'Onboardings',
      count: dashboardStats.totalOnboardedJobs,
      bgColor: '#fce8d4',
      ScreenName: '',
      navigateToTab: 'onboardings', // Specify target tab
    },
    {
      icon: <Icon name="file-document-outline" size={12} />,
      label: 'Assignments',
      count: dashboardStats.totalOfferedJobs,
      bgColor: '#e5e1f9',
      ScreenName: '',
      navigateToTab: 'assignments', // Specify target tab
    },
    {
      icon: <Icon name="account-search-outline" size={12} />,
      label: 'Screenings',
      count: dashboardStats.totalOffersAccepted,
      bgColor: '#ffe9e7',
      ScreenName: 'MyScreenings',
      // No navigateToTab for 'Screenings' as per requirement
    },
  ];

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const offsetX = contentOffset.x;
    const visibleWidth = layoutMeasurement.width;
    const totalWidth = contentSize.width;

    setShowLeft(offsetX > 10);
    setShowRight(offsetX + visibleWidth < totalWidth - 10);
  };

  return (
    <View style={{ position: 'relative', flexDirection: 'row', alignItems: 'center' }}>
      {showLeft && (
        <TouchableOpacity
          onPress={() => listRef.current?.scrollToOffset({ offset: 0, animated: true })}
          style={[styles.chevronButton, styles.leftChevron]}
        >
          <Icon name="chevron-left" size={16} color={theme.colors.primary.main} />
        </TouchableOpacity>
      )}

      <FlatList
        ref={listRef}
        horizontal
        data={data}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => <StatCard {...item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.container]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      {showRight && (
        <TouchableOpacity
          onPress={() => listRef.current?.scrollToEnd({ animated: true })}
          style={[styles.chevronButton, styles.rightChevron]}
        >
          <Icon name="chevron-right" size={16} color={theme.colors.primary.main} />
        </TouchableOpacity>
      )}
    </View>
  );
};