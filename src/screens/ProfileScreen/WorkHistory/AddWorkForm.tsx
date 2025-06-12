import React, {useCallback, useEffect, useState} from 'react';
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
import {theme} from '../../../theme';
import {Input} from '../../../components/common/Input';
import Toast from 'react-native-toast-message';
import {PhoneNumberInput} from '../../../components/common/PhoneInput';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TextStyle} from '../../../components/common/Text';
import {ProfileScreenHeader} from '../../../components/features/ProfileScreenHeader';
import {SaveButton} from '../../../components/features/SaveButton';
import {
  getCity,
  GetCityACResp,
  getGeoCoding,
} from '../../../api/services/autocomplete';
import moment from 'moment';
import {Checkbox} from '../../../components/common/Checkbox';
import {workHistorySchema} from '../../../validations/workHistorySchema';
import {
  workHistory,
  workHistoryProfessions,
} from '../../../constants/workHistoryProfessions';
import {workHistorySpeciality} from '../../../constants/workHistorySpecilaity';
import {chartingSystemsConstants} from '../../../constants/chartingConstants';
import {shiftList} from '../../../constants/shift';
import {workTypePreference} from '../../../constants/workTypePreference';
import {workHistoryTypeOfBusiness} from '../../../constants/workhistoryTypeOfBusiness';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '../../../config/env';
import { ENDPOINTS } from '../../../api/endPoints';
import { useAppSelector } from '../../../hooks/useAppDispatch';

interface AddWorkHistoryProps {
  setShowForm?: any;
}

