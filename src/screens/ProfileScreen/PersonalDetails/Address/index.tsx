import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Switch,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { theme } from '../../../../theme';
import { TextStyle } from '../../../../components/common/Text';
import { Input } from '../../../../components/common/Input';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';
import { getCity, GetCityACResp, getGeoCoding } from '../../../../api/services/autocomplete';

const AddressDetailsScreen: React.FC<{
  initialValues: any;
  updateValues: (updatedValues: any) => void;
  errors: any;
  touched: any;
  updateErrors: (updatedErrors: any) => void;
  updateTouched: (updatedTouched: any) => void;
}> = ({ initialValues, updateValues, errors, touched, updateErrors, updateTouched }) => {
  const [isTypingCurrentZip, setIsTypingCurrentZip] = useState(false);
  const [isTypingPhysicalZip, setIsTypingPhysicalZip] = useState(false);
  const [physicalZipSuggestions, setPhysicalZipSuggestions] = useState<GetCityACResp[]>([]);
  const [cityJustSelected, setCityJustSelected] = useState(false);
  const [loadingPhysicalZipSuggestions, setLoadingPhysicalZipSuggestions] = useState(false);
  const [showPhysicalZipSuggestions, setShowPhysicalZipSuggestions] = useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);

  React.useEffect(() => {
    const isCurrentAddressComplete = Object.values(initialValues?.currentAddress).every(
      (value) => value && value.trim() !== ''
    );
    const isPermanentAddressComplete = initialValues?.isSamePermanent || Object.values(initialValues?.permanentAddress).every(
      (value) => value && value.trim() !== ''
    );
    setIsCompleted(isCurrentAddressComplete && isPermanentAddressComplete);
  }, [initialValues]);

  const validateField = (fieldName: string, value: any) => {
    let error = '';
    switch (fieldName) {
      case 'address':
        if (!value) error = 'Address is required';
        break;
      case 'city':
        if (!value) error = 'City is required';
        break;
      case 'zipCode':
        if (!value) error = 'Zip Code is required';
        else if (!/^\d{5,}$/.test(value)) error = 'Invalid Zip Code';
        break;
      case 'stateCode':
        if (!value) error = 'State Code is required';
        break;
      case 'countryCode':
        if (!value) error = 'Country Code is required';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (fieldName: string, value: any, addressType: string) => {
    const updatedValues = {
      ...initialValues,
      [addressType]: { ...initialValues?.[addressType], [fieldName]: value },
    };
    updateValues(updatedValues);
    if (touched?.[addressType]?.[fieldName]) {
      const error = validateField(fieldName, value);
      updateErrors({
        [addressType]: { ...errors?.[addressType], [fieldName]: error },
      });
    }
  };

  const handleBlur = (fieldName: string, addressType: string) => {
    updateTouched({
      [addressType]: { ...touched?.[addressType], [fieldName]: true },
    });
    const error = validateField(fieldName, initialValues?.[addressType]?.[fieldName]);
    updateErrors({
      [addressType]: { ...errors?.[addressType], [fieldName]: error },
    });
  };

  const handlePhysicalAddressSelect = async (item: GetCityACResp, addressType: string) => {
    setShowPhysicalZipSuggestions(false);
    setIsTypingPhysicalZip(false);
    setLoadingPhysicalZipSuggestions(true);

    try {
      const addressDetails = await getGeoCoding(item.placeId);
      updateValues({
        ...initialValues,
        [addressType]: {
          ...initialValues?.[addressType],
          countryCode: addressDetails?.countryName,
          stateCode: addressDetails?.stateName,
          city: addressDetails?.city,
          zipCode: addressDetails?.zipcode,
        },
      });
    } catch (error) {
      console.error('Error processing selected address:', error);
    } finally {
      setLoadingPhysicalZipSuggestions(false);
    }
  };

  useEffect(() => {
    const handlePhysicalZipSearch = async () => {
      const zipCode = isTypingCurrentZip ? initialValues?.currentAddress?.zipCode : initialValues?.permanentAddress.zipCode;
      if (
        (isTypingPhysicalZip || isTypingCurrentZip) &&
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
    initialValues?.currentAddress?.zipCode,
    initialValues?.permanentAddress?.zipCode,
    isTypingPhysicalZip,
    isTypingCurrentZip,
    cityJustSelected,
  ]);

  return (
    <View style={styles.body}>
      <ProfileScreenHeader
        headerIcon="home-outline"
        headerTitle="Address Details"
        completedStatus={isCompleted}
      />
      <View style={styles.formSection}>
        <TextStyle variant="medium" size="lg" style={styles.sectionTitle}>
          Current Address
        </TextStyle>
        <Input
          label="Address"
          required
          value={initialValues?.currentAddress?.address}
          onChangeText={(value) => handleChange('address', value, 'currentAddress')}
          onBlur={() => handleBlur('address', 'currentAddress')}
          error={errors?.currentAddress?.address}
          touched={touched?.currentAddress?.address}
          placeholder="Enter address"
        />
        <View>
          <Input
            label="Zip Code"
            required
            value={initialValues?.currentAddress?.zipCode}
            onChangeText={(text) => {
              handleChange('zipCode', text, 'currentAddress');
              setIsTypingCurrentZip(true);
              setIsTypingPhysicalZip(false);
            }}
            onBlur={() => handleBlur('zipCode', 'currentAddress')}
            error={errors?.currentAddress?.zipCode}
            touched={touched?.currentAddress?.zipCode}
            keyboardType="numeric"
            placeholder="Enter ZIP code to find address"
          />
          {isTypingCurrentZip && loadingPhysicalZipSuggestions && (
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
          {isTypingCurrentZip && showPhysicalZipSuggestions &&
            physicalZipSuggestions.length > 0 && (
              <View style={styles.suggestionsContainer}>
                <FlatList
                  data={physicalZipSuggestions}
                  keyExtractor={item => item.placeId}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.suggestionItem}
                      onPress={() => handlePhysicalAddressSelect(item, 'currentAddress')}>
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
          label="City"
          required
          value={initialValues?.currentAddress?.city}
          onChangeText={(value) => handleChange('city', value, 'currentAddress')}
          onBlur={() => handleBlur('city', 'currentAddress')}
          error={errors?.currentAddress?.city}
          touched={touched?.currentAddress?.city}
          placeholder="Enter city"
        />
        <Input
          label="State"
          required
          value={initialValues?.currentAddress?.stateCode}
          onChangeText={(value) => handleChange('stateCode', value, 'currentAddress')}
          onBlur={() => handleBlur('stateCode', 'currentAddress')}
          error={errors?.currentAddress?.stateCode}
          touched={touched?.currentAddress?.stateCode}
          placeholder="Enter state"
        />
        <Input
          label="Country"
          required
          value={initialValues?.currentAddress?.countryCode}
          onChangeText={(value) => handleChange('countryCode', value, 'currentAddress')}
          onBlur={() => handleBlur('countryCode', 'currentAddress')}
          error={errors?.currentAddress?.countryCode}
          touched={touched?.currentAddress?.countryCode}
          placeholder="Enter country"
        />
        <Text style={styles.label}>Address Notes</Text>
        <TextInput
          style={[styles.inputArea, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Enter address notes"
          multiline
          maxLength={1024}
          value={initialValues?.currentAddress?.addressNotes}
          onChangeText={(value) => handleChange('addressNotes', value, 'currentAddress')}
        />
      </View>

      <View style={styles.toggleSection}>
        <View style={styles.sameAddressToggle}>
          <TextStyle variant="regular" size="md">
            Permanent Address
          </TextStyle>
          <Switch
            value={initialValues?.isSamePermanent}
            onValueChange={(value) => {
              if (value) {
                updateValues({
                  ...initialValues,
                  permanentAddress: { ...initialValues?.currentAddress },
                  isSamePermanent: value,
                });
              } else {
              updateValues({...initialValues,isSamePermanent: value});
              }
            }}
            trackColor={{
              false: theme.colors.grey[300],
              true: theme.colors.primary.main,
            }}
            thumbColor={theme.colors.background.paper}
          />
          <TextStyle variant="regular" size="xs">
            Same as current address
          </TextStyle>
        </View>
      </View>

      {!initialValues?.isSamePermanent && (
        <View style={styles.formSection}>
          <TextStyle variant="medium" size="lg" style={styles.sectionTitle}>
            Permanent Address
          </TextStyle>
          <Input
            label="Address"
            required
            value={initialValues.permanentAddress.address}
            onChangeText={(value) => handleChange('address', value, 'permanentAddress')}
            onBlur={() => handleBlur('address', 'permanentAddress')}
            error={errors?.permanentAddress?.address}
            touched={touched?.permanentAddress?.address}
            placeholder="Enter address"
          />
          <View>
            <Input
              label="Zip Code"
              required
              value={initialValues?.permanentAddress.zipCode}
              onChangeText={(text) => {
                handleChange('zipCode', text, 'permanentAddress');
                setIsTypingPhysicalZip(true);
                setIsTypingCurrentZip(false);
              }}
              onBlur={() => handleBlur('zipCode', 'permanentAddress')}
              error={errors?.permanentAddress?.zipCode}
              touched={touched?.permanentAddress?.zipCode}
              keyboardType="numeric"
              placeholder="Enter ZIP code to find address"
            />
            {isTypingPhysicalZip && loadingPhysicalZipSuggestions && (
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
            {isTypingPhysicalZip && showPhysicalZipSuggestions &&
              physicalZipSuggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                  <FlatList
                    data={physicalZipSuggestions}
                    keyExtractor={item => item.placeId}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.suggestionItem}
                        onPress={() => handlePhysicalAddressSelect(item, 'permanentAddress')}>
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
            label="City"
            required
            value={initialValues?.permanentAddress.city}
            onChangeText={(value) => handleChange('city', value, 'permanentAddress')}
            onBlur={() => handleBlur('city', 'permanentAddress')}
            error={errors?.permanentAddress?.city}
            touched={touched?.permanentAddress?.city}
            placeholder="Enter city"
          />
          <Input
            label="State"
            required
            value={initialValues?.permanentAddress.stateCode}
            onChangeText={(value) => handleChange('stateCode', value, 'permanentAddress')}
            onBlur={() => handleBlur('stateCode', 'permanentAddress')}
            error={errors?.permanentAddress?.stateCode}
            touched={touched?.permanentAddress?.stateCode}
            placeholder="Enter state"
          />
          <Input
            label="Country"
            required
            value={initialValues?.permanentAddress.countryCode}
            onChangeText={(value) => handleChange('countryCode', value, 'permanentAddress')}
            onBlur={() => handleBlur('countryCode', 'permanentAddress')}
            error={errors?.permanentAddress?.countryCode}
            touched={touched?.permanentAddress?.countryCode}
            placeholder="Enter country"
          />
          <Text style={styles.label}>Address Notes</Text>
          <TextInput
            style={[styles.inputArea, { height: 100, textAlignVertical: 'top' }]}
            placeholder="Enter address notes"
            multiline
            maxLength={1024}
            value={initialValues?.permanentAddress?.addressNotes}
            onChangeText={(value) => handleChange('addressNotes', value, 'permanentAddress')}
          />
        </View>
      )}
    </View>
  );
};

export default AddressDetailsScreen;

const styles = StyleSheet.create({
  body: {
    marginVertical: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  formSection: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    marginBottom: theme.spacing.md,
  },
  inputArea: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  toggleSection: {
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  sameAddressToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  label: {
    marginTop: 16,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
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
    shadowOffset: { width: 0, height: 2 },
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