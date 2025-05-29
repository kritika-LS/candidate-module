import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { theme } from '../../../theme';
import SkeletonLoader from '../../common/SkeletonLoader';

const JobCardSkeleton = () => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.jobHeader}>
        <View style={styles.jobTitleContainer}>
          <SkeletonLoader width={200} height={20} />
          <SkeletonLoader width={80} height={16} style={{ marginLeft: 10 }} />
        </View>
        <View style={styles.actionButtons}>
          <SkeletonLoader width={16} height={16} />
        </View>
      </View>

      {/* Facility & Location */}
      <View style={[styles.flexRow, styles.companyInfoSection]}>
        <View style={[styles.flexRow, { marginRight: theme.spacing.md }]}>
          <SkeletonLoader width={14} height={14} />
          <SkeletonLoader width={120} height={16} style={{ marginLeft: theme.spacing.xs }} />
        </View>
        <View style={styles.locationContainer}>
          <SkeletonLoader width={14} height={14} />
          <SkeletonLoader width={100} height={16} style={{ marginLeft: theme.spacing.xs }} />
        </View>
      </View>

      {/* Reference Number & Pay */}
      <View style={styles.flexRow}>
        <SkeletonLoader width={12} height={12} />
        <SkeletonLoader width={180} height={14} style={{ marginLeft: theme.spacing.xs }} />
      </View>

      <SkeletonLoader width={150} height={16} style={{ marginVertical: 4 }} />

      {/* Experience & Shift */}
      <View style={styles.labels}>
        <View style={styles.greenLabel}>
          <SkeletonLoader width={120} height={20} />
        </View>
        <View style={styles.blueLabel}>
          <SkeletonLoader width={120} height={20} />
        </View>
      </View>

      {/* Dates, Duration, Openings */}
      <View style={styles.detailContainer}>
        <View style={styles.detailPill}>
          <SkeletonLoader width={100} height={16} />
        </View>
        <View style={styles.detailPill}>
          <SkeletonLoader width={100} height={16} />
        </View>
        <View style={styles.detailPill}>
          <SkeletonLoader width={100} height={16} />
        </View>
        <View style={styles.detailPill}>
          <SkeletonLoader width={100} height={16} />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.jobCardFooter}>
        <View style={[styles.flexRow, { justifyContent: 'space-between', flex: 1 }]}>
          <View style={styles.flexRow}>
            <SkeletonLoader width={12} height={12} />
            <SkeletonLoader width={100} height={14} style={{ marginLeft: theme.spacing.xs }} />
          </View>
        </View>
        <SkeletonLoader width={80} height={32} style={{ borderRadius: theme.spacing.lg }} />
      </View>
    </View>
  );
};

export default JobCardSkeleton; 