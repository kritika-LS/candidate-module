import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { WalkthroughItemType } from '../../../models/types/WalkthroughItemType';

const { width } = Dimensions.get('window');

interface Props {
  item: WalkthroughItemType;
}

const WalkthroughItem: React.FC<Props> = ({ item }) => (
  <View style={[styles.container, { width }]}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.description}>{item.description}</Text>
    <Image source={item.image} style={styles.image} resizeMode="contain" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  image: {
    width: 250,
    height: 250,
  },
});

export default WalkthroughItem;
