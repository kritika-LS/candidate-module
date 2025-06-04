import React from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { Header } from '../../components/common/Header';
import { TextStyle } from '../../components/common/Text';

export const MyScreenings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header showBackButton title='My Screenings' />
      {/* <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>My Screenings (0)</Text>
        <Text style={styles.headerSubtitle}>
          Track your screening and manage your job application
        </Text>
      </View> */}
      <View style={styles.emptyStateContainer}>
        <Image
          source={require('../../../assets/images/no-screening-icon.png')} // Place your illustration here
          style={styles.illustration}
          resizeMode="contain"
        />
        <TextStyle style={styles.emptyText} size='md' variant='bold'>You have no scheduled screenings yet</TextStyle>
      </View>
    </SafeAreaView>
  );
};