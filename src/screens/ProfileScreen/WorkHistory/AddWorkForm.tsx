import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { theme } from '../../../theme';
import { Input } from '../../../components/common/Input';
import Toast from 'react-native-toast-message';
import { PhoneNumberInput } from '../../../components/common/PhoneInput';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Yup from 'yup';
import { TextStyle } from '../../../components/common/Text';
import { ProfileScreenHeader } from '../../../components/features/ProfileScreenHeader';
import { SaveButton } from '../../../components/features/SaveButton';
import { getCity, GetCityACResp, getGeoCoding } from '../../../api/services/autocomplete';
import { professionsList, specialtiesMap } from '../../../constants';
import moment from 'moment';
import { Checkbox } from '../../../components/common/Checkbox';
import { workHistorySchema } from '../../../validations/workHistorySchema';

interface AddWorkHistoryProps {
  setShowForm?: any;
}

const AddWorkHistory: React.FC<AddWorkHistoryProps> = ({ setShowForm }) => {
  const [showDatePicker, setShowDatePicker] = useState({
    startDate: false,
    endDate: false,
  });

  const defaultAddress = {
    address: '',
    city: '',
    zipCode: '',
    stateCode: '',
    countryCode: '',
  };

  const initialValues = {
    facilityname: '',
    profession: '',
    specialty: '',
    typeofBusiness: '',
    startDate: '',
    endDate: '',
    address: { ...defaultAddress },
    mobileNumber: '',
    notes: '',
    summaryOfWork: '',
    supervisorName: '',
    numberOfFacilityBeds: '',
    numberOfBedsInUnit: '',
    employmentType: '',
    nurseToPatientRatio: '',
    shift: '',
    chargeExperience: '',
    currentlyWorking: false,
    typeofBusinessOpen: false,
    employmentTypeOpen: false,
    shiftOpen: false,
    ChartingsystemOpen: false,
    ChartingsystemItems: [
      { label: 'Epic', value: 'epic' },
      { label: 'Cerner', value: 'cerner' },
      { label: 'Meditech', value: 'meditech' },
    ],
    Chartingsystem: '',
  };
  const [isTypingPhysicalZip, setIsTypingPhysicalZip] = useState(false);
  const [physicalZipSuggestions, setPhysicalZipSuggestions] = useState<GetCityACResp[]>([]);
  const [cityJustSelected, setCityJustSelected] = useState(false);
  const [loadingPhysicalZipSuggestions, setLoadingPhysicalZipSuggestions] = useState(false);
  const [showPhysicalZipSuggestions, setShowPhysicalZipSuggestions] = useState(false);
  const [filteredProfessions, setFilteredProfessions] = useState<string[]>([]);
  const [filteredSpecialties, setFilteredSpecialties] = useState<string[]>([]);
  const [showProfessionsDropdown, setShowProfessionsDropdown] = useState(false);
  const [showSpecialtiesDropdown, setShowSpecialtiesDropdown] = useState(false);
  const [formData, setFormData] = useState(initialValues);
  const [touched, setTouched] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [isFormValid, setIsFormValid] = useState(false);

  // const workHistorySchema = Yup.object().shape({
  //   facilityname: Yup.string()
  //     .required('Worked With/Facility Name is required')
  //     .max(128, 'Facility Name cannot exceed 128 characters'),
  //   profession: Yup.string()
  //     .required('Profile title profession is required')
  //     .oneOf(professionsList, 'Please choose from the list'),
  //   specialty: Yup.string()
  //     .required('Skills worked/specialty is required')
  //     .test(
  //       'is-valid-specialty',
  //       'Please choose from the list',
  //       function (value) {
  //         const { profession } = this.parent;
  //         return (
  //           !profession ||
  //           (specialtiesMap[profession] && specialtiesMap[profession].includes(value as string))
  //         );
  //       }
  //     ),
  //   typeofBusiness: Yup.string()
  //     .required('Type of Business/facility is required'),
  //   startDate: Yup.string()
  //     .required('Start Date is required')
  //     .test(
  //       'is-future-date',
  //       'Start Date cannot be a future date',
  //       value => {
  //         return value ? new Date(value) <= new Date() : true;
  //       }
  //     ),
  //   endDate: Yup.string().when('currentlyWorking', {
  //     is: false,
  //     then: (schema) => schema
  //       .required('End Date is required')
  //       .test(
  //         'is-earlier-than-start',
  //         'End Date cannot be earlier than Start Date',
  //         function (value) {
  //           const { startDate } = this.parent;
  //           return value && startDate ? new Date(value) >= new Date(startDate) : true;
  //         }
  //       ),
  //     otherwise: (schema) => schema.notRequired(),
  //   }),
  //   address: Yup.object().shape({
  //     address: Yup.string().required('Address is required'),
  //     zipCode: Yup.string().required('Zip Code is required'),
  //     city: Yup.string().required('City is required'),
  //     stateCode: Yup.string().required('State is required'),
  //     countryCode: Yup.string().required('Country is required'),
  //   }),
  //   mobileNumber: Yup.string()
  //     .required('Employer Mobile Number is required')
  //     .matches(/^\+\d{1,4}\d{7,12}$/, 'Please enter a valid mobile number'),
  //   notes: Yup.string()
  //     .required('Reason for Leaving is required')
  //     .max(128, 'Reason for Leaving cannot exceed 128 characters'),
  //   summaryOfWork: Yup.string()
  //     .required('Summary of work is required'),
  //   supervisorName: Yup.string()
  //     .required('Supervisor Name is required')
  //     .max(128, 'Supervisor Name cannot exceed 128 characters'),
  //   numberOfFacilityBeds: Yup.string()
  //     .required('Number of facility beds is required'),
  //   numberOfBedsInUnit: Yup.string()
  //     .required('Number of beds in unit is required'),
  //   employmentType: Yup.string()
  //     .required('Employment type is required'),
  //   nurseToPatientRatio: Yup.string()
  //     .required('Nurse to patient ratio is required'),
  //   shift: Yup.string()
  //     .required('Shift is required'),
  //   chargeExperience: Yup.string()
  //     .required('Charge experience is required'),
  // });

  const validateForm = useCallback(async () => {
    try {
      await workHistorySchema.validate(formData, { abortEarly: false });
      setErrors({});
      setIsFormValid(true);
      return true;
    } catch (validationErrors: any) {
      const newErrors: any = {};
      validationErrors.inner.forEach((error: any) => {
        if (error.path) {
          if (error.path.includes('.')) {
            const [parent, child] = error.path.split('.');
            newErrors[parent] = { ...newErrors[parent], [child]: error.message };
          } else {
            newErrors[error.path] = error.message;
          }
        }
      });
      setErrors(newErrors);
      setIsFormValid(false);
      return false;
    }
  }, [formData]);

  useEffect(() => {
    // Validate form whenever formData or relevant external data changes
    validateForm(); //
  }, [formData, validateForm]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Mark field as touched when it changes
    setTouched((prev: any) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev: any) => ({ ...prev, [field]: true }));
    // Re-validate the form on blur to update errors for the touched field
    validateForm();
  };

  const handleSave = async () => {
    const isValid = await validateForm(); // Ensure to await the validation result
    if (!isValid) {
      Toast.show({
        type: 'error',
        text1: 'Please fill all mandatory fields correctly.'
      });
      return;
    }
    console.log('Saving work history details:', JSON.stringify(formData, null, 2));
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Toast.show({
        type: 'success',
        text1: 'Work history saved successfully',
      });
    } catch (error) {
      console.error('Error saving work history:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to save work history',
      });
    }
  };

  const handlePhysicalAddressSelect = async (item: GetCityACResp) => {
    setShowPhysicalZipSuggestions(false);
    setIsTypingPhysicalZip(false);
    setLoadingPhysicalZipSuggestions(true);

    try {
      const addressDetails = await getGeoCoding(item.placeId);
      console.log("tag addressDetails",addressDetails);
      setFormData({ ...formData, address:{...formData.address,countryCode:addressDetails.countryName,stateCode:addressDetails.stateName,city:addressDetails.city,zipCode:addressDetails.zipcode}});
    } catch (error) {
      console.error('Error processing selected address:', error);
    } finally {
      setLoadingPhysicalZipSuggestions(false);
    }
  };
