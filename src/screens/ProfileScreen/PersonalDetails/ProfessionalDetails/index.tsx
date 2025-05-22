import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as DocumentPicker from '@react-native-documents/picker';
// import DropDownPicker from 'react-native-dropdown-picker';
import UploadFileModal from '../../../../components/features/UploadFileModal';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';

// Dummy data – Replace with data from Profession & Speciality Taxonomy.xlsx
const professionOptions = [
  { label: 'Nurse', value: 'nurse' },
  { label: 'Physician', value: 'physician' },
  { label: 'Therapist', value: 'therapist' },
];

const specialtyOptionsMap: Record<string, { label: string; value: string }[]> = {
  nurse: [
    { label: 'ICU', value: 'icu' },
    { label: 'Pediatrics', value: 'pediatrics' },
  ],
  physician: [
    { label: 'Cardiology', value: 'cardiology' },
    { label: 'Neurology', value: 'neurology' },
  ],
  therapist: [
    { label: 'Physical', value: 'physical' },
    { label: 'Occupational', value: 'occupational' },
  ],
};

const ProfessionalDetailsScreen: React.FC = () => {
  const [resume, setResume] = useState<DocumentPicker.DocumentPickerResponse | null>(null);
  const [experience, setExperience] = useState('');
  const [profession, setProfession] = useState<string | null>(null);
  const [specialty, setSpecialty] = useState<string | null>(null);
  const [summary, setSummary] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Dropdown states
  const [professionOpen, setProfessionOpen] = useState(false);
  const [specialtyOpen, setSpecialtyOpen] = useState(false);
  const [professionItems, setProfessionItems] = useState(professionOptions);
  const [specialtyItems, setSpecialtyItems] = useState([]);

  useEffect(() => {
    if (profession) {
      setSpecialtyItems(specialtyOptionsMap[profession] || []);
      setSpecialty(null);
    } else {
      setSpecialtyItems([]);
    }
  }, [profession]);

  const handleResumeUpload = async () => {
    try {
      setModalVisible(true);
      // const res = await DocumentPicker.pick({
      //   type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx],
      // });

      // if (res && res.size && res.name) {
      //   const fileSizeInMB = res.size / (1024 * 1024);
      //   if (fileSizeInMB > 10) {
      //     Alert.alert('File too large', 'Maximum file size is 10 MB.');
      //     return;
      //   }

      //   setResume(res);
      // }
    } catch (err) {
      // if (!DocumentPicker.isCancel(err)) {
      //   Alert.alert('Error', 'Unknown error occurred while picking the document.');
      // }
    }
  };

  const validateExperience = (value: string) => {
    const regex = /^\d{0,2}(\.\d{0,2})?$/;
    return regex.test(value);
  };

  const handleSave = () => {
    if (!resume) return Alert.alert('Missing', 'Please upload your resume.');
    if (!experience || !validateExperience(experience)) {
      return Alert.alert('Invalid', 'Enter a valid experience (e.g., 5.5)');
    }
    if (!profession) return Alert.alert('Missing', 'Please select a profession.');
    if (!specialty) return Alert.alert('Missing', 'Please select a primary specialty.');
    if (summary.length > 1024) return Alert.alert('Too Long', 'Professional summary must be under 1024 characters.');

    Alert.alert('Success', 'Professional details saved successfully!');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProfileScreenHeader
          headerIcon='book-edit-outline'
          headerTitle='Professional Details'
          completedStatus={false}
        />

        <TouchableOpacity onPress={handleResumeUpload} style={styles.uploadBtn}>
          <Text style={styles.uploadBtnText}>Upload Resume</Text>
        </TouchableOpacity>
        {resume && <Text style={styles.fileName}>{resume.name}</Text>}
        <Text style={styles.note}>Accepted file formats: PDF, DOC, DOCX</Text>
        <Text style={styles.note}>Max file size: 10 MB</Text>

        <Text style={styles.label}>Total Experience *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter experience"
          keyboardType="decimal-pad"
          value={experience}
          onChangeText={(text) => {
            if (text === '' || validateExperience(text)) setExperience(text);
          }}
        />

        <Text style={styles.label}>Profession *</Text>
        {/* <DropDownPicker
          open={professionOpen}
          setOpen={setProfessionOpen}
          items={professionItems}
          value={profession}
          setValue={setProfession}
          placeholder="Search profession"
          searchable={true}
          searchPlaceholder="Search..."
          listMode="MODAL"
          modalProps={{ animationType: 'slide' }}
          onChangeSearchText={(text) => {
            if (!professionItems.find(p => p.label.toLowerCase().includes(text.toLowerCase()))) {
              Alert.alert('Info', 'Please choose from the list');
            }
          }}
          style={styles.dropdown}
        /> */}

        <Text style={styles.label}>Primary Specialty *</Text>
        {/* <DropDownPicker
          open={specialtyOpen}
          setOpen={setSpecialtyOpen}
          items={specialtyItems}
          value={specialty}
          setValue={setSpecialty}
          placeholder="Search primary speciality"
          searchable={true}
          searchPlaceholder="Search..."
          listMode="MODAL"
          modalProps={{ animationType: 'slide' }}
          disabled={!profession}
          onChangeSearchText={(text) => {
            if (!specialtyItems.find(p => p.label.toLowerCase().includes(text.toLowerCase()))) {
              Alert.alert('Info', 'Please choose from the list');
            }
          }}
          style={styles.dropdown}
        /> */}

        <Text style={styles.label}>Professional Summary</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Enter professional summary"
          multiline
          maxLength={1024}
          value={summary}
          onChangeText={setSummary}
        />

        <UploadFileModal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            onUpload={() => {
                console.log('Upload clicked');
                setModalVisible(false);
            }}
            uploadProgress={90} // Example progress value
            uploading={false} // Set to true if uploading
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfessionalDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    paddingBottom: 40,
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
});
