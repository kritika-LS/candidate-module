import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Input } from '../../../components/common/Input';
import { styles } from './styles';

interface Props {
  data: any;
  professionsList: string[];
  specialtiesMap: { [profession: string]: string[] };
  onChange: (data: any) => void;
  errors: any;
  touched: any;
  setTouched: (field: { [key: string]: boolean }) => void;
}

const ProfessionalDetailsForm: React.FC<Props> = ({ data, professionsList, specialtiesMap, onChange, errors, touched, setTouched }) => {
  const [filteredProfessions, setFilteredProfessions] = useState<string[]>([]);
  const [filteredSpecialties, setFilteredSpecialties] = useState<string[]>([]);
  const [showProfessionsDropdown, setShowProfessionsDropdown] = useState(false);
  const [showSpecialtiesDropdown, setShowSpecialtiesDropdown] = useState(false);

  return (
    <View style={styles.container}>
      <Input
        label="Total Experience"
        required
        value={data?.experience || ""}
        onChangeText={(val) => onChange({ ...data, experience: val })}
        error={errors?.experience}
        touched={touched?.experience}
        placeholder={'Enter Experience'}
        onBlur={() => setTouched({ ...touched, experience: true })}
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
        touched={touched?.profession}
        placeholder="Search profession"
        onBlur={() => setTouched({ ...touched, profession: true })}
      />

      <Input
        label="Primary Specialty"
        required
        value={data?.specialty || ""}
        onChangeText={(text) => {
          onChange({ ...data, specialty: text });
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
        touched={touched?.specialty}
        placeholder="Search primary specialty"
        onBlur={() => setTouched({ ...touched, specialty: true })}
      />

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
