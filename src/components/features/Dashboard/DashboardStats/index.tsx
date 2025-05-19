import React, { useRef, useState } from 'react';
import { View, Text, FlatList, ViewToken, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Icon from '../../../common/Icon/Icon';
import { theme } from '../../../../theme';
import { useAppSelector } from '../../../../hooks/useAppDispatch';

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  count: number;
  bgColor: string;
  iconBgColor: string;
};

const StatCard = ({ icon, label, count, bgColor, iconBgColor }: StatCardProps) => {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: bgColor }]} activeOpacity={0.8}>
      <View style={styles.countsection}>
        <View style={[styles.iconCircle, { backgroundColor: iconBgColor }]}>{icon}</View>
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
      icon: <Icon name="briefcase-outline" size={12} color="white" />,
      label: 'Saved Jobs',
      count: dashboardStats.totalSavedJobs,
      bgColor: '#E6DBFD',
      iconBgColor: "#8800FF",
    },
    {
      icon: <Icon name="file-multiple-outline" size={12} color="white" />,
      label: 'Applications',
      count: dashboardStats.totalAppliedJobs,
      bgColor: '#FFF2CC',
      iconBgColor: theme.colors.accent.main,
    },
    {
      icon: <Icon name="monitor" size={12} color="white" />,
      label: 'Onboardings',
      count: dashboardStats.totalOnboardedJobs,
      bgColor: '#DAF0FF',
      iconBgColor: theme.colors.primary.main,
    },
    {
      icon: <Icon name="file-clock-outline" size={12} color="white" />,
      label: 'Assignments',
      count: dashboardStats.totalOfferedJobs,
      bgColor: '#E5F8E8',
      iconBgColor: theme.colors.green.success_100,
    },
    {
      icon: <Icon name="account-search-outline" size={12} color="white" />,
      label: 'Screenings',
      count: dashboardStats.totalOffersAccepted,
      bgColor: '#ffded1',
      iconBgColor: '#ff9066',
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
