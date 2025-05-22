import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextStyle } from '../../components/common/Text';
import { styles } from './styles';

const MAX_LINES = 3;

const JobDescriptionCard = ({ description }: { description: string }) => {
  const [expanded, setExpanded] = useState(false);
  const lines = description.split('\n');
  const showToggle = lines.length > MAX_LINES;
  const displayText = expanded ? description : lines.slice(0, MAX_LINES).join('\n');

  return (
    <View style={styles.card}>
      <TextStyle variant="bold" size="md" style={styles.sectionTitle}>Job Description</TextStyle>
      <Text style={styles.descriptionText}>{displayText}</Text>
      {showToggle && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={styles.viewMore}>{expanded ? 'View Less' : 'View More'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default JobDescriptionCard; 