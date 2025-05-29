import React from 'react';
import { View } from 'react-native';
import { PrimaryMenu } from '../../../components/common/PrimaryMenu';

const Education = () => {

    const accordionData = [
        {
            title: 'Education',
            icon: 'school', 
      completed: false,
      ScreenName: 'EducationSection',
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

export default Education;
