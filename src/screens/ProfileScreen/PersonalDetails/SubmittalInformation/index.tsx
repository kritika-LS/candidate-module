import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
import Icon from '../../../../components/common/Icon/Icon';
import { theme } from '../../../../theme';
import { TextStyle } from '../../../../components/common/Text';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';

const SubmittalInformationScreen: React.FC<{ initialValues: any; updateValues: (updatedValues: any) => void }> = ({ initialValues, updateValues }) => {
  const [showDatePicker, setShowDatePicker] = React.useState(false);

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
      updateValues({ ...initialValues, dateOfBirth: selectedDate.toISOString() });
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
          onPress={() => setShowDatePicker(true)}>
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
          value={initialValues.socialSecurityNumber}
          onChangeText={(text) => {
            const formattedSSN = formatSSN(text);
            updateValues({ ...initialValues, socialSecurityNumber: formattedSSN });
          }}
          maxLength={11}
          keyboardType="number-pad"
        />
      </View>

    </View>
  );
};

export default SubmittalInformationScreen;