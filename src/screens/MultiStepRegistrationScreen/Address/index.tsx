/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../../theme';
import { Input } from '../../../components/common/Input';
import { getCity, getGeoCoding } from '../../../api/services/autocomplete';
import { TextStyle } from '../../../components/common/Text';
import { FlatList } from 'react-native-gesture-handler';

type GetCityACResp = {value: string; placeId: string};

const AddressInfoScreen = ({ data, onChange, errors, touched, setTouched }) => {
  const navigation = useNavigation();
  const [isTypingPhysicalZip, setIsTypingPhysicalZip] = useState(false);
  const [physicalZipSuggestions, setPhysicalZipSuggestions] = useState<GetCityACResp[]>([]);
  const [cityJustSelected, setCityJustSelected] = useState(false);
  const [loadingPhysicalZipSuggestions, setLoadingPhysicalZipSuggestions] = useState(false);
  const [showPhysicalZipSuggestions, setShowPhysicalZipSuggestions] = useState(false);

  const handlePhysicalAddressSelect = async (item: GetCityACResp) => {
    setShowPhysicalZipSuggestions(false);
    setIsTypingPhysicalZip(false);
    setLoadingPhysicalZipSuggestions(true);

    try {
      const addressDetails = await getGeoCoding(item.placeId);
      console.log("tag addressDetails",addressDetails);
      onChange({ ...data, addressDetails:{...data.addressDetails,countryCode:addressDetails.countryName,stateCode:addressDetails.stateName,city:addressDetails.city,zipCode:addressDetails.zipcode}});
    } catch (error) {
      console.error('Error processing selected address:', error);
    } finally {
      setLoadingPhysicalZipSuggestions(false);
    }
  };

  useEffect(() => {
    const handlePhysicalZipSearch = async () => {
      const zipCode = data.addressDetails.zipCode;
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
    data?.addressDetails?.zipCode,
    isTypingPhysicalZip,
    cityJustSelected,
  ]);
console.log("tag physicalZipSuggestions",physicalZipSuggestions)
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View >
          <View style={styles.radioGroup}>
          <TouchableOpacity 
            style={styles.radioButton} 
            onPress={() => {
              onChange({ ...data, isBothSame: false, isCurrent: false, isPermanent: true});
            }}
          >
            <View style={styles.radioCircle}>
              {data.isPermanent && <View style={styles.selectedRb} />}
            </View>
            <Text style={styles.radioLabel}>Permanent Address</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.radioButton} 
            onPress={() => {
              onChange({ ...data, isBothSame: false, isCurrent: true, isPermanent: false});
            }}
          >
            <View style={styles.radioCircle}>
              {data.isCurrent && <View style={styles.selectedRb} />}
            </View>
            <Text style={styles.radioLabel}>Current Address</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.radioButton} 
            onPress={() => {
              onChange({ ...data, isBothSame: true, isCurrent: false, isPermanent: false});
            }}
          >
            <View style={styles.radioCircle}>
              {data.isBothSame && <View style={styles.selectedRb} />}
            </View>
            <Text style={styles.radioLabel}>Both (Same Address)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <Input
            label="Address"
            required
            value={data.addressDetails.address}
            onChangeText={(text) => {
              onChange({ ...data, addressDetails: { ...data?.addressDetails, address: text } });
            }}
            error={errors?.addressDetails?.address}
            touched={touched?.addressDetails?.address}
            placeholder="Enter Address"
            onBlur={() => setTouched({ ...touched, addressDetails: { ...touched?.addressDetails, address: true } })}
          />
          <View>
          <Input
            label="Zip Code"
            required
            value={data.addressDetails.zipCode}
            onChangeText={(text) => {
              onChange({ ...data, addressDetails: { ...data?.addressDetails, zipCode: text } });
              setIsTypingPhysicalZip(true);
            }}
            error={errors?.addressDetails?.zipCode}
            touched={touched?.addressDetails?.zipCode}
            keyboardType="numeric"
            placeholder="Enter ZIP code to find address"
            onBlur={() => setTouched({ ...touched, addressDetails: { ...touched?.addressDetails, zipCode: true } })}
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
            required
            value={data.addressDetails.city}
            onChangeText={(text) => {
              onChange({ ...data, addressDetails: { ...data.addressDetails, city: text } });
            }}
            touched={touched?.addressDetails?.city}
            error={errors?.addressDetails?.city}
            placeholder="Enter city name"
            onBlur={() => setTouched({ ...touched, addressDetails: { ...touched?.addressDetails, city: true } })}
          />

          <Input
            label="State"
            value={data.addressDetails.stateCode}
            onChangeText={(text) => {
              onChange({ ...data, addressDetails: { ...data.addressDetails, stateCode: text } });
            }}
            onBlur={() => setTouched({ ...touched, addressDetails: { ...touched?.addressDetails, stateCode: true } })}
          />

          <Input
            label="Country"
            value={data.addressDetails.countryCode}
            onChangeText={(text) => {
              onChange({ ...data, addressDetails: { ...data.addressDetails, countryCode: text } });
            }}
            onBlur={() => setTouched({ ...touched, addressDetails: { ...touched?.addressDetails, countryCode: true } })}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  formSection: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: 8,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop:10
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    // borderColor: theme.colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 50,
    backgroundColor: theme.colors.blue.light,
  },
  radioLabel: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
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

export default AddressInfoScreen;
