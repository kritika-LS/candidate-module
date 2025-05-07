import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { Header } from "../../components/common/Header";
import { TextStyle } from "../../components/common/Text";
import { Button } from "../../components/common/Button";
import { styles } from "./styles";
import { theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import Icon from "../../components/common/Icon/Icon";
import { pick, keepLocalCopy, types } from '@react-native-documents/picker'
import { ScreenNames } from "../../utils/ScreenConstants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigation";

export const UploadResumeScreen = () => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  
    const handleFilePick = async () => {
        try {
            const [result] = await pick({
              mode: 'open',
              requestLongTermAccess: true,
              type: [types.pdf,types.doc,types.docx,types.images],
            })
            console.log("tag here result",result);
            
            if (result?.size != null && result?.size > 10 * 1024 * 1024) {
                Alert.alert('File size exceeds 10MB limit');
            return;
            }
            if (result.bookmarkStatus === 'success') {
                setFileName(result.name);
                setIsUploading(true);
                const [localCopy] = await keepLocalCopy({
                    files: [
                      {
                        uri: result.uri,
                        fileName: result.name ?? 'fallbackName',
                      },
                    ],
                    destination: 'cachesDirectory',
                  });
            // Simulate upload
                setTimeout(() => {
                setIsUploading(false);
                navigation.navigate(ScreenNames.MultiStepRegistrationScreen);
            // You can proceed to the next screen or step here
                }, 2000);
            console.log("tag here localcopy",localCopy)
            // navigation.navigate(ScreenNames.MultiStepRegistrationScreen);
            } else {
              console.error(result);
            }
          } catch (err) {
            setFileName(null);
            setIsUploading(false);
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
                    <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                        <TextStyle size="xs" color={theme.colors.primary.main}>Skip</TextStyle>
                    </TouchableOpacity>
                    {(isUploading && fileName) ? (
                        <View style={styles.uploadBox}>
                        <View style={styles.loader}>
                            <ActivityIndicator size="large" color="#2F80ED" />
                        </View>
                        <TextStyle style={styles.uploadText} size="sm">Uploading File...{fileName}</TextStyle>
                        <TextStyle style={styles.subText} color={theme.colors.text.light} size="xs">Please wait while the resume is being processed</TextStyle>
                        <TouchableOpacity style={styles.cancelBtn} onPress={handleCancelUpload}>
                            <TextStyle style={styles.cancelText}>Cancel</TextStyle>
                        </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.uploadBox}>
                            <Image source={require('../../../assets/images/fileUpload.png')} style={styles.uploadImage} />
                            <TouchableOpacity style={styles.chooseBtn} onPress={handleFilePick}>
                                <Icon name="upload-file" size={18} color="#fff" />
                                <TextStyle style={styles.chooseBtnText}>Choose a File</TextStyle>
                            </TouchableOpacity>
                            <TextStyle style={styles.subText} color={theme.colors.text.light} size="xs">
                                Please upload your latest resume. Accepted File Formats: PNG, JPEG, JPG, PDF, DOC, DOCX
                                up to 10MB
                            </TextStyle>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}