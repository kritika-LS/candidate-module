import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {theme} from '../../../../theme';
import {TextStyle} from '../../../../components/common/Text';
import {Input} from '../../../../components/common/Input';
import {Button} from '../../../../components/common/Button';
import {Formik} from 'formik';
import Toast from 'react-native-toast-message';
import { addressValidationSchema3 } from '../../../../validations/addressValidation';
import { PhoneNumberInput } from '../../../../components/common/PhoneInput';

const EmergencyContactAddressScreen: React.FC = () => {

  const defaultAddress = {
    address: '',
    city: '',
    zipCode: '',
    stateCode: '',
    countryCode: '',
  };

  const initialValues = {
    address: { ...defaultAddress },
    notes: '',
    firstName: '',
    middleName: '',
    lastName: '',
    relationship: '',
    mobileNumber: '',
    alternateMobileNumber: '',
    workPhoneNumber: '',
    extensionNumber: '',
  };

  const handleSave = async (values: typeof initialValues) => {
    console.log('Saving address details:', values);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      Toast.show({
        type: 'success',
        text1: 'Address saved successfully',
      });
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
          validationSchema={addressValidationSchema3}
          onSubmit={handleSave}>
          {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting, errors, touched }) => {
            console.log("error", errors);
            return (
            <>
              <View style={styles.formSection}>
                <TextStyle variant="medium" size="lg" style={styles.sectionTitle}>
                  Contact Details
                </TextStyle>
                <Input
                  label="First Name"
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  placeholder="Enter first name"
                  maxLength={128}
                  error={errors.firstName}
                  touched={touched.firstName}
                />
                <Input
                  label="Middle Name"
                  value={values.middleName}
                  onChangeText={handleChange('middleName')}
                  onBlur={handleBlur('middleName')}
                  placeholder="Enter middle name"
                  maxLength={128}
                  error={errors.middleName}
                  touched={touched.middleName}
                />
                <Input
                  label="Last Name"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  placeholder="Enter last name"
                  maxLength={128}
                  error={errors.lastName}
                  touched={touched.lastName}
                />
                <Input
                  label="Relationship"
                  value={values.relationship}
                  onChangeText={handleChange('relationship')}
                  onBlur={handleBlur('relationship')}
                  placeholder="Enter relationship"
                  maxLength={128}
                  error={errors.relationship}
                  touched={touched.relationship}
                />
                <PhoneNumberInput
                  label="Mobile Number"
                  onChangeText={(value) => setFieldValue('mobileNumber', value)}
                  placeholder="Enter mobile number"
                  maxLength={16}
                  error={errors.mobileNumber}
                  touched={touched.mobileNumber}
                />
                <PhoneNumberInput
                  label="Alternate Mobile Number"
                  onChangeText={(value) => setFieldValue('alternateMobileNumber', value)}
                  placeholder="Enter alternate mobile number"
                  maxLength={16}
                  error={errors.alternateMobileNumber}
                  touched={touched.alternateMobileNumber}
                />
                <PhoneNumberInput
                  label="Extension Number"
                  onChangeText={(value) => setFieldValue('extensionNumber', value)}
                  placeholder="Enter extension number"
                  maxLength={16}
                  error={errors.extensionNumber}
                  touched={touched.extensionNumber}
                />
                <PhoneNumberInput
                  label="Work Phone Number"
                  onChangeText={(value) => setFieldValue('workPhoneNumber', value)}
                  placeholder="Enter work phone number"
                  maxLength={16}
                  error={errors.workPhoneNumber}
                  touched={touched.workPhoneNumber}
                />
              </View>

              <View style={styles.formSection}>
                <TextStyle variant="medium" size="lg" style={styles.sectionTitle}>
                  Address
                </TextStyle>
                <Input
                  label="Address"
                  value={values.address.address}
                  onChangeText={handleChange('address.address')}
                  onBlur={handleBlur('address.address')}
                  placeholder="Enter address"
                  maxLength={80}
                  error={errors.address?.address}
                  touched={touched.address?.address}
                />
                <Input
                  label="Zip Code"
                  value={values.address.zipCode}
                  onChangeText={handleChange('address.zipCode')}
                  onBlur={handleBlur('address.zipCode')}
                  placeholder="Enter zip code"
                  keyboardType="numeric"
                  error={errors.address?.zipCode}
                  touched={touched.address?.zipCode}
                />
                <Input
                  label="City"
                  value={values.address.city}
                  onChangeText={handleChange('address.city')}
                  onBlur={handleBlur('address.city')}
                  placeholder="Enter city"
                  error={errors.address?.city}
                  touched={touched.address?.city}
                />
                <Input
                  label="State"
                  value={values.address.stateCode}
                  onChangeText={handleChange('address.stateCode')}
                  onBlur={handleBlur('address.stateCode')}
                  placeholder="Enter state"
                  error={errors.address?.stateCode}
                  touched={touched.address?.stateCode}
                />
                <Input
                  label="Country"
                  value={values.address.countryCode}
                  onChangeText={handleChange('address.countryCode')}
                  onBlur={handleBlur('address.countryCode')}
                  placeholder="Enter country"
                  error={errors.address?.countryCode}
                  touched={touched.address?.countryCode}
                />
                <Text style={styles.label}>Address Notes</Text>
                <TextInput
                  style={[styles.inputArea, { height: 100, textAlignVertical: 'top' }]}
                  placeholder="Enter address notes"
                  multiline
                  maxLength={1024}
                  value={values.notes}
                  onChangeText={handleChange('notes')}                />
              </View>

             <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit as any}>
                <Text style={styles.saveBtnText}>{isSubmitting ? 'Saving...' : 'Save'}</Text>
             </TouchableOpacity>
            </>
          )}}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmergencyContactAddressScreen;

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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.lg,
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