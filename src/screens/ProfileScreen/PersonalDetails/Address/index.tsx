import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Switch,
} from 'react-native';
import { theme } from '../../../../theme';
import { TextStyle } from '../../../../components/common/Text';
import { Input } from '../../../../components/common/Input';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';

const AddressDetailsScreen: React.FC<{ initialValues: any; updateValues: (updatedValues: any) => void }> = ({ initialValues, updateValues }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (field: string, value: any, type?:any) => {
    console.log('tag here Field Changed:', field, 'Value:', value);
    if(type === 'currentAddress'){
      updateValues({...initialValues,currentAddress: { ...initialValues.currentAddress, [field]: value }});
    }else if (type === 'permanentAddress'){
      updateValues({...initialValues, permanentAddress: { ...initialValues.permanentAddress, [field]: value }});
    }else{
      updateValues({ ...initialValues, [field]: value });
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, initialValues[field]);
  };

  const validateField = (field: string, value: any) => {
    let error = '';
    if (!value) {
      error = 'This field is required';
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  return (
    <View style={styles.body}>
      <ProfileScreenHeader
        headerIcon='home-outline'
        headerTitle='Address Details'
        completedStatus={false}
      />
      <View style={styles.formSection}>
        <TextStyle variant="medium" size="lg" style={styles.sectionTitle}>
          Current Address
        </TextStyle>

        <Input
          label="Address"
          required
          value={initialValues.currentAddress.address}
          onChangeText={value => handleChange('address', value, "currentAddress", )}
          onBlur={() => handleBlur('currentAddress.address')}
          error={errors.currentAddress?.address}
          touched={touched.currentAddress?.address}
          placeholder="Enter address"
        />

        <Input
          label="Zip Code"
          required
          value={initialValues.currentAddress.zipCode}
          onChangeText={value => handleChange('zipCode', value, "currentAddress" )}
          onBlur={() => handleBlur('currentAddress.zipCode')}
          error={errors.currentAddress?.zipCode}
          touched={touched.currentAddress?.zipCode}
          keyboardType="numeric"
          placeholder="Enter zip code"
        />

        <Input
          label="City"
          required
          value={initialValues.currentAddress.city}
          onChangeText={value => handleChange( 'city', value, "currentAddress")}
          onBlur={() => handleBlur('currentAddress.city')}
          error={errors.currentAddress?.city}
          touched={touched.currentAddress?.city}
          placeholder="Enter city"
        />

        <Input
          label="State"
          required
          value={initialValues.currentAddress.stateCode}
          onChangeText={value => handleChange( 'stateCode', value, "currentAddress")}
          onBlur={() => handleBlur('currentAddress.stateCode')}
          error={errors.currentAddress?.stateCode}
          touched={touched.currentAddress?.stateCode}
          placeholder="Enter state"
        />

        <Input
          label="Country"
          required
          value={initialValues.currentAddress.countryCode}
          onChangeText={value => handleChange('countryCode', value, "currentAddress")}
          onBlur={() => handleBlur('currentAddress.countryCode')}
          error={errors.currentAddress?.countryCode}
          touched={touched.currentAddress?.countryCode}
          placeholder="Enter country"
        />

        <Text style={styles.label}>Address Notes</Text>
        <TextInput
          style={[styles.inputArea, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Enter address notes"
          multiline
          maxLength={1024}
          value={initialValues.currentAddress.addressNotes}
          onChangeText={value => handleChange('addressNotes', value, "currentAddress")}
        />
      </View>

      <View style={styles.toggleSection}>
        <View style={styles.sameAddressToggle}>
          <TextStyle variant="regular" size="md">
            Permanent Address
          </TextStyle>
          <Switch
            value={initialValues.isSamePermanent}
            onValueChange={value => {
              handleChange('isSamePermanent', value);
              if (value) {
                handleChange('permanentAddress', initialValues.currentAddress);
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

      {!initialValues.isSamePermanent && (
        <View style={styles.formSection}>
          <TextStyle variant="medium" size="lg" style={styles.sectionTitle}>
            Permanent Address
          </TextStyle>

          <Input
            label="Address"
            required
            value={initialValues.permanentAddress.address}
            onChangeText={value => handleChange( 'address', value, "permanentAddress")}
            onBlur={() => handleBlur('permanentAddress.address')}
            error={errors.permanentAddress?.address}
            touched={touched.permanentAddress?.address}
            placeholder="Enter address"
          />

          <Input
            label="Zip Code"
            required
            value={initialValues.permanentAddress.zipCode}
            onChangeText={value => handleChange( 'zipCode', value, "permanentAddress",)}
            onBlur={() => handleBlur('permanentAddress.zipCode')}
            error={errors.permanentAddress?.zipCode}
            touched={touched.permanentAddress?.zipCode}
            keyboardType="numeric"
            placeholder="Enter zip code"
          />

          <Input
            label="City"
            required
            value={initialValues.permanentAddress.city}
            onChangeText={value => handleChange( 'city', value, "permanentAddress")}
            onBlur={() => handleBlur('permanentAddress.city')}
            error={errors.permanentAddress?.city}
            touched={touched.permanentAddress?.city}
            placeholder="Enter city"
          />

          <Input
            label="State"
            required
            value={initialValues.permanentAddress.stateCode}
            onChangeText={value => handleChange( 'stateCode', value, "permanentAddress")}
            onBlur={() => handleBlur('permanentAddress.stateCode')}
            error={errors.permanentAddress?.stateCode}
            touched={touched.permanentAddress?.stateCode}
            placeholder="Enter state"
          />

          <Input
            label="Country"
            required
            value={initialValues.permanentAddress.countryCode}
            onChangeText={value => handleChange('countryCode', value, "permanentAddress")}
            onBlur={() => handleBlur('permanentAddress.countryCode')}
            error={errors.permanentAddress?.countryCode}
            touched={touched.permanentAddress?.countryCode}
            placeholder="Enter country"
          />
          <Text style={styles.label}>Address Notes</Text>
          <TextInput
            style={[styles.inputArea, { height: 100, textAlignVertical: 'top' }]}
            placeholder="Enter address notes"
            multiline
            maxLength={1024}
            value={initialValues.permanentAddress.addressNotes}
            onChangeText={value => handleChange('addressNotes', value, "permanentAddress")}
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
});