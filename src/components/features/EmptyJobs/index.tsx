import React from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import { TextStyle } from '../../common/Text';
import { theme } from '../../../theme';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface EmptyJobsProps {
  ctaTitle?: string; // Make ctaTitle optional
  noJobsText?: string;
}

export const EmptyJobs: React.FC<EmptyJobsProps> = ({ ctaTitle, noJobsText }) => {

  const navigation = useNavigation();

  const onCtaPress = () => {
    //@ts-ignore
    navigation.navigate("Search Jobs")
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/images/Empty.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <TextStyle size="lg" style={styles.text}>
        {noJobsText}
      </TextStyle>
      {ctaTitle && onCtaPress && ( // Conditionally render CTA if ctaTitle and onCtaPress are provided
        <TouchableOpacity style={styles.ctaButton} onPress={onCtaPress}>
          <TextStyle style={styles.ctaButtonText}>{ctaTitle}</TextStyle>
        </TouchableOpacity>
      )}
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
    marginBottom: 24, // Add margin bottom for spacing
  },
  ctaButton: {
    backgroundColor: theme.colors.blue.light, // Example color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});