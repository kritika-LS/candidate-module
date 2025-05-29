import React from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from './styles';
import SkeletonLoader from '../../../common/SkeletonLoader';

const DashboardStatsSkeleton = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
    >
      {[1, 2, 3, 4, 5].map((_, index) => (
        <View key={index} style={[styles.card, { backgroundColor: '#f5f5f5' }]}>
          <View style={styles.countsection}>
            <SkeletonLoader width={32} height={32} style={{ borderRadius: 16 }} />
            <SkeletonLoader width={40} height={24} style={{ marginLeft: 8 }} />
          </View>
          <SkeletonLoader width={100} height={16} style={{ marginTop: 8 }} />
        </View>
      ))}
    </ScrollView>
  );
};

export default DashboardStatsSkeleton; 