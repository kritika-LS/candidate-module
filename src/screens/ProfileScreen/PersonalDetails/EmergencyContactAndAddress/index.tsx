import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Input } from '../../../../components/common/Input';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';

const EmergencyContactAddressScreen: React.FC<{ initialValues: any; updateValues: (updatedValues: any) => void }> = ({ initialValues, updateValues }) => {

  return (
    <View style={styles.body}>
      <View style={styles.formSection}>
        <ProfileScreenHeader
          headerIcon='shield-alert-outline'
          headerTitle='Emergency Contact and Address'
          completedStatus={true}
        />
        <Input
          label="First Name"
          value={initialValues.firstName}
          onChangeText={(text) => updateValues({ ...initialValues, firstName: text })}
        />
        <Input
          label="Last Name"
          value={initialValues.lastName}
          onChangeText={(text) => updateValues({ ...initialValues, lastName: text })}
        />
        <Input
          label="Relationship"
          value={initialValues.relationship}
          onChangeText={(text) => updateValues({ ...initialValues, relationship: text })}
        />
        <Input
          label="Primary Mobile Number"
          value={initialValues.primaryMobileNumber}
          onChangeText={(text) => updateValues({ ...initialValues, primaryMobileNumber: text })}
        />
        <Input
          label="Secondary Mobile Number"
          value={initialValues.secondaryMobileNumber}
          onChangeText={(text) => updateValues({ ...initialValues, secondaryMobileNumber: text })}
        />
        <Input
          label="Work Phone Number"
          value={initialValues.workPhoneNumber}
          onChangeText={(text) => updateValues({ ...initialValues, workPhoneNumber: text })}
        />
        <Input
          label="Address"
          value={initialValues.address}
          onChangeText={(text) => updateValues({ ...initialValues, address: text })}
        />
        <Input
          label="City"
          value={initialValues.city}
          onChangeText={(text) => updateValues({ ...initialValues, city: text })}
        />
        <Input
          label="Zip Code"
          value={initialValues.zipCode}
          onChangeText={(text) => updateValues({ ...initialValues, zipCode: text })}
        />
        <Input
          label="State"
          value={initialValues.state}
          onChangeText={(text) => updateValues({ ...initialValues, state: text })}
        />
        <Input
          label="Country"
          value={initialValues.country}
          onChangeText={(text) => updateValues({ ...initialValues, country: text })}
        />
        <Input
          label="Notes"
          value={initialValues.notes}
          onChangeText={(text) => updateValues({ ...initialValues, notes: text })}
        />
        <TextInput
          style={[styles.inputArea, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Notes"
          multiline
          maxLength={1024}
          value={initialValues.notes}
          onChangeText={text => updateValues({ ...initialValues, notes: text })}
        />
      </View>
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
  saveButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#007BFF',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputArea: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default EmergencyContactAddressScreen;