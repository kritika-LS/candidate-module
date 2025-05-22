import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextStyle } from '../../common/Text';
import { theme } from '../../../theme';
import { Checkbox } from '../../common/Checkbox';

const EMPLOYMENT_TYPES = [
  'Travel',
  'Per Diem',
  'Permanent',
  'Interim Leadership',
];
const SHIFTS = ['Day', 'Night', 'Float'];

export type FilterSheetProps = {
  selectedEmploymentTypes: string[];
  onToggleEmploymentType: (type: string) => void;
  contractLength: [number, number];
  onContractLengthChange: (range: [number, number]) => void;
  selectedShifts: string[];
  onToggleShift: (shift: string) => void;
};

export const FilterSheet: React.FC<FilterSheetProps> = ({
  selectedEmploymentTypes,
  onToggleEmploymentType,
  contractLength,
  onContractLengthChange,
  selectedShifts,
  onToggleShift,
}) => {
  return (
    <View style={styles.container}>
      {/* Employment Type */}
      <View style={styles.section}>
        <TextStyle style={styles.sectionTitle}>Employment Type</TextStyle>
        {EMPLOYMENT_TYPES.map((type) => (
          <View key={type} style={styles.checkboxRow}>
            <Checkbox
              label={type}
              checked={selectedEmploymentTypes.includes(type)}
              onChange={() => onToggleEmploymentType(type)}
              size={15}
            />
          </View>
        ))}
      </View>
      {/* Contract Length */}
      <View style={styles.section}>
        <TextStyle style={styles.sectionTitle}>Contract Length (Weeks)</TextStyle>
        {/* Replace with a real slider in production */}
        <View style={styles.sliderRow}>
          <Text style={styles.sliderValue}>{contractLength[0]}</Text>
          <View style={styles.sliderTrack} />
          <Text style={styles.sliderValue}>{contractLength[1]}</Text>
        </View>
      </View>
      {/* Shift */}
      <View style={styles.section}>
        <TextStyle style={styles.sectionTitle}>Shift</TextStyle>
        {SHIFTS.map((shift) => (
          <View key={shift} style={styles.checkboxRow}>
            <Checkbox
              label={shift}
              checked={selectedShifts.includes(shift)}
              onChange={() => onToggleShift(shift)}
              size={15}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: theme.colors.grey[40],
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
    color: '#222',
  },
  checkboxRow: {
    marginBottom: 10,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  sliderTrack: {
    flex: 1,
    height: 4,
    backgroundColor: theme.colors.grey[40],
    marginHorizontal: 10,
    borderRadius: 2,
  },
  sliderValue: {
    fontSize: 15,
    color: theme.colors.primary.main,
    fontWeight: 'bold',
  },
}); 