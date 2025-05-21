import React, { useState } from 'react';
import {
  View,
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
import DocumentPicker from 'react-native-document-picker';
import { theme } from '../../../../theme';
import { TextStyle } from '../../../../components/common/Text';
import Icon from '../../../../components/common/Icon/Icon';
import { SaveButton } from '../../../../components/features/SaveButton';
import { UploadButton } from '../../../../components/features/UploadButton';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';
// import { styles } from './styles';

interface CertificateFormValues {
  certificateName: string;
  certificationNumber: string;
  issuedBy: string;
  issuedDate: string;
  expiryDate: string;
  state: string;
  stateOpen: boolean;
}

const Certificate = () => {
  const [showDatePicker, setShowDatePicker] = useState({
    issuedDate: false,
    expiryDate: false,
  });

  const [certificate, setCertificate] = useState<{ name: string | null } | null>(null);

  const handleCertificateUpload = async () => {
    try {
      // Logic to pick a file (e.g., using react-native-document-picker or similar library)
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx],
      });

      if (result && result[0]) {
        setCertificate(result[0]);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.error('Error picking document:', err);
      }
    }
  };

  const handleDeleteUploadedFile = () => {
    setCertificate(null);
  };

  const initialValues: CertificateFormValues = {
    certificateName: '',
    certificationNumber: '',
    issuedBy: '',
    issuedDate: '',
    expiryDate: '',
    state: '',
    stateOpen: false,
  };

  const validationSchema = Yup.object().shape({
    certificateName: Yup.string().required('Certificate name is required'),
    certificationNumber: Yup.string().required('Certification number is required'),
    issuedBy: Yup.string().required('Issued by is required'),
    issuedDate: Yup.date().required('Issued date is required'),
    expiryDate: Yup.date().required('Expiry date is required'),
    state: Yup.string().required('State is required'),
  });

  const handleSave = (values: CertificateFormValues) => {
    console.log('Certificate details:', values);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.body}>
          <ProfileScreenHeader
            headerIcon='certificate-outline'
            headerTitle='Certificate'
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
                  label="Certificate Name"
                  required
                  value={values.certificateName}
                  onChangeText={handleChange('certificateName')}
                  onBlur={handleBlur('certificateName')}
                  error={errors.certificateName}
                  touched={touched.certificateName}
                  placeholder="Search certificate name"
                  />

                <Input
                  label="Certification Number"
                  required
                  value={values.certificationNumber}
                  onChangeText={handleChange('certificationNumber')}
                  onBlur={handleBlur('certificationNumber')}
                  error={errors.certificationNumber}
                  touched={touched.certificationNumber}
                  placeholder="Enter certification number"
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
                  <TextStyle style={styles.label}>
                    Issued Date <TextStyle style={{ color: 'red' }}>*</TextStyle>
                  </TextStyle>
                  <TouchableOpacity
                    style={styles.datePickerButton}
                    onPress={() => setShowDatePicker({ ...showDatePicker, issuedDate: true })}
                  >
                    <TextStyle style={styles.input}>
                      {values.issuedDate ? values.issuedDate.toString() : 'Select issued date'}
                    </TextStyle>
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
                    <TextStyle style={styles.error}>{errors.issuedDate}</TextStyle>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <TextStyle style={styles.label}>
                    Expiry Date <TextStyle style={{ color: 'red' }}>*</TextStyle>
                  </TextStyle>
                  <TouchableOpacity
                    style={styles.datePickerButton}
                    onPress={() => setShowDatePicker({ ...showDatePicker, expiryDate: true })}
                  >
                    <TextStyle style={styles.input}>
                      {values.expiryDate ? values.expiryDate.toString() : 'Select expiry date'}
                    </TextStyle>
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
                    <TextStyle style={styles.error}>{errors.expiryDate}</TextStyle>
                  )}
    
                </View>

                <TextStyle style={styles.label}>State</TextStyle>
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
                  <TextStyle style={styles.error}>{errors.state}</TextStyle>
                )}

                <UploadButton 
                  handleUpload={handleCertificateUpload} 
                  buttonTitle='Upload Certificate' 
                  subText='Accepted file formats: PNG, JPEG, JPG up to 10 MB'
                  fileName={certificate ? certificate?.name : ''}
                  handleDelete={handleDeleteUploadedFile}
                />
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
      margin: 16,
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      backgroundColor: '#fff',
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
        backgroundColor: '#fff', 
        paddingHorizontal: 16, 
        paddingBottom: 16
      },
      errorTextStyle: {
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
      saveBtnTextStyle: {
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
      },
      uploadGroup: {
        alignItems: 'center',
      },
      uploadBtn: {
        borderWidth: 1,
        borderColor: theme.colors.blue.light,
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 24,
        alignItems: 'center',
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
      },
      uploadBtnTextStyle: {
        marginLeft: 10,
      },
      fileName: {
        marginTop: 10,
        fontSize: 16,
      },
      note: {
        marginTop: 5,
      },
})
export default Certificate;
