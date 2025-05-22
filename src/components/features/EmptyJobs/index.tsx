import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { TextStyle } from '../../common/Text';

const { width } = Dimensions.get('window');

export const EmptyJobs: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Replace the source below with the correct image asset if available */}
      <Image
        source={require('../../../../assets/images/Empty.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <TextStyle size="lg" style={styles.text}>
        No jobs found, try refining
        {"\n"}
        your search criteria
      </TextStyle>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 32,
  },
  text: {
    textAlign: 'center',
    color: '#222',
    fontWeight: '500',
  },
}); 