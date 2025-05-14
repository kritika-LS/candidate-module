import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Input } from '../../../components/common/Input';
import { styles } from './styles';

interface Props {
  professionsList: string[];
  specialtiesMap: { [profession: string]: string[] };
  onSubmit: (data: { experience: string; profession: string; specialty: string }) => void;
}

const ProfessionalDetailsForm: React.FC<Props> = ({ professionsList, specialtiesMap, onSubmit }) => {
  const [experience, setExperience] = useState('');
  const [profession, setProfession] = useState('');
  const [specialty, setSpecialty] = useState('');

  const [filteredProfessions, setFilteredProfessions] = useState<string[]>([]);
  const [filteredSpecialties, setFilteredSpecialties] = useState<string[]>([]);

  const [errors, setErrors] = useState({
    experience: '',
    profession: '',
    specialty: '',
  });

  useEffect(() => {
    if (profession) {
      setFilteredSpecialties(specialtiesMap[profession] || []);
    } else {
      setFilteredSpecialties([]);
    }
  }, [profession]);

  const validateExperience = (value: string): string => {
    if (!value) return 'Years of experience is required.';
    const match = value.match(/^\d{1,2}(\.\d{1,2})?$/);
    if (!match || parseFloat(value) > 11) return 'Enter a valid experience (up to 2 digits before decimal, max 11 years).';
    return '';
  };

  const validateDropdown = (value: string, list: string[], field: string): string => {
    if (!value) return `${field} is required.`;
    if (!list.includes(value)) return 'Please choose from the list';
    return '';
  };

  const handleSubmit = () => {
    const experienceError = validateExperience(experience);
    const professionError = validateDropdown(profession, professionsList, 'Profession');
    const specialtyError = validateDropdown(specialty, specialtiesMap[profession] || [], 'Primary Specialty');

    setErrors({ experience: experienceError, profession: professionError, specialty: specialtyError });

    if (!experienceError && !professionError && !specialtyError) {
      onSubmit({ experience, profession, specialty });
    }
  };

  return (
    <View style={styles.container}>

			<Input
				label="Total Experience"
				required
				value={experience}
				onChangeText={setExperience}
				// onBlur={() => handleBlur('firstName')}
				error={errors.experience}
				// touched={touched.firstName}
				placeholder={'Enter Experience'}
			/>

			<Input
				label="Profession"
				required
				value={profession}
				onChangeText={(text) => {
          setProfession(text);
          setFilteredProfessions(
            professionsList.filter((p) => p.toLowerCase().includes(text.toLowerCase()))
          );
        }}
				// onBlur={() => handleBlur('firstName')}
				error={errors.profession}
				// touched={touched.firstName}
				placeholder="Search profession"
			/>

			<Input
				label="Primary Specialty"
				required
				value={profession}
				onChangeText={(text) => {
          setSpecialty(text);
          setFilteredSpecialties(
            (specialtiesMap[profession] || []).filter((s) => s.toLowerCase().includes(text.toLowerCase()))
          );
        }}
				// onBlur={() => handleBlur('firstName')}
				error={errors.specialty}
				// touched={touched.firstName}
				placeholder="Search primary specialty"
			/>

      <FlatList
        data={filteredProfessions}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setProfession(item)}>
            <Text style={styles.dropdownItem}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={filteredSpecialties}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSpecialty(item)}>
            <Text style={styles.dropdownItem}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProfessionalDetailsForm;
