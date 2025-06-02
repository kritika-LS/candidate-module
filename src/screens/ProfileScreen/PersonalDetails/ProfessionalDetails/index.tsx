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
import DropDownPicker from 'react-native-dropdown-picker';
import UploadFileModal from '../../../../components/features/UploadFileModal';
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { updateCandidateProfessionalInfo } from '../../../../store/thunk/candidateProfessionalInfo.thunk';
import Toast from 'react-native-toast-message';

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
  const dispatch = useAppDispatch();
  const [resume, setResume] = useState<File | null>(null);
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

  const handleResumeUpload = () => {
    setModalVisible(true);
  };

  const validateExperience = (exp: string) => {
    const num = parseFloat(exp);
    return !isNaN(num) && num >= 0 && num <= 100;
  };

  const handleSave = async () => {
    if (!resume) {
      Toast.show({
        type: 'error',
        text1: 'Please upload your resume',
      });
      return;
    }
    if (!experience || !validateExperience(experience)) {
      Toast.show({
        type: 'error',
        text1: 'Enter a valid experience (e.g., 5.5)',
      });
      return;
    }
    if (!profession) {
      Toast.show({
        type: 'error',
        text1: 'Please select a profession',
      });
      return;
    }
    if (!specialty) {
      Toast.show({
        type: 'error',
        text1: 'Please select a primary specialty',
      });
      return;
    }
    if (summary.length > 1024) {
      Toast.show({
        type: 'error',
        text1: 'Professional summary must be under 1024 characters',
      });
      return;
    }

    try {
      const payload = {
        resume,
        overallYearsOfExperience: parseFloat(experience),
        profession,
        specialty,
        professionalSummary: summary,
      };

      await dispatch(updateCandidateProfessionalInfo(payload)).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Professional details saved successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to save professional details',
      });
    }
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
        <DropDownPicker
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
        />

        <Text style={styles.label}>Primary Specialty *</Text>
        <DropDownPicker
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
            if (!specialtyItems.find((p:any) => p.label.toLowerCase().includes(text.toLowerCase()))) {
              Alert.alert('Info', 'Please choose from the list');
            }
          }}
          style={styles.dropdown}
        />

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
