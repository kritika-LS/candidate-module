import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../../../components/common/Input';
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useAppDispatch';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';
import { updateCandidatePersonalDetails } from '../../../../store/thunk/candidatePersonalDetails.thunk';
import { CandidatePersonalDetailsPayload } from '../../../../types/personalDetails';

interface EmergencyContactFormValues {
  firstName: string;
  lastName: string;
  relationship: string;
  primaryMobileNumber: string;
  primaryMobileNumberCountryCode: string;
  secondaryMobileNumber: string;
  secondaryMobileNumberCountryCode: string;
  workPhoneNumber: string;
  workPhoneNumberCountryCode: string;
  address: string;
  address2: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  notes?: string;
}

const EmergencyContactAddressScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const candidatePersonalDetails = useAppSelector((state) => state?.candidatePersonalDetails?.personalDetails?.responsePayload) || {};
  const [isCompleted, setIsCompleted] = React.useState(false);

  const emergencyContactDetails = candidatePersonalDetails?.emergencyContactDetails?.[0] || {};
  const emergencyAddress = emergencyContactDetails?.address?.[0] || {};

  const initialValues: EmergencyContactFormValues = {
    firstName: emergencyContactDetails?.firstName || '',
    lastName: emergencyContactDetails?.lastName || '',
    relationship: emergencyContactDetails?.relationship || '',
    primaryMobileNumber: emergencyContactDetails?.primaryMobileNumber || '',
    primaryMobileNumberCountryCode: emergencyContactDetails?.primaryMobileNumberCountryCode || '',
    secondaryMobileNumber: emergencyContactDetails?.secondaryMobileNumber || '',
    secondaryMobileNumberCountryCode: emergencyContactDetails?.secondaryMobileNumberCountryCode || '',
    workPhoneNumber: emergencyContactDetails?.workPhoneNumber || '',
    workPhoneNumberCountryCode: emergencyContactDetails?.workPhoneNumberCountryCode || '',
    address: emergencyAddress?.address || '',
    address2: emergencyAddress?.address2 || '',
    city: emergencyAddress?.city || '',
    zipCode: emergencyAddress?.zipCode || '',
    state: emergencyAddress?.state || '',
    country: emergencyAddress?.country || '',
    notes: emergencyContactDetails?.notes || '',
  };

  const handleSave = async (values: EmergencyContactFormValues) => {
    try {
      const payload: CandidatePersonalDetailsPayload = {
        ...candidatePersonalDetails,
        emergencyContactDetails: [
          {
            firstName: values.firstName,
            lastName: values.lastName,
            relationship: values.relationship,
            primaryMobileNumber: values.primaryMobileNumber,
            primaryMobileNumberCountryCode: values.primaryMobileNumberCountryCode,
            secondaryMobileNumber: values.secondaryMobileNumber,
            secondaryMobileNumberCountryCode: values.secondaryMobileNumberCountryCode,
            workPhoneNumber: values.workPhoneNumber,
            workPhoneNumberCountryCode: values.workPhoneNumberCountryCode,
            notes: values.notes,
            address: [
              {
                addressType: 'EMERGENCY',
                address: values.address,
                address2: values.address2,
                city: values.city,
                zipCode: values.zipCode,
                state: values.state,
                country: values.country,
              },
            ],
          },
        ],
      };

      await dispatch(updateCandidatePersonalDetails(payload)).unwrap();
      setIsCompleted(true);
      Toast.show({
        type: 'success',
        text1: 'Emergency contact details saved successfully',
      });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to save emergency contact information',
      });
    }
  };

  return (
    <View style={styles.body}>
      <Formik<EmergencyContactFormValues>
        initialValues={initialValues}
        onSubmit={handleSave}>
        {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting, errors, touched, isValid, dirty }) => {
          console.log("error", errors);
          return (
            <>
              <View style={styles.formSection}>
                <ProfileScreenHeader
                  headerIcon='shield-alert-outline'
                  headerTitle='Emergency Contact and Address'
                  completedStatus={isCompleted}
                />
                <Input
                  label="First Name"
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  error={errors.firstName as string}
                  touched={touched.firstName as boolean}
                />
                <Input
                  label="Last Name"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  error={errors.lastName as string}
                  touched={touched.lastName as boolean}
                />
                <Input
                  label="Relationship"
                  value={values.relationship}
                  onChangeText={handleChange('relationship')}
                  onBlur={handleBlur('relationship')}
                  error={errors.relationship as string}
                  touched={touched.relationship as boolean}
                />
                <Input
                  label="Primary Mobile Number"
                  value={values.primaryMobileNumber}
                  onChangeText={handleChange('primaryMobileNumber')}
                  onBlur={handleBlur('primaryMobileNumber')}
                  error={errors.primaryMobileNumber as string}
                  touched={touched.primaryMobileNumber as boolean}
                />
                <Input
                  label="Secondary Mobile Number"
                  value={values.secondaryMobileNumber}
                  onChangeText={handleChange('secondaryMobileNumber')}
                  onBlur={handleBlur('secondaryMobileNumber')}
                  error={errors.secondaryMobileNumber as string}
                  touched={touched.secondaryMobileNumber as boolean}
                />
                <Input
                  label="Work Phone Number"
                  value={values.workPhoneNumber}
                  onChangeText={handleChange('workPhoneNumber')}
                  onBlur={handleBlur('workPhoneNumber')}
                  error={errors.workPhoneNumber as string}
                  touched={touched.workPhoneNumber as boolean}
                />
                <Input
                  label="Address"
                  value={values.address}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  error={errors.address as string}
                  touched={touched.address as boolean}
                />
                <Input
                  label="Address 2"
                  value={values.address2}
                  onChangeText={handleChange('address2')}
                  onBlur={handleBlur('address2')}
                  error={errors.address2 as string}
                  touched={touched.address2 as boolean}
                />
                <Input
                  label="City"
                  value={values.city}
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  error={errors.city as string}
                  touched={touched.city as boolean}
                />
                <Input
                  label="Zip Code"
                  value={values.zipCode}
                  onChangeText={handleChange('zipCode')}
                  onBlur={handleBlur('zipCode')}
                  error={errors.zipCode as string}
                  touched={touched.zipCode as boolean}
                />
                <Input
                  label="State"
                  value={values.state}
                  onChangeText={handleChange('state')}
                  onBlur={handleBlur('state')}
                  error={errors.state as string}
                  touched={touched.state as boolean}
                />
                <Input
                  label="Country"
                  value={values.country}
                  onChangeText={handleChange('country')}
                  onBlur={handleBlur('country')}
                  error={errors.country as string}
                  touched={touched.country as boolean}
                />
                <Input
                  label="Notes"
                  value={values.notes}
                  onChangeText={handleChange('notes')}
                  onBlur={handleBlur('notes')}
                  error={errors.notes as string}
                  touched={touched.notes as boolean}
                />
              </View>
            </>
          )
        }}
      </Formik>
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
});

export default EmergencyContactAddressScreen;