import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from './styles';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';
import { workTypePreference } from '../../../../constants/workTypePreference';
import { shiftList } from '../../../../constants/shift';
import { Input } from '../../../../components/common/Input';
import { TextStyle } from '../../../../components/common/Text';
import { theme } from '../../../../theme';
import { getCity, GetCityACResp, getGeoCoding } from '../../../../api/services/autocomplete';
import { shiftTimezone } from '../../../../constants/shifTimezone';
import { payCycle } from '../../../../constants/payCycle';
import { currencyList } from '../../../../constants/currency';
import { convertHHmmToISOString, formatHHmmTo12Hour } from '../../../../utils/contant';
import moment from 'moment';

const JobPreferencesScreen: React.FC<{ 
  initialValues: any; 
  updateValues: (updatedValues: any) => void;
  errors: any;
  touched: any;
  updateErrors: (updatedErrors: any) => void;
  updateTouched: (updatedTouched: any) => void;
 }> = ({ initialValues, updateValues, errors, touched, updateErrors, updateTouched }) => {
  const [showDatePicker, setShowDatePicker] = useState({
    availabilityDate: false,
    shiftStartTime: false,
    shiftEndTime: false,
  });
  const [employmentTypeOpen, setEmploymentTypeOpen] = useState(false);
  const [shiftOpen, setShiftOpen] = useState(false);
  const [wageExpectationOpen, setWageExpectationOpen] = useState(false);
  const [workplacePreferenceValueOpen, setWorkplacePreferenceValueOpen] = useState(false);
  const [timeZoneOpen, setTimeZoneOpen] = useState(false);
  const [isTypingPhysicalZip, setIsTypingPhysicalZip] = useState(false);
  const [physicalZipSuggestions, setPhysicalZipSuggestions] = useState<GetCityACResp[]>([]);
  const [cityJustSelected, setCityJustSelected] = useState(false);
  const [loadingPhysicalZipSuggestions, setLoadingPhysicalZipSuggestions] = useState(false);
  const [showPhysicalZipSuggestions, setShowPhysicalZipSuggestions] = useState(false);


  const validateField = (fieldName: string, value: any) => {
    let error = '';
    switch (fieldName) {
      case 'selectedStates':
        if (!value) error = 'State is required';
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
      updateValues({ ...initialValues, [field]:  moment(selectedDate.toISOString()).utc().format("HHmm") });
    }
  };

  const handlePhysicalAddressSelect = async (item: GetCityACResp) => {
    setShowPhysicalZipSuggestions(false);
    setIsTypingPhysicalZip(false);
    setLoadingPhysicalZipSuggestions(true);
    setCityJustSelected(true);

    try {
      const addressDetails = await getGeoCoding(item.placeId);
      handleChange('selectedStates', addressDetails?.stateName);
    } catch (error) {
      console.error('Error processing selected address:', error);
    } finally {
      setLoadingPhysicalZipSuggestions(false);
    }
  };

  useEffect(() => {
    const handlePhysicalZipSearch = async () => {
      const zipCode = initialValues.searchStates;
      if (
        isTypingPhysicalZip &&
        !cityJustSelected &&
        zipCode &&
        zipCode.length >= 1
      ) {
        setLoadingPhysicalZipSuggestions(true);
        try {
          const suggestions = await getCity(zipCode);
          setPhysicalZipSuggestions(suggestions);
          setShowPhysicalZipSuggestions(suggestions.length > 0);
        } catch (error) {
          console.error('Error fetching physical zipcode suggestions:', error);
        } finally {
          setLoadingPhysicalZipSuggestions(false);
        }
      } else {
        setPhysicalZipSuggestions([]);
        setShowPhysicalZipSuggestions(false);
      }
    };

    const debounce = setTimeout(handlePhysicalZipSearch, 500);
    return () => clearTimeout(debounce);
  }, [initialValues?.searchStates, isTypingPhysicalZip, cityJustSelected]);


  return (
    <View style={styles.body}>
      <ProfileScreenHeader
        headerIcon='cog-outline'
        headerTitle='Job Preferences'
        completedStatus={true}
      />
      <View style={styles.container}>
        <Text style={styles.label}>Employment Type <Text style={styles.asterisk}>*</Text></Text>
        <DropDownPicker
          open={employmentTypeOpen}
          setOpen={setEmploymentTypeOpen}
          items={workTypePreference}
          value={initialValues.employmentTypeValue}
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
          items={shiftList}
          value={initialValues.shiftValue}
          setValue={(callback) => updateValues({ ...initialValues, shiftValue: callback(initialValues.shiftValue) })}
          placeholder="Select shift"
          searchable={false}
          listMode="SCROLLVIEW"
          style={[styles.dropdown, { zIndex: shiftOpen ? 10 : 1 }]}
          dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
        />

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Availability Date <Text style={styles.asterisk}>*</Text></Text>
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

        <View>
        <Input
          label="State"
          value={initialValues.searchStates}
          onChangeText={(text) => {
            updateValues({ ...initialValues, searchStates: text });
            setIsTypingPhysicalZip(true);
          }}
          onBlur={() => {
            handleBlur('searchStates');
            setIsTypingPhysicalZip(false);
          }}
          error={errors?.selectedStates}
          touched={touched?.selectedStates}
          placeholder="Search/select state"
        />
        {loadingPhysicalZipSuggestions && (
          <View style={styles.autocompleteLoadingContainer}>
            <ActivityIndicator size="small" color={theme.colors.primary.main} />
            <TextStyle variant="regular" size="sm" style={styles.loadingFieldText}>
              Searching addresses...
            </TextStyle>
          </View>
        )}
        {showPhysicalZipSuggestions && physicalZipSuggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={physicalZipSuggestions}
              keyExtractor={item => item.placeId}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => handlePhysicalAddressSelect(item)}>
                  <TextStyle variant="regular" size="sm">
                    {item.value}
                  </TextStyle>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
              style={styles.suggestionsList}
            />
          </View>
        )}
        {cityJustSelected && initialValues.selectedStates && (
          <View style={styles.savedSearchChip}>
            <TextStyle size="sm" color={theme.colors.text.white} style={styles.savedSearchChipText}>
              {initialValues.selectedStates}
            </TextStyle>
            <TouchableOpacity
              onPress={() => {
                updateValues({ ...initialValues, selectedStates: "" ,searchStates: "" });
                setCityJustSelected(false); // reset here only
              }}>
              <Icon name="close" size={14} color={theme.colors.text.white} style={styles.trashIcon} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={styles.label}>Pay Rate</Text>
        <DropDownPicker
          open={wageExpectationOpen}
          setOpen={setWageExpectationOpen}
          items={currencyList}
          value={initialValues.currency}
          setValue={(callback) => updateValues({ ...initialValues, currency: callback(initialValues.currency) })}
          placeholder="Select wage expectation category"
          searchable={false}
          listMode="SCROLLVIEW"
          style={[styles.dropdown, { zIndex: wageExpectationOpen ? 10 : 1 }]}
          dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
        />

        <Text style={styles.label}>Wage Expectation Category</Text>
        <DropDownPicker
          open={workplacePreferenceValueOpen}
          setOpen={setWorkplacePreferenceValueOpen}
          items={payCycle}
          value={initialValues.workplacePreferenceValue}
          setValue={(callback) => updateValues({ ...initialValues, workplacePreferenceValue: callback(initialValues.workplacePreferenceValue) })}
          placeholder="Select wage expectation category"
          searchable={false}
          listMode="SCROLLVIEW"
          style={[styles.dropdown, { zIndex: workplacePreferenceValueOpen ? 10 : 1 }]}
          dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
        />

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Shift Start Time</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker({ ...showDatePicker, shiftStartTime: true })}>
            <Text style={styles.input}>
              {initialValues.shiftStartTime ? formatHHmmTo12Hour(initialValues.shiftStartTime) : 'Select shift start time'}
            </Text>
            <Icon name="time-outline" size={20} color="#ccc" />
          </TouchableOpacity>
          {showDatePicker.shiftStartTime && (
            <DateTimePicker
              value={initialValues.shiftStartTime ? new Date(convertHHmmToISOString(initialValues.shiftStartTime)) : new Date()}
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
              {initialValues.shiftEndTime ? formatHHmmTo12Hour(initialValues.shiftEndTime) : 'Select shift end time'}
            </Text>
            <Icon name="time-outline" size={20} color="#ccc" />
          </TouchableOpacity>
          {showDatePicker.shiftEndTime && (
            <DateTimePicker
              value={initialValues.shiftEndTime ? new Date(convertHHmmToISOString(initialValues.shiftEndTime)) : new Date()}
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
          items={shiftTimezone}
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