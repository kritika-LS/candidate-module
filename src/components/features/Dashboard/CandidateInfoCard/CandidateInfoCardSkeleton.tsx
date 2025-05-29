import React from 'react';
import { View, Dimensions } from 'react-native';
import { styles } from './styles';
import SkeletonLoader from '../../../common/SkeletonLoader';

const { width: screenWidth } = Dimensions.get('window');

const CandidateInfoCardSkeleton = () => {
  return (
    <View style={styles.card}>
      <View style={styles.candidateInfoSection}>
        <SkeletonLoader width={48} height={48} style={{ borderRadius: 24 }} />
        <View style={styles.candidiateInfo}>
          <SkeletonLoader width={150} height={20} />
          <SkeletonLoader width={100} height={16} style={{ marginTop: 4 }} />
          <View style={styles.contactInfo}>
            <View style={styles.contactDetails}>
              <SkeletonLoader width={10} height={10} />
              <SkeletonLoader width={120} height={12} style={{ marginLeft: 4 }} />
            </View>
            <View style={styles.contactDetails}>
              <SkeletonLoader width={10} height={10} />
              <SkeletonLoader width={100} height={12} style={{ marginLeft: 4 }} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressHeading}>
          <SkeletonLoader width={100} height={16} />
          <SkeletonLoader width={40} height={16} />
        </View>
        <SkeletonLoader width={screenWidth - 64} height={10} style={{ borderRadius: 5 }} />
      </View>
      <SkeletonLoader width={80} height={32} style={{ borderRadius: 20, alignSelf: 'center', marginTop: 8 }} />
    </View>
  );
};

export default CandidateInfoCardSkeleton; 