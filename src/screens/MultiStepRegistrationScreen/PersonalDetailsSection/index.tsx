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
          onChangeText={(value) => onChange({...data, firstName: value})}
          error={errors?.firstName}
          touched={touched?.firstName}
          placeholder="Enter First Name"
          onBlur={() => setTouched({ ...touched, firstName: true })}
        />

        <Input
          label="Last Name"
          required
          value={data.lastName}
          onChangeText={(value) => onChange({...data, lastName: value})}
          error={errors?.lastName}
          touched={touched?.lastName}
          placeholder="Enter Last Name"
          onBlur={() => setTouched({ ...touched, lastName: true })}
        />

        <Input
          label="Alternate Email Address"
          value={data.alternateEmail}
          onChangeText={(value) => onChange({...data, alternateEmail: value})}
          error={errors?.alternateEmail}
          touched={touched?.alternateEmail}
          placeholder="Enter alternate Email Address"
          onBlur={() => setTouched({ ...touched, alternateEmail: true })}
        />
      </View>

      <View style={styles.section}>
        <PhoneNumberInput
          label="Mobile Number"
          name="mobileNumber"
          value={data.mobileNumber}
          onChangeCountry={(country) => onChange('countryCode', `+${country?.callingCode[0]}`)}
          onChangeText={(value) => onChange({...data, mobileNumber: value})}
          error={errors?.mobileNumber}
          touched={errors?.mobileNumber}
          defaultCode="US"
          onBlur={() => setTouched({ ...touched, mobileNumber: true })}
        />
      </View>
    </ScrollView>
  );
};

export default PersonalDetailsSection;