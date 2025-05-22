import React from 'react';
import { View, Text } from 'react-native';
import { TextStyle } from '../../components/common/Text';
import { styles } from './styles';

const SkillsChecklistCard = ({ skills }: { skills: string[] }) => (
  <View style={styles.card}>
    <TextStyle variant="bold" size="md" style={styles.sectionTitle}>Skills Checklist</TextStyle>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {skills.map((skill, idx) => (
        <View key={idx} style={styles.skillsChip}>
          <Text style={styles.skillsChipText}>{skill}</Text>
        </View>
      ))}
    </View>
  </View>
);

export default SkillsChecklistCard; 