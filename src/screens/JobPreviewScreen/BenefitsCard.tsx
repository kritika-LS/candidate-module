import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextStyle } from '../../components/common/Text';
import { styles } from './styles';

const MAX_LINES = 2;

const BenefitsCard = ({ benefits }: { benefits: string | string[] }) => {
  const [expanded, setExpanded] = useState(false);
  const showToggle = benefits.length > MAX_LINES;
  const displayBenefits = expanded ? benefits : benefits.slice(0, MAX_LINES);

  // If benefits is a string "[]"
  if (benefits === '[]') {
    return (
      <View style={styles.card}>
        <TextStyle variant="bold" size="md" style={styles.sectionTitle}>Benefits</TextStyle>
        <Text style={styles.descriptionText}>[]</Text>
      </View>
    );
  }

  console.log({benefits})
  console.log({benefits: benefits.length})
  console.log({expanded})
  

  return (
    <View style={styles.card}>
      <TextStyle variant="bold" size="md" style={styles.sectionTitle}>Benefits</TextStyle>
      {benefits ?
        <View>
          {/*@ts-ignore*/}
          {displayBenefits.map((benefit: any, idx: React.Key | null | undefined) => (
            <Text key={idx} style={styles.descriptionText}>
              {benefit || 'Not specified'}
            </Text>
          ))}
          {showToggle && (
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <Text style={styles.viewMore}>{expanded ? 'View Less' : 'View More'}</Text>
            </TouchableOpacity>
          )}
        </View>
        : <Text style={styles.descriptionText}>Not specified</Text>
      }
    </View>
  );
};

export default BenefitsCard; 