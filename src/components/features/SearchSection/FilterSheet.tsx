// FilterSheet.tsx
import React, { useEffect, useState } from 'react'; // Keep useEffect here
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RangeSlider from 'rn-range-slider';
import { TextStyle } from '../../common/Text';
import { theme } from '../../../theme';
import { Checkbox } from '../../common/Checkbox';
import { useSearchJobs } from '../../../hooks/useSearchJobs';

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
  onReset: () => void;
  onSaveSearch: () => void;
};

export const FilterSheet: React.FC<FilterSheetProps> = ({
  selectedEmploymentTypes,
  onToggleEmploymentType,
  contractLength,
  onContractLengthChange,
  selectedShifts,
  onToggleShift,
  onReset,
  onSaveSearch,
}) => {
  const [minContract, maxContract] = contractLength;
  const [localContractLength, setLocalContractLength] = useState<[number, number]>(contractLength);

  const {handleApplyFilter, bottomSheetModalRef} = useSearchJobs();

  // Add this useEffect to synchronize local state with prop only when necessary
  useEffect(() => {
    if (localContractLength[0] !== contractLength[0] || localContractLength[1] !== contractLength[1]) {
      setLocalContractLength(contractLength);
    }
  }, [contractLength]); // Dependency array includes contractLength


  const formatContractLength = (value: number) => {
    return value >= 52 ? '52+' : value.toString();
  };

  const isContractLengthFiltered = minContract !== 1 || maxContract !== 52; // This variable is not used anywhere, can be removed

  const handleValueChange = (low: number, high: number) => {
    setLocalContractLength([low, high]);
  };

  const handleSliderTouchEnd = () => {
    // Only call onContractLengthChange if the local state is different
    if (localContractLength[0] !== contractLength[0] || localContractLength[1] !== contractLength[1]) {
      onContractLengthChange(localContractLength);
    }
  };

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
        <View style={styles.sliderValueDisplay}>
          <Text style={styles.currentRangeText}>
            {formatContractLength(localContractLength[0])} - {formatContractLength(localContractLength[1])} Weeks
          </Text>
        </View>
        <RangeSlider
          style={styles.rangeSlider}
          min={1}
          max={52}
          step={1}
          low={localContractLength[0]}
          high={localContractLength[1]}
          onValueChanged={handleValueChange}
          onTouchEnd={handleSliderTouchEnd}
          floatingLabel={true}
          renderThumb={() => <View style={styles.thumb} />}
          renderRail={() => <View style={styles.rail} />}
          renderRailSelected={() => <View style={styles.railSelected} />}
          renderLabel={(value) => (
            <View style={styles.thumbLabelContainer}>
              <Text style={styles.thumbLabelText}>{formatContractLength(value)}</Text>
            </View>
          )}
          renderNotch={() => <View style={styles.notch} />}
        />
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

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={() => {
          handleApplyFilter();
          bottomSheetModalRef?.current?.dismiss();
        }}>
          <TextStyle style={styles.saveButtonText}>Apply</TextStyle>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={onReset}>
          <TextStyle style={styles.resetButtonText}>Reset</TextStyle>
        </TouchableOpacity>
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
  sliderValueDisplay: {
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start'
  },
  currentRangeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.blue.light,
  },
  rangeSlider: {
    width: '100%',
    height: 70,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary.main,
    borderWidth: 2,
    borderColor: theme.colors.primary.main,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rail: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.grey[40],
  },
  railSelected: {
    height: 4,
    backgroundColor: theme.colors.primary.main,
    borderRadius: 2,
  },
  thumbLabelContainer: {
    backgroundColor: theme.colors.primary.main,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 5,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbLabelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  notch: {
    width: 8,
    height: 8,
    backgroundColor: theme.colors.primary.main,
    transform: [{ rotate: '45deg' }],
    marginBottom: -4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 8,
    alignSelf: 'flex-end'
  },
  saveButton: {
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.blue.light,
  },
  saveButtonText: {
    color: theme.colors.blue.light,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: theme.colors.blue.light,
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 24,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});