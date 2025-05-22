import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextStyle } from '../../components/common/Text';
import { styles } from './styles';

const MAX_LINES = 2;

const BenefitsCard = ({ benefits }: { benefits: string[] }) => {
  const [expanded, setExpanded] = useState(false);
  const showToggle = benefits.length > MAX_LINES;
  const displayBenefits = expanded ? benefits : benefits.slice(0, MAX_LINES);

  return (
    <View style={styles.card}>
      <TextStyle variant="bold" size="md" style={styles.sectionTitle}>Benefits</TextStyle>
      {displayBenefits.map((benefit, idx) => (
        <Text key={idx} style={styles.descriptionText}>• {benefit}</Text>
      ))}
      {showToggle && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={styles.viewMore}>{expanded ? 'View Less' : 'View More'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BenefitsCard; 