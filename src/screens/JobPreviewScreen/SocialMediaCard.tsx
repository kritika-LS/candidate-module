import React from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import { TextStyle } from '../../components/common/Text';
import { styles } from './styles';

const SocialMediaCard = ({ url }: { url: string }) => (
  <View style={styles.card}>
    <TextStyle variant="bold" size="md" style={styles.sectionTitle}>Social Media URL</TextStyle>
    <TouchableOpacity onPress={() => Linking.openURL(url)}>
      <Text style={styles.viewMore}>{url}</Text>
    </TouchableOpacity>
  </View>
);

export default SocialMediaCard; 