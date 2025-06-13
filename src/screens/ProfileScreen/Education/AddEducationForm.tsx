import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { theme } from '../../../theme';
import { Input } from '../../../components/common/Input';
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextStyle } from '../../../components/common/Text';
import { ProfileScreenHeader } from "../../../components/features/ProfileScreenHeader";
import { SaveButton } from "../../../components/features/SaveButton";
import { Checkbox } from "../../../components/common/Checkbox";
import { educationSchema } from "../../../validations/educationSchema";
import { yesNoMap } from "../../../constants/yesNoMap";
import { educationVerificationStatus } from "../../../constants/educationVerificationSTatus";
import { educationLevel } from "../../../constants/educationLevel";
import { modeOfEducation } from "../../../constants/modeOfEducation";
import moment from "moment";
import { getCity, GetCityACResp, getGeoCoding } from "../../../api/services/autocomplete";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENV } from "../../../config/env";
import { ENDPOINTS } from "../../../api/endPoints";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppDispatch";
import { fetchCandidateEducations } from "../../../store/thunk/candidateEducation.thunk";

interface AddEducationProps {
  setShowForm?: any;
}

export const AddEducationForm: React.FC<AddEducationProps> = ({ setShowForm }) => {
  const dispatch = useAppDispatch();
  const EducationHistoryData = useAppSelector((state) => state?.candidateEducation?.educations?.responsePayload) || [];
  const [formValues, setFormValues] = useState({
    levelOfEducation: '',
    modeOfEducation: '',
    degreeName: '',
    universityName: '',
    startDate: '',
    endDate: '',
    currentlyStudying: false,
    specialisation: '',
    grade: '',
    certifiedDate: '',
    graduationStatus: false,
    verificationStatus:'',
    city: '',
    state: '',
    country: '',
    document: null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [document, setDocument] = useState<any>(null);
  const [levelOfEducationOpen, setLevelOfEducationOpen] = useState(false);
  const [modeOfEducationOpen, setModeOfEducationOpen] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showCertifiedDatePicker, setShowCertifiedDatePicker] = useState(false);
  const [graduationStatusOpen, setGraduationStatusOpen] = useState(false);
  const [verificationStatusOpen, setVerificationStatusOpen] = useState(false);
  const [activeSubmitBtn,setActiveSubmitBtn] = useState(false);
  const [isTypingPhysicalZip, setIsTypingPhysicalZip] = useState(false);
  const [physicalZipSuggestions, setPhysicalZipSuggestions] = useState<GetCityACResp[]>([]);
  const [cityJustSelected, setCityJustSelected] = useState(false);
  const [loadingPhysicalZipSuggestions, setLoadingPhysicalZipSuggestions] = useState(false);
  const [showPhysicalZipSuggestions, setShowPhysicalZipSuggestions] = useState(false);

  const handlePhysicalAddressSelect = async (item: GetCityACResp) => {
    setShowPhysicalZipSuggestions(false);
    setIsTypingPhysicalZip(false);
    setLoadingPhysicalZipSuggestions(true);
    setCityJustSelected(true);

    try {
      const addressDetails = await getGeoCoding(item.placeId);
      setFormValues(prev=>({ ...prev, state: addressDetails?.state,city:addressDetails?.city,country:addressDetails?.countryName }));
    } catch (error) {
      console.error('Error processing selected address:', error);
    } finally {
      setLoadingPhysicalZipSuggestions(false);
    }
  };

  useEffect(() => {
    const handlePhysicalZipSearch = async () => {
      const zipCode = formValues.city;
      if (
        isTypingPhysicalZip &&
        !cityJustSelected &&
        zipCode &&
        zipCode.length >= 1
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
    };

    const debounce = setTimeout(handlePhysicalZipSearch, 500);
    return () => clearTimeout(debounce);
  }, [formValues?.city, isTypingPhysicalZip, cityJustSelected]);

  const validateForm = useCallback(async () => {
    try {
      await educationSchema.validate(formValues, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors: { [key: string]: string } = {};
      validationErrors?.inner?.forEach((error: any) => {
        if (error.path) newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  }, [formValues]);

  const handleInputChange = (field: string, value: any) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const handleSave = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    setActiveSubmitBtn(true); // Disable the button during save
    console.log('Saving education details:', formValues);
    const payload = [
      ...EducationHistoryData,
      {
        levelOfEducation: formValues?.levelOfEducation || "",
        modeOfEducation: formValues?.modeOfEducation || "",
        universityName:  formValues?.universityName || "",
        nameOfDegree: formValues?.degreeName || "",
        joinedWhen: moment(formValues?.startDate).format('YYYYMM') || "",
        completedWhen: moment(formValues?.endDate).format('YYYYMM') || "",
        currentlyStudying: formValues?.currentlyStudying || "",
        specialisation: formValues?.specialisation || "",
        grade: formValues?.grade || "",
        certifiedWhen: moment(formValues?.certifiedDate).format('YYYYMM') || "",
        graduationStatus: formValues?.graduationStatus || "",
        verificationStatus: formValues?.verificationStatus || "",
        city: formValues?.city || "",
        country: formValues?.country || "",
        state: formValues?.state || "",
        documentUrl: formValues?.document || ""
      }
    ]
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const apiUrl = `${ENV.DEV_API_URL}${ENDPOINTS.CANDIDATE.educations}`;
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
        dispatch(fetchCandidateEducations());
        setShowForm(false);
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
    }finally {
      setActiveSubmitBtn(false); // Re-enable the button after save
    }
  };

  const checkStatus = useCallback(async () => {
    if (formValues.levelOfEducation && formValues.modeOfEducation && formValues.degreeName && formValues.universityName && formValues.startDate && (formValues.currentlyStudying || formValues.endDate) && formValues.graduationStatus && formValues.city && formValues.state && formValues.country) {
      const isValid = await validateForm();
      setActiveSubmitBtn(isValid);
    } else {
      setActiveSubmitBtn(false);
    }
  }, [formValues, validateForm]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.body}>
          <ProfileScreenHeader
            headerTitle='Education'
            completedStatus={activeSubmitBtn}
            headerIcon={'school-outline'}
          />
          <View style={styles.formSection}>
            {/* Level of Education */}
            <Text style={styles.label}>Level of Education <Text style={styles.asterisk}>*</Text></Text>
            <DropDownPicker
              open={levelOfEducationOpen}
              setOpen={setLevelOfEducationOpen}
              items={educationLevel}
              value={formValues.levelOfEducation}
              setValue={(callback) => handleInputChange('levelOfEducation', callback(formValues.levelOfEducation))}
              placeholder="Select level of education"
              searchable={false}
              listMode="SCROLLVIEW"
              style={[styles.dropdown, { zIndex: levelOfEducationOpen ? 10 : 1 }]}
              dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
            />
            {errors.levelOfEducation && <Text style={styles.error}>{errors.levelOfEducation}</Text>}

            {/* Mode of Education */}
            <Text style={styles.label}>Mode of Education <Text style={styles.asterisk}>*</Text></Text>
            <DropDownPicker
              open={modeOfEducationOpen}
              setOpen={setModeOfEducationOpen}
              items={modeOfEducation}
              value={formValues.modeOfEducation}
              setValue={(callback) => handleInputChange('modeOfEducation', callback(formValues.modeOfEducation))}
              placeholder="Select mode of education"
              searchable={false}
              listMode="SCROLLVIEW"
              style={[styles.dropdown, { zIndex: modeOfEducationOpen ? 10 : 1 }]}
              dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
            />
            {errors.modeOfEducation && <Text style={styles.error}>{errors.modeOfEducation}</Text>}

            {/* Name of Degree */}
            <Input
              label="Name of Degree"
              required
              value={formValues.degreeName}
              onChangeText={(value) => handleInputChange('degreeName', value)}
              placeholder="Enter name of degree"
              maxLength={128}
              error={errors.degreeName}
            />

            {/* University Name */}
            <Input
              label="University Name"
              required
              value={formValues.universityName}
              onChangeText={(value) => handleInputChange('universityName', value)}
              placeholder="Enter university name"
              maxLength={128}
              error={errors.universityName}
            />

            {/* Start Date */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Start Date <Text style={styles.asterisk}>*</Text></Text>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowStartDatePicker(true)}
              >
                <Text style={styles.input}>
                  {formValues.startDate ? moment(formValues.startDate).format('DD/YYYY') :
                                      'Select start date'}
                </Text>
              </TouchableOpacity>
              {showStartDatePicker && (
                <DateTimePicker
                  value={formValues.startDate ? new Date(formValues.startDate) : new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                     setShowStartDatePicker(false);
                    if (selectedDate) {
                      handleInputChange('startDate', selectedDate.toISOString());
                    }
                  }}
                />
              )}
              {errors.startDate && <Text style={styles.error}>{errors.startDate}</Text>}
            </View>

            {/* Currently Studying Checkbox */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                checked={formValues.currentlyStudying}
                onChange={(val) => {
                  // handleInputChange('currentlyStudying', val);
                  // if (val) {
                    setFormValues(prev=>({...prev,endDate:'',currentlyStudying:val}))
                  // }else{
                  //   setFormValues(prev=>({...prev,endDate:'',currentlyStudying:val}))
                  // }
                }}
                label="I am currently studying here"
              />
            </View>

            {/* End Date */}
            {!formValues.currentlyStudying && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>End Date <Text style={styles.asterisk}>*</Text></Text>
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setShowEndDatePicker(true)}
                >
                  <Text style={styles.input}>
                  {formValues.endDate ? moment(formValues.endDate).format('DD/YYYY') :
                                      'Select end date'}
                  </Text>
                </TouchableOpacity>
                {showEndDatePicker && (
                  <DateTimePicker
                    value={formValues.endDate ? new Date(formValues.endDate) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowEndDatePicker(false);
                      if (selectedDate) {
                        handleInputChange('endDate', selectedDate.toISOString());
                      }
                    }}
                  />
                )}
                {errors.endDate && <Text style={styles.error}>{errors.endDate}</Text>}
              </View>
            )}

            {/* Specialisation */}
            <Input
              label="Specialisation"
              value={formValues.specialisation}
              onChangeText={(value) => handleInputChange('specialisation', value)}
              placeholder="Enter specialisation"
              maxLength={32}
              error={errors.specialisation}
            />

            {/* Grade */}
            <Input
              label="Grade"
              value={formValues.grade}
              onChangeText={(value) => handleInputChange('grade', value)}
              placeholder="Enter grade"
              maxLength={32}
              error={errors.grade}
            />

            {/* Certified Date */}
             {/* Start Date */}
             <View style={styles.inputGroup}>
              <Text style={styles.label}>Certificate Date</Text>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowCertifiedDatePicker(true)}
              >
                <Text style={styles.input}>
                  {formValues.certifiedDate ? moment(formValues.startDate).format('DD/YYYY') :
                                      'Select certificate date'}
                </Text>
              </TouchableOpacity>
              {showCertifiedDatePicker && (
                <DateTimePicker
                  value={formValues.certifiedDate ? new Date(formValues.certifiedDate) : new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                     setShowCertifiedDatePicker(false);
                    if (selectedDate) {
                      handleInputChange('certifiedDate', selectedDate.toISOString());
                    }
                  }}
                />
              )}
            </View>

            <Text style={styles.label}>
              Graduation Status <Text style={styles.asterisk}>*</Text>
            </Text>
            <DropDownPicker
              open={graduationStatusOpen}
              setOpen={setGraduationStatusOpen}
              items={yesNoMap}
              value={formValues.graduationStatus}
              setValue={callback =>
                handleInputChange(
                  'graduationStatus',
                  callback(formValues.graduationStatus),
                )
              }
              placeholder="Select graduation status"
              searchable={false}
              listMode="SCROLLVIEW"
              style={styles.dropdown}
              dropDownContainerStyle={[
                styles.dropdownContainer,
                {zIndex: 1000},
              ]}
            />
            <Text style={styles.label}>
              Verification Status
            </Text>
            <DropDownPicker
              open={verificationStatusOpen}
              setOpen={setVerificationStatusOpen}
              items={educationVerificationStatus}
              value={formValues.verificationStatus}
              setValue={callback =>
                handleInputChange(
                  'verificationStatus',
                  callback(formValues.verificationStatus),
                )
              }
              placeholder="Select verification status"
              searchable={false}
              listMode="SCROLLVIEW"
              style={styles.dropdown}
              dropDownContainerStyle={[
                styles.dropdownContainer,
                {zIndex: 1000},
              ]}
            />
            {/* Location Fields */}
            <Input
              required
              label="City"
              value={formValues.city}
              onChangeText={(value) => {
                handleInputChange('city', value);
                setIsTypingPhysicalZip(true);
                setCityJustSelected(false);
              }}
              placeholder="Enter city"
              error={errors.city}
            />
             {loadingPhysicalZipSuggestions && (
                      <View style={styles.autocompleteLoadingContainer}>
                        <ActivityIndicator size="small" color={theme.colors.primary.main} />
                        <TextStyle variant="regular" size="sm" style={styles.loadingFieldText}>
                          Searching addresses...
                        </TextStyle>
                      </View>
            )}
            {showPhysicalZipSuggestions && physicalZipSuggestions.length > 0 && (
              <View style={styles.suggestionsContainer}>
                <FlatList
                  data={physicalZipSuggestions}
                  keyExtractor={item => item.placeId}
                  renderItem={({ item }) => (
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
            <Input
              required
              label="State"
              value={formValues.state}
              onChangeText={(value) => handleInputChange('state', value)}
              placeholder="Enter state"
              error={errors.state}
            />
            <Input
              required
              label="Country"
              value={formValues.country}
              onChangeText={(value) => handleInputChange('country', value)}
              placeholder="Enter country"
              error={errors.country}
            />

            {/* Document Upload */}

            {document ? (
              <View style={styles.documentContainer}>
                <Text style={styles.documentName}>{document.name}</Text>
                <TouchableOpacity onPress={() => setDocument(null)}>
                  <Text style={styles.removeDocument}>Remove</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.uploadButton} onPress={() => Alert.alert('Upload Document')}>
                <Text style={styles.uploadButtonText}>Upload Document</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.label}>Accepted File Formats: PNG, JPEG, JPG, DOC, DOCX, PDF up to 10 MB</Text>

          </View>
        </View>
      </ScrollView>
      <View style={styles.saveButton}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => setShowForm(false)}>
          <TextStyle>Cancel</TextStyle>
        </TouchableOpacity>
        <SaveButton
          title="Save"
          onPress={handleSave}
          disabled={!activeSubmitBtn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
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
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    marginTop: 16,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  saveBtn: {
    marginTop: 24,
    backgroundColor: '#0A47E9',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  squareCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
  },
  checkboxSelected: {
    backgroundColor: '#0A47E9',
  },
  checkboxLabel: {
    fontSize: 14,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginTop: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  uploadButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  uploadButtonText: {
    color: '#0A47E9',
    fontWeight: '500',
  },
  documentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  documentName: {
    flex: 1,
    marginRight: 8,
  },
  removeDocument: {
    color: 'red',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: theme.colors.grey[300],
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginRight: 16
  },
  asterisk: {
    color: theme.colors.status.error,
  },
  autocompleteLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  loadingFieldText: {
    marginLeft: 8,
    color: theme.colors.text.secondary,
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    maxHeight: 200,
    borderRadius: 4,
    marginTop: 4,
  },
  suggestionItem: {
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  suggestionsList: {
    maxHeight: 150,
  },
});