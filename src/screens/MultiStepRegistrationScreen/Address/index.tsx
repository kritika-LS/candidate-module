/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Switch,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
// import {
//   useAppDispatch,
//   useAppSelector,
// } from '../../../../hooks/common/useAppDispatch';
// import {RootState} from '../../../../store';
// import {
//   updateAddressInfo,
//   updatePhysicalAddress,
//   updateMailingAddress,
//   saveAddressStart,
//   saveAddressSuccess,
//   saveAddressFailure,
// } from '../../../../store/slices/profile';
// import {
//   saveAddress,
//   fetchConsultantInfo,
// } from '../../../../store/middleware/thunks/profile.thunk';
import {theme} from '../../../theme';
import {TextStyle} from '../../../components/common/Text';
import {Input} from '../../../components/common/Input';
import {Button} from '../../../components/common/Button';
import {Header} from '../../../components/common/Header';
import {Address} from '../../../models/types/Registration';
import {addressValidationSchema} from '../../../models/validations/profileValidations';
// import {CommonService} from '../../../../api/services/common.service';
// import {getCurrentIP} from '../../../../utils/ip-utils';
// import {
//   getCity,
//   getGeoCoding,
//   GetCityACResp,
// } from '../../../../api/services/autocomplete';
import Toast from 'react-native-toast-message';
import Icon from '../../../components/common/Icon/Icon';

interface RouteParams {
  onboardId: number;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  formSection: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: 8,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleSection: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    marginBottom: theme.spacing.md,
    color: theme.colors.primary.main,
  },
  label: {
    marginBottom: theme.spacing.xs,
  },
  inputContainer: {
    marginBottom: theme.spacing.xs,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: theme.spacing.sm,
  },
  loadingFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.grey[100],
    borderRadius: 4,
  },
  loadingFieldText: {
    marginLeft: theme.spacing.sm,
  },
  sameAddressToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary.light + '20',
    borderRadius: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.status.error + '20',
    borderRadius: 8,
    marginBottom: theme.spacing.md,
  },
  errorIcon: {
    marginRight: theme.spacing.sm,
  },
  errorMessage: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  cancelButton: {
    flex: 1,
    marginRight: theme.spacing.xs,
  },
  saveButton: {
    flex: 1,
    marginLeft: theme.spacing.xs,
  },
  suggestionsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
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
  autocompleteLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  zipCodeContainer: {
    position: 'relative',
    zIndex: 10,
  },
  cityContainer: {
    position: 'relative',
    zIndex: 9,
  },
});

interface AddressInfoScreenProps {
  data: any;
  onChange: (data: any) => void;
  errors: any;
}

