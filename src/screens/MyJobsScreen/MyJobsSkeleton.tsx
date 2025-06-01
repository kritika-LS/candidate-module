import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import { theme } from '../../theme';

const MyJobsSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <SkeletonLoader width={120} height={24} />
      </View>

      {/* Job Cards */}
      {[1, 2, 3].map((item) => (
        <View key={item} style={styles.card}>
          {/* Job Title and Type */}
          <View style={styles.jobHeader}>
            <SkeletonLoader width="70%" height={24} />
            <SkeletonLoader width={80} height={20} />
          </View>

          {/* Facility and Location */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <SkeletonLoader width={16} height={16} style={styles.icon} />
              <SkeletonLoader width="80%" height={16} />
            </View>
            <View style={styles.infoItem}>
              <SkeletonLoader width={16} height={16} style={styles.icon} />
              <SkeletonLoader width="80%" height={16} />
            </View>
          </View>

          {/* Reference Number */}
          <View style={styles.infoRow}>
            <SkeletonLoader width={16} height={16} style={styles.icon} />
            <SkeletonLoader width="60%" height={16} />
          </View>

          {/* Pay Rate */}
          <SkeletonLoader width="40%" height={20} style={styles.rate} />

          {/* Experience and Shift */}
          <View style={styles.labels}>
            <SkeletonLoader width={120} height={32} borderRadius={16} />
            <SkeletonLoader width={120} height={32} borderRadius={16} />
          </View>

          {/* Dates and Details */}
          <View style={styles.details}>
            {[1, 2, 3, 4].map((detail) => (
              <SkeletonLoader
                key={detail}
                width={80}
                height={24}
                borderRadius={12}
                style={styles.detailPill}
              />
            ))}
          </View>
        </View>
      ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  icon: {
    marginRight: 8,
  },
  rate: {
    marginVertical: 12,
  },
  labels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  detailPill: {
    marginRight: 8,
    marginBottom: 8,
  },
});

export default MyJobsSkeleton; 