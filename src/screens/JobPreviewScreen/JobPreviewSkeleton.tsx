import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import { theme } from '../../theme';

const JobPreviewSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <SkeletonLoader width={100} height={24} />
      </View>

      {/* Job Card Skeleton */}
      <View style={styles.card}>
        <View style={styles.jobHeader}>
          <SkeletonLoader width="70%" height={24} />
          <SkeletonLoader width={80} height={20} />
        </View>
        
        <View style={styles.infoRow}>
          <SkeletonLoader width="40%" height={16} />
          <SkeletonLoader width="40%" height={16} />
        </View>
        
        <View style={styles.infoRow}>
          <SkeletonLoader width="30%" height={16} />
          <SkeletonLoader width="30%" height={16} />
        </View>
      </View>

      {/* Job Description Skeleton */}
      <View style={styles.card}>
        <SkeletonLoader width={120} height={24} style={styles.sectionTitle} />
        <SkeletonLoader width="100%" height={16} style={styles.marginBottom} />
        <SkeletonLoader width="90%" height={16} style={styles.marginBottom} />
        <SkeletonLoader width="95%" height={16} />
      </View>

      {/* Job Overview Skeleton */}
      <View style={styles.card}>
        <SkeletonLoader width={120} height={24} style={styles.sectionTitle} />
        <View style={styles.grid}>
          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.gridItem}>
              <SkeletonLoader width="100%" height={16} />
              <SkeletonLoader width="80%" height={16} style={styles.marginTop} />
            </View>
          ))}
        </View>
      </View>

      {/* Skills Skeleton */}
      <View style={styles.card}>
        <SkeletonLoader width={120} height={24} style={styles.sectionTitle} />
        <View style={styles.skillsContainer}>
          {[1, 2, 3, 4].map((item) => (
            <SkeletonLoader
              key={item}
              width={100}
              height={32}
              borderRadius={16}
              style={styles.skillChip}
            />
          ))}
        </View>
      </View>

      {/* Benefits Skeleton */}
      <View style={styles.card}>
        <SkeletonLoader width={120} height={24} style={styles.sectionTitle} />
        <SkeletonLoader width="100%" height={16} style={styles.marginBottom} />
        <SkeletonLoader width="90%" height={16} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: theme.colors.text.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobHeader: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  marginBottom: {
    marginBottom: 8,
  },
  marginTop: {
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  gridItem: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  skillChip: {
    margin: 4,
  },
});

export default JobPreviewSkeleton; 