/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Switch,
  SafeAreaView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {theme} from '../../../../theme';
import {TextStyle} from '../../../../components/common/Text';
import {Input} from '../../../../components/common/Input';
import {Button} from '../../../../components/common/Button';
import {Header} from '../../../../components/common/Header';
import {addressValidationSchema} from '../../../../models/validations/profileValidations';
import {Address} from '../../../../types/profile';
import Toast from 'react-native-toast-message';

interface RouteParams {
  onboardId: number;
}

const AddressDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {onboardId} = 'route.params as RouteParams;'

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  const [initialFormData, setInitialFormData] = useState<any>(null);

  const defaultAddress: Address = {
    address1: '',
    address2: '',
    city: '',
    // stateID: '',
    zipCode: '',
    // countryID: '',
    stateCode: '',
    countryCode: '',
    stateList: [],
    countryList: [],
  };

  const defaultAddressInfo = {
    permanentAddress: {...defaultAddress},
    currentAddress: {...defaultAddress},
    homePhone: '',
    mobilePhone: '',
    otherPhone: '',
    notes: '',
    isSamePermanent: false,
  };

  const [formData, setFormData] = useState(defaultAddressInfo);
  const [saveLoading, setSaveLoading] = useState(false); // Added saveLoading state
  const [saveError, setSaveError] = useState<string | null>(null); // Added saveError state

  const checkFormModified = useCallback(() => {
    if (!initialFormData) {
      return false;
    }
    return JSON.stringify(formData) !== JSON.stringify(initialFormData);
  }, [formData, initialFormData]);

  const isFormModified = checkFormModified();

  useEffect(() => {
    // Simulate loading initial data (replace with your actual data loading)
    const initialData = {
      ...defaultAddressInfo,
      // ... (replace with actual initial data if available)
    };
    setFormData(initialData);
    setInitialFormData(initialData);
  }, [onboardId]);

  useEffect(() => {
    const validateForm = async () => {
      try {
        await addressValidationSchema.validate(formData, {abortEarly: false});
        setErrors({});
      } catch (yupError: any) {
        const newErrors: {[key: string]: string} = {};
        if (yupError.inner) {
          yupError.inner.forEach((err: any) => {
            const errorPath = err.path
              .replace('permanentAddress.', 'permanent_')
              .replace('currentAddress.', 'current_');
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

  const handlePermanentAddressChange = (
    field: keyof Address,
    value: string,
  ) => {
    setFormData(prev => ({
      ...prev,
      permanentAddress: {...prev.permanentAddress, [field]: value},
    }));
    if (formData.isSamePermanent) {
      setFormData(prev => ({
        ...prev,
        currentAddress: {...prev.permanentAddress, [field]: value},
      }));
    }
    validateField(`permanent_${field}`, value);
  };

  const handleCurrentAddressChange = (field: keyof Address, value: string) => {
    setFormData(prev => ({
      ...prev,
      currentAddress: {...prev.currentAddress, [field]: value},
    }));
    validateField(`current_${field}`, value);
  };

  const handleAddressInfoChange = (
    field: keyof typeof formData,
    value: boolean | string,
  ) => {
    if (field === 'isSamePermanent' && value === true) {
      setFormData(prev => ({
        ...prev,
        currentAddress: {...prev.permanentAddress},
        [field]: value,
      }));
    } else {
      setFormData(prev => ({...prev, [field]: value}));
    }
    validateField(field.toString(), value);
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({...prev, [field]: true}));

    let value: string | boolean;
    if (field.startsWith('permanent_') && formData.permanentAddress) {
      const addressField = field.replace(
        'permanent_',
        '',
      ) as keyof Address;
      value = formData.permanentAddress[addressField]!;
    } else if (field.startsWith('current_') && formData.currentAddress) {
      const addressField = field.replace(
        'current_',
        '',
      ) as keyof Address;
      value = formData.currentAddress[addressField]!;
    } else {
      value = formData[field as keyof typeof formData]!;
    }
    validateField(field, value);
  };

  const validateField = async (field: string, value: string | boolean) => {
    try {
      let validationObj: any = {...formData};

      if (field.startsWith('permanent_')) {
        const addressField = field.replace(
          'permanent_',
          '',
        ) as keyof Address;
        validationObj = {
          ...validationObj,
          permanentAddress: {
            ...validationObj.permanentAddress,
            [addressField]: value,
          },
        };
      } else if (field.startsWith('current_')) {
        const addressField = field.replace('current_', '') as keyof Address;
        validationObj = {
          ...validationObj,
          currentAddress: {
            ...validationObj.currentAddress,
            [addressField]: value,
          },
        };
      } else {
        validationObj[field] = value;
      }

      const validationField = field
        .replace('permanent_', 'permanentAddress.')
        .replace('current_', 'currentAddress.');

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

  const handleSave = async () => {
    try {
      setSaveLoading(true);
      setSaveError(null);

      // Simulate API call (replace with your actual save logic)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

      // Validation before "saving"
      await addressValidationSchema.validate(formData, {abortEarly: false});

      // Simulate successful save
      setSaveLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Addresses saved successfully',
      });
      setInitialFormData(formData);
      navigation.goBack();
    } catch (error: any) {
      setSaveLoading(false);
      if (error.inner) {
        const newErrors: {[key: string]: string} = {};
        error.inner.forEach((err: any) => {
          const errorPath = err.path
            .replace('permanentAddress.', 'permanent_')
            .replace('currentAddress.', 'current_');
          newErrors[errorPath] = err.message;
        });
        setErrors(newErrors);
      } else {
        setSaveError(error.message || 'Failed to save address information');
        Toast.show({
          type: 'error',
          text1: 'Failed to save address information',
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {/* Permanent Address Section */}
        <View style={styles.formSection}>
          <TextStyle variant="medium" size="lg" style={styles.sectionTitle}>
            Permanent Address
          </TextStyle>

          <Input
            label="Address"
            required
            value={formData.permanentAddress.address1}
            onChangeText={value =>
              handlePermanentAddressChange('address1', value)
            }
            onBlur={() => handleBlur('permanent_address1')}
            error={errors.permanent_address1}
            touched={touched.permanent_address1}
            disabled={saveLoading}
          />

          <Input
            label="Zip Code"
            required
            value={formData.permanentAddress.zipCode}
            onChangeText={value =>
              handlePermanentAddressChange('zipCode', value)
            }
            onBlur={() => handleBlur('permanent_zipCode')}
            error={errors.permanent_zipCode}
            touched={touched.permanent_zipCode}
            disabled={saveLoading}
            keyboardType="numeric"
          />

          <Input
            label="City"
            required
            value={formData.permanentAddress.city}
            onChangeText={value => handlePermanentAddressChange('city', value)}
            onBlur={() => handleBlur('permanent_city')}
            error={errors.permanent_city}
            touched={touched.permanent_city}
            disabled={saveLoading}
          />

          <Input
            label="State"
            required
            value={formData.permanentAddress.stateCode}
            onChangeText={value =>
              handlePermanentAddressChange('stateCode', value)
            }
            onBlur={() => handleBlur('permanent_stateCode')}
            error={errors.permanent_stateCode}
            touched={touched.permanent_stateCode}
            disabled={saveLoading}
          />

          <Input
            label="Country"
            required
            value={formData.permanentAddress.countryCode}
            onChangeText={value =>
              handlePermanentAddressChange('countryCode', value)
            }
            onBlur={() => handleBlur('permanent_countryCode')}
            error={errors.permanent_countryCode}
            touched={touched.permanent_countryCode}
            disabled={saveLoading}
          />
        </View>

        {/* Same As Permanent Toggle */}
        <View style={styles.toggleSection}>
          <View style={styles.sameAddressToggle}>
            <TextStyle variant="regular" size="md">
              Same as permanent address
            </TextStyle>
            <Switch
              value={formData.isSamePermanent}
              onValueChange={value =>
                handleAddressInfoChange('isSamePermanent', value)
              }
              trackColor={{
                false: theme.colors.grey[300],
                true: theme.colors.primary.main,
              }}
              thumbColor={theme.colors.background.paper}
              disabled={saveLoading}
            />
          </View>
        </View>

        {/* Current Address Section */}
        {!formData.isSamePermanent && (
          <View style={styles.formSection}>
            <TextStyle variant="medium" size="lg" style={styles.sectionTitle}>
              Current Address
            </TextStyle>

            <Input
              label="Address"
              required
              value={formData.currentAddress.address1}
              onChangeText={value => handleCurrentAddressChange('address1', value)}
              onBlur={() => handleBlur('current_address1')}
              error={errors.current_address1}
              touched={touched.current_address1}
              disabled={saveLoading}
            />

            <Input
              label="Zip Code"
              required
              value={formData.currentAddress.zipCode}
              onChangeText={value => handleCurrentAddressChange('zipCode', value)}
              onBlur={() => handleBlur('current_zipCode')}
              error={errors.current_zipCode}
              touched={touched.current_zipCode}
              disabled={saveLoading}
              keyboardType="numeric"
            />

            <Input
              label="City"
              required
              value={formData.currentAddress.city}
              onChangeText={value => handleCurrentAddressChange('city', value)}
              onBlur={() => handleBlur('current_city')}
              error={errors.current_city}
              touched={touched.current_city}
              disabled={saveLoading}
            />

            <Input
              label="State"
              required
              value={formData.currentAddress.stateCode}
              onChangeText={value => handleCurrentAddressChange('stateCode', value)}
              onBlur={() => handleBlur('current_stateCode')}
              error={errors.current_stateCode}
              touched={touched.current_stateCode}
              disabled={saveLoading}
            />

            <Input
              label="Country"
              required
              value={formData.currentAddress.countryCode}
              onChangeText={value =>
                handleCurrentAddressChange('countryCode', value)
              }
              onBlur={() => handleBlur('current_countryCode')}
              error={errors.current_countryCode}
              touched={touched.current_countryCode}
              disabled={saveLoading}
            />
          </View>
        )}

        {saveError && (
          <View style={styles.errorContainer}>
            <TextStyle
              variant="regular"
              size="sm"
              color="error"
              style={styles.errorMessage}>
              {saveError}
            </TextStyle>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title={saveLoading ? 'Saving...' : 'Save'}
            onPress={handleSave}
            style={styles.saveButton}
            disabled={saveLoading || Object.keys(errors).length > 0}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressDetailsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  formSection: {
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey[300],
  },
  sectionTitle: {
    marginBottom: theme.spacing.md,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  toggleSection: {
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey[300],
  },
  sameAddressToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.lg,
  },
  saveButton: {
    marginLeft: theme.spacing.md,
  },
  cancelButton: {
    marginRight: theme.spacing.md,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  errorMessage: {
    marginLeft: theme.spacing.xs,
  },
});