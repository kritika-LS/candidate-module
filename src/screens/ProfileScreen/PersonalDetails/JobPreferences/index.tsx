import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from './styles';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';
import { defaultEmploymentTypeItems, defaultShiftItems, defaultTimeZoneItems, defaultWageExpectationItems } from '../../../../config/constants';

const JobPreferencesScreen: React.FC<{ initialValues: any; updateValues: (updatedValues: any) => void }> = ({ initialValues, updateValues }) => {
  const [showDatePicker, setShowDatePicker] = useState({
    availabilityDate: false,
    shiftStartTime: false,
    shiftEndTime: false,
  });
  const [employmentTypeOpen, setEmploymentTypeOpen] = useState(false);
  const [shiftOpen, setShiftOpen] = useState(false);
  const [wageExpectationOpen, setWageExpectationOpen] = useState(false);
  const [timeZoneOpen, setTimeZoneOpen] = useState(false);

  const formatDate = (date: string): string => {
    if (date) {
      const parsedDate = new Date(date);
      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
      const day = String(parsedDate.getDate()).padStart(2, '0');
      return `${month}/${day}/${year}`;
    }
    return '';
  };

  const onChangeDate = (field: string, event: any, selectedDate: Date | undefined) => {
    setShowDatePicker({ ...showDatePicker, [field]: false });
    if (selectedDate) {
      updateValues({ ...initialValues, [field]: selectedDate.toISOString() });
    }
  };

  return (
    <View style={styles.body}>
      <ProfileScreenHeader
        headerIcon='cog-outline'
        headerTitle='Job Preferences'
        completedStatus={true}
      />
      <View style={styles.container}>
        <Text style={styles.label}>Employment Type</Text>
        <DropDownPicker
          open={employmentTypeOpen}
          setOpen={setEmploymentTypeOpen}
          items={defaultEmploymentTypeItems}
          value={initialValues.employmentTypeValue?.toLowerCase()}
          setValue={(callback) => updateValues({ ...initialValues, employmentTypeValue: callback(initialValues.employmentTypeValue) })}
          placeholder="Select employment type"
          searchable={false}
          listMode="SCROLLVIEW"
          style={[styles.dropdown, { zIndex: employmentTypeOpen ? 10 : 1 }]}
          dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
        />

        <Text style={styles.label}>Shift</Text>
        <DropDownPicker
          open={shiftOpen}
          setOpen={setShiftOpen}
          items={defaultShiftItems}
          value={initialValues.shiftValue}
          setValue={(callback) => updateValues({ ...initialValues, shiftValue: callback(initialValues.shiftValue) })}
          placeholder="Select shift"
          searchable={false}
          listMode="SCROLLVIEW"
          style={[styles.dropdown, { zIndex: shiftOpen ? 10 : 1 }]}
          dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
        />

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Availability Date</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker({ ...showDatePicker, availabilityDate: true })}>
            <Text style={styles.input}>
              {initialValues.availabilityDate ? formatDate(initialValues.availabilityDate) : 'Select availability date'}
            </Text>
            <Icon name="calendar-outline" size={20} color="#ccc" />
          </TouchableOpacity>
          {showDatePicker.availabilityDate && (
            <DateTimePicker
              value={initialValues.availabilityDate ? new Date(initialValues.availabilityDate) : new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => onChangeDate('availabilityDate', event, selectedDate)}
            />
          )}
        </View>

        <Text style={styles.label}>Wage Expectation Category</Text>
        <DropDownPicker
          open={wageExpectationOpen}
          setOpen={setWageExpectationOpen}
          items={defaultWageExpectationItems}
          value={initialValues.wageExpectationValue?.toLowerCase()}
          setValue={(callback) => updateValues({ ...initialValues, wageExpectationValue: callback(initialValues.wageExpectationValue) })}
          placeholder="Select wage expectation category"
          searchable={false}
          listMode="SCROLLVIEW"
          style={[styles.dropdown, { zIndex: wageExpectationOpen ? 10 : 1 }]}
          dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
        />

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Shift Start Time</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker({ ...showDatePicker, shiftStartTime: true })}>
            <Text style={styles.input}>
              {initialValues.shiftStartTime ? initialValues.shiftStartTime.toString() : 'Select shift start time'}
            </Text>
            <Icon name="time-outline" size={20} color="#ccc" />
          </TouchableOpacity>
          {showDatePicker.shiftStartTime && (
            <DateTimePicker
              value={initialValues.shiftStartTime ? new Date(initialValues.shiftStartTime) : new Date()}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => onChangeDate('shiftStartTime', event, selectedTime)}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Shift End Time</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker({ ...showDatePicker, shiftEndTime: true })}>
            <Text style={styles.input}>
              {initialValues.shiftEndTime ? initialValues.shiftEndTime.toString() : 'Select shift end time'}
            </Text>
            <Icon name="time-outline" size={20} color="#ccc" />
          </TouchableOpacity>
          {showDatePicker.shiftEndTime && (
            <DateTimePicker
              value={initialValues.shiftEndTime ? new Date(initialValues.shiftEndTime) : new Date()}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => onChangeDate('shiftEndTime', event, selectedTime)}
            />
          )}
        </View>

        <Text style={styles.label}>Time Zone</Text>
        <DropDownPicker
          open={timeZoneOpen}
          setOpen={setTimeZoneOpen}
          items={defaultTimeZoneItems}
          value={initialValues.timeZoneValue}
          setValue={(callback) => updateValues({ ...initialValues, timeZoneValue: callback(initialValues.timeZoneValue) })}
          placeholder="Select time zone"
          searchable={false}
          listMode="SCROLLVIEW"
          style={[styles.dropdown, { zIndex: timeZoneOpen ? 10 : 1 }]}
          dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
        />
      </View>
    </View>
  );
};

export default JobPreferencesScreen;