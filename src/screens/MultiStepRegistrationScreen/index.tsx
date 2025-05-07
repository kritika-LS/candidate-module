import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Dimensions,
  Alert,
  Text
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { styles } from './styles';

// const screenWidth = Dimensions.get('window').width;

// // ----- Type Definitions -----
// type FormData = {
//   personal: { name?: string; phone?: string };
//   address: { street?: string; city?: string };
//   professional: { occupation?: string; experience?: string };
//   jobPref: { jobTitle?: string; location?: string };
// };

// // ----- Step Components -----
// const PersonalDetails = ({
//   data,
//   onChange
// }: {
//   data: FormData['personal'];
//   onChange: (data: FormData['personal']) => void;
// }) => (
//   <View style={styles.scene}>
//     <TextInput
//       style={styles.input}
//       placeholder="Full Name"
//       value={data.name || ''}
//       onChangeText={text => onChange({ ...data, name: text })}
//     />
//     <TextInput
//       style={styles.input}
//       placeholder="Phone"
//       keyboardType="phone-pad"
//       value={data.phone || ''}
//       onChangeText={text => onChange({ ...data, phone: text })}
//     />
//   </View>
// );

// const AddressDetails = ({
//   data,
//   onChange
// }: {
//   data: FormData['address'];
//   onChange: (data: FormData['address']) => void;
// }) => (
//   <View style={styles.scene}>
//     <TextInput
//       style={styles.input}
//       placeholder="Street"
//       value={data.street || ''}
//       onChangeText={text => onChange({ ...data, street: text })}
//     />
//     <TextInput
//       style={styles.input}
//       placeholder="City"
//       value={data.city || ''}
//       onChangeText={text => onChange({ ...data, city: text })}
//     />
//   </View>
// );

// const ProfessionalDetails = ({
//   data,
//   onChange
// }: {
//   data: FormData['professional'];
//   onChange: (data: FormData['professional']) => void;
// }) => (
//   <View style={styles.scene}>
//     <TextInput
//       style={styles.input}
//       placeholder="Occupation"
//       value={data.occupation || ''}
//       onChangeText={text => onChange({ ...data, occupation: text })}
//     />
//     <TextInput
//       style={styles.input}
//       placeholder="Experience (years)"
//       keyboardType="numeric"
//       value={data.experience || ''}
//       onChangeText={text => onChange({ ...data, experience: text })}
//     />
//   </View>
// );

// const JobPreferences = ({
//   data,
//   onChange
// }: {
//   data: FormData['jobPref'];
//   onChange: (data: FormData['jobPref']) => void;
// }) => (
//   <View style={styles.scene}>
//     <TextInput
//       style={styles.input}
//       placeholder="Preferred Job Title"
//       value={data.jobTitle || ''}
//       onChangeText={text => onChange({ ...data, jobTitle: text })}
//     />
//     <TextInput
//       style={styles.input}
//       placeholder="Preferred Location"
//       value={data.location || ''}
//       onChangeText={text => onChange({ ...data, location: text })}
//     />
//   </View>
// );

// // ----- Main Component -----

// const MultiStepRegistrationScreen = () => {
//   const [formData, setFormData] = useState<FormData>({
//     personal: {},
//     address: {},
//     professional: {},
//     jobPref: {}
//   });

//   const [index, setIndex] = useState(0);
// //   const [routes] = useState([
// //     { key: 'personal', title: 'Personal' },
// //     { key: 'address', title: 'Address' },
// //     { key: 'professional', title: 'Professional' },
// //     { key: 'jobPref', title: 'Job Pref' }
// //   ]);

// 	const [routes] = useState([
//     { key: 'personal', title: 'Personal Details', icon: 'account-outline' },
//     { key: 'address', title: 'Address', icon: 'home-outline' },
//     { key: 'professional', title: 'Professional Details', icon: 'briefcase-outline' },
//     { key: 'jobPref', title: 'Job Preferences', icon: 'tune-variant' }
//   ]);

//   const validateForm = () => {
//     const allValid = Object.values(formData).every(section =>
//       Object.values(section).every(value => value?.trim() !== '')
//     );
//     if (!allValid) {
//       Alert.alert('Validation Error', 'Please complete all fields before submitting.');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = () => {
//     if (validateForm()) {
//       console.log('Submitted Data:', formData);
//       Alert.alert('Success', 'Registration complete!');
//     }
//   };

//   const renderScene = SceneMap({
//     personal: () => (
//       <PersonalDetails
//         data={formData.personal}
//         onChange={data => setFormData(prev => ({ ...prev, personal: data }))}
//       />
//     ),
//     address: () => (
//       <AddressDetails
//         data={formData.address}
//         onChange={data => setFormData(prev => ({ ...prev, address: data }))}
//       />
//     ),
//     professional: () => (
//       <ProfessionalDetails
//         data={formData.professional}
//         onChange={data => setFormData(prev => ({ ...prev, professional: data }))}
//       />
//     ),
//     jobPref: () => (
//       <JobPreferences
//         data={formData.jobPref}
//         onChange={data => setFormData(prev => ({ ...prev, jobPref: data }))}
//       />
//     )
//   });

// 	const tabCompletion = {
// 		personal: formData.personal.name && formData.personal.phone,
// 		address: formData.address.street && formData.address.city,
// 		professional: formData.professional.occupation && formData.professional.experience,
// 		jobPref: formData.jobPref.jobTitle && formData.jobPref.location
// 	};

//   return (
//     <View style={{ flex: 1 }}>
//         <TabView
//             navigationState={{ index, routes }}
//             renderScene={renderScene}
//             onIndexChange={setIndex}
//             initialLayout={{ width: screenWidth }}
//             renderTabBar={props => (
//                 <TabBar
//                 {...props}
//                 indicatorStyle={{ backgroundColor: 'blue' }}
//                 style={{ backgroundColor: '#f5f5f5' }}
//                 activeColor="black"
//                 inactiveColor="gray"
//                 scrollEnabled // This makes the tab bar scrollable
//                 />
//             )}
//         />
//       <View style={{ padding: 16 }}>
//         {index < routes.length - 1 ? (
//           <Button title="Next" onPress={() => setIndex(prev => prev + 1)} />
//         ) : (
//           <Button title="Submit" onPress={handleSubmit} />
//         )}
//       </View>
//     </View>
//   );
// };

// export default MultiStepRegistrationScreen;

// 1. Define tab components OUTSIDE the main component (avoid recreation on render)
const FirstTab = () => (
  <View style={customstyles.tabContainer}>
    <Text>Tab 1 Content</Text>
  </View>
);

const SecondTab = () => (
  <View style={customstyles.tabContainer}>
    <Text>Tab 2 Content</Text>
  </View>
);

// 2. Memoize SceneMap to prevent unnecessary recalculations


function MultiStepRegistrationScreen() {
  // 3. Use `useState` initializer function for routes (optimization)
  const [index, setIndex] = useState(0);
  const [routes] = useState(() => [
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);
  const renderScene = SceneMap({
    first: FirstTab,
    second: SecondTab,
  });
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      // 4. Add key prop to TabBar if customizing (prevents "UIFrameGuarded" errors)
      renderTabBar={(props) => (
        <TabBar
          {...props}
          key="tab-bar"
          indicatorStyle={{ backgroundColor: 'blue' }}
          style={customstyles.tabBar}
          labelStyle={customstyles.label}
        />
      )}
      // 5. Add lazy loading for better performance
      lazy
    />
  );
}

// 6. Styles to prevent layout issues
const customstyles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: 'white',
  },
  label: {
    color: 'black',
  },
});

export default MultiStepRegistrationScreen;