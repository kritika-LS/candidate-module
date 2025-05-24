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
import { useAppSelector, useAppDispatch } from '../../../../hooks/useAppDispatch';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';
import { SaveButton } from '../../../../components/features/SaveButton';
import { updateCandidatePersonalDetails } from '../../../../store/thunk/candidatePersonalDetails.thunk';
import { CandidatePersonalDetailsPayload } from '../../../../types/personalDetails';

const AddressDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const candidatePersonalDetails = useAppSelector((state) => state.candidatePersonalDetails.personalDetails.responsePayload) || {};

  const candidateAddressDetails = candidatePersonalDetails?.address?.[0] || {};

  const candidateAddress = {
    address1: candidateAddressDetails?.address1 || '',
    address2: candidateAddressDetails?.address2 || '',
    city: candidateAddressDetails?.city || '',
    zipCode: candidateAddressDetails?.zipCode || '',
    stateCode: candidateAddressDetails?.stateCode || '',
    countryCode: candidateAddressDetails?.countryCode || '',
  };

  const defaultAddress = {
    address1: '',
    address2: '',
    city: '',
    zipCode: '',
    stateCode: '',
    countryCode: '',
  };

  const initialValues = {
    permanentAddress: {...candidateAddress},
    currentAddress: {...candidateAddress},
    isSamePermanent: false,
    notes: '',
    permanentNotes: '',
  };
console.log('Initial values:', initialValues);
  const handleSave = async (values: typeof initialValues) => {
    try {
      const payload: CandidatePersonalDetailsPayload = {
        ...candidatePersonalDetails,
        address: [
          {
            addressType: 'CURRENT',
            address: values.currentAddress.address1,
            address2: values.currentAddress.address2,
            city: values.currentAddress.city,
            zipCode: values.currentAddress.zipCode,
            state: values.currentAddress.stateCode,
            country: values.currentAddress.countryCode,
            addressNotes: values.notes,
          },
          {
            addressType: 'PERMANENT',
            address: values.permanentAddress.address1,
            address2: values.permanentAddress.address2,
            city: values.permanentAddress.city,
            zipCode: values.permanentAddress.zipCode,
            state: values.permanentAddress.stateCode,
            country: values.permanentAddress.countryCode,
            addressNotes: values.permanentNotes,
          },
        ],
      };

      await dispatch(updateCandidatePersonalDetails(payload)).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Address details saved successfully',
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

        <View style={styles.body}>
        <ProfileScreenHeader
            headerIcon='home-outline'
            headerTitle='Address Details'
            completedStatus={false}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={addressValidationSchema2}
          onSubmit={handleSave}>
          {({values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting, isValid, dirty}) => (
            <>
            
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
                    value={values.permanentNotes}
                    onChangeText={handleChange('permanentNotes')}
                  />
                </View>
              )}
            </>
          )}
        </Formik>
        </View>
      </ScrollView>
                    <View style={styles.saveButton}>
                      <SaveButton
                        title="Save"
                        onPress={handleSubmit}
                        disabled={!isValid || !dirty}
                      />
                    </View>
    </SafeAreaView>
  );
};

export default AddressDetailsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  body: {
    margin: 16,
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
  saveButton: {
    backgroundColor: '#fff', 
    paddingHorizontal: 16, 
    paddingBottom: 16
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