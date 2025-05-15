// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
// import AddressSection from './AddressSection';
// import { styles } from './styles';
// import { PhoneNumberInput } from '../../../components/common/PhoneInput';
// import { TextStyle } from '../../../components/common/Text';
// import { Input } from '../../../components/common/Input';
// import { useFormik } from 'formik';

// interface PersonalDetailsProps {
//   onSubmit: (data: any) => void;
// }

// const PersonalDetailsSection: React.FC<PersonalDetailsProps> = ({ onSubmit }) => {

//   const phoneInput = React.useRef(null);

//   const [countryCode, setCountryCode] = useState(1);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     alternateEmail: '',
//     mobileNumber: '',
//     countryCode: '+1',
//     addressType: 'both',
//     address: '',
//     zipcode: '',
//     city: '',
//     state: '',
//     country: ''
//   });

//   const [errors, setErrors] = useState({
//     firstName: '',
//     lastName: '',
//     alternateEmail: '',
//     mobileNumber: '',
//     address: '',
//     zipcode: '',
//     city: ''
//   });

//   const validateEmail = (email: string) => {
//     if (!email) return true;
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   const validateMobileNumber = (number: string) => {
//     const re = /^[0-9]+$/;
//     return re.test(number);
//   };

//   const validateField = (name: string, value: string) => {
//     let error = '';
    
//     switch (name) {
//       case 'firstName':
//         if (!value.trim()) error = 'First name is required';
//         else if (value.length > 128) error = 'First name cannot exceed 128 characters';
//         break;
//       case 'lastName':
//         if (!value.trim()) error = 'Last name is required';
//         else if (value.length > 128) error = 'Last name cannot exceed 128 characters';
//         break;
//       case 'alternateEmail':
//         if (value && !validateEmail(value)) error = 'Please enter a valid alternate email address';
//         else if (value.length > 128) error = 'Email cannot exceed 128 characters';
//         break;
//       case 'mobileNumber':
//         if (!value.trim()) error = 'Mobile number is required';
//         else if (!validateMobileNumber(value)) error = 'Please enter a valid mobile number';
//         else if (value.length > 32) error = 'Mobile number cannot exceed 32 characters';
//         // In a real app, you would check against existing numbers here
//         break;
//       case 'address':
//         if (value.length > 128) error = 'Address cannot exceed 128 characters';
//         break;
//       case 'zipcode':
//         if (!value.trim()) error = 'Zipcode is required';
//         else if (value.length > 8) error = 'Zipcode cannot exceed 8 characters';
//         break;
//       case 'city':
//         if (!value.trim()) error = 'City is required';
//         else if (value.length > 128) error = 'City cannot exceed 128 characters';
//         break;
//     }

//     setErrors(prev => ({ ...prev, [name]: error }));
//     return !error;
//   };

//   const handleInputChange = (field: string, value: any) => {
//     // if (field === 'phone') {
//     //   value = formatPhone(value);
//     // }

//     const updatedFormData = {...formData, [field]: value};
//     setFormData(updatedFormData);
//     // dispatch(updatePersonalInfo({[field]: value}));

//     validateField(field, value);
//   };

//   const handleValueChange = (name: string, value: string) => {
//     setFormData(prev => ({ ...prev, [name]: value }));
//     validateField(name, value);
//   };

//   const handleFormSubmit = () => {
//     let isValid = true;
    
//     // Validate all required fields
//     isValid = validateField('firstName', formData.firstName) && isValid;
//     isValid = validateField('lastName', formData.lastName) && isValid;
//     isValid = validateField('mobileNumber', formData.mobileNumber) && isValid;
    
//     if (formData.addressType !== 'both') {
//       isValid = validateField('address', formData.address) && isValid;
//       isValid = validateField('zipcode', formData.zipcode) && isValid;
//       isValid = validateField('city', formData.city) && isValid;
//     }

//     if (isValid) {
//       onSubmit(formData);
//     } else {
//       Alert.alert('Validation Error', 'Please fix all errors before submitting.');
//     }
//   };

// 	const {
//     values,
//     // errors,
//     touched,
//     handleBlur,
//     setFieldValue,
//     handleSubmit,
//     handleChange,
//     setFieldTouched,
//   } = useFormik({
//     enableReinitialize: true,
//     // initialValues: loginMobileInitialValues,
//     // validationSchema: loginMobileSchema,
//     onSubmit: values => handleFormSubmit(),
//   });

//   return (
//     <ScrollView style={styles.container}>
      
//       <View style={styles.section}>

// 				<Input
// 					label="First Name"
// 					required
// 					value={formData.firstName}
// 					onChangeText={value => handleInputChange('firstName', value)}
// 					onBlur={() => handleBlur('firstName')}
// 					error={errors.firstName}
// 					touched={touched.firstName}
// 					placeholder={'Enter First Name'}
// 					// disabled={saveLoading}
// 				/>

// 				<Input
// 					label="Last Name"
// 					required
// 					value={formData.lastName}
// 					onChangeText={value => handleInputChange('lastName', value)}
// 					onBlur={() => handleBlur('lastName')}
// 					error={errors.lastName}
// 					touched={touched.lastName}
// 					placeholder={'Enter Last Name'}
// 					// disabled={saveLoading}
// 				/>

// 				<Input
// 					label="Alternate Email Address"
// 					value={formData.alternateEmail}
// 					onChangeText={value => handleInputChange('email', value)}
// 					onBlur={() => handleBlur('phone')}
// 					placeholder={'Enter alternate Email Address'}
// 					// disabled={true}
// 				/>
//       </View>

//       <View style={styles.section}>
//         <View>
// 					{/* <PhoneNumberInput
//             setIsValid={setIsValidPhone}
//             label={"Mobile Number"}
//             name={'phone'}
//             value={values.phone}
//             onChangeCountry={country => {
//               setCountryCode(country?.callingCode[0]);
//             }}
//             onChangeText={e => {
//               setFieldTouched('phone', true);
//               setFieldValue('phone', e);
//             }}
//             onChangeFormattedText={event => {
//               setIsValidPhoneNumber(isValidPhone(event));
//             }}
//             errors={!IsValidPhoneNumber && errors}
//             touched={touched}
//             onBlur={handleBlur('phone')}
//             onChange={handleChange('phone')}
//             placeholder={sanitizeText(strapiData?.textPlaceholder)}
//             defaultCode={country || 'US'}
//           /> */}
//         </View>
//         {errors.mobileNumber ? <Text style={styles.errorText}>{errors.mobileNumber}</Text> : null}
//       </View>
			
//     </ScrollView>
//   );
// };

// export default PersonalDetailsSection;



import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';

import { styles } from './styles';
import { Input } from '../../../components/common/Input';


const PersonalDetailsSection: React.FC = ({ data , onChange, errors }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Input
          label="First Name"
          required
          value={data.firstName}
          onChangeText={(val) => onChange({ ...data, firstName: val })}
          error={errors.firstName}
          touched={errors.lastName}
        />
        <Input
          label="Last Name"
          required
          value={data.lastName}
          onChangeText={(val) => onChange({ ...data, lastName: val })}
          error={errors.lastName}
          touched={errors.lastName}
        />
         <Input
          label="Alternate Email Address"
          value={data.alternateEmail}
          onChangeText={(val) => onChange({ ...data, alternateEmail: val })}
          error={errors.alternateEmail}
        />
      </View>
    </ScrollView>
  );
};

export default PersonalDetailsSection;