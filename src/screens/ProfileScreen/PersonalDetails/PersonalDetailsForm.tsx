import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput } from 'react-native';
import { Input } from '../../../components/common/Input';
import { PhoneNumberInput } from '../../../components/common/PhoneInput';
import DropDownPicker from 'react-native-dropdown-picker';

const PersonalDetailsForm: React.FC = () => {
    const [genderOpen, setGenderOpen] = useState(false);
    const [gender, setGender] = useState(null);
    const [genderItems] = useState([
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ]);

    const [ethnicityOpen, setEthnicityOpen] = useState(false);
    const [ethnicity, setEthnicity] = useState(null);
    const [ethnicityItems] = useState([
        { label: 'Asian', value: 'asian' },
        { label: 'Black', value: 'black' },
        { label: 'Hispanic', value: 'hispanic' },
        { label: 'White', value: 'white' },
        { label: 'Other', value: 'other' },
    ]);

    const [militaryOpen, setMilitaryOpen] = useState(false);
    const [military, setMilitary] = useState(null);
    const [militaryItems] = useState([
        { label: 'Veteran', value: 'veteran' },
        { label: 'Active Duty', value: 'active_duty' },
        { label: 'Reserve', value: 'reserve' },
        { label: 'None', value: 'none' },
    ]);

    const [workplacePreferenceOpen, setWorkplacePreferenceOpen] = useState(false);
    const [workplacePreference, setWorkplacePreference] = useState(null);
    const [workplacePreferenceItems] = useState([
        { label: 'Remote', value: 'remote' },
        { label: 'On-site', value: 'on_site' },
        { label: 'Hybrid', value: 'hybrid' },
    ]);

    const [nationalityOpen, setNationalityOpen] = useState(false);
    const [nationality, setNationality] = useState(null);
    const [nationalityItems] = useState([
        { label: 'American', value: 'american' },
        { label: 'Canadian', value: 'canadian' },
        { label: 'Indian', value: 'indian' },
        { label: 'Other', value: 'other' },
    ]);

    const [formValues, setFormValues] = useState({
        firstName: '',
        middleName: '',
        profileTitle: '',
        overallExperience: '',
        emailAddress: '',
        alternateEmailAddress: '',
        knownAs: '',
        otherName: '',
        brief: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

    const handleInputChange = (field, value) => {
        setFormValues({ ...formValues, [field]: value });
    };

    const handleBlur = (field) => {
        setTouchedFields({ ...touchedFields, [field]: true });
    };

    return (
        <View style={styles.container}>
            <Input
                label="First Name"
                required
                value={formValues.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                error={formErrors.firstName}
                touched={touchedFields.firstName}
            />
            <Input
                label="Middle Name"
                required
                placeholder="Enter middle name"
                value={formValues.middleName}
                onChangeText={(value) => handleInputChange('middleName', value)}
                error={formErrors.middleName}
                touched={touchedFields.middleName}
            />
            <Input
                label="Profile Title"
                required
                value={formValues.profileTitle}
                onChangeText={(value) => handleInputChange('profileTitle', value)}
                error={formErrors.profileTitle}
                touched={touchedFields.profileTitle}
            />
            <Input
                label="Overall Experience"
                required
                value={formValues.overallExperience}
                onChangeText={(value) => handleInputChange('overallExperience', value)}
                error={formErrors.overallExperience}
                touched={touchedFields.overallExperience}
            />
            <Input
                label="Email Address"
                required
                value={formValues.emailAddress}
                onChangeText={(value) => handleInputChange('emailAddress', value)}
                error={formErrors.emailAddress}
                touched={touchedFields.emailAddress}
            />
            <Input
                label="Alternate Email Address"
                required
                placeholder="Enter alternate email address"
                value={formValues.alternateEmailAddress}
                onChangeText={(value) => handleInputChange('alternateEmailAddress', value)}
                error={formErrors.alternateEmailAddress}
                touched={touchedFields.alternateEmailAddress}
            />
            <PhoneNumberInput label="Mobile Number" required />
            <PhoneNumberInput label="Alternate Mobile Number" required />
            <Input
                label="Known as"
                required
                placeholder="Enter known as"
                value={formValues.knownAs}
                onChangeText={(value) => handleInputChange('knownAs', value)}
                error={formErrors.knownAs}
                touched={touchedFields.knownAs}
            />
            <Input
                label="Other Previously Used Name"
                required
                placeholder="Enter other previously used name"
                value={formValues.otherName}
                onChangeText={(value) => handleInputChange('otherName', value)}
                error={formErrors.otherName}
                touched={touchedFields.otherName}
            />

            <Text style={styles.label}>Gender</Text>
            <DropDownPicker
                open={genderOpen}
                setOpen={setGenderOpen}
                items={genderItems}
                value={gender}
                setValue={setGender}
                placeholder="Search gender"
                searchable={true}
                searchPlaceholder="Search..."
                listMode="MODAL"
                modalProps={{ animationType: 'slide' }}
                onChangeSearchText={(text) => {
                    if (!genderItems.find(p => p.label.toLowerCase().includes(text.toLowerCase()))) {
                        Alert.alert('Info', 'Please choose from the list');
                    }
                }}
                style={styles.dropdown}
            />
            <Text style={styles.label}>Nationality</Text>
            <DropDownPicker
                open={nationalityOpen}
                setOpen={setNationalityOpen}
                items={nationalityItems}
                value={nationality}
                setValue={setNationality}
                placeholder="Search nationality"
                searchable={true}
                searchPlaceholder="Search..."
                listMode="MODAL"
                modalProps={{ animationType: 'slide' }}
                onChangeSearchText={(text) => {
                    if (!nationalityItems.find(p => p.label.toLowerCase().includes(text.toLowerCase()))) {
                        Alert.alert('Info', 'Please choose from the list');
                    }
                }}
                style={styles.dropdown}
            />
            <Text style={styles.label}>Ethnicity</Text>
            <DropDownPicker
                open={ethnicityOpen}
                setOpen={setEthnicityOpen}
                items={ethnicityItems}
                value={ethnicity}
                setValue={setEthnicity}
                placeholder="Search ethnicity"
                searchable={true}
                searchPlaceholder="Search..."
                listMode="MODAL"
                modalProps={{ animationType: 'slide' }}
                onChangeSearchText={(text) => {
                    if (!ethnicityItems.find(p => p.label.toLowerCase().includes(text.toLowerCase()))) {
                        Alert.alert('Info', 'Please choose from the list');
                    }
                }}
                style={styles.dropdown}
            />
            <Text style={styles.label}>Military Status</Text>
            <DropDownPicker
                open={militaryOpen}
                setOpen={setMilitaryOpen}
                items={militaryItems}
                value={military}
                setValue={setMilitary}
                placeholder="Select military status"
                searchable={true}
                searchPlaceholder="Search..."
                listMode="MODAL"
                modalProps={{ animationType: 'slide' }}
                onChangeSearchText={(text) => {
                    if (!militaryItems.find(p => p.label.toLowerCase().includes(text.toLowerCase()))) {
                        Alert.alert('Info', 'Please choose from the list');
                    }
                }}
                style={styles.dropdown}
            />
            <Text style={styles.label}>Workplace Preference</Text>
            <DropDownPicker
                open={workplacePreferenceOpen}
                setOpen={setWorkplacePreferenceOpen}
                items={workplacePreferenceItems}
                value={workplacePreference}
                setValue={setWorkplacePreference}
                placeholder="Select workplace preference"
                searchable={true}
                searchPlaceholder="Search..."
                listMode="MODAL"
                modalProps={{ animationType: 'slide' }}
                onChangeSearchText={(text) => {
                    if (!workplacePreferenceItems.find(p => p.label.toLowerCase().includes(text.toLowerCase()))) {
                        Alert.alert('Info', 'Please choose from the list');
                    }
                }}
                style={styles.dropdown}
            />
            <Text style={styles.label}>Brief</Text>
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              placeholder="Enter brief"
              multiline
              maxLength={1024}
              value={formValues.brief}
              onChangeText={(value) => handleInputChange('brief', value)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 16,
        backgroundColor: '#fff',
    },
    label: {
        marginTop: 16,
        marginBottom: 4,
        fontSize: 14,
        fontWeight: '500',
    },
    dropdown: {
      backgroundColor: '#fff',
      borderColor: '#ddd',
      borderRadius: 8,
      marginTop: 4,
    },
    input: {
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: '#ddd',
    },
});

export default PersonalDetailsForm;