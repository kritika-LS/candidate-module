import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HistoryListCard from '../../../components/features/HistoryListCard';
import AddWorkHistory from './AddWorkForm';
import { theme } from '../../../theme';
import { TextStyle } from '../../../components/common/Text';
import { useAppSelector } from '../../../hooks/useAppDispatch';
import { PrimaryMenu } from '../../../components/common/PrimaryMenu';

const WorkHistorySection = () => {

    const WorkHistoryData = useAppSelector((state) => state.candidateWorkHistory?.workHistory?.responsePayload) || {};

    const [showHistoryList, setShowHistoryList] = useState(true);
    const [expandedItem, setExpandedItem] = useState<string | null>('Work History'); // Set default expanded item

    const accordionData = [
        {
            title: 'Work History',
            icon: 'briefcase', 
			completed: false,
			ScreenName: 'AddWorkHistory',
        },
    ];

    return (
        <ScrollView style={styles.sectionContainer}>
            {showHistoryList ? (
                <>
                    { WorkHistoryData.length > 0 ? (
                        <>
                            <HistoryListCard
                                listIcon={'office-building'}
                                title='Registered Nurse'
                                subtitle1='ICU'
                                subtitle2='Trauma Hospital'
                                workSpaceName='Springfield Memorial Hospital - 867567'
                                ratio='1:4'
                                startDate='Jan 2020'
                                endDate='Present'
                                location='New York, NY'
                                pillText={'Travel'}
                                onEdit={() => console.log('Edit pressed')}
                                onDelete={() => console.log('Delete pressed')}
                            />
                            <TouchableOpacity
                                style={styles.addWorkHistoryContainer}
                                onPress={() => setShowHistoryList(false)}
                            >
                                <Icon name="add" size={20} color={theme.colors.primary.main} />
                                <TextStyle color={theme.colors.primary.main} style={styles.addWorkHistoryText}>Add Work History</TextStyle>
                            </TouchableOpacity>
                        </>
                        ) : ( 
                            <PrimaryMenu
                                menuItems={accordionData}
                            />
                            // <AddWorkHistory />
                         )}
                </>
            ) : (
                <PrimaryMenu
                    menuItems={accordionData}
                />
                // accordionData.map((item, index) => (
                //     <View key={index} style={styles.accordionItem}>
                //         <TouchableOpacity
                //             style={styles.accordionHeader}
                //             onPress={() => setExpandedItem(expandedItem === item.title ? null : item.title)}
                //         >
                //             <View style={styles.accordionTitleContainer}>
                //                 <Icon name={item.icon} size={18} color={'#888'} />
                //                 <Text style={styles.accordionTitle}>{item.title}</Text>
                //             </View>

                //             <View style={styles.flexRow}>
                //                 <Icon
                //                     name={expandedItem === item.title ? "chevron-up" : "chevron-down"}
                //                     size={20}
                //                     color={'#888'}
                //                     style={styles.iconSpacing}
                //                 />
                //             </View>
                //         </TouchableOpacity>

                //         {expandedItem === item.title && item.content}
                //     </View>
                // ))
            )}
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
        marginLeft: 8,
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
