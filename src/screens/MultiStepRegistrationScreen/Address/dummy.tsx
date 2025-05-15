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

const AddressInfoScreen: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute();
  // const {onboardId} = route.params as RouteParams;

  // const dispatch = useAppDispatch();
  // const {consultantInfo, loading, saveLoading, saveError} = useAppSelector(
  //   (state: RootState) => state.consultant,
  // );

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  const [initialFormData, setInitialFormData] = useState<any>(null);
  const defaultAddress: Address = {
    address1: null,
    address2: null,
    city: null,
    stateID: null,
    zipCode: null,
    countryID: null,
    stateCode: null,
    countryCode: null,
    stateList: null,
    countryList: null,
  };

  const defaultAddressInfo = {
    physicalAddress: defaultAddress,
    mailingAddress: defaultAddress,
    homePhone: '',
    mobilePhone: '',
    otherPhone: '',
    notes: null,
    isSamePhysical: false,
  };

  const [formData, setFormData] = useState(
    defaultAddressInfo,
  );

  const [isTypingPhysicalZip, setIsTypingPhysicalZip] = useState(false);
  const [isTypingMailingZip, setIsTypingMailingZip] = useState(false);
  const [isTypingPhysicalCity, setIsTypingPhysicalCity] = useState(false);
  const [isTypingMailingCity, setIsTypingMailingCity] = useState(false);
  const [cityJustSelected, setCityJustSelected] = useState(false);
  const originalPhysicalZip = useRef('');
  const originalMailingZip = useRef('');
  const originalPhysicalCity = useRef('');
  const originalMailingCity = useRef('');

  const [physicalZipSuggestions, setPhysicalZipSuggestions] = useState([]);
  const [mailingZipSuggestions, setMailingZipSuggestions] = useState([]);
  const [physicalCitySuggestions, setPhysicalCitySuggestions] = useState([]);
  const [mailingCitySuggestions, setMailingCitySuggestions] = useState([]);

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

  const [countries, setCountries] = useState<{value: string; text: string}[]>(
    [],
  );
  const [physicalStates, setPhysicalStates] = useState<
    {value: string; text: string}[]
  >([]);
  const [mailingStates, setMailingStates] = useState<
    {value: string; text: string}[]
  >([]);
  const [loadingLocations, setLoadingLocations] = useState(false);

  const checkFormModified = useCallback(() => {
    if (!initialFormData) {
      return false;
    }

    return JSON.stringify(formData) !== JSON.stringify(initialFormData);
  }, [formData, initialFormData]);

  const isFormModified = checkFormModified();

  // useEffect(() => {
  //   if (!consultantInfo) {
  //     dispatch(fetchConsultantInfo(onboardId));
  //   } else {
  //     setFormData(consultantInfo.addressvModel);
  //     setInitialFormData(consultantInfo.addressvModel);

  //     if (consultantInfo.addressvModel.physicalAddress?.zipCode) {
  //       originalPhysicalZip.current =
  //         consultantInfo.addressvModel.physicalAddress.zipCode;
  //     }
  //     if (consultantInfo.addressvModel.mailingAddress?.zipCode) {
  //       originalMailingZip.current =
  //         consultantInfo.addressvModel.mailingAddress.zipCode;
  //     }
  //     if (consultantInfo.addressvModel.physicalAddress?.city) {
  //       originalPhysicalCity.current =
  //         consultantInfo.addressvModel.physicalAddress.city;
  //     }
  //     if (consultantInfo.addressvModel.mailingAddress?.city) {
  //       originalMailingCity.current =
  //         consultantInfo.addressvModel.mailingAddress.city;
  //     }
  //   }
  // }, [dispatch, onboardId, consultantInfo]);

  useEffect(() => {
    const validateForm = async () => {
      if (!formData.physicalAddress) {
        return;
      }

      try {
        await addressValidationSchema.validate(formData, {abortEarly: false});
        setErrors({});
      } catch (yupError: any) {
        const newErrors: {[key: string]: string} = {};
        if (yupError.inner) {
          yupError.inner.forEach((err: any) => {
            const errorPath = err.path
              .replace('physicalAddress.', 'physical_')
              .replace('mailingAddress.', 'mailing_');
            newErrors[errorPath] = err.message;
          });
        }
        setErrors(newErrors);
      }
    };

    if (Object.keys(formData).length > 0) {
      validateForm();
    }
  }, [formData]);

  // useEffect(() => {
  //   const handlePhysicalZipSearch = async () => {
  //     const zipCode = formData.physicalAddress?.zipCode;
  //     if (
  //       isTypingPhysicalZip &&
  //       !cityJustSelected &&
  //       zipCode &&
  //       zipCode.length >= 5
  //     ) {
  //       setLoadingPhysicalZipSuggestions(true);
  //       try {
  //         const suggestions = await getCity(zipCode);
  //         setPhysicalZipSuggestions(suggestions);
  //         setShowPhysicalZipSuggestions(suggestions.length > 0);
  //       } catch (error) {
  //         console.error('Error fetching physical zipcode suggestions:', error);
  //       } finally {
  //         setLoadingPhysicalZipSuggestions(false);
  //       }
  //     } else {
  //       setPhysicalZipSuggestions([]);
  //       setShowPhysicalZipSuggestions(false);
  //     }
  //     if (cityJustSelected) {
  //       setCityJustSelected(false);
  //     }
  //   };

  //   const debounce = setTimeout(handlePhysicalZipSearch, 500);
  //   return () => clearTimeout(debounce);
  // }, [
  //   formData.physicalAddress?.zipCode,
  //   isTypingPhysicalZip,
  //   cityJustSelected,
  // ]);

  // useEffect(() => {
  //   const handleMailingZipSearch = async () => {
  //     const zipCode = formData.mailingAddress?.zipCode;
  //     if (
  //       isTypingMailingZip &&
  //       !cityJustSelected &&
  //       zipCode &&
  //       zipCode.length >= 5
  //     ) {
  //       setLoadingMailingZipSuggestions(true);
  //       try {
  //         const suggestions = await getCity(zipCode);
  //         setMailingZipSuggestions(suggestions);
  //         setShowMailingZipSuggestions(suggestions.length > 0);
  //       } catch (error) {
  //         console.error('Error fetching mailing zipcode suggestions:', error);
  //       } finally {
  //         setLoadingMailingZipSuggestions(false);
  //       }
  //     } else {
  //       setMailingZipSuggestions([]);
  //       setShowMailingZipSuggestions(false);
  //     }
  //   };

  //   const debounce = setTimeout(handleMailingZipSearch, 500);
  //   return () => clearTimeout(debounce);
  // }, [formData.mailingAddress?.zipCode, isTypingMailingZip, cityJustSelected]);

  // useEffect(() => {
  //   const handlePhysicalCitySearch = async () => {
  //     const city = formData.physicalAddress?.city;
  //     if (isTypingPhysicalCity && city && city.length >= 3) {
  //       setLoadingPhysicalCitySuggestions(true);
  //       try {
  //         const suggestions = await getCity(city);
  //         setPhysicalCitySuggestions(suggestions);
  //         setShowPhysicalCitySuggestions(suggestions.length > 0);
  //       } catch (error) {
  //         console.error('Error fetching physical city suggestions:', error);
  //       } finally {
  //         setLoadingPhysicalCitySuggestions(false);
  //       }
  //     } else {
  //       setPhysicalCitySuggestions([]);
  //       setShowPhysicalCitySuggestions(false);
  //     }
  //   };

  //   const debounce = setTimeout(handlePhysicalCitySearch, 500);
  //   return () => clearTimeout(debounce);
  // }, [formData.physicalAddress?.city, isTypingPhysicalCity]);

  // useEffect(() => {
  //   const handleMailingCitySearch = async () => {
  //     const city = formData.mailingAddress?.city;
  //     if (isTypingMailingCity && city && city.length >= 3) {
  //       setLoadingMailingCitySuggestions(true);
  //       try {
  //         const suggestions = await getCity(city);
  //         setMailingCitySuggestions(suggestions);
  //         setShowMailingCitySuggestions(suggestions.length > 0);
  //       } catch (error) {
  //         console.error('Error fetching mailing city suggestions:', error);
  //       } finally {
  //         setLoadingMailingCitySuggestions(false);
  //       }
  //     } else {
  //       setMailingCitySuggestions([]);
  //       setShowMailingCitySuggestions(false);
  //     }
  //   };

  //   const debounce = setTimeout(handleMailingCitySearch, 500);
  //   return () => clearTimeout(debounce);
  // }, [formData.mailingAddress?.city, isTypingMailingCity]);

  const handlePhysicalAddressChange = (field: keyof Address, value: any) => {
    if (!formData.physicalAddress) {
      return;
    }

    if (
      field === 'countryCode' &&
      value !== formData.physicalAddress.countryCode
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

    const updatedAddress = {...formData.physicalAddress, [field]: value};
    setFormData(prev => ({
      ...prev,
      physicalAddress: updatedAddress,
    }));

    if (formData.isSamePhysical) {
      const updatedMailingAddress = {
        ...formData.mailingAddress,
        [field]: value,
      };
      setFormData(prev => ({
        ...prev,
        mailingAddress: updatedMailingAddress,
      }));
    }

    validateField(`physical_${field}`, value);
  };

  const handleMailingAddressChange = (field: keyof Address, value: any) => {
    if (!formData.mailingAddress) {
      return;
    }

    if (
      field === 'countryCode' &&
      value !== formData.mailingAddress.countryCode
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

    const updatedAddress = {...formData.mailingAddress, [field]: value};
    setFormData(prev => ({
      ...prev,
      mailingAddress: updatedAddress,
    }));

    validateField(`mailing_${field}`, value);
  };

  const handleAddressInfoChange = (
    field: keyof typeof formData,
    value: any,
  ) => {
    if (
      field === 'isSamePhysical' &&
      value === true &&
      formData.physicalAddress
    ) {
      setFormData(prev => ({
        ...prev,
        mailingAddress: {...prev.physicalAddress},
        [field]: value,
      }));
    } else {
      setFormData(prev => ({...prev, [field]: value}));
    }

    validateField(field, value);
  };

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

  const handleBlur = (field: string) => {
    setTouched(prev => ({...prev, [field]: true}));

    if (field === 'physical_zipCode') {
      setTimeout(() => setIsTypingPhysicalZip(false), 200);
    } else if (field === 'mailing_zipCode') {
      setTimeout(() => setIsTypingMailingZip(false), 200);
    } else if (field === 'physical_city') {
      setTimeout(() => setIsTypingPhysicalCity(false), 200);
    } else if (field === 'mailing_city') {
      setTimeout(() => setIsTypingMailingCity(false), 200);
    }

    let value;
    if (field.startsWith('physical_') && formData.physicalAddress) {
      const addressField = field.replace('physical_', '') as keyof Address;
      value = formData.physicalAddress[addressField];
    } else if (field.startsWith('mailing_') && formData.mailingAddress) {
      const addressField = field.replace('mailing_', '') as keyof Address;
      value = formData.mailingAddress[addressField];
    } else {
      value = formData[field as keyof typeof formData];
    }

    validateField(field, value);
  };

  const handleFocus = (field: string) => {
    if (field === 'physical_zipCode') {
      const currentZip = formData.physicalAddress?.zipCode || '';
      if (currentZip !== originalPhysicalZip.current) {
        setIsTypingPhysicalZip(true);
      }
    } else if (field === 'mailing_zipCode') {
      const currentZip = formData.mailingAddress?.zipCode || '';
      if (currentZip !== originalMailingZip.current) {
        setIsTypingMailingZip(true);
      }
    } else if (field === 'physical_city') {
      const currentCity = formData.physicalAddress?.city || '';
      if (currentCity !== originalPhysicalCity.current) {
        setIsTypingPhysicalCity(true);
      }
    } else if (field === 'mailing_city') {
      const currentCity = formData.mailingAddress?.city || '';
      if (currentCity !== originalMailingCity.current) {
        setIsTypingMailingCity(true);
      }
    }
  };

  const validateField = async (field: string, value: any) => {
    if (!formData.physicalAddress || !formData.mailingAddress) {
      return;
    }

    try {
      let validationObj: any = {...formData};

      if (field.startsWith('physical_')) {
        const addressField = field.replace('physical_', '') as keyof Address;
        validationObj = {
          ...validationObj,
          physicalAddress: {
            ...validationObj.physicalAddress,
            [addressField]: value,
          },
        };
      } else if (field.startsWith('mailing_')) {
        const addressField = field.replace('mailing_', '') as keyof Address;
        validationObj = {
          ...validationObj,
          mailingAddress: {
            ...validationObj.mailingAddress,
            [addressField]: value,
          },
        };
      } else {
        validationObj[field] = value;
      }

      const validationField = field
        .replace('physical_', 'physicalAddress.')
        .replace('mailing_', 'mailingAddress.');

      await addressValidationSchema.validateAt(validationField, validationObj);

      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    } catch (error: any) {
      setErrors(prev => ({
        ...prev,
        [field]: error.message,
      }));
    }
  };

  // const handlePhysicalAddressSelect = async (item: GetCityACResp) => {
  //   setShowPhysicalZipSuggestions(false);
  //   setIsTypingPhysicalZip(false);
  //   setLoadingPhysicalZipSuggestions(true);

  //   try {
  //     const addressDetails = await getGeoCoding(item.placeId);
  //     const countryObj = countries.find(
  //       c =>
  //         c.text === addressDetails.country ||
  //         c.value === addressDetails.country,
  //     );
  //     const countryCode = countryObj?.value || addressDetails.country;
  //     if (
  //       countryCode &&
  //       countryCode !== formData.physicalAddress?.countryCode
  //     ) {
  //       await loadStatesForCountry(countryCode, 'physical');
  //     }
  //     const stateObj = physicalStates.find(
  //       s =>
  //         s.text === addressDetails.state || s.value === addressDetails.state,
  //     );
  //     const stateCode = stateObj?.value || addressDetails.state;
  //     handlePhysicalAddressChange('city', addressDetails.city);
  //     handlePhysicalAddressChange('stateCode', stateCode);
  //     handlePhysicalAddressChange('countryCode', countryCode);
  //     originalPhysicalZip.current = addressDetails.zipcode;
  //     originalPhysicalCity.current = addressDetails.city;
  //   } catch (error) {
  //     console.error('Error processing selected address:', error);
  //   } finally {
  //     setLoadingPhysicalZipSuggestions(false);
  //   }
  // };

  // const handleMailingAddressSelect = async (item: GetCityACResp) => {
  //   setShowMailingZipSuggestions(false);
  //   setIsTypingMailingZip(false);
  //   setLoadingMailingZipSuggestions(true);

  //   try {
  //     const addressDetails = await getGeoCoding(item.placeId);
  //     const countryObj = countries.find(
  //       c =>
  //         c.text === addressDetails.country ||
  //         c.value === addressDetails.country,
  //     );
  //     const countryCode = countryObj?.value || addressDetails.country;
  //     if (countryCode && countryCode !== formData.mailingAddress?.countryCode) {
  //       await loadStatesForCountry(countryCode, 'mailing');
  //     }
  //     const stateObj = mailingStates.find(
  //       s =>
  //         s.text === addressDetails.state || s.value === addressDetails.state,
  //     );
  //     const stateCode = stateObj?.value || addressDetails.state;
  //     handleMailingAddressChange('city', addressDetails.city);
  //     handleMailingAddressChange('stateCode', stateCode);
  //     handleMailingAddressChange('countryCode', countryCode);
  //     originalMailingZip.current = addressDetails.zipcode;
  //     originalMailingCity.current = addressDetails.city;
  //   } catch (error) {
  //     console.error('Error processing selected mailing address:', error);
  //   } finally {
  //     setLoadingMailingZipSuggestions(false);
  //   }
  // };

  // const handlePhysicalCitySelect = async (item: GetCityACResp) => {
  //   setShowPhysicalCitySuggestions(false);
  //   setIsTypingPhysicalCity(false);
  //   setLoadingPhysicalCitySuggestions(true);

  //   try {
  //     const addressDetails = await getGeoCoding(item.placeId);
  //     const countryObj = countries.find(
  //       c =>
  //         c.text === addressDetails.country ||
  //         c.value === addressDetails.country,
  //     );
  //     const countryCode = countryObj?.value || addressDetails.country;
  //     if (
  //       countryCode &&
  //       countryCode !== formData.physicalAddress?.countryCode
  //     ) {
  //       await loadStatesForCountry(countryCode, 'physical');
  //     }
  //     const stateObj = physicalStates.find(
  //       s =>
  //         s.text === addressDetails.state || s.value === addressDetails.state,
  //     );
  //     const stateCode = stateObj?.value || addressDetails.state;
  //     setCityJustSelected(true);
  //     handlePhysicalAddressChange('stateCode', stateCode);
  //     handlePhysicalAddressChange('zipCode', addressDetails.zipcode);
  //     handlePhysicalAddressChange('countryCode', countryCode);
  //     originalPhysicalZip.current = addressDetails.zipcode;
  //     originalPhysicalCity.current = addressDetails.city;
  //   } catch (error) {
  //     console.error('Error processing selected city:', error);
  //   } finally {
  //     setLoadingPhysicalCitySuggestions(false);
  //   }
  // };

  // const handleMailingCitySelect = async (item: GetCityACResp) => {
  //   setShowMailingCitySuggestions(false);
  //   setIsTypingMailingCity(false);
  //   setLoadingMailingCitySuggestions(true);

  //   try {
  //     const addressDetails = await getGeoCoding(item.placeId);
  //     const countryObj = countries.find(
  //       c =>
  //         c.text === addressDetails.country ||
  //         c.value === addressDetails.country,
  //     );
  //     const countryCode = countryObj?.value || addressDetails.country;
  //     if (countryCode && countryCode !== formData.mailingAddress?.countryCode) {
  //       await loadStatesForCountry(countryCode, 'mailing');
  //     }
  //     const stateObj = mailingStates.find(
  //       s =>
  //         s.text === addressDetails.state || s.value === addressDetails.state,
  //     );
  //     const stateCode = stateObj?.value || addressDetails.state;
  //     setCityJustSelected(true);
  //     handleMailingAddressChange('stateCode', stateCode);
  //     handleMailingAddressChange('zipCode', addressDetails.zipcode);
  //     handleMailingAddressChange('countryCode', countryCode);
  //     originalMailingZip.current = addressDetails.zipcode;
  //     originalMailingCity.current = addressDetails.city;
  //   } catch (error) {
  //     console.error('Error processing selected city:', error);
  //   } finally {
  //     setLoadingMailingCitySuggestions(false);
  //   }
  // };

  const handleSave = async () => {
    if (!formData.physicalAddress || !formData.mailingAddress) {
      return;
    }

    try {
      const allFields = [
        'isSamePhysical',
        'physical_address1',
        'physical_address2',
        'physical_city',
        'physical_stateCode',
        'physical_zipCode',
        'physical_countryCode',
      ];

      if (!formData.isSamePhysical) {
        allFields.push(
          'mailing_address1',
          'mailing_address2',
          'mailing_city',
          'mailing_stateCode',
          'mailing_zipCode',
          'mailing_countryCode',
        );
      }

      const touchedFields = allFields.reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {} as {[key: string]: boolean});

      setTouched(touchedFields);

      await addressValidationSchema.validate(formData, {abortEarly: false});

      // const ipAddress = await getCurrentIP();
      const addressData = {
        // onboardID: onboardId,
        physicalAddress: {
          address1: formData.physicalAddress.address1,
          address2: formData.physicalAddress.address2 || '',
          city: formData.physicalAddress.city,
          stateCode: formData.physicalAddress.stateCode,
          zipCode: formData.physicalAddress.zipCode,
          countryCode: formData.physicalAddress.countryCode,
          phone: formData.mobilePhone,
        },
        mailingAddress: formData.isSamePhysical
          ? {
              address1: formData.physicalAddress.address1,
              address2: formData.physicalAddress.address2 || '',
              city: formData.physicalAddress.city,
              stateCode: formData.physicalAddress.stateCode,
              zipCode: formData.physicalAddress.zipCode,
              countryCode: formData.physicalAddress.countryCode,
              phone: formData.mobilePhone,
            }
          : {
              address1: formData.mailingAddress.address1 || '',
              address2: formData.mailingAddress.address2 || '',
              city: formData.mailingAddress.city || '',
              stateCode: formData.mailingAddress.stateCode || '',
              zipCode: formData.mailingAddress.zipCode || '',
              countryCode: formData.mailingAddress.countryCode || '',
              phone: formData.mobilePhone,
            },
        homePhone: formData.homePhone,
        mobilePhone: formData.mobilePhone,
        otherPhone: formData.otherPhone,
        notes: formData.notes || '',
        isSamePhysical: formData.isSamePhysical || false,
        // createdFromIP: ipAddress || 'unknown',
      };

      // dispatch(saveAddressStart());
      // await dispatch(saveAddress(addressData)).unwrap();
      // dispatch(saveAddressSuccess());
      Toast.show({
        type: 'success',
        text1: 'Addresses saved succesfully',
      });
      setInitialFormData(formData);
      navigation.goBack();
    } catch (error: any) {
      if (error.inner) {
        const newErrors: {[key: string]: string} = {};
        error.inner.forEach((err: any) => {
          const errorPath = err.path
            .replace('physicalAddress.', 'physical_')
            .replace('mailingAddress.', 'mailing_');
          newErrors[errorPath] = err.message;
        });
        setErrors(newErrors);
      } else {
        // dispatch(
        //   saveAddressFailure(
        //     error.message || 'Failed to save address information',
        //   ),
        // );
        Toast.show({
          type: 'error',
          text1: 'Failed to save address information',
        });
      }
    }
  };

  console.log(errors);

  // if (loading) {
  //   return (
  //     <SafeAreaView style={styles.safeArea}>
  //       <Header showBackButton title="Address Information" />
  //       <View style={styles.loadingContainer}>
  //         <ActivityIndicator size="large" color={theme.colors.primary.main} />
  //         <TextStyle variant="regular" size="md" style={styles.loadingText}>
  //           Loading address information...
  //         </TextStyle>
  //       </View>
  //     </SafeAreaView>
  //   );
  // }

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
            value={formData.physicalAddress?.address1 || ''}
            onChangeText={value =>
              handlePhysicalAddressChange('address1', value)
            }
            onBlur={() => handleBlur('physical_address1')}
            error={errors.physical_address1}
            touched={touched.physical_address1}
            // disabled={saveLoading}
          />

          <View style={styles.zipCodeContainer}>
            <Input
              label="Zip Code"
              required
              value={formData.physicalAddress?.zipCode || ''}
              onChangeText={value =>
                handlePhysicalAddressChange('zipCode', value)
              }
              onBlur={() => handleBlur('physical_zipCode')}
              onFocus={() => handleFocus('physical_zipCode')}
              error={errors.physical_zipCode}
              touched={touched.physical_zipCode}
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

            {showPhysicalZipSuggestions &&
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
              )}
          </View>

          <View style={styles.cityContainer}>
            <Input
              label="City"
              required
              value={formData.physicalAddress?.city || ''}
              onChangeText={value => handlePhysicalAddressChange('city', value)}
              onBlur={() => handleBlur('physical_city')}
              onFocus={() => handleFocus('physical_city')}
              error={errors.physical_city}
              touched={touched.physical_city}
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
            value={
              physicalStates.find(
                s => s.value === formData.physicalAddress?.stateCode,
              )?.text ||
              formData.physicalAddress?.stateCode ||
              ''
            }
            onChangeText={() => {}}
            error={errors.physical_stateCode}
            touched={touched.physical_stateCode}
            disabled={true}
          />

          <Input
            label="Country"
            required
            value={
              countries.find(
                c => c.value === formData.physicalAddress?.countryCode,
              )?.text ||
              formData.physicalAddress?.countryCode ||
              ''
            }
            onChangeText={() => {}}
            error={errors.physical_countryCode}
            touched={touched.physical_countryCode}
            disabled={true}
          />
        </View>

        {/* Same As Physical Toggle */}
        {/* <View style={styles.toggleSection}>
          <View style={styles.sameAddressToggle}>
            <TextStyle variant="regular" size="md">
            Same as permanent address
            </TextStyle>
            <Switch
              value={formData.isSamePhysical || false}
              onValueChange={value =>
                handleAddressInfoChange('isSamePhysical', value)
              }
              trackColor={{
                false: theme.colors.grey[300],
                true: theme.colors.primary.main,
              }}
              thumbColor={theme.colors.background.paper}
              // disabled={saveLoading}
            />
          </View>
        </View> */}

        {/* Mailing Address Section */}
        {!formData.isSamePhysical && (
          <View style={styles.formSection}>
            {/* <TextStyle variant="medium" size="lg" style={styles.sectionTitle}>
              Current Address
            </TextStyle> */}

            <Input
              label="Address"
              required
              value={formData.mailingAddress?.address1 || ''}
              onChangeText={value =>
                handleMailingAddressChange('address1', value)
              }
              onBlur={() => handleBlur('mailing_address1')}
              error={errors.mailing_address1}
              touched={touched.mailing_address1}
              // disabled={saveLoading}
            />

            <View style={styles.zipCodeContainer}>
              <Input
                label="Zip Code"
                required
                value={formData.mailingAddress?.zipCode || ''}
                onChangeText={value =>
                  handleMailingAddressChange('zipCode', value)
                }
                onBlur={() => handleBlur('mailing_zipCode')}
                onFocus={() => handleFocus('mailing_zipCode')}
                error={errors.mailing_zipCode}
                touched={touched.mailing_zipCode}
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
                value={formData.mailingAddress?.city || ''}
                onChangeText={value =>
                  handleMailingAddressChange('city', value)
                }
                onBlur={() => handleBlur('mailing_city')}
                onFocus={() => handleFocus('mailing_city')}
                error={errors.mailing_city}
                touched={touched.mailing_city}
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
              value={
                mailingStates.find(
                  s => s.value === formData.mailingAddress?.stateCode,
                )?.text ||
                formData.mailingAddress?.stateCode ||
                ''
              }
              onChangeText={() => {}}
              error={errors.mailing_stateCode}
              touched={touched.mailing_stateCode}
              // disabled={true}
            />

            <Input
              label="Country"
              required
              value={
                countries.find(
                  c => c.value === formData.mailingAddress?.countryCode,
                )?.text ||
                formData.mailingAddress?.countryCode ||
                ''
              }
              onChangeText={() => {}}
              error={errors.mailing_countryCode}
              touched={touched.mailing_countryCode}
              // disabled={true}
            />
          </View>
        )}

        {/* {saveError && (
          <View style={styles.errorContainer}>
            <Icon
              name="alert-circle"
              size={20}
              color={theme.colors.status.error}
            />
            <TextStyle
              variant="regular"
              size="sm"
              color="error"
              style={styles.errorMessage}>
              {saveError}
            </TextStyle>
          </View>
        )} */}
{/* 
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            variant="secondary"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
            // disabled={saveLoading}
          />
          <Button
            title={saveLoading ? 'Saving...' : 'Save'}
            onPress={handleSave}
            style={styles.saveButton}
            disabled={saveLoading || Object.keys(errors).length > 0}
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressInfoScreen;
