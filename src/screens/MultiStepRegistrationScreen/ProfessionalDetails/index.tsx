import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Input } from '../../../components/common/Input';
import { styles } from './styles';
import { professionsList, specialtiesMap } from '../../../constants';
import { TextStyle } from '../../../components/common/Text';

interface Props {
  data: any;
  professionsList: string[];
  onChange: (data: any) => void;
  errors: any;
  touched: any;
  setTouched: (field: { [key: string]: boolean }) => void;
}

const ProfessionalDetailsForm: React.FC<Props> = ({ data, onChange, errors, touched, setTouched }) => {
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
      <View>
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
          setShowProfessionsDropdown(true);
        }}
        onFocus={() => {
          setFilteredProfessions(professionsList); // optional: show all on focus
          setShowProfessionsDropdown(true);
        }}
        error={errors?.profession}
        touched={touched?.profession}
        placeholder="Search profession"
        onBlur={() => {
          setTouched({ ...touched, profession: true });
          setShowProfessionsDropdown(false);
          setFilteredProfessions([]); 
        }}
      />
       {showProfessionsDropdown &&
          (
            <View style={styles.suggestionsContainer}>
              <FlatList
                data={filteredProfessions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => {
                      onChange({ ...data, profession: item });
                      setShowProfessionsDropdown(false);
                    }}>
                    <TextStyle variant="regular" size="sm">
                    {item}
                    </TextStyle>
                  </TouchableOpacity>
                )}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
                style={styles.suggestionsList}
              />
            </View>
          )}
      </View>
      <View>
      <Input
        label="Primary Specialty"
        required
        value={data?.specialty || ""}
        onChangeText={(text) => {
          onChange({ ...data, specialty: text });
          console.log("tag here 001",specialtiesMap[data?.profession],data?.profession)
          const filtered = (specialtiesMap[data?.profession] || []).filter((s) =>
            s.toLowerCase().includes(text.toLowerCase())
          );
          setFilteredSpecialties(filtered);
          setShowSpecialtiesDropdown(filtered.length > 0);
        }}
        onFocus={() => {
          setFilteredSpecialties(specialtiesMap[data?.profession] || []);
          setShowSpecialtiesDropdown(true);
        }}
        error={errors?.specialty}
        touched={touched?.specialty}
        placeholder="Search primary specialty"
        onBlur={() => {
          setTouched({ ...touched, specialty: true });
          setShowSpecialtiesDropdown(false);
        }}
      />
        {showSpecialtiesDropdown &&
          (
            <View style={styles.suggestionsContainer}>
              <FlatList
                data={filteredSpecialties}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => {
                      onChange({ ...data, specialty: item });
                      setShowSpecialtiesDropdown(false);
                    }}>
                    <TextStyle variant="regular" size="sm">
                    {item}
                    </TextStyle>
                  </TouchableOpacity>
                )}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
                style={styles.suggestionsList}
              />
            </View>
          )}
      </View>
    </View>
  );
};

export default ProfessionalDetailsForm;
