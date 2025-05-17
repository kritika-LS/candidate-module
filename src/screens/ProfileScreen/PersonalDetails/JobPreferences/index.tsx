import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from './styles';

// Validation schema using Yup
const JobPreferenceSchema = Yup.object().shape({
  availabilityDate: Yup.date().required('Availability date is required'),
  shiftStartTime: Yup.date().required('Shift start time is required'),
  shiftEndTime: Yup.date().required('Shift end time is required'),
});

const JobPreferencesForm = () => {
  const [showDatePicker, setShowDatePicker] = useState({
    availabilityDate: false,
    shiftStartTime: false,
    shiftEndTime: false,
  });
  const defaultShiftItems = [
    { label: 'Morning', value: 'morning' },
    { label: 'Afternoon', value: 'afternoon' },
    { label: 'Night', value: 'night' },
  ];

  const defaultWageExpectationItems = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  return (
    <Formik
      initialValues={{
        availabilityDate: '',
        shiftStartTime: '',
        shiftEndTime: '',
        shiftItems: defaultShiftItems,
        shiftValue: '',
        wageExpectationItems: defaultWageExpectationItems,
        wageExpectationValue: '',
        employmentTypeOpen: false,
        employmentTypeValue: '',
        shiftOpen: false,
        wageExpectationOpen: false,
        timeZoneOpen: false,
        timeZoneValue: 'utc+0',
      }}
      validationSchema={JobPreferenceSchema}
      onSubmit={(values) => {
        console.log('Form values:', values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, isSubmitting }) => {
        return (
        <View style={styles.container}>
          <Text style={styles.label}>Employment Type</Text>
          <DropDownPicker
            open={values.employmentTypeOpen}
            setOpen={(open) => setFieldValue('employmentTypeOpen', open)}
            items={[
              { label: 'Full-time', value: 'full_time' },
              { label: 'Part-time', value: 'part_time' },
              { label: 'Contract', value: 'contract' },
              { label: 'Temporary', value: 'temporary' },
              { label: 'Internship', value: 'internship' },
            ]}
            value={values.employmentTypeValue}
            setValue={(callback) => setFieldValue('employmentTypeValue', callback(values.employmentTypeValue))}
            placeholder="Select employment type"
            searchable={true}
            searchPlaceholder="Search employment type"
            listMode="MODAL"
            modalProps={{ animationType: 'slide' }}
            style={styles.dropdown}
          />

          <Text style={styles.label}>Shift</Text>
          <DropDownPicker
            open={values.shiftOpen}
            setOpen={(open) => setFieldValue('shiftOpen', open)}
            items={values.shiftItems}
            value={values.shiftValue}
            setValue={(callback) => setFieldValue('shiftValue', callback(values.shiftValue))}
            placeholder="Select shift"
            searchable={true}
            searchPlaceholder="Search shift"
            listMode="MODAL"
            modalProps={{ animationType: 'slide' }}
            style={styles.dropdown}
          />

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Availability Date</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker({ ...showDatePicker, availabilityDate: true })}>
              <Text style={styles.input}>
                {values.availabilityDate ? values.availabilityDate.toString() : 'Select availability date'}
              </Text>
              <Icon name="calendar-outline" size={20} color="#ccc" />
            </TouchableOpacity>
            {showDatePicker.availabilityDate && (
              <DateTimePicker
                value={values.availabilityDate ? new Date(values.availabilityDate) : new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker({ ...showDatePicker, availabilityDate: false });
                  setFieldValue('availabilityDate', selectedDate);
                }}
              />
            )}
            {touched.availabilityDate && errors.availabilityDate && (
              <Text style={styles.error}>{errors.availabilityDate}</Text>
            )}
          </View>

          <Text style={styles.label}>Wage Expectation Category</Text>
          <DropDownPicker
            open={values.wageExpectationOpen}
            setOpen={(open) => setFieldValue('wageExpectationOpen', open)}
            items={values.wageExpectationItems}
            value={values.wageExpectationValue}
            setValue={(callback) => setFieldValue('wageExpectationValue', callback(values.wageExpectationValue))}
            placeholder="Select wage expectation category"
            searchable={true}
            searchPlaceholder="Search wage expectation"
            listMode="MODAL"
            modalProps={{ animationType: 'slide' }}
            style={styles.dropdown}
          />

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Shift Start Time</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker({ ...showDatePicker, shiftStartTime: true })}>
              <Text style={styles.input}>
                {values.shiftStartTime ? values.shiftStartTime.toString() : 'Select shift start time'}
              </Text>
              <Icon name="time-outline" size={20} color="#ccc" />
            </TouchableOpacity>
            {showDatePicker.shiftStartTime && (
              <DateTimePicker
                value={values.shiftStartTime ? new Date(values.shiftStartTime) : new Date()}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  setShowDatePicker({ ...showDatePicker, shiftStartTime: false });
                  setFieldValue('shiftStartTime', selectedTime);
                }}
              />
            )}
            {touched.shiftStartTime && errors.shiftStartTime && (
              <Text style={styles.error}>{errors.shiftStartTime}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Shift End Time</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker({ ...showDatePicker, shiftEndTime: true })}>
              <Text style={styles.input}>
                {values.shiftEndTime ? values.shiftEndTime.toString() : 'Select shift end time'}
              </Text>
              <Icon name="time-outline" size={20} color="#ccc" />
            </TouchableOpacity>
            {showDatePicker.shiftEndTime && (
              <DateTimePicker
                value={values.shiftEndTime ? new Date(values.shiftEndTime) : new Date()}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  setShowDatePicker({ ...showDatePicker, shiftEndTime: false });
                  setFieldValue('shiftEndTime', selectedTime);
                }}
              />
            )}
            {touched.shiftEndTime && errors.shiftEndTime && (
              <Text style={styles.error}>{errors.shiftEndTime}</Text>
            )}
          </View>
          <Text style={styles.label}>Time Zone</Text>
          <DropDownPicker
            open={values.timeZoneOpen}
            setOpen={(open) => setFieldValue('timeZoneOpen', open)}
            items={[
              { label: 'UTC-12:00', value: 'utc-12' },
              { label: 'UTC-11:00', value: 'utc-11' },
              { label: 'UTC-10:00', value: 'utc-10' },
              { label: 'UTC-09:00', value: 'utc-9' },
              { label: 'UTC-08:00', value: 'utc-8' },
              { label: 'UTC-07:00', value: 'utc-7' },
              { label: 'UTC-06:00', value: 'utc-6' },
              { label: 'UTC-05:00', value: 'utc-5' },
              { label: 'UTC-04:00', value: 'utc-4' },
              { label: 'UTC-03:00', value: 'utc-3' },
              { label: 'UTC-02:00', value: 'utc-2' },
              { label: 'UTC-01:00', value: 'utc-1' },
              { label: 'UTC+00:00', value: 'utc+0' },
              { label: 'UTC+01:00', value: 'utc+1' },
              { label: 'UTC+02:00', value: 'utc+2' },
              { label: 'UTC+03:00', value: 'utc+3' },
              { label: 'UTC+04:00', value: 'utc+4' },
              { label: 'UTC+05:00', value: 'utc+5' },
              { label: 'UTC+06:00', value: 'utc+6' },
              { label: 'UTC+07:00', value: 'utc+7' },
              { label: 'UTC+08:00', value: 'utc+8' },
              { label: 'UTC+09:00', value: 'utc+9' },
              { label: 'UTC+10:00', value: 'utc+10' },
              { label: 'UTC+11:00', value: 'utc+11' },
              { label: 'UTC+12:00', value: 'utc+12' },
            ]}
            value={values.timeZoneValue || 'utc+0'}
            setValue={(callback) => setFieldValue('timeZoneValue', callback(values.timeZoneValue))}
            placeholder="Select time zone"
            searchable={true}
            searchPlaceholder="Search time zone"
            listMode="MODAL"
            modalProps={{ animationType: 'slide' }}
            style={styles.dropdown}
          />
         <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit as any}>
            <Text style={styles.saveBtnText}>{isSubmitting ? 'Saving...' : 'Save'}</Text>
        </TouchableOpacity>
        </View>
      )}}
    </Formik>
  );
};

export default JobPreferencesForm;