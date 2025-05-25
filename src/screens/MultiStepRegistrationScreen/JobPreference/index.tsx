import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Input } from '../../../components/common/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { leadershipTypes, shifts } from '../../../constants';
import { TextStyle } from '../../../components/common/Text';
import { theme } from '../../../theme';
import { getCity, GetCityACResp, getGeoCoding } from '../../../api/services/autocomplete';
import Icon from '../../../components/common/Icon/Icon';

export const JobPreferenceForm = ({ data, onChange, errors, touched, setTouched }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filteredEmploymentType, setFilteredEmploymentType] = useState<string[]>([]);
  const [showEmploymentTypeDropdown, setShowEmploymentTypeDropdown] = useState(false);
  const [filtertShift, setShiftType] = useState<string[]>([]);
  const [showShiftdown, setShowShiftdown] = useState(false);
  const [isTypingPhysicalZip, setIsTypingPhysicalZip] = useState(false);
  const [physicalZipSuggestions, setPhysicalZipSuggestions] = useState<GetCityACResp[]>([]);
  const [cityJustSelected, setCityJustSelected] = useState(false);
  const [loadingPhysicalZipSuggestions, setLoadingPhysicalZipSuggestions] = useState(false);
  const [showPhysicalZipSuggestions, setShowPhysicalZipSuggestions] = useState(false);

  const handlePhysicalAddressSelect = async (item: GetCityACResp) => {
    setShowPhysicalZipSuggestions(false);
    setIsTypingPhysicalZip(false);
    setLoadingPhysicalZipSuggestions(true);
    setCityJustSelected(true);

    try {
      const addressDetails = await getGeoCoding(item.placeId);
      console.log("tag addressDetails", addressDetails);
      onChange({ ...data, selectedStates: addressDetails?.stateName });
    } catch (error) {
      console.error('Error processing selected address:', error);
    } finally {
      setLoadingPhysicalZipSuggestions(false);
    }
  };

  useEffect(() => {
    const handlePhysicalZipSearch = async () => {
      const zipCode = data.selectedStates;
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
  }, [data?.selectedStates, isTypingPhysicalZip, cityJustSelected]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Employment Type */}
      <View>
        <Input
          label="Employment Type"
          required
          value={data?.employmentType || ""}
          onChangeText={(text) => {
            onChange({ ...data, employmentType: text });
            const filtered = leadershipTypes.filter((p) =>
              p.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredEmploymentType(filtered);
            setShowEmploymentTypeDropdown(true);
          }}
          onFocus={() => {
            setFilteredEmploymentType(leadershipTypes);
            setShowEmploymentTypeDropdown(true);
          }}
          error={errors?.employmentType}
          touched={touched?.employmentType}
          placeholder="Select employment type"
          onBlur={() => {
            setTouched({ ...touched, employmentType: true });
          }}
        />
        {showEmploymentTypeDropdown && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={filteredEmploymentType}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => {
                    onChange({ ...data, employmentType: item });
                    setShowEmploymentTypeDropdown(false);
                    setFilteredEmploymentType([]);
                  }}>
                  <TextStyle variant="regular" size="sm">
                    {item}
                  </TextStyle>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
              style={styles.suggestionsList}
            />
          </View>
        )}
      </View>

      {/* Availability Date */}
      <Input
        label="Availability Start Date"
        required
        placeholder="Select availability start date"
        value={data?.availabilityDate ? moment(data.availabilityDate).format('YYYY-MM-DD') : ''}
        onFocus={() => setShowDatePicker(true)}
        touched={touched?.availabilityDate}
        error={errors?.availabilityDate}
        onBlur={() => setTouched({ ...touched, availabilityDate: true })}
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

      {/* Shift */}
      <View>
        <Input
          label="Shift"
          required
          value={data?.shift || ""}
          onChangeText={(text) => {
            onChange({ ...data, shift: text });
            const filtered = shifts.filter((p) =>
              p.toLowerCase().includes(text.toLowerCase())
            );
            setShiftType(filtered);
            setShowShiftdown(true);
          }}
          onFocus={() => {
            setShiftType(shifts);
            setShowShiftdown(true);
          }}
          error={errors?.shift}
          touched={touched?.shift}
          placeholder="Select shift"
          onBlur={() => {
            setTouched({ ...touched, shift: true });
          }}
        />
        {showShiftdown && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={filtertShift}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => {
                    onChange({ ...data, shift: item });
                    setShowShiftdown(false);
                    setShiftType([]);
                  }}>
                  <TextStyle variant="regular" size="sm">
                    {item}
                  </TextStyle>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
              style={styles.suggestionsList}
            />
          </View>
        )}
      </View>

      {/* State */}
      <View>
        <Input
          label="State"
          required
          value={data.selectedStates}
          onChangeText={(text) => {
            onChange({ ...data, selectedStates: text });
            setIsTypingPhysicalZip(true);
          }}
          error={errors?.selectedStates}
          touched={touched?.selectedStates}
          placeholder="Search/select state"
          onBlur={() => setTouched({ ...touched, selectedStates: true })}
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
        {cityJustSelected && data.selectedStates && (
          <View style={styles.savedSearchChip}>
            <TextStyle size="sm" color={theme.colors.text.white} style={styles.savedSearchChipText}>
              {data.selectedStates}
            </TextStyle>
            <TouchableOpacity
              onPress={() => {
                onChange({ ...data, selectedStates: "" });
                setCityJustSelected(false); // reset here only
              }}>
              <Icon name="close" size={14} color={theme.colors.text.white} style={styles.trashIcon} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    maxHeight: 200,
    borderRadius: 4,
    marginTop: 4,
  },
  suggestionItem: {
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  suggestionsList: {
    maxHeight: 150,
  },
  savedSearchChip: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary.main,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  savedSearchChipText: {
    marginRight: 8,
  },
  trashIcon: {
    padding: 2,
  },
  autocompleteLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  loadingFieldText: {
    marginLeft: 8,
    color: theme.colors.text.secondary,
  },
});
