import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Input } from '../../../../components/common/Input';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';
import { getCity, GetCityACResp, getGeoCoding } from '../../../../api/services/autocomplete';
import { theme } from '../../../../theme';
import { TextStyle } from '../../../../components/common/Text';

const EmergencyContactAddressScreen: React.FC<{ 
  initialValues: any; 
  updateValues: (updatedValues: any) => void;
  errors: any;
  touched: any;
  updateErrors: (updatedErrors: any) => void;
  updateTouched: (updatedTouched: any) => void;
 }> = ({ initialValues, updateValues, errors, touched, updateErrors, updateTouched }) => {
  const [isTypingPhysicalZip, setIsTypingPhysicalZip] = useState(false);
  const [physicalZipSuggestions, setPhysicalZipSuggestions] = useState<GetCityACResp[]>([]);
  const [cityJustSelected, setCityJustSelected] = useState(false);
  const [loadingPhysicalZipSuggestions, setLoadingPhysicalZipSuggestions] = useState(false);
  const [showPhysicalZipSuggestions, setShowPhysicalZipSuggestions] = useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);

  const handleChangeText = (fieldName: string, value: string) => {
    updateValues({ ...initialValues, [fieldName]: value });
  };

  const handlePhysicalAddressSelect = async (item: GetCityACResp) => {
    setShowPhysicalZipSuggestions(false);
    setIsTypingPhysicalZip(false);
    setLoadingPhysicalZipSuggestions(true);

    try {
      const addressDetails = await getGeoCoding(item.placeId);
      updateValues({ ...initialValues,country:addressDetails.countryName,state:addressDetails.stateName,city:addressDetails.city,zipCode:addressDetails.zipcode});
    } catch (error) {
      console.error('Error processing selected address:', error);
    } finally {
      setLoadingPhysicalZipSuggestions(false);
    }
  };

  useEffect(() => {
    const handlePhysicalZipSearch = async () => {
      const zipCode = initialValues?.zipCode;
      if (
        isTypingPhysicalZip &&
        !cityJustSelected &&
        zipCode &&
        zipCode.length >= 5
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
      if (cityJustSelected) {
        setCityJustSelected(false);
      }
    };

    const debounce = setTimeout(handlePhysicalZipSearch, 500);
    return () => clearTimeout(debounce);
  }, [
    initialValues?.zipCode,
    isTypingPhysicalZip,
    cityJustSelected,
  ]);

  useEffect(() => {
    const allFilled = Object.values(initialValues).every(
      (value) => value && value.trim() !== ''
    );
    setIsCompleted(allFilled);
  }
  , [initialValues]);

  return (
    <View style={styles.body}>
      <View style={styles.formSection}>
        <ProfileScreenHeader
          headerIcon='shield-alert-outline'
          headerTitle='Emergency Contact and Address'
          completedStatus={isCompleted}
        />
        <Input
          label="First Name"
          value={initialValues.firstName}
          onChangeText={(text) => handleChangeText("firstName",text)}
          placeholder='Enter First Name'
        />
         <Input
          label="Middle Name"
          value={initialValues.middleName}
          onChangeText={(text) => handleChangeText("middleName",text)}
          placeholder='Enter middleName Name'
        />
        <Input
          label="Last Name"
          value={initialValues.lastName}
          onChangeText={(text) => handleChangeText("lastName",text)}
          placeholder='Enter Last Name'
        />
        <Input
          label="Relationship"
          value={initialValues.relationship}
          onChangeText={(text) => handleChangeText("relationship",text)}
          placeholder='Enter Relationship'
        />
        <Input
          label="Primary Mobile Number"
          value={initialValues.primaryMobileNumber}
          onChangeText={(text) => handleChangeText("primaryMobileNumber",text)}
          placeholder='Enter Primary Mobile Number'
        />
        <Input
          label="Secondary Mobile Number"
          value={initialValues.secondaryMobileNumber}
          onChangeText={(text) => handleChangeText("secondaryMobileNumber",text)}
          placeholder='Enter Secondary Mobile Number'
        />
        <Input
          label="Work Phone Number"
          value={initialValues.workPhoneNumber}
          onChangeText={(text) => handleChangeText("workPhoneNumber",text)}
          placeholder='Enter Work Phone Number'
        />
        <Input
          label="Extension Number"
          value={initialValues.workPhoneExtensionNumber}
          onChangeText={(text) => handleChangeText("workPhoneExtensionNumber",text)}
          placeholder='Enter Extension Number'
        />
        <Input
          label="Address"
          value={initialValues.address}
          onChangeText={(text) => handleChangeText("address",text)}
          placeholder='Enter Address'
        />
        <Input
          label="City"
          value={initialValues.city}
          onChangeText={(text) => handleChangeText("city",text)}
          placeholder='Enter City'
        />
        <View>
        <Input
          label="Zip Code"
          value={initialValues.zipCode}
          onChangeText={(text) => {
           handleChangeText("zipCode", text);
            setIsTypingPhysicalZip(true);
          }}
          keyboardType="numeric"
          placeholder="Enter ZIP code to find address"
        />
        {loadingPhysicalZipSuggestions && (
            <View style={styles.autocompleteLoadingContainer}>
              <ActivityIndicator
                size="small"
                color={theme.colors.primary.main}
              />
              <TextStyle
                variant="regular"
                size="sm"
                style={styles.loadingFieldText}>
                Searching addresses...
              </TextStyle>
            </View>
          )}
          {showPhysicalZipSuggestions &&
            physicalZipSuggestions.length > 0 && (
              <View style={styles.suggestionsContainer}>
                <FlatList
                  data={physicalZipSuggestions}
                  keyExtractor={item => item.placeId}
                  renderItem={({item}) => (
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
        </View>
        <Input
          label="State"
          value={initialValues.state}
          onChangeText={(text) => handleChangeText("state",text)}
          placeholder='Enter State'
        />
        <Input
          label="Country"
          value={initialValues.country}
          onChangeText={(text) => handleChangeText("country",text)}
          placeholder='Enter Country'
        />
        <Text>Notes</Text>
        <TextInput
          style={[styles.inputArea, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Notes"
          multiline
          maxLength={1024}
          value={initialValues.notes}
          onChangeText={text => handleChangeText("notes", text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  body: {
    marginVertical: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  formSection: {
    // marginBottom: 24,
  },
  saveButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#007BFF',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputArea: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  autocompleteLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.xs,
  },
  loadingFieldText: {
    marginLeft: theme.spacing.sm,
  },
  suggestionsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 80,
    backgroundColor: theme.colors.background.paper,
    borderWidth: 1,
    borderColor: theme.colors.grey[300],
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
    maxHeight: 200,
  },
  suggestionsList: {
    maxHeight: 200,
  },
  suggestionItem: {
    padding: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey[200],
  },
});

export default EmergencyContactAddressScreen;