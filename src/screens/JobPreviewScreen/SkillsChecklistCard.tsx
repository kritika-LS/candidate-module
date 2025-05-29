import React from 'react';
import { View, Text } from 'react-native';
import { TextStyle } from '../../components/common/Text';
import { styles } from './styles';

// Define an interface for the skill object
interface Skill {
  keyword: string;
  lastUsed: string | null; // Assuming lastUsed can be string or null
}

const SkillsChecklistCard = ({ skills }: { skills: Skill[] }) => ( // Corrected prop type
  <View style={styles.card}>
    <TextStyle variant="bold" size="md" style={styles.sectionTitle}>Skills Checklist</TextStyle>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {skills.map((skill, idx) => (
        <View key={idx} style={styles.skillsChip}>
          {/* Access skill.keyword directly */}
          <Text style={styles.skillsChipText}>{skill.keyword}</Text>
        </View>
      ))}
    </View>
  </View>
);

export default SkillsChecklistCard;