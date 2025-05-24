import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { theme } from '../../../theme';
import { Input } from '../../../components/common/Input';
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Yup from 'yup';
import { TextStyle } from '../../../components/common/Text';
// import DocumentPicker from 'react-native-document-picker';

interface EducationFormValues {
  levelOfEducation: string;
  modeOfEducation: string;
  degreeName: string;
  universityName: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
  specialisation: string;
  grade: string;
  certifiedDate: string;
  graduationStatus: string;
  verificationStatus: string;
  city: string;
  state: string;
  country: string;
  document: any;
  levelOfEducationOpen: boolean;
  modeOfEducationOpen: boolean;
  graduationStatusOpen: boolean;
  verificationStatusOpen: boolean;
}

export const AddEducationForm = () => {
  const [showDatePicker, setShowDatePicker] = useState({
    startDate: false,
    endDate: false,
    certifiedDate: false,
  });
  const [document, setDocument] = useState<any>(null);

  const initialValues: EducationFormValues = {
    levelOfEducation: '',
    modeOfEducation: '',
    degreeName: '',
    universityName: '',
    startDate: '',
    endDate: '',
    currentlyStudying: false,
    specialisation: '',
    grade: '',
    certifiedDate: '',
    graduationStatus: '',
    verificationStatus: '',
    city: '',
    state: '',
    country: '',
    document: null,
    levelOfEducationOpen: false,
    modeOfEducationOpen: false,
    graduationStatusOpen: false,
    verificationStatusOpen: false,
  };

  const validationSchema = Yup.object().shape({
    levelOfEducation: Yup.string().required('Level of Education is required'),
    modeOfEducation: Yup.string().required('Mode of Education is required'),
    degreeName: Yup.string()
      .max(128, 'Degree name must be less than 128 characters')
      .required('Name of Degree is required'),
    universityName: Yup.string()
      .max(128, 'University name must be less than 128 characters')
      .required('University Name is required'),
    startDate: Yup.date()
      .max(new Date(), 'Start date cannot be in the future')
      .required('Start Date is required'),
    endDate: Yup.date()
      .when('currentlyStudying', (currentlyStudying, schema) =>
        currentlyStudying
          ? schema.notRequired()
          : schema
              .min(Yup.ref('startDate'), 'End date cannot be before start date')
              .required('End Date is required')
      ),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    specialisation: Yup.string().max(32, 'Specialisation must be less than 32 characters'),
    grade: Yup.string().max(32, 'Grade must be less than 32 characters'),
  });

  const handleDocumentUpload = async () => {
    // try {
    //   const res = await DocumentPicker.pick({
    //     type: [DocumentPicker.types.images, DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx],
    //   });
    //   setDocument(res[0]);
    // } catch (err) {
    //   if (DocumentPicker.isCancel(err)) {
    //     // User cancelled the picker
    //   } else {
    //     Alert.alert('Error', 'Failed to pick document');
    //   }
    // }
  };

  const handleRemoveDocument = () => {
    setDocument(null);
  };

  const handleSave = async (values: EducationFormValues) => {
    console.log('Saving education details:', values);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Toast.show({
        type: 'success',
        text1: 'Education saved successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to save education',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
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
            isSubmitting,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.formSection}>
                
                {/* Level of Education */}
                <Text style={styles.label}>Level of Education *</Text>
                <DropDownPicker
                  open={values.levelOfEducationOpen}
                  setOpen={(open) => setFieldValue('levelOfEducationOpen', open)}
                  items={[
                    { label: 'S-School', value: 'school' },
                    { label: 'D-Diploma', value: 'diploma' },
                    { label: 'B-Bachelors', value: 'bachelors' },
                    { label: 'M-Masters', value: 'masters' },
                    { label: 'P-Doctorate', value: 'doctorate' },
                  ]}
                  value={values.levelOfEducation}
                  setValue={(callback) => setFieldValue('levelOfEducation', callback(values.levelOfEducation))}
                  placeholder="Select level of education"
                  searchable={false}
                  listMode="SCROLLVIEW"
                  style={[styles.dropdown, { zIndex: values.levelOfEducationOpen ? 10 : 1 }]}
                  dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
                />
                {touched.levelOfEducation && errors.levelOfEducation && (
                  <Text style={styles.error}>{errors.levelOfEducation}</Text>
                )}

                {/* Mode of Education */}
                <Text style={styles.label}>Mode of Education *</Text>
                <DropDownPicker
                  open={values.modeOfEducationOpen}
                  setOpen={(open) => setFieldValue('modeOfEducationOpen', open)}
                  items={[
                    { label: 'F-Full Time', value: 'full_time' },
                    { label: 'P-Part Time', value: 'part_time' },
                    { label: 'D-Distant Education', value: 'distant' },
                  ]}
                  value={values.modeOfEducation}
                  setValue={(callback) => setFieldValue('modeOfEducation', callback(values.modeOfEducation))}
                  placeholder="Select mode of education"
                  searchable={false}
                  listMode="SCROLLVIEW"
                  style={[styles.dropdown, { zIndex: values.modeOfEducationOpen ? 10 : 1 }]}
                  dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
                />
                {touched.modeOfEducation && errors.modeOfEducation && (
                  <Text style={styles.error}>{errors.modeOfEducation}</Text>
                )}

                {/* Name of Degree */}
                <Input
                  label="Name of Degree *"
                  value={values.degreeName}
                  onChangeText={handleChange('degreeName')}
                  onBlur={handleBlur('degreeName')}
                  placeholder="Enter name of degree"
                  maxLength={128}
                  error={errors.degreeName}
                  touched={touched.degreeName}
                />

                {/* University Name */}
                <Input
                  label="University Name *"
                  value={values.universityName}
                  onChangeText={handleChange('universityName')}
                  onBlur={handleBlur('universityName')}
                  placeholder="Enter university name"
                  maxLength={128}
                  error={errors.universityName}
                  touched={touched.universityName}
                />

                {/* Start Date */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Start Date *</Text>
                  <TouchableOpacity
                    style={styles.datePickerButton}
                    onPress={() => setShowDatePicker({ ...showDatePicker, startDate: true })}
                  >
                    <Text style={styles.input}>
                      {values.startDate || 'Select start date'}
                    </Text>
                  </TouchableOpacity>
                  {showDatePicker.startDate && (
                    <DateTimePicker
                      value={values.startDate ? new Date(values.startDate) : new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setShowDatePicker({ ...showDatePicker, startDate: false });
                        if (selectedDate) {
                          setFieldValue('startDate', selectedDate.toISOString());
                        }
                      }}
                    />
                  )}
                  {touched.startDate && errors.startDate && (
                    <Text style={styles.error}>{errors.startDate}</Text>
                  )}
                </View>

                {/* Currently Studying Checkbox */}
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity
                    style={styles.squareCheckbox}
                    onPress={() => setFieldValue('currentlyStudying', !values.currentlyStudying)}
                  >
                    {values.currentlyStudying && <View style={styles.checkboxSelected} />}
                  </TouchableOpacity>
                  <Text style={styles.checkboxLabel}>I am currently studying here</Text>
                </View>

                {/* End Date */}
                {!values.currentlyStudying && (
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>End Date *</Text>
                    <TouchableOpacity
                      style={styles.datePickerButton}
                      onPress={() => setShowDatePicker({ ...showDatePicker, endDate: true })}
                    >
                      <Text style={styles.input}>
                        {values.endDate || 'Select end date'}
                      </Text>
                    </TouchableOpacity>
                    {showDatePicker.endDate && (
                      <DateTimePicker
                        value={values.endDate ? new Date(values.endDate) : new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                          setShowDatePicker({ ...showDatePicker, endDate: false });
                          if (selectedDate) {
                            setFieldValue('endDate', selectedDate.toISOString());
                          }
                        }}
                      />
                    )}
                    {touched.endDate && errors.endDate && (
                      <Text style={styles.error}>{errors.endDate}</Text>
                    )}
                  </View>
                )}

                {/* Specialisation */}
                <Input
                  label="Specialisation"
                  value={values.specialisation}
                  onChangeText={handleChange('specialisation')}
                  onBlur={handleBlur('specialisation')}
                  placeholder="Enter specialisation"
                  maxLength={32}
                  error={errors.specialisation}
                  touched={touched.specialisation}
                />

                {/* Grade */}
                <Input
                  label="Grade"
                  value={values.grade}
                  onChangeText={handleChange('grade')}
                  onBlur={handleBlur('grade')}
                  placeholder="Enter grade"
                  maxLength={32}
                  error={errors.grade}
                  touched={touched.grade}
                />

                {/* Certified Date */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Certified Date</Text>
                  <TouchableOpacity
                    style={styles.datePickerButton}
                    onPress={() => setShowDatePicker({ ...showDatePicker, certifiedDate: true })}
                  >
                    <Text style={styles.input}>
                      {values.certifiedDate || 'Select certified date'}
                    </Text>
                  </TouchableOpacity>
                  {showDatePicker.certifiedDate && (
                    <DateTimePicker
                      value={values.certifiedDate ? new Date(values.certifiedDate) : new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setShowDatePicker({ ...showDatePicker, certifiedDate: false });
                        if (selectedDate) {
                          setFieldValue('certifiedDate', selectedDate.toISOString());
                        }
                      }}
                    />
                  )}
                </View>

                {/* Graduation Status */}
                <Text style={styles.label}>Graduation Status</Text>
                {/* <DropDownPicker
                  open={values.graduationStatusOpen}
                  setOpen={(open) => setFieldValue('graduationStatusOpen', open)}
                  items={[
                    { label: 'Yes', value: 'yes' },
                    { label: 'No', value: 'no' },
                  ]}
                  value={values.graduationStatus}
                  setValue={(callback) => setFieldValue('graduationStatus', callback(values.graduationStatus))}
                  placeholder="Select graduation status"
                  style={styles.dropdown}
                /> */}

                {/* Verification Status */}
                <Text style={styles.label}>Verification Status</Text>
                {/* <DropDownPicker
                  open={values.verificationStatusOpen}
                  setOpen={(open) => setFieldValue('verificationStatusOpen', open)}
                  items={[
                    { label: 'P-Pending', value: 'pending' },
                    { label: 'S-Successfully Verified', value: 'success' },
                    { label: 'F-Failed Verification', value: 'failed' },
                    { label: 'U-Unverifiable', value: 'unverifiable' },
                  ]}
                  value={values.verificationStatus}
                  setValue={(callback) => setFieldValue('verificationStatus', callback(values.verificationStatus))}
                  placeholder="Select verification status"
                  style={styles.dropdown}
                /> */}

                {/* Location Fields */}
                <Input
                  label="City *"
                  value={values.city}
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  placeholder="Enter city"
                  error={errors.city}
                  touched={touched.city}
                />
                <Input
                  label="State *"
                  value={values.state}
                  onChangeText={handleChange('state')}
                  onBlur={handleBlur('state')}
                  placeholder="Enter state"
                  error={errors.state}
                  touched={touched.state}
                />
                <Input
                  label="Country *"
                  value={values.country}
                  onChangeText={handleChange('country')}
                  onBlur={handleBlur('country')}
                  placeholder="Enter country"
                  error={errors.country}
                  touched={touched.country}
                />

                {/* Document Upload */}
                <Text style={styles.sectionTitle}>Upload Document</Text>
                <Text style={styles.label}>Accepted File Formats: PNG, JPEG, JPG, DOC, DOCX, PDF up to 10 MB</Text>
                
                {document ? (
                  <View style={styles.documentContainer}>
                    <Text style={styles.documentName}>{document.name}</Text>
                    <TouchableOpacity onPress={handleRemoveDocument}>
                      <Text style={styles.removeDocument}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentUpload}>
                    <Text style={styles.uploadButtonText}>Choose File</Text>
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit as any}>
                <Text style={styles.saveBtnText}>{isSubmitting ? 'Saving...' : 'Save'}</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
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
    paddingHorizontal: theme.spacing.md,
  },
  formSection: {
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
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
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  squareCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
  },
  checkboxSelected: {
    backgroundColor: '#0A47E9',
  },
  checkboxLabel: {
    fontSize: 14,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginTop: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  uploadButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  uploadButtonText: {
    color: '#0A47E9',
    fontWeight: '500',
  },
  documentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  documentName: {
    flex: 1,
    marginRight: 8,
  },
  removeDocument: {
    color: 'red',
    fontWeight: '500',
  },
});