import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { EmailInput } from '../../../components/common/EmailInput';
import { PasswordInput } from '../../../components/common/PasswordInput';
import { SaveButton } from '../../../components/features/SaveButton';
import { useAppSelector, useAppDispatch } from '../../../hooks/useAppDispatch';
import { theme } from '../../../theme';
import { TextStyle } from '../../../components/common/Text';
import { reverifyCandidate } from '../../../store/thunk/reverifyCandidate.thunk';
import { updateCandidatePersonalDetails } from '../../../store/thunk/candidatePersonalDetails.thunk';
import Toast from 'react-native-toast-message';
import { clearReverifyState } from '../../../store/slices/candidateReverify.slice';
import CustomModal from '../../../components/common/Modal';
import { updateUserAttributes } from 'aws-amplify/auth';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../utils/ScreenConstants';

const passwordValidationSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
});

const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('New email address is required'),
});

export const UpdateEmail = () => {

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const email = useAppSelector(state => state?.candidatePersonalDetails?.personalDetails?.responsePayload?.emailAddress || '');
  const personalDetails = useAppSelector(state => state?.candidatePersonalDetails?.personalDetails?.responsePayload);

  const [step, setStep] = useState<'verify' | 'update'>('verify');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  // Separate submit handler for password verification
  const handleVerifySubmit = async (
    values: { password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      if (!values?.password.trim()) {
        Toast.show({ type: 'error', text1: 'Input Required', text2: 'Please enter your password.' });
        return;
      }
      await dispatch(reverifyCandidate({ password: values.password })).unwrap();
      setStep('update');
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Incorrect password, please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Separate submit handler for email update
  const handleEmailUpdateSubmit = (values: { email: string }) => {
    setPendingEmail(values.email);
    setShowConfirmModal(true);
  };

  // Called when user confirms in modal
  const handleConfirmUpdate = async () => {
    if (!pendingEmail) return;
    try {
      const response = await updateUserAttributes({
        userAttributes: { email: pendingEmail },
        options: {
          clientMetadata: {
            eventType: "CHANGE_EMAIL",
          },
        },
      });
      console.log({response})
      // Toast.show({ type: 'success', text1: 'Email updated successfully! Please verify your new email.' });
      navigation.navigate(ScreenNames.EmailVerificationScreen, {
        email: pendingEmail,
        password: '',
      })
      setShowConfirmModal(false);
      setPendingEmail(null);
      // Optionally, you can reset the form or navigate away here
    } catch (err: any) {
      Toast.show({ type: 'error', text1: err?.message || 'Failed to update email.' });
      setShowConfirmModal(false);
      setPendingEmail(null);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearReverifyState());
    };
  }, [dispatch]);

  // Step 1: Password verification
  if (step === 'verify') {
    return (
      <Formik
        initialValues={{ password: '' }}
        validationSchema={passwordValidationSchema}
        validateOnMount
        onSubmit={handleVerifySubmit}
      >
        {({ handleChange, handleSubmit, values, errors, touched, isValid, isSubmitting }) => (
          <View style={styles.container}>
            <TextStyle style={styles.heading}>Update Email Address</TextStyle>
            <View pointerEvents="none" style={{ opacity: 0.7 }}>
              <EmailInput
                value={email}
                onChange={() => {}}
                error={''}
                title='Your Email Address'
              />
            </View>
            <PasswordInput
              label="Password"
              value={values.password}
              onChange={handleChange('password')}
              error={touched.password && errors.password ? errors.password : ''}
              placeholder="Enter password"
            />
            <View style={{alignItems: 'flex-end'}}>
              <SaveButton
                onPress={handleSubmit as any}
                disabled={!isValid || isSubmitting}
                title="Next"
              />
            </View>
          </View>
        )}
      </Formik>
    );
  }

  // Step 2: Update email
  return (
    <>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={emailValidationSchema}
        validateOnMount
        onSubmit={handleEmailUpdateSubmit}
      >
        {({ handleChange, handleSubmit, values, errors, touched, isValid }) => (
          <View style={styles.container}>
            <TextStyle style={styles.heading}>Update Email Address</TextStyle>
            <EmailInput
              value={values.email}
              onChange={handleChange('email')}
              error={touched.email && errors.email ? errors.email : ''}
              title='New Email Address'
            />
            <View style={{alignItems: 'flex-end'}}>
              <SaveButton
                onPress={handleSubmit as any}
                disabled={!isValid}
                title="Update"
              />
            </View>
          </View>
        )}
      </Formik>
      <CustomModal
        isVisible={showConfirmModal}
        title="Update Email Address"
        onClose={() => setShowConfirmModal(false)}
        primaryButtonText="Yes"
        secondaryButtonText="No"
        onPrimaryPress={handleConfirmUpdate}
        onSecondaryPress={() => setShowConfirmModal(false)}
      >
        <TextStyle>
          Updating your registered email address may affect access to important account communications. Please ensure you have access to the new email address before proceeding as you will be asked to verify the new email address. Do you want to proceed?
        </TextStyle>
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    color: theme.colors.text.primary,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
    color: theme.colors.text.primary,
  },
  required: {
    color: 'red',
  },
});