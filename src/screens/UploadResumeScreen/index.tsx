import React, { useState } from "react";
 import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
 import { Header } from "../../components/common/Header";
 import { TextStyle } from "../../components/common/Text";
 import { Button } from "../../components/common/Button";
 import { styles } from "./styles";
 import { theme } from "../../theme";
 import { useNavigation } from "@react-navigation/native";
 import Icon from "../../components/common/Icon/Icon";
 import { pick, keepLocalCopy, types } from '@react-native-documents/picker'; // Make sure this import is correct
 import { ScreenNames } from "../../utils/ScreenConstants";
 import { NativeStackNavigationProp } from "@react-navigation/native-stack";
 import { AuthStackParamList } from "../../types/navigation";
 import LottieView from "lottie-react-native";
 import { uploadCandidateResume } from "../../store/thunk/candidateResume.thunk";
 import { useDispatch } from "react-redux";
// import axios from "axios";

 const uploadResume = async (pdfUri) => {
  const url = 'https://dev-onboarding-service.thehummingbird.solutions/api/v1/candidate/resume';
  // const token = await AsyncStorage.getItem('auth_token');
  const token ='eyJraWQiOiJNMFRRVnJHS1BIVHYyYUpoNGZWbFY5MTUzVEQrRnp2M1dIcnJnck1uQlgwPSIsImFsZyI6IlJTMjU2In0.eyJ1c2VyX3N0YXR1cyI6IkNPTkZJUk1FRCIsInN1YiI6IjE0MzhmNDg4LTEwNTEtNzBkZS0zZTUzLWEyMmYwZGVkZGUzZSIsImVtYWlsX3ZlcmlmaWVkIjoidHJ1ZSIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX1JWaUpaYUY2MSIsImNsaWVudF9pZCI6IjRva2g2MGNtbWRvNDhpb2VtNDF0Z28zcXJoIiwib3JpZ2luX2p0aSI6IjhlNWZmYjE5LTAyNGEtNGQ4Ny05ZmIxLWQzNmIyMjYyZTlkYiIsImV2ZW50X2lkIjoiNWIzNDhhZjMtYjcwYi00OTkzLTg0ZjktMDUyYzRiMWY1YzhhIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTc0Nzc3MjQ0NywiY3VzdG9tOmlzX3JlZ2lzdGVyZWQiOmZhbHNlLCJleHAiOjE3NDc3NzQyNDcsImlhdCI6MTc0Nzc3MjQ0NywiZW1haWwiOiJLcml0aWthLkpAbGFuY2Vzb2Z0LmNvbSIsImp0aSI6ImVlZTE3M2Y0LTMwNzQtNGEyMC04MzFlLTY3MTRkODI4NzY0OCIsInVzZXJuYW1lIjoiMTQzOGY0ODgtMTA1MS03MGRlLTNlNTMtYTIyZjBkZWRkZTNlIn0.KR7dL4kDEh8elFIIJro77K8CL_sbUqDrPHan6vSo4L4xeJn_Ie72jlBgvJ_fXiVPLCfc2hkLV0UyDr9XjdVEbQwXAPMaSV5eDY0VhP74W5REb8DoRklvWCyEsetveBX5p2_-F9E4V2kjQvJnbkzj7FWp6jIE59otHTgrz4a9KhumpvI0ZbNepCgtM6s4La6kgfwKDX9_BiyWXYlkBrwo0xWmC2wSbsLBpR5h_tFAoyQpXmmaeGeu7MCodWE1N-L3J97pZW3zy-zJpiNHRXUck7ZoGj01rsX5LmItAmPN-btLZSTgIT-fHPGFjEYGbsEh17wDBowHj0h07cQ_WA1gZQ';
console.log("tag here token",token)
  const formData = new FormData();
  formData.append('resume', {
    uri: pdfUri.uri,
    name: 'resume.pdf',
    type: 'application/pdf',
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    console.log('Upload response:', data);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};

 export const UploadResumeScreen = () => {

  const dispatch = useDispatch();

  const [fileName, setFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const handleFilePick = async () => {
    try {
      const [result] = await pick({
        mode: 'open',
        requestLongTermAccess: true,
        type: [types.pdf, types.doc, types.docx, types.images],
      });
      console.log("tag here result", result);

      if (!result) {
        // User cancelled picker
        return;
      }

      if (result.size != null && result.size > 10 * 1024 * 1024) {
        Alert.alert('File size exceeds 10MB limit');
        return;
      }

      setFileName(result.name);
      setIsUploading(true);
      await uploadResume(result);
      // Create FormData object
      // const formData = new FormData();
      // formData.append('resume', {
      //   uri: result.uri,
      //   name: result.name || 'resume_file',
      //   type: result.type || 'application/octet-stream',
      // } as any);
      // formData.append('resume',result);
      // await dispatch(uploadCandidateResume(formData)).unwrap();
      
      setIsUploading(false);
      Alert.alert('Success', 'Resume uploaded successfully!');
      navigation.navigate(ScreenNames.MultiStepRegistrationScreen); // Navigate after successful upload

    } catch (err: any) {
      setFileName(null);
      setIsUploading(false);
      console.error("File pick or upload error:", err);
      // Display a more specific error message based on the thunk's rejection payload
      Alert.alert('Upload Failed', err.message || 'An unknown error occurred during upload.');
    }
  };

  const handleBack = () => {
    navigation.goBack(); // Should go to Sign-In
  };

  const handleSkip = () => {
    // Navigate to manual entry screen
    navigation.navigate(ScreenNames.MultiStepRegistrationScreen);
  };

  const handleCancelUpload = () => {
    setIsUploading(false);
    setFileName(null);
  };

  return(
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={{flex: 1}}>
        <Header title="Upload Resume" showBackButton />
        <View style={styles.body}>
          {(isUploading && fileName) ? (
            <View style={styles.uploadBox}>
              <View style={styles.loader}>
                <LottieView
                  source={require('../../../assets/animations/Uploading - 1747736694658.json')}
                  autoPlay
                  loop={true}
                  style={styles.lottie}
                />
              </View>
              <TextStyle style={styles.uploadText} size="sm">Uploading File...{fileName}</TextStyle>
              <TextStyle style={styles.subText} color={theme.colors.text.light} size="xs">Please wait while the resume is being processed</TextStyle>
              <TouchableOpacity style={styles.cancelBtn} onPress={handleCancelUpload}>
                <TextStyle style={styles.cancelText}>Cancel</TextStyle>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <TextStyle size="xs" color={theme.colors.primary.main}>Skip</TextStyle>
              </TouchableOpacity>
              <View style={styles.uploadBox}>
                <Image source={require('../../../assets/images/fileUpload.png')} style={styles.uploadImage} />
                <TouchableOpacity style={styles.chooseBtn} onPress={handleFilePick}>
                  <Icon name="file-upload-outline" size={18} color="#fff" />
                  <TextStyle style={styles.chooseBtnText}>Choose a File</TextStyle>
                </TouchableOpacity>
                <TextStyle style={styles.subText} color={theme.colors.text.light} size="xs">
                  Please upload your latest resume. Accepted File Formats: PNG, JPEG, JPG, PDF, DOC, DOCX
                  up to 10MB
                </TextStyle>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
 };