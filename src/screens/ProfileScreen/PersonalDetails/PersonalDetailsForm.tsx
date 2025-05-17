import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from '../../../components/common/Input';
import { PhoneNumberInput } from '../../../components/common/PhoneInput';

const PersonalDetailsForm: React.FC = () => {
    return (
        <View style={styles.container}>
            
                    <Input
                      label="First Name"
                      required
                    //   value={data.firstName}
                    //   onChangeText={(val) => onChange({ ...data, firstName: val })}
                    //   error={errors.firstName}
                    //   touched={errors.lastName}
                    />
                    <Input
                      label="Middle Name"
                      required
                      placeholder='Enter middle name'
                    //   value={data.lastName}
                    //   onChangeText={(val) => onChange({ ...data, lastName: val })}
                    //   error={errors.lastName}
                    //   touched={errors.lastName}
                    />
                     <Input
                      label="Profile Title"
                      required
                    //   value={data.alternateEmail}
                    //   onChangeText={(val) => onChange({ ...data, alternateEmail: val })}
                    //   error={errors.alternateEmail}
                    />
                    <Input
                      label="Overall Experience"
                      required
                    //   value={data.alternateEmail}
                    //   onChangeText={(val) => onChange({ ...data, alternateEmail: val })}
                    //   error={errors.alternateEmail}
                    />
                    <Input
                      label="Email Address"
                      required
                    //   value={data.alternateEmail}
                    //   onChangeText={(val) => onChange({ ...data, alternateEmail: val })}
                    //   error={errors.alternateEmail}
                    />
                    <Input
                      label="Alternate Email Address"
                      required
                      placeholder='Enter alternate email address'
                    //   value={data.alternateEmail}
                    //   onChangeText={(val) => onChange({ ...data, alternateEmail: val })}
                    //   error={errors.alternateEmail}
                    />
                    <PhoneNumberInput
                        label="Mobile Number"
                        required
                    />
                    <PhoneNumberInput
                        label="Alternate Mobile Number"
                        required
                    />
                    <Input
                        label="Mobile Number"
                        required
                    //   value={data.alternateEmail}
                    //   onChangeText={(val) => onChange({ ...data, alternateEmail: val })}
                    //   error={errors.alternateEmail}
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default PersonalDetailsForm;