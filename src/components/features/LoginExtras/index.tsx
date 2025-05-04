import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Checkbox } from "../../common/Checkbox";
import { TextStyle } from "../../common/Text";
import { theme } from "../../../theme";

interface LoginExtrasProps {
    check: boolean;
    setCheck: any;
    onForgotPasswordPress: () => void;
}

export const LoginExtras: React.FC<LoginExtrasProps> = ({check, setCheck , onForgotPasswordPress}) =>  {
    return(
        <View style={styles.loginExtrasContainer}>
            <Checkbox
                checked={check}
                label='Remember me'
                onChange={setCheck}
            />
            <TouchableOpacity onPress={onForgotPasswordPress}>
                <TextStyle size='xs' color={theme.colors.primary.main}>Forgot Password?</TextStyle>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    loginExtrasContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
})