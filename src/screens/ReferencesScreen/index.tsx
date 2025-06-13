import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TextStyle } from "../../components/common/Text";
import { styles } from "./styles";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import ReferenceListCard from "./ReferenceListCard";
import { theme } from "../../theme";
import Icon from "../../components/common/Icon/Icon";
import ReferenceSection from "../ProfileScreen/ProfessionalInformation/Reference";
import Toast from "react-native-toast-message";
import { fetchCandidateReferences } from "../../store/thunk/candidateReferences.thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENV } from "../../config/env";
import { ENDPOINTS } from "../../api/endPoints";

export const ReferencesScreen = () => {
    const dispatch = useAppDispatch();
    const ReferencesData = useAppSelector((state) => state?.candidateReferences?.references?.responsePayload) || [];
    const [showForm, setShowForm] = useState<boolean>(false);

    const deleteReference = async (referenceId:any) => {
        try {
          const token = await AsyncStorage.getItem('auth_token');
          const apiUrl = `${ENV.DEV_API_URL}${ENDPOINTS.CANDIDATE.references}/${referenceId}`; 
          const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
          });

          if (response.ok) {
            Toast.show({
                type: 'success',
                text1: 'Education deleted successfully',
            });
            dispatch(fetchCandidateReferences());
          } else {
            Toast.show({
                type: 'error',
                text1: 'Failed to delete education',
            });
          }
        } catch (error) {
          console.error('Delete error:', error);
          Toast.show({
            type: 'error',
            text1: 'Something went wrong',
          });
        }
      };

    return(
        <ScrollView style={styles.container}>
			{/* <View style={[styles.flexRow, styles.sectionHeader]}>
				<TextStyle size='md' variant='bold'>References</TextStyle>
				<View style={styles.flexRow}>
					<Icon name='file-alert-outline' size={12} color={theme.colors.status.error} />
					<TextStyle size='xs' color={theme.colors.status.error} style={styles.iconSpacing}>Incomplete</TextStyle>
				</View>
			</View> */}

            {ReferencesData.length > 0 ?
                <>
                    {ReferencesData.map((item: any, index: number) => {

                        const contactPermission = item?.contactOrNot == 'N' ? 'No' : 'Yes' ;

                        return (
                            <ReferenceListCard
                                key={index}
                                listIcon={'account-outline'}
                                title={item.fullName}
                                subtitle1={'Professional reference details'}
                                organizationName={item.organizationName || '-'}
                                phoneNumber={item?.mobileNumber || ''}
                                email={item?.emailAddress || ''}
                                contactPermission={contactPermission || '-'}
                                onEdit={() => console.log('Edit pressed', item)}
                                onDelete={() => deleteReference(item?.referenceId)}
                            />
                        )
                    })}
                    { !showForm && <TouchableOpacity
                        style={styles.addContainer}
                        onPress={() => setShowForm(true)}
                    >
                        <Icon name="plus" size={16} color={theme.colors.primary.main} />
                        <TextStyle color={theme.colors.primary.main} style={styles.addText} size='sm'>Add Reference</TextStyle>
                    </TouchableOpacity>
                    }
                </>
                : <ReferenceSection setShowForm={setShowForm} />
            }
            {showForm &&
                <ReferenceSection setShowForm={setShowForm} />
            }
		</ScrollView>
    )
}