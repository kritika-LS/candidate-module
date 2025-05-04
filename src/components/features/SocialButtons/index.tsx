import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface SocialButtonsProps {

}

export const SocialButtons: React.FC<SocialButtonsProps> = () => {
    return(

        <View style={styles.socialButtonSection}>
            <TouchableOpacity>
                <Image
                    source={require('../../../../assets/images/social/google.png')}
                    style={styles.socialButton}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                    source={require('../../../../assets/images/social/apple.png')}
                    style={styles.socialButton}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    socialButtonSection: {
        flexDirection: 'row',
        justifyContent: 'center',
    }, 
    
    socialButton: {
        height: 80,
        width: 80,
    },
})