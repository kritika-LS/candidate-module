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
// import DropDownPicker from 'react-native-dropdown-picker';
import { Input } from '../../../../components/common/Input';
import Icon from 'react-native-vector-icons/Ionicons';
// import DocumentPicker from 'react-native-document-picker';
import { SaveButton } from '../../../../components/features/SaveButton';
import styles from './styles';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';
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
    // try {
    //   const result = await DocumentPicker.pick({
    //     type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx],
    //   });

    //   if (result && result[0]) {
    //     setLicenseDocument(result[0]);
    //   }
    // } catch (err) {
    //   if (DocumentPicker.isCancel(err)) {
    //     console.log('User canceled the picker');
    //   } else {
    //     console.error('Error picking document:', err);
    //   }
    // }
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
        <View style={styles.body}>
          <ProfileScreenHeader
            headerIcon='card-account-details-outline'
            headerTitle='License'
            completedStatus={false}
          />
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
                {/* <DropDownPicker
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
                /> */}
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
        </View>
      </ScrollView>
      <View style={styles.saveButton}>
        <SaveButton
          title="Save"
          onPress={handleSave}
        />
      </View>
    </SafeAreaView>
  );
};

export default License;
