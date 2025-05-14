import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface AddressSectionProps {
  formData: any;
  errors: any;
  onAddressTypeChange: (type: string) => void;
  onAddressChange: (field: string, value: string) => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({ 
  formData, 
  errors, 
  onAddressTypeChange, 
  onAddressChange 
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>Address</Text>
      
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

      {formData.addressType !== 'both' && (
        <>
          <TextInput
            style={[styles.input, errors.address ? styles.errorInput : null]}
            value={formData.address}
            onChangeText={(text) => onAddressChange('address', text)}
            maxLength={128}
            placeholder="Enter address"
          />
          {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}

          <TextInput
            style={[styles.input, errors.zipcode ? styles.errorInput : null]}
            value={formData.zipcode}
            onChangeText={(text) => onAddressChange('zipcode', text)}
            maxLength={8}
            placeholder="Zipcode"
            keyboardType="numeric"
          />
          {errors.zipcode ? <Text style={styles.errorText}>{errors.zipcode}</Text> : null}

          <TextInput
            style={[styles.input, errors.city ? styles.errorInput : null]}
            value={formData.city}
            onChangeText={(text) => onAddressChange('city', text)}
            maxLength={128}
            placeholder="City"
          />
          {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}

          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={formData.state}
            editable={false}
            placeholder="State"
          />

          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={formData.country}
            editable={false}
            placeholder="Country"
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  radioGroup: {
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    color: '#666',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -10,
    marginBottom: 15,
  },
});

export default AddressSection;