console.log("tag error",errors)
  useEffect(() => {
    const handlePhysicalZipSearch = async () => {
      const zipCode = formData.address.zipCode;
      if (
        isTypingPhysicalZip &&
        !cityJustSelected &&
        zipCode &&
        zipCode.length >= 5
      ) {
        setLoadingPhysicalZipSuggestions(true);
        try {
          const suggestions = await getCity(zipCode);
          setPhysicalZipSuggestions(suggestions);
          setShowPhysicalZipSuggestions(suggestions.length > 0);
        } catch (error) {
          console.error('Error fetching physical zipcode suggestions:', error);
        } finally {
          setLoadingPhysicalZipSuggestions(false);
        }
      } else {
        setPhysicalZipSuggestions([]);
        setShowPhysicalZipSuggestions(false);
      }
      if (cityJustSelected) {
        setCityJustSelected(false);
      }
    };

    const debounce = setTimeout(handlePhysicalZipSearch, 500);
    return () => clearTimeout(debounce);
  }, [
    formData?.address?.zipCode,
    isTypingPhysicalZip,
    cityJustSelected,
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.body}>
          <ProfileScreenHeader
            headerTitle="Work History"
            completedStatus={isFormValid}
            headerIcon="briefcase-outline"
          />
          <View style={styles.formSection}>
            <Input
              label="Worked with/Facility Name"
              value={formData.facilityname}
              onChangeText={(value) => handleInputChange('facilityname', value)}
              onBlur={() => handleBlur('facilityname')}
              placeholder="Enter facility name"
              maxLength={128}
              error={errors.facilityname}
              touched={touched.facilityname}
              required
            />
            <View>
              <Input
                label="Profile title/Profession"
                required
                value={formData?.profession || ""}
                onChangeText={(text) => {
                  handleInputChange('profession', text);
                  const filtered = professionsList.filter((p) =>
                    p.toLowerCase().includes(text.toLowerCase())
                  );
                  setFilteredProfessions(filtered);
                  setShowProfessionsDropdown(!showProfessionsDropdown);
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
                }}
              />
              {showProfessionsDropdown && (
                <View
                  style={[
                    styles.suggestionsContainer,
                    { maxHeight: 300, overflow: 'scroll' },
                  ]}
                >
                  {filteredProfessions.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.suggestionItem}
                      onPress={() => {
                        handleInputChange('profession', item);
                        setShowProfessionsDropdown(false);
                        setFilteredProfessions([]);
                      }}
                    >
                      <TextStyle variant="regular" size="sm">
                        {item}
                      </TextStyle>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            <View>
              <Input
                label="Primary Specialty"
                required
                value={formData?.specialty || ""}
                onChangeText={(text) => {
                  handleInputChange('specialty', text);
                  const filtered = (specialtiesMap[formData?.profession] || []).filter((s) =>
                    s.toLowerCase().includes(text.toLowerCase())
                  );
                  setFilteredSpecialties(filtered);
                  setShowSpecialtiesDropdown(filtered.length > 0);
                }}
                onFocus={() => {
                  setFilteredSpecialties(specialtiesMap[formData?.profession] || []);
                  setShowSpecialtiesDropdown(true);
                }}
                error={errors?.specialty}
                touched={touched?.specialty}
                placeholder="Search primary specialty"
                onBlur={() => {
                  setTouched({ ...touched, specialty: true });
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
                            handleInputChange('specialty', item);
                            setShowSpecialtiesDropdown(false);
                            setFilteredSpecialties([]);
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
            <Text style={styles.label}>Type of Business/Facility <TextStyle color='red'>*</TextStyle></Text>
            <DropDownPicker
              open={formData.typeofBusinessOpen}
              setOpen={(open) => handleInputChange('typeofBusinessOpen', open)}
              items={[
                { label: 'Trauma', value: 'Trauma' },
                { label: 'Magnet', value: 'Magnet' },
                { label: 'Teaching', value: 'Teaching' },
              ]}
              value={formData.typeofBusiness}
              setValue={(callback) => handleInputChange('typeofBusiness', callback(formData.typeofBusiness))}
              placeholder="Select type of business"
              searchable={false}
              listMode="SCROLLVIEW"
              style={[styles.dropdown, { zIndex: formData.typeofBusinessOpen ? 10 : 1 }]}
              dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
            />
            {touched.typeofBusiness && errors.typeofBusiness && (
                <Text style={styles.error}>{errors.typeofBusiness}</Text>
              )}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Start Date</Text>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker({ ...showDatePicker, startDate: true })}
              >
                <Text style={styles.input}>
                  {moment(formData.startDate).format('DD/YYYY') || 'Select start date'}
                </Text>
              </TouchableOpacity>
              {showDatePicker.startDate && (
                <DateTimePicker
                  value={formData.startDate ? new Date(formData.startDate) : new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker({ ...showDatePicker, startDate: false });
                    if (selectedDate) {
                      handleInputChange('startDate', selectedDate.toISOString());
                    }
                  }}
                />
              )}
              {touched.startDate && errors.startDate && (
                <Text style={styles.error}>{errors.startDate}</Text>
              )}
            </View>

            <View style={styles.checkboxContainer}> 
              <Checkbox
                checked={formData.currentlyWorking}
                label='I am currently working here'
                onChange={() => handleInputChange('currentlyWorking', !formData.currentlyWorking)}
              />
            </View>

            { !formData?.currentlyWorking &&
              <View style={styles.inputGroup}>
              <Text style={styles.label}>End Date</Text>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker({ ...showDatePicker, endDate: true })}
                disabled={formData.currentlyWorking} // Disable End Date if currently working
              >
                <Text style={styles.input}>
                  {formData.endDate || 'Select end date'}
                </Text>
              </TouchableOpacity>
              {showDatePicker.endDate && (
                <DateTimePicker
                  value={formData.endDate ? new Date(formData.endDate) : new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker({ ...showDatePicker, endDate: false });
                    if (selectedDate) {
                      handleInputChange('endDate', selectedDate.toISOString());
                    }
                  }}
                />
              )}
              {touched.endDate && errors.endDate && (
                <Text style={styles.error}>{errors.endDate}</Text>
              )}
            </View>
            }
            <Input
              label="Address"
              value={formData.address.address}
              onChangeText={(value) => {
                setFormData((prev) => ({ ...prev, address: { ...prev.address, address: value } }));
              }}
              onBlur={() => handleBlur('address.address')}
              placeholder="Enter address"
              maxLength={80}
              error={errors.address?.address}
              touched={touched.address?.address}
            />
            <View>
            <Input
              label="Zip Code"
              value={formData.address.zipCode}
              onChangeText={(value) => {
                setFormData((prev) => ({ ...prev, address: { ...prev.address, zipCode: value } }));
                setIsTypingPhysicalZip(true);
              }}
              onBlur={() => handleBlur('address.zipCode')}
              placeholder="Enter zip code"
              keyboardType="numeric"
              error={errors.address?.zipCode}
              touched={touched.address?.zipCode}
            />
             {loadingPhysicalZipSuggestions && (
                <View style={styles.autocompleteLoadingContainer}>
                  <ActivityIndicator
                    size="small"
                    color={theme.colors.primary.main}
                  />
                  <TextStyle
                    variant="regular"
                    size="sm"
                    style={styles.loadingFieldText}>
                    Searching addresses...
                  </TextStyle>
                </View>
              )}
              {showPhysicalZipSuggestions &&
                physicalZipSuggestions.length > 0 && (
                  <View style={styles.suggestionsContainer}>
                    <FlatList
                      data={physicalZipSuggestions}
                      keyExtractor={item => item.placeId}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          style={styles.suggestionItem}
                          onPress={() => handlePhysicalAddressSelect(item)}>
                          <TextStyle variant="regular" size="sm">
                            {item.value}
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
            <Input
              label="City"
              value={formData.address.city}
              onChangeText={(value) => {
                setFormData((prev) => ({ ...prev, address: { ...prev.address, city: value } }));
              }}
              onBlur={() => handleBlur('address.city')}
              placeholder="Enter city"
              error={errors.address?.city}
              touched={touched.address?.city}
            />
            <Input
              label="State"
              value={formData.address.stateCode}
              onChangeText={(value) => {
                setFormData((prev) => ({ ...prev, address: { ...prev.address, stateCode: value } }));
              }}
              onBlur={() => handleBlur('address.stateCode')}
              placeholder="Enter state"
              error={errors.address?.stateCode}
              touched={touched.address?.stateCode}
            />
            <Input
              label="Country"
              value={formData.address.countryCode}
              onChangeText={(value) => {
                setFormData((prev) => ({ ...prev, address: { ...prev.address, countryCode: value } }));
              }}
              onBlur={() => handleBlur('address.countryCode')}
              placeholder="Enter country"
              error={errors.address?.countryCode}
              touched={touched.address?.countryCode}
            />
            <PhoneNumberInput
              label="Employer Mobile Number"
              onChangeText={(value: string) => handleInputChange('mobileNumber', value)}
              placeholder="Enter mobile number"
              maxLength={16}
              error={errors.mobileNumber}
              touched={touched.mobileNumber}
            />
            <Input
              label="Supervisor Name"
              value={formData.supervisorName}
              onChangeText={(value) => handleInputChange('supervisorName', value)}
              onBlur={() => handleBlur('supervisorName')}
              placeholder="Enter supervisor name"
              maxLength={128}
              error={errors.supervisorName}
              touched={touched.supervisorName}
            />
            <Text style={styles.label}>Reason for Leaving</Text>
            <TextInput
              style={[styles.inputArea, { height: 100, textAlignVertical: 'top' }]}
              placeholder="Enter reason for leaving"
              multiline
              maxLength={1024}
              value={formData.notes}
              onChangeText={(value) => handleInputChange('notes', value)}
            />
            {touched.notes && errors.notes && (
              <Text style={styles.error}>{errors.notes}</Text>
            )}
            <Text style={styles.label}>Summary of work</Text>
            <TextInput
              style={[styles.inputArea, { height: 100, textAlignVertical: 'top' }]}
              placeholder="Enter summary of work"
              multiline
              maxLength={1024}
              value={formData.summaryOfWork}
              onChangeText={(value) => handleInputChange('summaryOfWork', value)}
            />
            {touched.summaryOfWork && errors.summaryOfWork && (
              <Text style={styles.error}>{errors.summaryOfWork}</Text>
            )}
          </View>
          <View style={styles.formSection}>
            <TextStyle variant="medium" size="lg" style={styles.sectionTitle}>
              Work detail
            </TextStyle>
            <Input
              label="Number of facility beds"
              value={formData.numberOfFacilityBeds}
              onChangeText={(value) => handleInputChange('numberOfFacilityBeds', value)}
              onBlur={() => handleBlur('numberOfFacilityBeds')}
              placeholder="Enter number of facility beds"
              maxLength={128}
              error={errors.numberOfFacilityBeds}
              touched={touched.numberOfFacilityBeds}
            />
            <Input
              label="Number of beds in unit"
              value={formData.numberOfBedsInUnit}
              onChangeText={(value) => handleInputChange('numberOfBedsInUnit', value)}
              onBlur={() => handleBlur('numberOfBedsInUnit')}
              placeholder="Enter number of beds in unit"
              maxLength={128}
              error={errors.numberOfBedsInUnit}
              touched={touched.numberOfBedsInUnit}
            />
            <Text style={styles.label}>Employment type</Text>
            <DropDownPicker
              open={formData.employmentTypeOpen}
              setOpen={(open) => handleInputChange('employmentTypeOpen', open)}
              items={[
                { label: 'Full-time', value: 'full-time' },
                { label: 'Part-time', value: 'part-time' },
                { label: 'Contract', value: 'contract' },
              ]}
              value={formData.employmentType}
              setValue={(callback) => handleInputChange('employmentType', callback(formData.employmentType))}
              placeholder="Select employment type"
              searchable={false}
              listMode="SCROLLVIEW"
              style={[styles.dropdown, { zIndex: formData.employmentTypeOpen ? 10 : 1 }]}
              dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
            />
            <Input
              label="Nurse to patient ratio"
              value={formData.nurseToPatientRatio}
              onChangeText={(value) => handleInputChange('nurseToPatientRatio', value)}
              onBlur={() => handleBlur('nurseToPatientRatio')}
              placeholder="Enter nurse to patient ratio"
              maxLength={128}
              error={errors.nurseToPatientRatio}
              touched={touched.nurseToPatientRatio}
              required
            />
            <Text style={styles.label}>Charting system <TextStyle color='red'>*</TextStyle></Text>
            <DropDownPicker
              open={formData.ChartingsystemOpen}
              setOpen={(open) => handleInputChange('ChartingsystemOpen', open)}
              items={formData.ChartingsystemItems}
              value={formData.Chartingsystem}
              setValue={(callback) => handleInputChange('Chartingsystem', callback(formData.Chartingsystem))}
              placeholder="Select charting system"
              searchable={false}
              listMode="SCROLLVIEW"
              style={styles.dropdown}
              dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
            />
            <Text style={styles.label}>Shift</Text>
            <DropDownPicker
              open={formData.shiftOpen}
              setOpen={(open) => handleInputChange('shiftOpen', open)}
              items={[
                { label: 'Day', value: 'day' },
                { label: 'Night', value: 'night' },
                { label: 'Rotational', value: 'rotational' },
              ]}
              value={formData.shift}
              setValue={(callback) => handleInputChange('shift', callback(formData.shift))}
              placeholder="Select shift"
              searchable={false}
              listMode="SCROLLVIEW"
              style={[styles.dropdown, { zIndex: formData.shiftOpen ? 10 : 1 }]}
              dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
            />
            <View style={styles.chargeExperienceContainer}>
              <Text style={styles.label}>Charge Experience <TextStyle color='red'>*</TextStyle></Text>
              <View style={styles.checkboxGroup}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => handleInputChange('chargeExperience', 'yes')}
                >
                  <View
                    style={[
                      styles.checkbox,
                      formData.chargeExperience === 'yes' && styles.checkboxSelected,
                    ]}
                  />
                  <Text style={styles.checkboxLabel}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => handleInputChange('chargeExperience', 'no')}
                >
                  <View
                    style={[
                      styles.checkbox,
                      formData.chargeExperience === 'no' && styles.checkboxSelected,
                    ]}
                  />
                  <Text style={styles.checkboxLabel}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.saveButton}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowForm(false)}>
              <TextStyle>Cancel</TextStyle>
            </TouchableOpacity>
            <SaveButton title="Save" onPress={handleSave} disabled={!isFormValid} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddWorkHistory;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  body: {
    marginBottom: 25,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  formSection: {
    paddingBottom: theme.spacing.md,
  },
  inputArea: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    marginTop: 16,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  chargeExperienceContainer: {
    marginTop: 16,
  },
  checkboxGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    alignItems:'center',
    justifyContent:'center'
  },
  checkboxSelected: {
    backgroundColor: '#0A47E9',
    height:14,
    width:14
  },
  checkboxLabel: {
    fontSize: 14,
  },
  squareCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    alignItems:'center',
    justifyContent:'center'
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  inputGroup: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#fff', 
    paddingHorizontal: 16, 
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dropdownContainer: {
    maxHeight: 200,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: theme.colors.grey[300],
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginRight: 16
  },
  autocompleteLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.xs,
  },
  loadingFieldText: {
    marginLeft: theme.spacing.sm,
  },
  suggestionsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 80,
    backgroundColor: theme.colors.background.paper,
    borderWidth: 1,
    borderColor: theme.colors.grey[300],
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
    maxHeight: 200,
  },
  suggestionsList: {
    maxHeight: 200,
  },
  suggestionItem: {
    padding: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey[200],
  },
});