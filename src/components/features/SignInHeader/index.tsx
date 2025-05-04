import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TextStyle } from "../../common/Text";


type SignInHeaderProps = {
    title: string;
    subText: string;
};

export const SignInHeader: React.FC<SignInHeaderProps> = ({ title, subText }) => {
    return(
        <View>
			<Image
                source={require('../../../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <TextStyle variant='bold' size={'xxl'} style={styles.title}>{title}</TextStyle>
            <TextStyle variant='regular' size='xs' style={styles.subtitle}>{subText}</TextStyle>
        </View>
    )
}

const styles = StyleSheet.create({

    logo: {
        height: 40,
        alignSelf: 'center',
    },
    title: { 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: 8 
    },
    subtitle: { 
        textAlign: 'center', 
        marginBottom: 24,
        color: '#797979'
    },

})