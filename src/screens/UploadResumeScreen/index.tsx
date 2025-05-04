import React, { useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { Header } from "../../components/common/Header";
import { TextStyle } from "../../components/common/Text";
import { Button } from "../../components/common/Button";
import { styles } from "./styles";
import { theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import Icon from "../../components/common/Icon/Icon";
import DocumentPicker, { types } from 'react-native-document-picker';

export const UploadResumeScreen = () => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const navigation = useNavigation();
  
    const handleFilePick = async () => {
      try {
        const res = await DocumentPicker.pick({
          type: [
            types.pdf,
            types.doc,
            types.docx,
            types.images,
          ],
          copyTo: 'cachesDirectory',
        });
  
        if (res.size > 10 * 1024 * 1024) {
          alert('File size exceeds 10MB limit');
          return;
        }
  
        setFileName(res.name);
        setIsUploading(true);
  
        // Simulate upload
        setTimeout(() => {
          setIsUploading(false);
          // You can proceed to the next screen or step here
        }, 2000);
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('File pick cancelled');
        } else {
          console.error('Unknown error: ', err);
        }
      }
    };
  
    const handleBack = () => {
      navigation.goBack(); // Should go to Sign-In
    };
  
    const handleSkip = () => {
      // Navigate to manual entry screen
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
                    <TouchableOpacity style={styles.skipButton}>
                        <TextStyle size="xs" color={theme.colors.primary.main}>Skip</TextStyle>
                    </TouchableOpacity>
                    {!(isUploading && fileName) ? (
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