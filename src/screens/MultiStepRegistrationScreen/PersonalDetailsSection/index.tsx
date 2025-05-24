import React from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from './styles';
import { Input } from '../../../components/common/Input';
import { PhoneNumberInput } from '../../../components/common/PhoneInput';

interface PersonalDetailsProps {
  data: {
    firstName: string;
    lastName: string;
    alternateEmail: string;
    mobileNumber: string;
  };
  onChange: (field: string, value: string) => void;
  errors: {
    firstName?: string;
    lastName?: string;
    alternateEmail?: string;
    mobileNumber?: string;
  };
  touched: {
    firstName?: boolean;
    lastName?: boolean;
    alternateEmail?: boolean;
    mobileNumber?: boolean;
  };
  onSubmit: (data: any) => void;
  setTouched: (field: { [key: string]: boolean }) => void;
}

const PersonalDetailsSection: React.FC<PersonalDetailsProps> = ({ data, onChange, errors, touched, setTouched }) => {

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Input
          label="First Name"
          required
          value={data.firstName}
          onChangeText={(value: string) => onChange('firstName', value)}
          error={errors?.firstName}
          touched={touched?.firstName}
          placeholder="Enter First Name"
          onBlur={() => setTouched({ firstName: true })}
        />

        <Input
          label="Last Name"
          required
          value={data.lastName}
          onChangeText={(value: string) => onChange('lastName', value)}
          error={errors?.lastName}
          touched={touched?.lastName}
          placeholder="Enter Last Name"
          onBlur={() => setTouched({ lastName: true })}
        />

        <Input
          label="Alternate Email Address"
          value={data.alternateEmail}
          onChangeText={(value: string) => onChange('alternateEmail', value)}
          error={errors?.alternateEmail}
          touched={touched?.alternateEmail}
          placeholder="Enter alternate Email Address"
          onBlur={() => setTouched({ alternateEmail: true })}
        />
      </View>

      <View style={styles.section}>
        <PhoneNumberInput
          label="Mobile Number"
          required
          name="mobileNumber"
          value={data.mobileNumber}
          onChangeCountry={(country: { callingCode: string[] }) => onChange('countryCode', `+${country?.callingCode[0]}`)}
          onChangeText={(value: string) => onChange('mobileNumber', value)}
          error={errors?.mobileNumber}
          touched={touched?.mobileNumber}
          defaultCode="US"
          placeholder="Enter mobile number"
          onBlur={() => setTouched({ mobileNumber: true })}
        />
      </View>
    </ScrollView>
  );
};

export default PersonalDetailsSection;