const AddWorkHistory: React.FC<AddWorkHistoryProps> = ({setShowForm}) => {
  const WorkHistoryData = useAppSelector((state) => state?.candidateWorkHistory?.workHistory?.responsePayload) || [];
  console.log("tag WorkHistoryData",WorkHistoryData);
  const [showDatePicker, setShowDatePicker] = useState({
    startDate: false,
    endDate: false,
  });

  const initialValues = {
    facilityname: '',
    profession: '',
    specialty: '',
    typeofBusiness: '',
    startDate: '',
    endDate: '',
    address: {
      address: '',
      city: '',
      zipCode: '',
      stateCode: '',
      countryCode: '',
    },
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
    Chartingsystem: '',
  };
  const [isTypingPhysicalZip, setIsTypingPhysicalZip] = useState(false);
  const [physicalZipSuggestions, setPhysicalZipSuggestions] = useState<
    GetCityACResp[]
  >([]);
  const [cityJustSelected, setCityJustSelected] = useState(false);
  const [loadingPhysicalZipSuggestions, setLoadingPhysicalZipSuggestions] =
    useState(false);
  const [showPhysicalZipSuggestions, setShowPhysicalZipSuggestions] =
    useState(false);
  const [professionOpen, setProfessionOpen] = useState(false);
  const [specialtyOpen, setSpecialtyOpen] = useState(false);
  const [specialtyItems, setSpecialtyItems] = useState([]);
  const [formData, setFormData] = useState(initialValues);
  const [touched, setTouched] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = useCallback(async () => {
    try {
      await workHistorySchema.validate(formData, {abortEarly: false});
      setErrors({});
      setIsFormValid(true);
      return true;
    } catch (validationErrors: any) {
      const newErrors: any = {};
      validationErrors.inner.forEach((error: any) => {
        if (error.path) {
          if (error.path.includes('.')) {
            const [parent, child] = error.path.split('.');
            newErrors[parent] = {...newErrors[parent], [child]: error.message};
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
    validateForm(); //
  }, [formData, validateForm]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({...prev, [field]: value}));
    setTouched((prev: any) => ({...prev, [field]: true}));
  };

  const handleBlur = (field: string) => {
    setTouched((prev: any) => ({...prev, [field]: true}));
    validateForm();
  };

  const handleSave = async () => {
    const isValid = await validateForm();
    if (!isValid) {
      Toast.show({
        type: 'error',
        text1: 'Please fill all mandatory fields correctly.',
      });
      return;
    }    
      const payload = [
        WorkHistoryData?.[0] ? {...WorkHistoryData[0]} : {},
        {
          workedWith: formData.facilityname,
          title: formData.profession,
          skillsWorked: formData.specialty,
          typeOfBusiness: formData.typeofBusiness,
          workedFrom: moment(formData.startDate).format('YYYYMM'),
          workedTill: moment(formData.endDate).format('YYYYMM'),
          currentlyWorking: formData.currentlyWorking,
          address: formData.address.address,
          zipCode: formData.address.zipCode,
          city: formData.address.city,
          state: formData.address.stateCode,
          country: formData.address.countryCode,
          employerPhoneNumber: formData.mobileNumber,
          supervisorName: formData.supervisorName,
          reasonForLeaving: formData.notes,
          summaryOfWork: formData.summaryOfWork,
          additionalDetails: [
            {
              numberOfFacilityBeds: formData.numberOfFacilityBeds,
              numberOfBedsInUnit: formData.numberOfBedsInUnit,
              employmentType: formData.employmentType,
              nurseToPatientRatio: `1:${formData.nurseToPatientRatio}`,
              chartingSystem: formData.Chartingsystem,
              shift: formData.shift,
              chargeExperience: formData.chargeExperience,
            }
          ]
        }
      ];
    
      try {
        const token = await AsyncStorage.getItem('auth_token');
        const apiUrl = `${ENV.DEV_API_URL}${ENDPOINTS.CANDIDATE.workHistory}`;
        const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        console.log('tag response', response);
        const data = await response?.json();
        console.log('Work history saved:', data);
        if (response.ok) {
          Toast.show({
            type: 'success',
            text1: 'Work history saved successfully',
          });
        } else {
          console.error('Error saving work history:');
          Toast.show({
            type: 'error',
            text1: 'Failed to save work history',
          });
        }
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
      console.log('tag addressDetails', addressDetails);
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          countryCode: addressDetails.countryName,
          stateCode: addressDetails.stateName,
          city: addressDetails.city,
          zipCode: addressDetails.zipcode,
        },
      });
    } catch (error) {
      console.error('Error processing selected address:', error);
    } finally {
      setLoadingPhysicalZipSuggestions(false);
    }
  };

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
  }, [formData?.address?.zipCode, isTypingPhysicalZip, cityJustSelected]);

  useEffect(() => {
    if (formData?.profession) {
      const keyValue = workHistory.find(
        item => item.label === formData.profession,
      );
      const filtered = workHistorySpeciality.filter(
        item => item.key === keyValue?.value,
      );
      setSpecialtyItems(
        filtered.map(({label, value}) => ({label, value: label})),
      );
    } else {
      setSpecialtyItems([]);
    }
  }, [formData?.profession]);

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
            <TextStyle variant="medium" size="lg" style={styles.sectionTitle}>
              Employment Information
            </TextStyle>
            <Input
              label="Worked with/Facility Name"
              value={formData.facilityname}
              onChangeText={value => handleInputChange('facilityname', value)}
              onBlur={() => handleBlur('facilityname')}
              placeholder="Enter facility name"
              maxLength={128}
              error={errors.facilityname}
              touched={touched.facilityname}
              required
            />
            <Text style={styles.label}>
              Profession <Text style={styles.asterisk}>*</Text>
            </Text>
            <DropDownPicker
              open={professionOpen}
              setOpen={open => setProfessionOpen(open)}
              items={workHistoryProfessions}
              value={formData.profession}
              setValue={callback =>
                setFormData({
                  ...formData,
                  profession: callback(formData.profession),
                })
              }
              placeholder="Search profession"
              searchable={false}
              searchPlaceholder="Search..."
              listMode="SCROLLVIEW"
              style={[styles.dropdown, {zIndex: professionOpen ? 10 : 1}]}
              dropDownContainerStyle={[
                styles.dropdownContainer,
                {zIndex: 1000},
              ]}
            />

            <Text style={styles.label}>
              Primary Specialty <Text style={styles.asterisk}>*</Text>
            </Text>
            <DropDownPicker
              open={specialtyOpen}
              setOpen={setSpecialtyOpen}
              items={specialtyItems}
              value={formData.specialty}
              setValue={callback =>
                setFormData({
                  ...formData,
                  specialty: callback(formData.specialty),
                })
              }
              placeholder="Search primary specialty"
              searchable={false}
              searchPlaceholder="Search..."
              listMode="SCROLLVIEW"
              disabled={!formData.profession}
              style={[styles.dropdown, {zIndex: specialtyOpen ? 10 : 1}]}
              dropDownContainerStyle={[
                styles.dropdownContainer,
                {zIndex: 1000},
              ]}
            />
            <Text style={styles.label}>
              Type of Business/Facility <Text style={styles.asterisk}>*</Text>
            </Text>
            <DropDownPicker
              open={formData.typeofBusinessOpen}
              setOpen={open => handleInputChange('typeofBusinessOpen', open)}
              items={workHistoryTypeOfBusiness}
              value={formData.typeofBusiness}
              setValue={callback =>
                handleInputChange(
                  'typeofBusiness',
                  callback(formData.typeofBusiness),
                )
              }
              placeholder="Select type of business"
              searchable={false}
              listMode="SCROLLVIEW"
              style={[
                styles.dropdown,
                {zIndex: formData.typeofBusinessOpen ? 10 : 1},
              ]}
              dropDownContainerStyle={[
                styles.dropdownContainer,
                {zIndex: 1000},
              ]}
            />
            {touched.typeofBusiness && errors.typeofBusiness && (
              <Text style={styles.error}>{errors.typeofBusiness}</Text>
            )}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Start Date<Text style={styles.asterisk}>*</Text>
              </Text>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() =>
                  setShowDatePicker({...showDatePicker, startDate: true})
                }>
                <Text style={styles.input}>
                  {moment(formData.startDate).format('DD/YYYY') ||
                    'Select start date'}
                </Text>
              </TouchableOpacity>
              {showDatePicker.startDate && (
                <DateTimePicker
                  value={
                    formData.startDate
                      ? new Date(formData.startDate)
                      : new Date()
                  }
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker({...showDatePicker, startDate: false});
                    if (selectedDate) {
                      handleInputChange(
                        'startDate',
                        selectedDate.toISOString(),
                      );
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
                label="I am currently working here"
                onChange={() =>
                  handleInputChange(
                    'currentlyWorking',
                    !formData.currentlyWorking,
                  )
                }
              />
            </View>

            {!formData?.currentlyWorking && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  End Date<Text style={styles.asterisk}>*</Text>
                </Text>
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() =>
                    setShowDatePicker({...showDatePicker, endDate: true})
                  }
                  disabled={formData.currentlyWorking} // Disable End Date if currently working
                >
                  <Text style={styles.input}>
                    {formData.endDate || 'Select end date'}
                  </Text>
                </TouchableOpacity>
                {showDatePicker.endDate && (
                  <DateTimePicker
                    value={
                      formData.endDate ? new Date(formData.endDate) : new Date()
                    }
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker({...showDatePicker, endDate: false});
                      if (selectedDate) {
                        handleInputChange(
                          'endDate',
                          selectedDate.toISOString(),
                        );
                      }
                    }}
                  />
                )}
                {touched.endDate && errors.endDate && (
                  <Text style={styles.error}>{errors.endDate}</Text>
                )}
              </View>
            )}
            <TextStyle variant="medium" size="lg" style={styles.sectionTitle}>
              Location & Contact
            </TextStyle>
            <Input
              required
              label="Address"
              value={formData.address.address}
              onChangeText={value => {
                setFormData(prev => ({
                  ...prev,
                  address: {...prev.address, address: value},
                }));
              }}
              onBlur={() => handleBlur('address.address')}
              placeholder="Enter address"
              maxLength={80}
              error={errors.address?.address}
              touched={touched.address?.address}
            />
            <View>
              <Input
                required
                label="Zip Code"
                value={formData.address.zipCode}
                onChangeText={value => {
                  setFormData(prev => ({
                    ...prev,
                    address: {...prev.address, zipCode: value},
                  }));
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
              required
              label="City"
              value={formData.address.city}
              onChangeText={value => {
                setFormData(prev => ({
                  ...prev,
                  address: {...prev.address, city: value},
                }));
              }}
              onBlur={() => handleBlur('address.city')}
              placeholder="Enter city"
              error={errors.address?.city}
              touched={touched.address?.city}
            />
            <Input
              required
              label="State"
              value={formData.address.stateCode}
              onChangeText={value => {
                setFormData(prev => ({
                  ...prev,
                  address: {...prev.address, stateCode: value},
                }));
              }}
              onBlur={() => handleBlur('address.stateCode')}
              placeholder="Enter state"
              error={errors.address?.stateCode}
              touched={touched.address?.stateCode}
            />
            <Input
              required
              label="Country"
              value={formData.address.countryCode}
              onChangeText={value => {
                setFormData(prev => ({
                  ...prev,
                  address: {...prev.address, countryCode: value},
                }));
              }}
              onBlur={() => handleBlur('address.countryCode')}
              placeholder="Enter country"
              error={errors.address?.countryCode}
              touched={touched.address?.countryCode}
            />
            <PhoneNumberInput
              label="Employer Mobile Number"
              onChangeText={(value: string) =>
                handleInputChange('mobileNumber', value)
              }
              placeholder="Enter mobile number"
              maxLength={16}
            />
            <Input
              label="Supervisor Name"
              value={formData.supervisorName}
              onChangeText={value => handleInputChange('supervisorName', value)}
              onBlur={() => handleBlur('supervisorName')}
              placeholder="Enter supervisor name"
              maxLength={128}
            />
            <Text style={styles.label}>Reason for Leaving</Text>
            <TextInput
              style={[
                styles.inputArea,
                {height: 100, textAlignVertical: 'top'},
              ]}
              placeholder="Enter reason for leaving"
              multiline
              maxLength={1024}
              value={formData.notes}
              onChangeText={value => handleInputChange('notes', value)}
            />
            {touched.notes && errors.notes && (
              <Text style={styles.error}>{errors.notes}</Text>
            )}
            <Text style={styles.label}>Summary of work</Text>
            <TextInput
              style={[
                styles.inputArea,
                {height: 100, textAlignVertical: 'top'},
              ]}
              placeholder="Enter summary of work"
              multiline
              maxLength={1024}
              value={formData.summaryOfWork}
              onChangeText={value => handleInputChange('summaryOfWork', value)}
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
              onChangeText={value =>
                handleInputChange('numberOfFacilityBeds', value)
              }
              onBlur={() => handleBlur('numberOfFacilityBeds')}
              placeholder="Enter number of facility beds"
              maxLength={128}
            />
            <Input
              label="Number of beds in unit"
              value={formData.numberOfBedsInUnit}
              onChangeText={value =>
                handleInputChange('numberOfBedsInUnit', value)
              }
              onBlur={() => handleBlur('numberOfBedsInUnit')}
              placeholder="Enter number of beds in unit"
              maxLength={128}
            />
            <Text style={styles.label}>Employment type</Text>
            <DropDownPicker
              open={formData.employmentTypeOpen}
              setOpen={open => handleInputChange('employmentTypeOpen', open)}
              items={workTypePreference}
              value={formData.employmentType}
              setValue={callback =>
                handleInputChange(
                  'employmentType',
                  callback(formData.employmentType),
                )
              }
              placeholder="Select employment type"
              searchable={false}
              listMode="SCROLLVIEW"
              style={[
                styles.dropdown,
                {zIndex: formData.employmentTypeOpen ? 10 : 1},
              ]}
              dropDownContainerStyle={[
                styles.dropdownContainer,
                {zIndex: 1000},
              ]}
            />
            <View style={{marginTop: 12}} />
            <Input
              label="Nurse to patient ratio (1:)"
              value={formData.nurseToPatientRatio}
              onChangeText={value =>
                handleInputChange('nurseToPatientRatio', value)
              }
              onBlur={() => handleBlur('nurseToPatientRatio')}
              placeholder="Enter nurse to patient ratio"
              maxLength={128}
              error={errors.nurseToPatientRatio}
              touched={touched.nurseToPatientRatio}
              required
            />
            <Text style={styles.label}>
              Charting system <Text style={styles.asterisk}>*</Text>
            </Text>
            <DropDownPicker
              open={formData.ChartingsystemOpen}
              setOpen={open => handleInputChange('ChartingsystemOpen', open)}
              items={chartingSystemsConstants.map(item => ({
                label: item,
                value: item,
              }))}
              value={formData.Chartingsystem}
              setValue={callback =>
                handleInputChange(
                  'Chartingsystem',
                  callback(formData.Chartingsystem),
                )
              }
              placeholder="Select charting system"
              searchable={false}
              listMode="SCROLLVIEW"
              style={styles.dropdown}
              dropDownContainerStyle={[
                styles.dropdownContainer,
                {zIndex: 1000},
              ]}
            />
            <Text style={styles.label}>Shift<Text style={styles.asterisk}>*</Text></Text>
            <DropDownPicker
              open={formData.shiftOpen}
              setOpen={open => handleInputChange('shiftOpen', open)}
              items={shiftList}
              value={formData.shift}
              setValue={callback =>
                handleInputChange('shift', callback(formData.shift))
              }
              placeholder="Select shift"
              searchable={false}
              listMode="SCROLLVIEW"
              style={[styles.dropdown, {zIndex: formData.shiftOpen ? 10 : 1}]}
              dropDownContainerStyle={[
                styles.dropdownContainer,
                {zIndex: 1000},
              ]}
            />
            <View style={styles.chargeExperienceContainer}>
              <Text style={styles.label}>
                Charge Experience <Text style={styles.asterisk}>*</Text>
              </Text>
              <View style={styles.checkboxGroup}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => handleInputChange('chargeExperience', 'yes')}>
                  <View
                    style={[
                      styles.checkbox,
                      formData.chargeExperience === 'yes' &&
                        styles.checkboxSelected,
                    ]}
                  />
                  <Text style={styles.checkboxLabel}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => handleInputChange('chargeExperience', 'no')}>
                  <View
                    style={[
                      styles.checkbox,
                      formData.chargeExperience === 'no' &&
                        styles.checkboxSelected,
                    ]}
                  />
                  <Text style={styles.checkboxLabel}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.saveButton}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowForm(false)}>
              <TextStyle>Cancel</TextStyle>
            </TouchableOpacity>
            <SaveButton
              title="Save"
              onPress={handleSave}
              disabled={!isFormValid}
            />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#0A47E9',
    height: 14,
    width: 14,
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
    alignItems: 'center',
    justifyContent: 'center',
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
    marginRight: 16,
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
  asterisk: {
    color: theme.colors.status.error,
  },
});
