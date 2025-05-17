import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../../../theme';
import {TextStyle} from '../../../../components/common/Text';
import {Input} from '../../../../components/common/Input';
import {Button} from '../../../../components/common/Button';
import {Formik} from 'formik';
import Toast from 'react-native-toast-message';
import { addressValidationSchema2 } from '../../../../validations/addressValidation';

const AddressDetailsScreen: React.FC = () => {
  const navigation = useNavigation();

  const defaultAddress = {
    address1: '',
    address2: '',
    city: '',
    zipCode: '',
    stateCode: '',
    countryCode: '',
  };

  const initialValues = {
    permanentAddress: {...defaultAddress},
    currentAddress: {...defaultAddress},
    isSamePermanent: false,
    notes: '',
    permanentNotes: '', // Add a separate field for permanent address notes
  };
console.log('Initial values:', initialValues);
  const handleSave = async (values: typeof initialValues) => {
    console.log('Saving address details:', values);
    try {
      // Simulate API call (replace with your actual save logic)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      console.log('Saved values:', values);
      Toast.show({
        type: 'success',
        text1: 'Addresses saved successfully',
      });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to save address information',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Formik
          initialValues={initialValues}
          validationSchema={addressValidationSchema2}
          onSubmit={handleSave}>
          {({values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting}) => (
            <>
              {/* Current Address Section */}
              <View style={styles.formSection}>
                <TextStyle variant="medium" size="lg" style={styles.sectionTitle}>
                  Current Address
                </TextStyle>

                <Input
                  label="Address"
                  required
                  value={values.currentAddress.address1}
                  onChangeText={handleChange('currentAddress.address1')}
                  onBlur={handleBlur('currentAddress.address1')}
                  error={errors.currentAddress?.address1}
                  touched={touched.currentAddress?.address1}
                  placeholder="Enter address"
                />

                <Input
                  label="Zip Code"
                  required
                  value={values.currentAddress.zipCode}
                  onChangeText={handleChange('currentAddress.zipCode')}
                  onBlur={handleBlur('currentAddress.zipCode')}
                  error={errors.currentAddress?.zipCode}
                  touched={touched.currentAddress?.zipCode}
                  keyboardType="numeric"
                  placeholder="Enter zip code"
                />

                <Input
                  label="City"
                  required
                  value={values.currentAddress.city}
                  onChangeText={handleChange('currentAddress.city')}
                  onBlur={handleBlur('currentAddress.city')}
                  error={errors.currentAddress?.city}
                  touched={touched.currentAddress?.city}
                  placeholder="Enter city"
                />

                <Input
                  label="State"
                  required
                  value={values.currentAddress.stateCode}
                  onChangeText={handleChange('currentAddress.stateCode')}
                  onBlur={handleBlur('currentAddress.stateCode')}
                  error={errors.currentAddress?.stateCode}
                  touched={touched.currentAddress?.stateCode}
                  placeholder="Enter state"
                />

                <Input
                  label="Country"
                  required
                  value={values.currentAddress.countryCode}
                  onChangeText={handleChange('currentAddress.countryCode')}
                  onBlur={handleBlur('currentAddress.countryCode')}
                  error={errors.currentAddress?.countryCode}
                  touched={touched.currentAddress?.countryCode}
                  placeholder="Enter country"
                />

                <Text style={styles.label}>Address Notes</Text>
                <TextInput
                  style={[styles.inputArea, {height: 100, textAlignVertical: 'top'}]}
                  placeholder="Enter address notes"
                  multiline
                  maxLength={1024}
                  value={values.notes}
                  onChangeText={handleChange('notes')}
                />
              </View>

              {/* Same As Permanent Toggle */}
              <View style={styles.toggleSection}>
                <View style={styles.sameAddressToggle}>
                  <TextStyle variant="regular" size="md">
                    Permanent Address
                  </TextStyle>
                  <Switch
                    value={values.isSamePermanent}
                    onValueChange={value => {
                      setFieldValue('isSamePermanent', value);
                      if (value) {
                        setFieldValue('permanentAddress', values.currentAddress);
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

              {/* Permanent Address Section */}
              {!values.isSamePermanent && (
                <View style={styles.formSection}>
                  <TextStyle variant="medium" size="lg" style={styles.sectionTitle}>
                    Permanent Address
                  </TextStyle>

                  <Input
                    label="Address"
                    required
                    value={values.permanentAddress.address1}
                    onChangeText={handleChange('permanentAddress.address1')}
                    onBlur={handleBlur('permanentAddress.address1')}
                    error={errors.permanentAddress?.address1}
                    touched={touched.permanentAddress?.address1}
                    placeholder="Enter address"
                  />

                  <Input
                    label="Zip Code"
                    required
                    value={values.permanentAddress.zipCode}
                    onChangeText={handleChange('permanentAddress.zipCode')}
                    onBlur={handleBlur('permanentAddress.zipCode')}
                    error={errors.permanentAddress?.zipCode}
                    touched={touched.permanentAddress?.zipCode}
                    keyboardType="numeric"
                    placeholder="Enter zip code"
                  />

                  <Input
                    label="City"
                    required
                    value={values.permanentAddress.city}
                    onChangeText={handleChange('permanentAddress.city')}
                    onBlur={handleBlur('permanentAddress.city')}
                    error={errors.permanentAddress?.city}
                    touched={touched.permanentAddress?.city}
                    placeholder="Enter city"
                  />

                  <Input
                    label="State"
                    required
                    value={values.permanentAddress.stateCode}
                    onChangeText={handleChange('permanentAddress.stateCode')}
                    onBlur={handleBlur('permanentAddress.stateCode')}
                    error={errors.permanentAddress?.stateCode}
                    touched={touched.permanentAddress?.stateCode}
                    placeholder="Enter state"
                  />

                  <Input
                    label="Country"
                    required
                    value={values.permanentAddress.countryCode}
                    onChangeText={handleChange('permanentAddress.countryCode')}
                    onBlur={handleBlur('permanentAddress.countryCode')}
                    error={errors.permanentAddress?.countryCode}
                    touched={touched.permanentAddress?.countryCode}
                    placeholder="Enter country"
                  />
                  <Text style={styles.label}>Address Notes</Text>
                  <TextInput
                    style={[styles.inputArea, {height: 100, textAlignVertical: 'top'}]}
                    placeholder="Enter address notes"
                    multiline
                    maxLength={1024}
                    value={values.permanentNotes} // Use a separate field for permanent address notes
                    onChangeText={handleChange('permanentNotes')} // Handle change for permanent address notes
                  />
                </View>
              )}

                <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit as any}>
                  <Text style={styles.saveBtnText}>{isSubmitting ? 'Saving...' : 'Save'}</Text>
                </TouchableOpacity>
            </>
          )}
        </Formik>
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
  saveButton: {
    marginLeft: theme.spacing.md,
  },
  label: {
    marginTop: 16,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  saveBtn: {
    marginTop: 24,
    backgroundColor: '#0A47E9',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});