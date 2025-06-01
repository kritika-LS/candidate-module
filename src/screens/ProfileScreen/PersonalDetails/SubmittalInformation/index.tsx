import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { styles } from './styles';
import Icon from '../../../../components/common/Icon/Icon';
import { theme } from '../../../../theme';
import { TextStyle } from '../../../../components/common/Text';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useAppDispatch';
import { updateCandidatePersonalDetails } from '../../../../store/thunk/candidatePersonalDetails.thunk';
import { CandidatePersonalDetailsPayload } from '../../../../types/personalDetails';
import Toast from 'react-native-toast-message';

const SubmittalInformationScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const candidatePersonalDetails = useAppSelector((state) => state?.candidatePersonalDetails?.personalDetails?.responsePayload) || {};
  const [isCompleted, setIsCompleted] = React.useState(false);

  const MAX_CHAR_LENGTH = 11;

  const validationSchema = Yup.object({
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    socialSecurityNumber: Yup.string()
      .matches(/^\d{3}-\d{2}-\d{4}$/, 'Invalid SSN format. Expected format is XXX-XX-XXXX')
      .required('Social Security Number is required'),
  });

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

  const formik = useFormik({
    initialValues: {
      dateOfBirth: candidatePersonalDetails?.dateOfBirth || '',
      socialSecurityNumber: candidatePersonalDetails?.ssn || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const payload: CandidatePersonalDetailsPayload = {
          ...candidatePersonalDetails,
          dateOfBirth: values.dateOfBirth,
          ssn: values.socialSecurityNumber,
        };

        await dispatch(updateCandidatePersonalDetails(payload)).unwrap();
        setIsCompleted(true);
        Toast.show({
          type: 'success',
          text1: 'Submittal information saved successfully',
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Failed to save submittal information',
        });
      }
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
    <View style={styles.container}>
      <ProfileScreenHeader
        headerIcon='clipboard-text-outline'
        headerTitle='Submittal Information'
        completedStatus={isCompleted}
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
          <Text style={styles.errorText}>{formik.errors.dateOfBirth as string}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <TextStyle size='sm' style={styles.label}>Social Security Number</TextStyle>
        <TextInput
          style={styles.input}
          placeholder="XXX-XX-XXXX"
          value={formik.values.socialSecurityNumber}
          onChangeText={(text) => {
            const formattedSSN = formatSSN(text);
            formik.setFieldValue('socialSecurityNumber', formattedSSN);
          }}
          onBlur={formik.handleBlur('socialSecurityNumber')}
          maxLength={MAX_CHAR_LENGTH}
          keyboardType="number-pad"
        />
        {formik.touched.socialSecurityNumber && formik.errors.socialSecurityNumber && (
          <Text style={styles.errorText}>{formik.errors.socialSecurityNumber as string}</Text>
        )}
      </View>
    </View>
  );
};

export default SubmittalInformationScreen;