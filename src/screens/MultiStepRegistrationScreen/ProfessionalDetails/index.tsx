import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Input } from '../../../components/common/Input';
import { styles } from './styles';

interface Props {
  data:any,
  professionsList: string[];
  specialtiesMap: { [profession: string]: string[] };
  onChange: (data: any) => void;
  errors:any
  // onSubmit: (data: { experience: string; profession: string; specialty: string }) => void;
}

const ProfessionalDetailsForm: React.FC<Props> = ({ data, professionsList, specialtiesMap, onChange, errors }) => {
  // const [experience, setExperience] = useState('');
  // const [profession, setProfession] = useState('');
  // const [specialty, setSpecialty] = useState('');

  const [filteredProfessions, setFilteredProfessions] = useState<string[]>([]);
  const [filteredSpecialties, setFilteredSpecialties] = useState<string[]>([]);
  const [showProfessionsDropdown, setShowProfessionsDropdown] = useState(false);
  const [showSpecialtiesDropdown, setShowSpecialtiesDropdown] = useState(false);

  // const [errors, setErrors] = useState({
  //   experience: '',
  //   profession: '',
  //   specialty: '',
  // });

  // useEffect(() => {
  //   if (data.profession) {
  //     setFilteredSpecialties(specialtiesMap[data.profession] || []);
  //   } else {
  //     setFilteredSpecialties([]);
  //   }
  // }, [data.profession]);

  // const validateExperience = (value: string): string => {
  //   if (!value) return 'Years of experience is required.';
  //   const match = value.match(/^\d{1,2}(\.\d{1,2})?$/);
  //   if (!match || parseFloat(value) > 11) return 'Enter a valid experience (up to 2 digits before decimal, max 11 years).';
  //   return '';
  // };

  // const validateDropdown = (value: string, list: string[], field: string): string => {
  //   if (!value) return `${field} is required.`;
  //   if (!list.includes(value)) return 'Please choose from the list';
  //   return '';
  // };

  // const handleSubmit = () => {
  //   const experienceError = validateExperience(experience);
  //   const professionError = validateDropdown(profession, professionsList, 'Profession');
  //   const specialtyError = validateDropdown(specialty, specialtiesMap[profession] || [], 'Primary Specialty');

  //   setErrors({ experience: experienceError, profession: professionError, specialty: specialtyError });

  //   if (!experienceError && !professionError && !specialtyError) {
  //     onSubmit({ experience, profession, specialty });
  //   }
  // };

  return (
    <View style={styles.container}>

			<Input
				label="Total Experience"
				required
				value={data?.experience || ""}
				onChangeText={(val) => onChange({ ...data, experience: val })}
				error={errors?.experience}
				touched={errors?.experience}
				placeholder={'Enter Experience'}
			/>

			<Input
				label="Profession"
				required
				value={data?.profession || ""}
				onChangeText={(text) => {
          onChange({ ...data, profession: text });
          const filtered = professionsList.filter((p) =>
            p.toLowerCase().includes(text.toLowerCase())
          );
          setFilteredProfessions(filtered);
          setShowProfessionsDropdown(filtered.length > 0);
        }}
        onFocus={() => {
          setFilteredProfessions(professionsList); // optional: show all on focus
          setShowProfessionsDropdown(true);
        }}
				error={errors?.profession}
				touched={errors?.profession}
				placeholder="Search profession"
			/>

			<Input
				label="Primary Specialty"
				required
				value={data?.specialty || ""}
				onChangeText={(text) => {
          onChange({ ...data, specialty: text })
          // setFilteredSpecialties(
          //   (specialtiesMap[data.specialty] || []).filter((s) => s.toLowerCase().includes(text.toLowerCase()))
          // );
          const filtered = (specialtiesMap[data.profession] || []).filter((s) =>
            s.toLowerCase().includes(text.toLowerCase())
          );
          setFilteredSpecialties(filtered);
          setShowSpecialtiesDropdown(filtered.length > 0);
        }}
        onFocus={() => {
          setFilteredSpecialties(specialtiesMap[data.profession] || []);
          setShowSpecialtiesDropdown(true);
        }}
				error={errors?.specialty}
				touched={errors?.specialty}
				placeholder="Search primary specialty"
			/>

      {/* <FlatList
        data={filteredProfessions}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() =>{onChange({ ...data, profession: item })}}>
            <Text style={styles.dropdownItem}>{item}</Text>
          </TouchableOpacity>
        )}
      /> */}
      {showProfessionsDropdown && (
        <FlatList
          data={filteredProfessions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                onChange({ ...data, profession: item, specialty: '' }); // reset specialty
                setShowProfessionsDropdown(false); // ✅ hide dropdown
                setFilteredSpecialties(specialtiesMap[item] || []); // populate specialties for selected profession
              }}
            >
              <Text style={styles.dropdownItem}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* <FlatList
        data={filteredSpecialties}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>onChange({ ...data, specialty: item })}>
            <Text style={styles.dropdownItem}>{item}</Text>
          </TouchableOpacity>
        )}
      /> */}
      {showSpecialtiesDropdown && (
        <FlatList
          data={filteredSpecialties}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                onChange({ ...data, specialty: item });
                setShowSpecialtiesDropdown(false); // ✅ hide dropdown
              }}
            >
              <Text style={styles.dropdownItem}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default ProfessionalDetailsForm;
