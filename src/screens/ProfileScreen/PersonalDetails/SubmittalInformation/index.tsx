import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
import Icon from '../../../../components/common/Icon/Icon';
import { theme } from '../../../../theme';
import { TextStyle } from '../../../../components/common/Text';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';

const SubmittalInformationScreen: React.FC<{ 
  initialValues: any; 
  updateValues: (updatedValues: any) => void;
  errors: any;
  touched: any;
  updateErrors: (updatedErrors: any) => void;
  updateTouched: (updatedTouched: any) => void;
 }> = ({ initialValues, updateValues, errors, touched, updateErrors, updateTouched }) => {
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const validateField = (fieldName: string, value: any) => {
    let error = '';
    switch (fieldName) {
      case 'socialSecurityNumber':
        if (!value) error = 'Social Security Number is required';
        break;
      case 'dateOfBirth':
        if (!value) error = 'Date of Birth is required';
        else if (new Date(value) > new Date()) error = 'Date of Birth cannot be in the future';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (fieldName: string, value: any) => {
    const updatedValues = { ...initialValues, [fieldName]: value };
    updateValues(updatedValues);
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      updateErrors({ [fieldName]: error });
    }
  };

  const handleBlur = (fieldName: string) => {
    updateTouched({ [fieldName]: true });
    const error = validateField(fieldName, initialValues[fieldName]);
    updateErrors({ [fieldName]: error });
  };


  const formatSSN = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 5) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
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


  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChange('dateOfBirth', selectedDate.toISOString());
    }
  };

  return (
    <View style={styles.container}>
      <ProfileScreenHeader
        headerIcon='clipboard-text-outline'
        headerTitle='Submittal Information'
        completedStatus={true}
      />
      <View style={styles.inputGroup}>
        <TextStyle size='sm' style={styles.label}>Date of Birth</TextStyle>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
          onBlur={() => handleBlur('dateOfBirth')}
          >
          <TextStyle size='sm' color={theme.colors.text.light}>
            {initialValues.dateOfBirth ? formatDate(initialValues.dateOfBirth) : 'Select date of birth'}
          </TextStyle>
          <Icon name='calendar-outline' size={20} color={theme.colors.grey[400]} />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={initialValues.dateOfBirth ? new Date(initialValues.dateOfBirth) : new Date()}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>

      <View style={styles.inputGroup}>
        <TextStyle size='sm' style={styles.label}>Social Security Number</TextStyle>
        <TextInput
          style={styles.input}
          placeholder="XXX-XX-XXXX"
          value={initialValues?.socialSecurityNumber}
          onChangeText={(text) => {
            const formattedSSN = formatSSN(text);
            handleChange('socialSecurityNumber', formattedSSN);
          }}
          maxLength={11}
          keyboardType="number-pad"
          onBlur={() => handleBlur('socialSecurityNumber')}
        />
        {touched?.socialSecurityNumber && errors?.socialSecurityNumber && (
          <Text style={styles.errorText}>{errors.socialSecurityNumber}</Text>
        )}
      </View>

    </View>
  );
};

export default SubmittalInformationScreen;