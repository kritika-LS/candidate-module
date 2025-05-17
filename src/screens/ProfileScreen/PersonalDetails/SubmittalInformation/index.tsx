import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
import Icon from '../../../../components/common/Icon/Icon';
import { theme } from '../../../../theme';
import { TextStyle } from '../../../../components/common/Text';

const MAX_CHAR_LENGTH = 256;

const SubmittalInformationScreen: React.FC = () => {
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [socialSecurityNumber, setSocialSecurityNumber] = useState('');
  const navigation = useNavigation();

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const formatDate = (date: Date | undefined): string => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${month}/${day}/${year}`;
    }
    return '';
  };

  const handleSave = () => {
    if (socialSecurityNumber.length > MAX_CHAR_LENGTH) {
      Alert.alert(
        'Validation Error',
        `Social Security Number cannot exceed ${MAX_CHAR_LENGTH} characters.`,
      );
      return;
    }

    // In a real application, you would save the submittal information here.
    console.log('Submittal Information saved:', {
      dateOfBirth: dateOfBirth ? formatDate(dateOfBirth) : null,
      socialSecurityNumber,
    });
    Alert.alert('Success', 'Submittal information saved!');
    // Optionally navigate to another screen: navigation.goBack();
  };

  return (
    <View style={styles.container}>

      <View style={styles.inputGroup}>
        <TextStyle size='sm' style={styles.label}>Date of Birth</TextStyle>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={showDatepicker}>
          <TextStyle size='sm' color={theme.colors.text.light}>
            {formatDate(dateOfBirth) || 'Select date of birth'}
          </TextStyle>
          <Icon name='calendar-outline' size={20} color={theme.colors.grey[400]} />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateOfBirth || new Date()}
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
          placeholder="Enter social security number"
          value={socialSecurityNumber}
          onChangeText={(text) => {
            if (text.length <= MAX_CHAR_LENGTH) {
              setSocialSecurityNumber(text);
            }
          }}
          maxLength={MAX_CHAR_LENGTH}
          keyboardType="number-pad" // Consider masking for better UX
        />
      </View>

      {/* <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <TextStyle style={styles.saveButtonText}>Save</TextStyle>
      </TouchableOpacity> */}
    </View>
  );
};

export default SubmittalInformationScreen;