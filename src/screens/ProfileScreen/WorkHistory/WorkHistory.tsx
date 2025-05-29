import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HistoryListCard from '../../../components/features/HistoryListCard';
import AddWorkHistory from './AddWorkForm';
import { theme } from '../../../theme';
import { TextStyle } from '../../../components/common/Text';
import { useAppSelector } from '../../../hooks/useAppDispatch';
import { PrimaryMenu } from '../../../components/common/PrimaryMenu';

const WorkHistory = () => {

    const accordionData = [
        {
            title: 'Work History',
            icon: 'briefcase', 
			completed: false,
			ScreenName: 'AddWorkHistory',
        },
    ];

    return (    
        <View style={{paddingHorizontal: 16, paddingTop: 12}}>
        <PrimaryMenu
            menuItems={accordionData}
        />
      </View>
    );
};

export default WorkHistory;
