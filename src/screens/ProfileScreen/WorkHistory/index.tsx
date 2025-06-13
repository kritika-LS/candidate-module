import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AddWorkHistory from './AddWorkForm';
import { theme } from '../../../theme';
import { TextStyle } from '../../../components/common/Text';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch';
import moment from 'moment';
import WorkHistoryListCard from './WorkHistoryListCard';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '../../../config/env';
import { ENDPOINTS } from '../../../api/endPoints';
import { fetchCandidateWorkHistory } from '../../../store/thunk/candidateWorkHistory.thunk';

const WorkHistorySection:React.FC = () => {
    const dispatch = useAppDispatch();
    const WorkHistoryData = useAppSelector((state) => state?.candidateWorkHistory?.workHistory?.responsePayload) || [];
    const [showForm, setShowForm] = useState<boolean>(false); // Set default expanded item

    const handleAddWorkHistoryPress = () => {
        setShowForm(true);
    };

    const deleteWorkHistory = async (workHistoryId:any) => {
        try {
          const token = await AsyncStorage.getItem('auth_token');
          const apiUrl = `${ENV.DEV_API_URL}${ENDPOINTS.CANDIDATE.workHistory}/${workHistoryId}`; 
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
            dispatch(fetchCandidateWorkHistory());
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
            {WorkHistoryData.length ? (
                        <>
                            {WorkHistoryData.map((item:any, index:number) => {
                                const startDate = moment(item?.workedFrom).format('MMM, YYYY');
                                const endDate = item?.workedTill == 'present' ? 'Present' : moment(item?.workedTill).format('MMM, YYYY');
                                const pillText = item?.workedTill == 'present' ? 'Current' : '';
                                return(
                                    <WorkHistoryListCard
                                        key={index}
                                        listIcon={'briefcase-outline'}
                                        title={item.title}
                                        subtitle1={'Work experience details'}
                                        workSpaceName={item.workedWith || 'Facility Name'}
                                        skillsWorked={item?.skillsWorked || ''}
                                        businessType={item?.typeOfBusiness || ''}
                                        ratio={item?.additionalDetails?.[0]?.nurseToPatientRatio || '-'}
                                        startDate={startDate || '-'}
                                        endDate={endDate || '-'}
                                        address={item.address}
                                        city={item.city}
                                        state={item.state}
                                        country={item.country}
                                        pillText={pillText}
                                        onEdit={() => console.log('Edit pressed', item)}
                                        onDelete={() => deleteWorkHistory(item?.workHistoryId)}
                                    />
                            )})}
                            { !showForm && <TouchableOpacity
                                style={styles.addWorkHistoryContainer}
                                onPress={handleAddWorkHistoryPress}
                            >
                                <Icon name="add" size={16} color={theme.colors.primary.main} />
                                <TextStyle color={theme.colors.primary.main} style={styles.addWorkHistoryText} size='sm'>Add Work History</TextStyle>
                            </TouchableOpacity>}
                        </>
            ) : (<AddWorkHistory setShowForm={setShowForm} />)
            }
            { showForm &&
                <AddWorkHistory setShowForm={setShowForm} />
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        padding: 16,
    },
    accordionContent: {
		// paddingHorizontal: 16,
		paddingVertical: 8,
	},
    addWorkHistoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        justifyContent: 'flex-end',
    },
    addWorkHistoryText: {
        marginLeft: 4,
    },
    accordionItem: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 8,
    },
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    accordionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    accordionTitle: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconSpacing: {
        marginLeft: 8,
    },
});

export default WorkHistorySection;
