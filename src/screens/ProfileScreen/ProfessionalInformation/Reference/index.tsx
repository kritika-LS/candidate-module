import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Input } from '../../../../components/common/Input';
import { PhoneNumberInput } from '../../../../components/common/PhoneInput';
import styles from './styles';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';
import { TextStyle } from '../../../../components/common/Text';
import { SaveButton } from '../../../../components/features/SaveButton';
import { Checkbox } from '../../../../components/common/Checkbox';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useAppDispatch';
import { referencesSchema } from '../../../../validations/referencesSchems';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '../../../../config/env';
import { ENDPOINTS } from '../../../../api/endPoints';
import Toast from 'react-native-toast-message';
import { fetchCandidateReferences } from '../../../../store/thunk/candidateReferences.thunk';

interface ReferenceFormValues {
  fullName: string;
  workedWithFacilityName: string;
  emailAddress: string;
  mobileNumber: string;
  isContactAllowed: boolean;
}

interface ReferenceProps {
  setShowForm?: any;
}

const ReferenceSection: React.FC<ReferenceProps> = ({ setShowForm }) => {
  const dispatch = useAppDispatch();
  const ReferencesData = useAppSelector((state) => state?.candidateReferences?.references?.responsePayload) || [];

  const [activeSubmitBtn,setActiveSubmitBtn] = useState(false);
  const [formValues, setFormValues] = useState<ReferenceFormValues>({
    fullName: '',
    workedWithFacilityName: '',
    emailAddress: '',
    mobileNumber: '',
    isContactAllowed: false,
  });

  const [errors, setErrors] = useState<Partial<ReferenceFormValues>>({});

  const validateForm = useCallback(async () => {
    try {
      await referencesSchema.validate(formValues, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors: any) {
      const newErrors: Partial<ReferenceFormValues> = {};
      validationErrors?.inner.forEach((error: any) => {
        if (error.path) {
          newErrors[error.path as keyof ReferenceFormValues] = error.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
  }, [formValues]);

  const handleInputChange = (field: keyof ReferenceFormValues, value: string | boolean) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const handleSave = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    setActiveSubmitBtn(true);
    console.log('Saving References details:', formValues);
    const payload = [
      ...ReferencesData,
      {
        contactOrNot: formValues?.isContactAllowed ? "Y" : "N",
        emailAddress: formValues?.emailAddress || "",
        fullName: formValues?.fullName,
        mobileNumber: formValues?.mobileNumber,
        organizationName: formValues?.workedWithFacilityName
      }
    ]
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const apiUrl = `${ENV.DEV_API_URL}${ENDPOINTS.CANDIDATE.references}`;
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      console.log('tag response', response);
      const data = await response?.json();
      console.log('Work References saved:', data);
      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'References  saved successfully',
        });
        dispatch(fetchCandidateReferences());
        setShowForm(false);
      } else {
        console.error('Error saving References:');
        Toast.show({
          type: 'error',
          text1: 'Failed to saveReferences',
        });
      }
    } catch (error) {
      console.error('Error saving References:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to save References',
      });
    }finally {
      setActiveSubmitBtn(false);
    }
  };

  const checkStatus = useCallback(async () => {
    if (formValues.fullName && formValues.emailAddress && formValues.workedWithFacilityName) {
      const isValid = await validateForm();
      setActiveSubmitBtn(isValid);
    } else {
      setActiveSubmitBtn(false);
    }
  }, [formValues, validateForm]);
  
    useEffect(() => {
      checkStatus();
    }, [checkStatus]);

  return (
    <View style={styles.body}>
      <ProfileScreenHeader
        headerIcon="account-arrow-right-outline"
        headerTitle="Reference"
        completedStatus={activeSubmitBtn}
      />
      <View style={styles.container}>
        <Input
          label="Full Name"
          required
          value={formValues.fullName}
          onChangeText={(value) => handleInputChange('fullName', value)}
          error={errors.fullName}
          placeholder="Enter full name"
        />
        <Input
          label="Worked with/Facility Name"
          required
          value={formValues.workedWithFacilityName}
          onChangeText={(value) => handleInputChange('workedWithFacilityName', value)}
          error={errors.workedWithFacilityName}
          placeholder="Enter worked with/facility name"
        />
        <Input
          label="Email Address"
          required
          value={formValues.emailAddress}
          onChangeText={(value) => handleInputChange('emailAddress', value)}
          error={errors.emailAddress}
          placeholder="Enter email address"
        />
        <PhoneNumberInput
          required
          label="Mobile Number"
          onChangeText={(value) => handleInputChange('mobileNumber', value)}
          placeholder="Enter mobile number"
          maxLength={16}
          error={errors.mobileNumber}
        />
        <View style={styles.checkboxContainer}>
          <Checkbox
            checked={formValues.isContactAllowed}
            onChange={() => handleInputChange('isContactAllowed', !formValues.isContactAllowed)}
            label="Is it ok to contact the reference?"
          />
        </View>
      </View>
      <View style={styles.saveButton}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => setShowForm(false)}>
          <TextStyle>Cancel</TextStyle>
        </TouchableOpacity>
        <SaveButton title="Save" onPress={handleSave} disabled={!activeSubmitBtn} />
      </View>
    </View>
  );
};

export default ReferenceSection;
