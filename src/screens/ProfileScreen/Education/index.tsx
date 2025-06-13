import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HistoryListCard from '../../../components/features/HistoryListCard';
import { theme } from '../../../theme';
import { TextStyle } from '../../../components/common/Text';
import { styles } from './styles';
import { AddEducationForm } from './AddEducationForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch';
import moment from 'moment';
import EducationListCard from './EducationListCard';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '../../../config/env';
import { ENDPOINTS } from '../../../api/endPoints';
import { fetchCandidateEducations } from '../../../store/thunk/candidateEducation.thunk';

const EducationSection = () => {
    const dispatch = useAppDispatch();
    const EducationHistoryData = useAppSelector((state) => state?.candidateEducation?.educations?.responsePayload) || [];

    const [showForm, setShowForm] = useState<boolean>(false);

    const deleteEducation = async (educationId:any) => {
        try {
          const token = await AsyncStorage.getItem('auth_token');
          const apiUrl = `${ENV.DEV_API_URL}${ENDPOINTS.CANDIDATE.educationDelete}${educationId}`; 
          const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
          });
      
          const result = await response.json();
          console.log('Delete Response:', result);
      
          if (response.ok) {
            Toast.show({
                type: 'success',
                text1: 'Education deleted successfully',
            });
            dispatch(fetchCandidateEducations());
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

    return (
        <ScrollView style={styles.sectionContainer}>
            {EducationHistoryData.length > 0 ?
                <>
                    {EducationHistoryData.map((item: any, index: number) => {
                        const startDate = moment(item?.joinedWhen).format('MMM, YYYY');
                        const endDate = item?.graduationStatus == 'No' ? 'Present' : moment(item?.certifiedWhen).format('MMM, YYYY');
                        const pillText = item?.graduationStatus == 'No' ? 'Currently Studying' : item?.graduationStatus;
                        return (
                            <EducationListCard
                                key={index}
                                listIcon={'briefcase-outline'}
                                title={item.nameOfDegree}
                                subtitle1={'Education credentials and details'}
                                universityName={item.universityName || '-'}
                                levelOfEducation={item?.levelOfEducation || ''}
                                modeOfEducation={item?.modeOfEducation || ''}
                                startDate={startDate || '-'}
                                endDate={endDate || '-'}
                                address={item.address}
                                city={item.city}
                                state={item.state}
                                country={item.country}
                                pillText={pillText}
                                onEdit={() => console.log('Edit pressed', item)}
                                onDelete={() => deleteEducation(item?.educationId)}
                            />
                        )
                    })}
                    { !showForm && <TouchableOpacity
                        style={styles.addWorkHistoryContainer}
                        onPress={() => setShowForm(true)}
                    >
                        <Icon name="add" size={16} color={theme.colors.primary.main} />
                        <TextStyle color={theme.colors.primary.main} style={styles.addWorkHistoryText} size='sm'>Add Education</TextStyle>
                    </TouchableOpacity>
                    }
                </>
                : (
                    <AddEducationForm setShowForm={setShowForm} />
                )
            }
            {showForm &&
                <AddEducationForm setShowForm={setShowForm} />
            }
        </ScrollView>
    );
};

export default EducationSection;
