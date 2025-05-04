import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 24, 
        backgroundColor: theme.colors.text.white, 
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
    },
    button: { 
        borderRadius: 24, 
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 16,
        height: 39
    },
    buttonText: { 
        color: theme.colors.text.white,
    },
    loginExtrasContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    loginText: { 
        marginTop: 16, 
        textAlign: 'center' 
    },
    loginLink: { 
        color: '#347CD5', 
        fontWeight: 'bold' 
    },
    orSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    semiDivider: {
        flex: 1,
        borderBottomWidth: 0.7,
        borderColor: '#A4A7AE',
    },
    orText: {
        marginVertical: 12,
        textAlign: 'center',
        color: '#999',
        margin: 12
    },
    
    termsText: {
        fontSize: 12,
        textAlign: 'center',
        color: '#666',
        marginBottom: 20,
    },
    
    linkText: {
        color: '#347CD5',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
    },
      
});

export default styles;