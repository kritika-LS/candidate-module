import React from 'react';
import { View, Text } from 'react-native';
import { TextStyle } from '../../components/common/Text';
import { styles } from './styles';

interface JobOverview {
  Education: string;
  'Start Date': string;
  'End Date': string;
  Duration: string;
  'Shift Schedule': string;
  Workplace: string;
  Experience: string;
  'Shift Timing': string;
  'Shift Type': string;
}

const gridFields: { label: string; key: keyof JobOverview }[] = [
  { label: 'Start Date', key: 'Start Date' },
  { label: 'End Date', key: 'End Date' },
  { label: 'Duration', key: 'Duration' },
  { label: 'Shift Schedule', key: 'Shift Schedule' },
  { label: 'Workplace', key: 'Workplace' },
  { label: 'Experience', key: 'Experience' },
  { label: 'Shift Timing', key: 'Shift Timing' },
  { label: 'Shift Type', key: 'Shift Type' },
];

const JobOverviewCard = ({ overview }: { overview: JobOverview }) => {
  return (
    <View style={styles.card}>
      <TextStyle variant="bold" size="md" style={styles.sectionTitle}>Job Overview</TextStyle>
      {/* Education row */}
      <View style={{ marginBottom: 12 }}>
        <Text style={styles.educationLabel}>Education:</Text>
        <Text style={styles.educationValue}>{overview.Education}</Text>
      </View>
      {/* Grid rows */}
      <View style={styles.overviewGrid}>
        {gridFields.map(field => (
          <View style={styles.overviewItem} key={field.key}>
            <Text style={styles.overviewLabel}>{field.label}</Text>
            <Text style={styles.overviewValue}>{overview[field.key]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default JobOverviewCard; 