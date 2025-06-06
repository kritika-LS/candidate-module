import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as DocumentPicker from '@react-native-documents/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import UploadFileModal from '../../../../components/features/UploadFileModal';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';
import { professionsList, specialtiesMap } from '../../../../constants';

const ProfessionalDetailsScreen: React.FC<{ initialValues: any; updateValues: (updatedValues: any) => void }> = ({ initialValues, updateValues }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [professionOpen, setProfessionOpen] = useState(false);
  const [specialtyOpen, setSpecialtyOpen] = useState(false);
  const [specialtyItems, setSpecialtyItems] = useState([]);

  useEffect(() => {
    if (initialValues?.professionValue && specialtiesMap[initialValues?.professionValue]) {
      const mappedSpecialties = specialtiesMap[initialValues.professionValue].map((item) => ({
        label: item,
        value: item,
      }));
      setSpecialtyItems(mappedSpecialties);
    } else {
      setSpecialtyItems([]);
    }
  }, [initialValues?.professionValue]);

  const validateExperience = (exp: string) => {
    const num = parseFloat(exp);
    return !isNaN(num) && num >= 0 && num <= 100;
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ProfileScreenHeader
        headerIcon='book-edit-outline'
        headerTitle='Professional Details'
        completedStatus={false}
      />

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.uploadBtn}>
        <Text style={styles.uploadBtnText}>Upload Resume</Text>
      </TouchableOpacity>
      {initialValues.resume.length > 0 && <Text style={styles.fileName}>{initialValues.resume[0]?.name || 'Uploaded Resume'}</Text>}
      <Text style={styles.note}>Accepted file formats: PDF, DOC, DOCX</Text>
      <Text style={styles.note}>Max file size: 10 MB</Text>

      <Text style={styles.label}>Total Experience *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter experience"
        keyboardType="decimal-pad"
        value={initialValues.totalExperience.toString()}
        onChangeText={(text) => {
          if (text === '' || validateExperience(text)) updateValues({ ...initialValues, totalExperience: parseFloat(text) });
        }}
      />

      <Text style={styles.label}>Profession *</Text>
      <DropDownPicker
        open={professionOpen}
        setOpen={setProfessionOpen}
        items={professionsList.map(item => ({
          label: item,
          value: item
        }))}
        value={initialValues.professionValue}
        setValue={(callback) => updateValues({ ...initialValues, professionValue: callback(initialValues.professionValue) })}
        placeholder="Search profession"
        searchable={true}
        searchPlaceholder="Search..."
        listMode="MODAL"
        modalProps={{ animationType: 'slide' }}
        style={styles.dropdown}
      />

      <Text style={styles.label}>Primary Specialty *</Text>
      <DropDownPicker
        open={specialtyOpen}
        setOpen={setSpecialtyOpen}
        items={specialtyItems}
        value={initialValues.primarySpecialtyValue}
        setValue={(callback) => updateValues({ ...initialValues, primarySpecialtyValue: callback(initialValues.primarySpecialtyValue) })}
        placeholder="Search primary specialty"
        searchable={true}
        searchPlaceholder="Search..."
        listMode="MODAL"
        modalProps={{ animationType: 'slide' }}
        disabled={!initialValues.professionValue}
        style={styles.dropdown}
      />

      <Text style={styles.label}>Professional Summary</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Enter professional summary"
        multiline
        maxLength={1024}
        value={initialValues.summary}
        onChangeText={(text) => updateValues({ ...initialValues, summary: text })}
      />

      <UploadFileModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onUpload={() => {
          console.log('Upload clicked');
          setModalVisible(false);
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
});
