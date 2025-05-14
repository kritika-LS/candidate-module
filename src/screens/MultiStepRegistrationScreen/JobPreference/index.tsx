import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Input } from '../../../components/common/Input';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const employmentTypes = [
  { label: 'Travel', value: 'Travel' },
  { label: 'Per Diem', value: 'Per Diem' },
  { label: 'Permanent', value: 'Permanent' },
  { label: 'Interim Leadership', value: 'Interim Leadership' },
];

const shifts = [
  { label: 'Day', value: 'Day' },
  { label: 'Night', value: 'Night' },
  { label: 'Float', value: 'Float' },
];

const states = [
  { label: 'California', value: 'CA' },
  { label: 'New York', value: 'NY' },
  { label: 'Texas', value: 'TX' },
  { label: 'Florida', value: 'FL' },
  { label: 'Illinois', value: 'IL' },
  // ... add all states here
];

export const JobPreferenceForm = () => {
  const [employmentType, setEmploymentType] = useState('');
  const [availabilityDate, setAvailabilityDate] = useState<Date | null>(null);
  const [shift, setShift] = useState('');
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};
    if (!employmentType) newErrors.employmentType = 'Employment type is required';
    if (!availabilityDate) newErrors.availabilityDate = 'Availability start date is required';
    else if (moment(availabilityDate).isBefore(moment(), 'day')) newErrors.availabilityDate = 'Start date cannot be in the past';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getStateDisplay = () => {
    if (selectedStates.length <= 5) return selectedStates.join(', ');
    return `${selectedStates.slice(0, 5).join(', ')} +${selectedStates.length - 5} more`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input
        label="Employment Type"
        required
        placeholder="Select employment type"
        value={employmentType}
        onChangeText={setEmploymentType}
        error={errors.employmentType}
      />

      <Input
        label="Availability Start Date"
        required
        placeholder="Select availability start date"
        value={availabilityDate ? moment(availabilityDate).format('YYYY-MM-DD') : ''}
        onFocus={() => setShowDatePicker(true)}
        error={errors.availabilityDate}
      />
      {showDatePicker && (
        <DateTimePicker
          value={availabilityDate || new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setAvailabilityDate(date);
          }}
        />
      )}

      <Input
        label="Shift"
        placeholder="Select shift"
        value={shift}
        onChangeText={setShift}
      />

      <Input
        label="State"
        placeholder="Search state"
        value={getStateDisplay()}
        onChangeText={() => {}} // Disabled input for selection
      />
      {/* Add actual searchable dropdown for selecting states here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
});