const AddressInfoScreen: React.FC<AddressInfoScreenProps> = ({ data, onChange, errors }) => {
  const navigation = useNavigation()
  const route = useRoute();
    const originalPhysicalZip = useRef('');
    const originalMailingZip = useRef('');
    const originalPhysicalCity = useRef('');
    const originalMailingCity = useRef('');
   const [physicalZipSuggestions, setPhysicalZipSuggestions] = useState([]);
    const [mailingZipSuggestions, setMailingZipSuggestions] = useState([]);
    const [physicalCitySuggestions, setPhysicalCitySuggestions] = useState([]);
    const [mailingCitySuggestions, setMailingCitySuggestions] = useState([]);
    const [isTypingPhysicalZip, setIsTypingPhysicalZip] = useState(false);
    const [isTypingMailingZip, setIsTypingMailingZip] = useState(false);
    const [isTypingPhysicalCity, setIsTypingPhysicalCity] = useState(false);
    const [isTypingMailingCity, setIsTypingMailingCity] = useState(false);
    const [showPhysicalZipSuggestions, setShowPhysicalZipSuggestions] =
      useState(false);
    const [showMailingZipSuggestions, setShowMailingZipSuggestions] =
      useState(false);
    const [showPhysicalCitySuggestions, setShowPhysicalCitySuggestions] =
      useState(false);
    const [showMailingCitySuggestions, setShowMailingCitySuggestions] =
      useState(false);
  
    const [loadingPhysicalZipSuggestions, setLoadingPhysicalZipSuggestions] =
      useState(false);
    const [loadingMailingZipSuggestions, setLoadingMailingZipSuggestions] =
      useState(false);
    const [loadingPhysicalCitySuggestions, setLoadingPhysicalCitySuggestions] =
      useState(false);
    const [loadingMailingCitySuggestions, setLoadingMailingCitySuggestions] =
      useState(false);

      const loadStatesForCountry = async (
        countryCode: string,
        addressType: 'physical' | 'mailing',
      ) => {
        try {
          // const statesData = await CommonService.getStatesByCountry(countryCode);
          // const statesList = statesData.map(s => ({value: s.code, text: s.name}));
    
          // if (addressType === 'physical') {
          //   setPhysicalStates(statesList);
          //   handlePhysicalAddressChange('stateCode', '');
          // } else {
          //   setMailingStates(statesList);
          //   handleMailingAddressChange('stateCode', '');
          // }
        } catch (error) {
          console.error(`Error loading states for ${addressType} address:`, error);
        }
      };

const handlePhysicalAddressChange = (field: keyof Address, value: any) => {
    if (!data.physicalAddress) {
      return;
    }

    if (
      field === 'countryCode' &&
      value !== data.physicalAddress.countryCode
    ) {
      loadStatesForCountry(value, 'physical');
    }

    if (field === 'zipCode') {
      if (value !== originalPhysicalZip.current) {
        setIsTypingPhysicalZip(true);
      }
    } else if (field === 'city') {
      if (value !== originalPhysicalCity.current) {
        setIsTypingPhysicalCity(true);
      }
    }
  };
 const handleMailingAddressChange = (field: keyof Address, value: any) => {
    if (!data.mailingAddress) {
      return;
    }

    if (
      field === 'countryCode' &&
      value !== data.mailingAddress.countryCode
    ) {
      loadStatesForCountry(value, 'mailing');
    }

    if (field === 'zipCode') {
      if (value !== originalMailingZip.current) {
        setIsTypingMailingZip(true);
      }
    } else if (field === 'city') {
      if (value !== originalMailingCity.current) {
        setIsTypingMailingCity(true);
      }
    }
  };

    const handleBlur = (field: string) => {
  
      if (field === 'physical_zipCode') {
        setTimeout(() => setIsTypingPhysicalZip(false), 200);
      } else if (field === 'mailing_zipCode') {
        setTimeout(() => setIsTypingMailingZip(false), 200);
      } else if (field === 'physical_city') {
        setTimeout(() => setIsTypingPhysicalCity(false), 200);
      } else if (field === 'mailing_city') {
        setTimeout(() => setIsTypingMailingCity(false), 200);
      }
    };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {/* Physical Address Section */}
        <View style={styles.formSection}>
          {/* <TextStyle variant="medium" size="lg" style={styles.sectionTitle}>
            Permanent Address
          </TextStyle> */}

          <Input
            label="Address"
            required
            value={data.physicalAddress?.address1 || ''}
            onChangeText={(val)=>onChange({ ...data, physicalAddress: { ...data.physicalAddress, address1: val }})}
            // onBlur={() => handleBlur('physical_address1')}
            error={errors?.physicalAddress?.address1}
            touched={errors?.physicalAddress?.address1}
            // disabled={saveLoading}
          />

          <View style={styles.zipCodeContainer}>
            <Input
              label="Zip Code"
              required
              value={data.physicalAddress?.zipCode || ''}
              onChangeText={(val)=>{
                onChange({ ...data, physicalAddress: { ...data.physicalAddress, zipCode: val }});
                handlePhysicalAddressChange('zipCode', val)
              }}
              // onBlur={() => handleBlur('physical_zipCode')}
              // onFocus={() => handleFocus('physical_zipCode')}
              error={errors?.physicalAddress?.zipCode}
              touched={errors?.physicalAddress?.zipCode}
              // disabled={saveLoading}
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

            {/* {showPhysicalZipSuggestions &&
              physicalZipSuggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                  <FlatList
                    data={physicalZipSuggestions}
                    keyExtractor={item => item.placeId}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={styles.suggestionItem}
                        // onPress={() => handlePhysicalAddressSelect(item)}
                      >
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
              )} */}
          </View>

          <View style={styles.cityContainer}>
            <Input
              label="City"
              required
              value={data.physicalAddress?.city || ''}
              onChangeText={(val)=>{
                onChange({ ...data, physicalAddress: { ...data.physicalAddress, city: val }});
                handlePhysicalAddressChange('city', val);
                }}
              // onBlur={() => handleBlur('physical_city')}
              // onFocus={() => handleFocus('physical_city')}
              error={errors?.physicalAddress?.city}
              touched={errors?.physicalAddress?.city}
              // disabled={saveLoading}
              placeholder="Enter city name"
            />

            {loadingPhysicalCitySuggestions && (
              <View style={styles.autocompleteLoadingContainer}>
                <ActivityIndicator
                  size="small"
                  color={theme.colors.primary.main}
                />
                <TextStyle
                  variant="regular"
                  size="sm"
                  style={styles.loadingFieldText}>
                  Searching cities...
                </TextStyle>
              </View>
            )}

            {showPhysicalCitySuggestions &&
              physicalCitySuggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                  <FlatList
                    data={physicalCitySuggestions}
                    keyExtractor={item => item.placeId}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={styles.suggestionItem}
                        // onPress={() => handlePhysicalCitySelect(item)}
                      >
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
            required
            value={data.physicalAddress?.stateCode || ''}
            onChangeText={(val)=>onChange({ ...data, physicalAddress: { ...data.physicalAddress, stateCode: val }})}
            error={errors?.physicalAddress?.stateCode}
            touched={errors?.physicalAddress?.stateCode}
            disabled={true}
          />

          <Input
            label="Country"
            required
            value={data.physicalAddress?.countryCode || ''}
            onChangeText={(val)=>onChange({ ...data, physicalAddress: { ...data.physicalAddress, countryCode: val }})}
            error={errors?.physicalAddress?.countryCode}
            touched={errors?.physicalAddress?.countryCode}
            disabled={true}
          />
        </View>

        {/* Mailing Address Section */}
        {!data.isSamePhysical && (
          <View style={styles.formSection}>
            <Input
              label="Address"
              required
              value={data.mailingAddress?.address1 || ''}
              onChangeText={(val)=>onChange({ ...data, mailingAddress: { ...data.mailingAddress, address1: val }})}
              // onBlur={() => handleBlur('mailing_address1')}
              error={errors?.mailingAddress?.address1}
              touched={errors?.mailingAddress?.address1}
              // disabled={saveLoading}
            />

            <View style={styles.zipCodeContainer}>
              <Input
                label="Zip Code"
                required
                value={data.mailingAddress?.zipCode || ''}
                onChangeText={(val)=>{
                  onChange({ ...data, mailingAddress: { ...data.mailingAddress, zipCode: val }});
                  handleMailingAddressChange('zipCode', val);
                }}
                // onBlur={() => handleBlur('mailing_zipCode')}
                // onFocus={() => handleFocus('mailing_zipCode')}
                error={errors?.mailingAddress?.zipCode}
                touched={errors?.mailingAddress?.zipCode}
                // disabled={saveLoading}
                keyboardType="numeric"
                placeholder="Enter ZIP code to find address"
              />

              {loadingMailingZipSuggestions && (
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

              {showMailingZipSuggestions &&
                mailingZipSuggestions.length > 0 && (
                  <View style={styles.suggestionsContainer}>
                    <FlatList
                      data={mailingZipSuggestions}
                      keyExtractor={item => item.placeId}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          style={styles.suggestionItem}
                          // onPress={() => handleMailingAddressSelect(item)}
                        >
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

            <View style={styles.cityContainer}>
              <Input
                label="City"
                required
                value={data.mailingAddress?.city || ''}
                onChangeText={(val)=>{
                  onChange({ ...data, mailingAddress: { ...data.mailingAddress, city: val }});
                  handleMailingAddressChange('city', val);
                }}
                // onBlur={() => handleBlur('mailing_city')}
                // onFocus={() => handleFocus('mailing_city')}
                error={errors?.mailingAddress?.city}
                touched={errors?.mailingAddress?.city}
                // disabled={saveLoading}
                placeholder="Enter city name"
              />

              {loadingMailingCitySuggestions && (
                <View style={styles.autocompleteLoadingContainer}>
                  <ActivityIndicator
                    size="small"
                    color={theme.colors.primary.main}
                  />
                  <TextStyle
                    variant="regular"
                    size="sm"
                    style={styles.loadingFieldText}>
                    Searching cities...
                  </TextStyle>
                </View>
              )}

              {showMailingCitySuggestions &&
                mailingCitySuggestions.length > 0 && (
                  <View style={styles.suggestionsContainer}>
                    <FlatList
                      data={mailingCitySuggestions}
                      keyExtractor={item => item.placeId}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          style={styles.suggestionItem}
                          // onPress={() => handleMailingCitySelect(item)}
                        >
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
              required
              value={data.mailingAddress?.stateCode || ''}
              onChangeText={(val) => onChange({ ...data, mailingAddress: { ...data.mailingAddress, stateCode: val }})}
              error={errors?.mailingAddress?.stateCode}
              touched={errors?.mailingAddress?.stateCode}
              // disabled={true}
            />

            <Input
              label="Country"
              required
              value={data.mailingAddress?.countryCode || ''}
              onChangeText={(val) => onChange({ ...data, mailingAddress: { ...data.mailingAddress, countryCode: val }})}
              error={errors?.mailingAddress?.countryCode}
              touched={errors?.mailingAddress?.countryCode}
              // disabled={true}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressInfoScreen;
