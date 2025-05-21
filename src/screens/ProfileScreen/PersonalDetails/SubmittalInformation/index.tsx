import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { styles } from './styles';
import Icon from '../../../../components/common/Icon/Icon';
import { theme } from '../../../../theme';
import { TextStyle } from '../../../../components/common/Text';
import { SaveButton } from '../../../../components/features/SaveButton';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';

const SubmittalInformationScreen: React.FC = () => {
  const MAX_CHAR_LENGTH = 256;

  const validationSchema = Yup.object({
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    socialSecurityNumber: Yup.string()
      .max(MAX_CHAR_LENGTH, `Cannot exceed ${MAX_CHAR_LENGTH} characters`)
      .required('Social Security Number is required'),
  });

  const formik = useFormik({
    initialValues: {
      dateOfBirth: '',
      socialSecurityNumber: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Submittal Information saved:', values);
      Alert.alert('Success', 'Submittal information saved!');
    },
  });

  const showDatepicker = () => {
    formik.setFieldTouched('dateOfBirth', true);
    setShowDatePicker(true);
  };

  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      formik.setFieldValue('dateOfBirth', selectedDate.toISOString());
    }
  };

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

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView>
        <View style={styles.container}>
          <ProfileScreenHeader
            headerIcon='clipboard-text-outline'
            headerTitle='Submittal Information'
            completedStatus={false}
          />
          <View style={styles.inputGroup}>
            <TextStyle size='sm' style={styles.label}>Date of Birth</TextStyle>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={showDatepicker}>
              <TextStyle size='sm' color={theme.colors.text.light}>
                {formik.values.dateOfBirth ? formatDate(formik.values.dateOfBirth) : 'Select date of birth'}
              </TextStyle>
              <Icon name='calendar-outline' size={20} color={theme.colors.grey[400]} />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={formik.values.dateOfBirth ? new Date(formik.values.dateOfBirth) : new Date()}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
              <Text style={styles.errorText}>{formik.errors.dateOfBirth}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <TextStyle size='sm' style={styles.label}>Social Security Number</TextStyle>
            <TextInput
              style={styles.input}
              placeholder="Enter social security number"
              value={formik.values.socialSecurityNumber}
              onChangeText={formik.handleChange('socialSecurityNumber')}
              onBlur={formik.handleBlur('socialSecurityNumber')}
              maxLength={MAX_CHAR_LENGTH}
              keyboardType="number-pad"
            />
            {formik.touched.socialSecurityNumber && formik.errors.socialSecurityNumber && (
              <Text style={styles.errorText}>{formik.errors.socialSecurityNumber}</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.saveButton}>
        <SaveButton
          title="Save"
          onPress={formik.handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default SubmittalInformationScreen;