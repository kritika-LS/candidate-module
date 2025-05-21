/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { theme } from '../../../theme';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';

const AddressSchema = Yup.object().shape({
  physicalAddress: Yup.object().shape({
    address: Yup.string().required('Address is required'),
    zipCode: Yup.string().required('Zip Code is required'),
    city: Yup.string().required('City is required'),
    stateCode: Yup.string().nullable(),
    countryCode: Yup.string().nullable(),
  }),
  mailingAddress: Yup.object().shape({
    address: Yup.string().required('Address is required'),
    zipCode: Yup.string().required('Zip Code is required'),
    city: Yup.string().required('City is required'),
    stateCode: Yup.string().nullable(),
    countryCode: Yup.string().nullable(),
  }),
});

const AddressInfoScreen = ({ data, onChange, errors, touched, setTouched }) => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({ addressType: 'permanent' });

  const onAddressTypeChange = (type) => {
    setFormData({ ...formData, addressType: type });
  };

  const handleSubmit = (data) => {
    console.log('Form data:', data);
    if (onChange) {
      onChange(data);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View >
          <View style={styles.radioGroup}>
          <TouchableOpacity 
            style={styles.radioButton} 
            onPress={() => onAddressTypeChange('permanent')}
          >
            <View style={styles.radioCircle}>
              {formData.addressType === 'permanent' && <View style={styles.selectedRb} />}
            </View>
            <Text style={styles.radioLabel}>Permanent Address</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.radioButton} 
            onPress={() => onAddressTypeChange('current')}
          >
            <View style={styles.radioCircle}>
              {formData.addressType === 'current' && <View style={styles.selectedRb} />}
            </View>
            <Text style={styles.radioLabel}>Current Address</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.radioButton} 
            onPress={() => onAddressTypeChange('both')}
          >
            <View style={styles.radioCircle}>
              {formData.addressType === 'both' && <View style={styles.selectedRb} />}
            </View>
            <Text style={styles.radioLabel}>Both (Same Address)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <Input
            label="Address"
            required
            value={data.physicalAddress.address}
            onChangeText={(text) => {
              onChange({ ...data, physicalAddress: { ...data?.physicalAddress, address: text } });
            }}
            error={errors?.physicalAddress?.address}
            touched={touched?.physicalAddress?.address}
            placeholder="Enter Address"
            onBlur={() => setTouched({ ...touched, physicalAddress: { ...touched?.physicalAddress, address: true } })}
          />

          <Input
            label="Zip Code"
            required
            value={data.physicalAddress.zipCode}
            onChangeText={(text) => {
              onChange({ ...data, physicalAddress: { ...data?.physicalAddress, zipCode: text } });
            }}
            error={errors?.physicalAddress?.zipCode}
            touched={touched?.physicalAddress?.zipCode}
            keyboardType="numeric"
            placeholder="Enter ZIP code to find address"
            onBlur={() => setTouched({ ...touched, physicalAddress: { ...touched?.physicalAddress, zipCode: true } })}
          />

          <Input
            label="City"
            required
            value={data.physicalAddress.city}
            onChangeText={(text) => {
              onChange({ ...data, physicalAddress: { ...data.physicalAddress, city: text } });
            }}
            touched={touched?.physicalAddress?.city}
            error={errors?.physicalAddress?.city}
            placeholder="Enter city name"
            onBlur={() => setTouched({ ...touched, physicalAddress: { ...touched?.physicalAddress, city: true } })}
          />

          <Input
            label="State"
            value={data.physicalAddress.stateCode}
            onChangeText={(text) => {
              onChange({ ...data, physicalAddress: { ...data.physicalAddress, stateCode: text } });
            }}
            onBlur={() => setTouched({ ...touched, physicalAddress: { ...touched?.physicalAddress, stateCode: true } })}
          />

          <Input
            label="Country"
            value={data.physicalAddress.countryCode}
            onChangeText={(text) => {
              onChange({ ...data, physicalAddress: { ...data.physicalAddress, countryCode: text } });
            }}
            onBlur={() => setTouched({ ...touched, physicalAddress: { ...touched?.physicalAddress, countryCode: true } })}
          />
        </View>

        {!data.isSamePhysical && (
          <View style={styles.formSection}>
            <Input
              label="Address"
              required
              value={data.mailingAddress.address}
              onChangeText={(text) => {
                onChange({ ...data, mailingAddress: { ...data.mailingAddress, address: text } });
              }}
              touched={touched?.mailingAddress?.address}
              error={errors?.mailingAddress?.address}
              onBlur={() => setTouched({ ...touched, mailingAddress: { ...touched?.mailingAddress, address: true } })}
            />

            <Input
              label="Zip Code"
              required
              value={data.mailingAddress.zipCode}
              onChangeText={(text) => {
                onChange({ ...data, mailingAddress: { ...data.mailingAddress, zipCode: text } });
              }}
              error={errors?.mailingAddress?.zipCode}
              touched={touched?.mailingAddress?.zipCode}
              keyboardType="numeric"
              placeholder="Enter ZIP code to find address"
              onBlur={() => setTouched({ ...touched, mailingAddress: { ...touched?.mailingAddress, zipCode: true } })}
            />

            <Input
              label="City"
              required
              value={data.mailingAddress.city}
              onChangeText={(text) => {
                onChange({ ...data, mailingAddress: { ...data.mailingAddress, city: text } });
              }}
              error={errors?.mailingAddress?.city}
              touched={touched?.mailingAddress?.city}
              placeholder="Enter city name"
              onBlur={() => setTouched({ ...touched, mailingAddress: { ...touched?.mailingAddress, city: true } })}
            />

            <Input
              label="State"
              value={data.mailingAddress.stateCode}
              onChangeText={(text) => {
                onChange({ ...data, mailingAddress: { ...data.mailingAddress, stateCode: text } });
              }}
              onBlur={() => setTouched({ ...touched, mailingAddress: { ...touched?.mailingAddress, stateCode: true } })}
            />

            <Input
              label="Country"
              value={data.mailingAddress.countryCode}
              onChangeText={(text) => {
                onChange({ ...data, mailingAddress: { ...data.mailingAddress, countryCode: text } });
              }}
              onBlur={() => setTouched({ ...touched, mailingAddress: { ...touched?.mailingAddress, countryCode: true } })}
            />
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  radioLabel: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
  },
});

export default AddressInfoScreen;
