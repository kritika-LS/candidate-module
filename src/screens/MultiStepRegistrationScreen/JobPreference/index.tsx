// import React, { useState } from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import { Input } from '../../../components/common/Input';
// import DropDownPicker from 'react-native-dropdown-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import moment from 'moment';

// const employmentTypes = [
//   { label: 'Travel', value: 'Travel' },
//   { label: 'Per Diem', value: 'Per Diem' },
//   { label: 'Permanent', value: 'Permanent' },
//   { label: 'Interim Leadership', value: 'Interim Leadership' },
// ];

// const shifts = [
//   { label: 'Day', value: 'Day' },
//   { label: 'Night', value: 'Night' },
//   { label: 'Float', value: 'Float' },
// ];

// const states = [
//   { label: 'California', value: 'CA' },
//   { label: 'New York', value: 'NY' },
//   { label: 'Texas', value: 'TX' },
//   { label: 'Florida', value: 'FL' },
//   { label: 'Illinois', value: 'IL' },
//   // ... add all states here
// ];
// // { employmentType?: string; availabilityDate?: string, shift?: string, selectedStates?:string }
// export const JobPreferenceForm = ({data, onChange, errors}) => {
//   const [employmentType, setEmploymentType] = useState('');
//   const [availabilityDate, setAvailabilityDate] = useState<Date | null>(null);
//   const [shift, setShift] = useState('');
//   const [selectedStates, setSelectedStates] = useState<string[]>([]);

//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [errors, setErrors] = useState<any>({});

//   const validate = () => {
//     const newErrors: any = {};
//     if (!employmentType) newErrors.employmentType = 'Employment type is required';
//     if (!availabilityDate) newErrors.availabilityDate = 'Availability start date is required';
//     else if (moment(availabilityDate).isBefore(moment(), 'day')) newErrors.availabilityDate = 'Start date cannot be in the past';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const getStateDisplay = () => {
//     if (selectedStates.length <= 5) return selectedStates.join(', ');
//     return `${selectedStates.slice(0, 5).join(', ')} +${selectedStates.length - 5} more`;
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Input
//         label="Employment Type"
//         required
//         placeholder="Select employment type"
//         value={data?.employmentType}
//         onChangeText={(val) => onChange({ ...data, employmentType: val })}
//         error={errors.employmentType}
//       />

//       <Input
//         label="Availability Start Date"
//         required
//         placeholder="Select availability start date"
//         value={availabilityDate ? moment(availabilityDate).format('YYYY-MM-DD') : ''}
//         onFocus={() => setShowDatePicker(true)}
//         error={errors.availabilityDate}
//       />
//       {showDatePicker && (
//         <DateTimePicker
//           value={availabilityDate || new Date()}
//           mode="date"
//           display="default"
//           minimumDate={new Date()}
//           onChange={(event, date) => {
//             setShowDatePicker(false);
//             if (date) setAvailabilityDate(date);
//           }}
//         />
//       )}

//       <Input
//         label="Shift"
//         placeholder="Select shift"
//         value={data?.shift}
//         onChangeText={(val) => onChange({ ...data, shift: val })}
//       />

//       <Input
//         label="State"
//         placeholder="Search state"
//         value={getStateDisplay()}
//         onChangeText={(val) => onChange({ ...data, shift: val })}
//       />
//       {/* Add actual searchable dropdown for selecting states here */}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: 'white',
//   },
// });


import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Input } from '../../../components/common/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const states = [
  { label: 'California', value: 'CA' },
  { label: 'New York', value: 'NY' },
  { label: 'Texas', value: 'TX' },
  { label: 'Florida', value: 'FL' },
  { label: 'Illinois', value: 'IL' },
  // Add more as needed
];

export const JobPreferenceForm = ({ data, onChange, errors }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStatesDropdown, setShowStatesDropdown] = useState(false);
  const [searchState, setSearchState] = useState('');

  const filteredStates = states.filter((s) =>
    s.label.toLowerCase().includes(searchState.toLowerCase())
  );

  const toggleStateSelection = (value) => {
    const selected = data?.selectedStates || [];
    if (selected.includes(value)) {
      onChange({
        ...data,
        selectedStates: selected.filter((v) => v !== value),
      });
    } else {
      onChange({ ...data, selectedStates: [...selected, value] });
    }
  };


   const getStateDisplay = () => {
    const selected = data?.selectedStates || [];
    if (selected.length === 0) return '';
    if (selected.length <= 5) return selected.join(', ');
    return `${selected.slice(0, 5).join(', ')} +${selected.length - 5} more`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input
        label="Employment Type"
        required
        placeholder="Select employment type"
        value={data?.employmentType || ''}
        onChangeText={(val) => onChange({ ...data, employmentType: val })}
        touched={errors?.employmentType}
        error={errors?.employmentType}
      />

      <Input
        label="Availability Start Date"
        required
        placeholder="Select availability start date"
        value={data?.availabilityDate ? moment(data.availabilityDate).format('YYYY-MM-DD') : ''}
        onFocus={() => setShowDatePicker(true)}
        touched={errors?.availabilityDate}
        error={errors?.availabilityDate}
      />
      {showDatePicker && (
        <DateTimePicker
          value={data?.availabilityDate ? new Date(data.availabilityDate) : new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) {
              onChange({ ...data, availabilityDate: date.toISOString() });
            }
          }}
        />
      )}

      <Input
        label="Shift"
        placeholder="Select shift"
        value={data?.shift || ''}
        onChangeText={(val) => onChange({ ...data, shift: val })}
        error={errors?.shift}
      />

      <Input
        label="State"
        placeholder="Search/select state"
        value={getStateDisplay()}
        // editable={false}
        onPressIn={() => setShowStatesDropdown(true)}
        error={errors?.selectedStates}
      />
        {showStatesDropdown && (
          <View style={styles.dropdownContainer}>
            {/* Search inside dropdown */}
            <Input
              placeholder="Search state"
              value={searchState}
              onChangeText={setSearchState}
              style={styles.searchInput}
            />

            <FlatList
              keyboardShouldPersistTaps="handled"
              data={filteredStates}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => {
                const selected = data?.selectedStates?.includes(item.value);
                return (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      toggleStateSelection(item.value);
                      setShowStatesDropdown(false);
                    }}
                  >
                    <Text style={{ flex: 1 }}>{item.label}</Text>
                    {selected && <Text style={styles.checkmark}>✓</Text>}
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={() => (
                <Text style={styles.noItemsText}>No states found.</Text>
              )}
              style={{ maxHeight: 200 }}
            />
          </View>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: 'white',
    zIndex: 1000,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  checkmark: {
    color: 'green',
    fontWeight: 'bold',
  },
  searchInput: {
    padding: 8,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  noItemsText: {
    padding: 10,
    fontStyle: 'italic',
    color: '#666',
  },
});
