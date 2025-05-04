import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TextStyle } from "../../common/Text";
import { theme } from "../../../theme";


interface OtpHeaderProps {
    subText: string;
    email?: string;
}

export const OtpHeader: React.FC<OtpHeaderProps> = ({ subText, email }) => {
    return(
        <View>
            <View style={styles.mailSection}>
                <Image
                    source={require('../../../../assets/images/Mail.png')}
                    style={styles.mailImage}
                    resizeMode="contain"
                />
            </View>

            <TextStyle size="xs" style={[!email ? {paddingHorizontal: 18} : {} ,styles.verifivationMsg]}>
                {subText} 
                {email && <TextStyle size="xs" variant="bold">{` ${email}`}</TextStyle>}
            </TextStyle>
        </View>
    )
}

const styles = StyleSheet.create({
    mailSection: {
        backgroundColor: theme.colors.grey['300'],
        alignItems: 'center',
        borderRadius: theme.spacing.md,
        padding: 16,
    },
    mailImage: {
        height: 80,
    },
    verifivationMsg: {
        textAlign: 'center',
        lineHeight: 14,
        marginVertical: 20,
        marginHorizontal: 16,
        color: theme.colors.text.light,
    },
})