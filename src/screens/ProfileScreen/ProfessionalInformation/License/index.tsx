import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Input } from '../../../../components/common/Input';
import Icon from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
// import { styles } from './styles';

interface LicenseFormValues {
  licenseName: string;
  licenseNumber: string;
  issuedBy: string;
  issuedDate: string;
  expiryDate: string;
  state: string;
  stateOpen: boolean;
}

const License = () => {
  const [showDatePicker, setShowDatePicker] = useState({
    issuedDate: false,
    expiryDate: false,
  });

  const [licenseDocument, setLicenseDocument] = useState(null);

  const handleLicenseUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx],
      });

      if (result && result[0]) {
        setLicenseDocument(result[0]);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.error('Error picking document:', err);
      }
    }
  };

  const initialValues: LicenseFormValues = {
    licenseName: '',
    licenseNumber: '',
    issuedBy: '',
    issuedDate: '',
    expiryDate: '',
    state: '',
    stateOpen: false,
  };

  const validationSchema = Yup.object().shape({
    licenseName: Yup.string().required('License name is required'),
    licenseNumber: Yup.string().required('License number is required'),
    issuedBy: Yup.string().required('Issued by is required'),
    issuedDate: Yup.date().required('Issued date is required'),
    expiryDate: Yup.date().required('Expiry date is required'),
    state: Yup.string().required('State is required'),
  });

  const handleSave = (values: LicenseFormValues) => {
    console.log('License details:', values);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
          }) => (
            <View style={styles.container}>
              <Input
                label="License Name"
                required
                value={values.licenseName}
                onChangeText={handleChange('licenseName')}
                onBlur={handleBlur('licenseName')}
                error={errors.licenseName}
                touched={touched.licenseName}
                placeholder="Enter license name"
              />

              <Input
                label="License Number"
                required
                value={values.licenseNumber}
                onChangeText={handleChange('licenseNumber')}
                onBlur={handleBlur('licenseNumber')}
                error={errors.licenseNumber}
                touched={touched.licenseNumber}
                placeholder="Enter license number"
              />

              <Input
                label="Issued By"
                required
                value={values.issuedBy}
                onChangeText={handleChange('issuedBy')}
                onBlur={handleBlur('issuedBy')}
                error={errors.issuedBy}
                touched={touched.issuedBy}
                placeholder="Enter issued by"
              />

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Issued Date <Text style={{ color: 'red' }}>*</Text>
                </Text>
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setShowDatePicker({ ...showDatePicker, issuedDate: true })}
                >
                  <Text style={styles.input}>
                    {values.issuedDate ? values.issuedDate.toString() : 'Select issued date'}
                  </Text>
                  <Icon name="calendar-outline" size={20} color="#ccc" />
                </TouchableOpacity>
                {showDatePicker.issuedDate && (
                  <DateTimePicker
                    value={values.issuedDate ? new Date(values.issuedDate) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker({ ...showDatePicker, issuedDate: false });
                      setFieldValue('issuedDate', selectedDate);
                    }}
                  />
                )}
                {touched.issuedDate && errors.issuedDate && (
                  <Text style={styles.error}>{errors.issuedDate}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Expiry Date <Text style={{ color: 'red' }}>*</Text>
                </Text>
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setShowDatePicker({ ...showDatePicker, expiryDate: true })}
                >
                  <Text style={styles.input}>
                    {values.expiryDate ? values.expiryDate.toString() : 'Select expiry date'}
                  </Text>
                  <Icon name="calendar-outline" size={20} color="#ccc" />
                </TouchableOpacity>
                {showDatePicker.expiryDate && (
                  <DateTimePicker
                    value={values.expiryDate ? new Date(values.expiryDate) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker({ ...showDatePicker, expiryDate: false });
                      setFieldValue('expiryDate', selectedDate);
                    }}
                  />
                )}
                {touched.expiryDate && errors.expiryDate && (
                  <Text style={styles.error}>{errors.expiryDate}</Text>
                )}
              </View>

              <Text style={styles.label}>State</Text>
              <DropDownPicker
                open={values.stateOpen}
                setOpen={(open) => setFieldValue('stateOpen', open)}
                items={[
                  { label: 'California', value: 'california' },
                  { label: 'Texas', value: 'texas' },
                  { label: 'New York', value: 'new-york' },
                ]}
                value={values.state}
                setValue={(callback) => setFieldValue('state', callback(values.state))}
                placeholder="Search state"
                searchable={true}
                searchPlaceholder="Search state"
                listMode="MODAL"
                modalProps={{ animationType: 'slide' }}
                style={styles.dropdown}
              />
              {touched.state && errors.state && (
                <Text style={styles.error}>{errors.state}</Text>
              )}

              <View style={styles.uploadGroup}>
                <TouchableOpacity onPress={handleLicenseUpload} style={styles.uploadBtn}>
                  <Text style={styles.uploadBtnText}>Upload License Document</Text>
                </TouchableOpacity>
                {licenseDocument && <Text style={styles.fileName}>{licenseDocument.name}</Text>}
                <Text style={styles.note}>Accepted file formats: PDF, DOC, DOCX</Text>
                <Text style={styles.note}>Max file size: 10 MB</Text>
              </View>

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
      inputGroup: {
        marginBottom: 10,
        marginTop: 10,
      },
      label: {
        marginBottom: 5,
      },
      input: {
        backgroundColor: '#fff',
      },
      datePickerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#fff',
      },
      saveButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
      },
      saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
      },
      dropdown: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderRadius: 8,
        marginTop: 4,
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
      error: {
        color: 'red',
        fontSize: 14,
        marginTop: 4,
      },
      safeArea: {
        flex: 1,
        backgroundColor: '#fff',
      },
      uploadGroup: {
        alignItems: 'center',
      },
      uploadBtn: {
        borderWidth: 1,
        borderColor: '#007bff',
        paddingVertical: 5,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,
        width:'70%',
      },
      uploadBtnText: {
        color: '#007bff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      fileName: {
        marginTop: 10,
        fontSize: 16,
      },
      note: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
      },
})
export default License;
