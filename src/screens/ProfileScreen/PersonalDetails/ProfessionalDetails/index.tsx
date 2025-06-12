import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import UploadFileModal from '../../../../components/features/UploadFileModal';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';
import { workHistory, workHistoryProfessions } from '../../../../constants/workHistoryProfessions';
import { workHistorySpeciality } from '../../../../constants/workHistorySpecilaity';
import { theme } from '../../../../theme';

const ProfessionalDetailsScreen: React.FC<{ 
  initialValues: any; 
  updateValues: (updatedValues: any) => void;
  errors: any;
  touched: any;
  updateErrors: (updatedErrors: any) => void;
  updateTouched: (updatedTouched: any) => void;
 }> = ({ initialValues, updateValues, errors, touched, updateErrors, updateTouched  }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [professionOpen, setProfessionOpen] = useState(false);
  const [specialtyOpen, setSpecialtyOpen] = useState(false);
  const [specialtyItems, setSpecialtyItems] = useState([]);
  const [isCompleted, setIsCompleted] = React.useState(false);
  
  const validateField = (fieldName: string, value: any) => {
    let error = '';
    switch (fieldName) {
      case 'totalExperience':
        if (!value) error = 'Total Experience is required';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (fieldName: string, value: any) => {
    const updatedValues = { ...initialValues, [fieldName]: value };
    updateValues(updatedValues);
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      updateErrors({ [fieldName]: error });
    }
  };

  const handleBlur = (fieldName: string) => {
    updateTouched({ [fieldName]: true });
    const error = validateField(fieldName, initialValues[fieldName]);
    updateErrors({ [fieldName]: error });
  };

  useEffect(() => {
    if (initialValues?.professionValue) {
        const keyValue = workHistory.find(item => item.label === initialValues.professionValue);
        const filtered = workHistorySpeciality.filter(item => item.key === keyValue?.value);
        setSpecialtyItems(filtered.map(({ label, value }) => ({ label, value:label })));
      } else {
        setSpecialtyItems([]);
      }
  }, [initialValues?.professionValue]);

  const validateExperience = (exp: string) => {
    const num = parseFloat(exp);
    return !isNaN(num) && num >= 0 && num <= 100;
  };

  useEffect(() => {
    const errorsToUpdate: any = {};
    const touchedToUpdate: any = {};

    if (!initialValues.totalExperience) {
      errorsToUpdate.totalExperience = 'Total Experience is required';
      touchedToUpdate.totalExperience = true;
    } else if (!validateExperience(initialValues.totalExperience)) {
      errorsToUpdate.totalExperience = 'Total Experience must be a number between 0 and 100';
      touchedToUpdate.totalExperience = true;
    }
    updateErrors(errorsToUpdate);
    updateTouched(touchedToUpdate);
    const allFieldsCompleted = Object.keys(initialValues).every(
      (key) => initialValues?.[key] && !errors?.[key]
    );
    setIsCompleted(allFieldsCompleted);
  }, [initialValues]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ProfileScreenHeader
        headerIcon='book-edit-outline'
        headerTitle='Professional Details'
        completedStatus={isCompleted}
      />

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.uploadBtn}>
        <Text style={styles.uploadBtnText}>Upload Resume</Text>
      </TouchableOpacity>
      {initialValues?.resume?.localUri && <Text style={styles.fileName}>{initialValues.resume?.localUri || 'Uploaded Resume'}</Text>}
      <Text style={styles.note}>Accepted file formats: PDF, DOC, DOCX</Text>
      <Text style={styles.note}>Max file size: 10 MB</Text>

      <Text style={styles.label}>Total Experience <Text style={styles.asterisk}>*</Text></Text>
      <TextInput
        style={styles.input}
        placeholder="Enter experience"
        keyboardType="decimal-pad"
        value={initialValues.totalExperience}
        onChangeText={(text) => {
          if (text === '' || validateExperience(text)) handleChange('totalExperience', parseFloat(text));
        }}
        onBlur={() => handleBlur('totalExperience')}
      />
        {touched?.totalExperience && errors?.totalExperience && (
          <Text style={styles.errorText}>{errors.totalExperience}</Text>
        )}
      <Text style={styles.label}>Profession <Text style={styles.asterisk}>*</Text></Text>
      <DropDownPicker
        open={professionOpen}
        setOpen={(open) => setProfessionOpen(open)}
        items={workHistoryProfessions}
        value={initialValues.professionValue}
        setValue={(callback) => updateValues({ ...initialValues, professionValue: callback(initialValues.professionValue) })}
        placeholder="Search profession"
        searchable={false}
        searchPlaceholder="Search..."
        listMode="SCROLLVIEW"
        style={[styles.dropdown, { zIndex: initialValues.professionValue ? 10 : 1 }]}
        dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
      />

      <Text style={styles.label}>Primary Specialty <Text style={styles.asterisk}>*</Text></Text>
      <DropDownPicker
        open={specialtyOpen}
        setOpen={setSpecialtyOpen}
        items={specialtyItems}
        value={initialValues.primarySpecialtyValue}
        setValue={(callback) => updateValues({ ...initialValues, primarySpecialtyValue: callback(initialValues.primarySpecialtyValue) })}
        placeholder="Search primary specialty"
        searchable={false}
        searchPlaceholder="Search..."
        listMode="SCROLLVIEW"
        disabled={!initialValues.professionValue}
        style={[styles.dropdown, { zIndex: initialValues.primarySpecialtyValue ? 10 : 1 }]}
        dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
      />

      <Text style={styles.label}>Professional Summary</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Enter professional summary"
        multiline
        maxLength={1024}
        value={initialValues.summary}
        onChangeText={(text) => handleChange('summary', text)}
        onBlur={() => handleBlur('summary')}
      />
       {touched?.summary && errors?.summary && (
          <Text style={styles.errorText}>{errors.summary}</Text>
        )}
      <UploadFileModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onUpload={(val) => {
          setModalVisible(false);
          updateValues({ ...initialValues, resume: val });
          updateErrors({ resume: '' });
        }}
        uploadProgress={90}
        uploading={false}
      />
    </KeyboardAvoidingView>
  );
};

export default ProfessionalDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  scrollContent: {
    flex: 1,
    marginVertical: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  uploadBtn: {
    backgroundColor: '#E1E9FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 4,
  },
  uploadBtnText: {
    color: '#0A47E9',
    fontWeight: '500',
  },
  fileName: {
    marginTop: 6,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#333',
  },
  note: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  label: {
    marginTop: 16,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 4,
  },
  dropdownContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  asterisk: {
      color: theme.colors.status.error,
    },
});
