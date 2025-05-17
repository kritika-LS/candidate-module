import React from 'react';
import { StyleSheet, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { styles } from './styles';
import { theme } from '../../../theme';
import { TextStyle } from '../Text';

export const PhoneNumberInput = (props:any) => {
    const {
        handleCountryCode = {},
        label,
        errors = {},
        name,
        touched = {},
        centered = true,
        placeholder,
        square = false,
        labelStyle,
        containerStyle2 = {},
        setIsValid = () => { },
        disableArrowIcon = false,
        countryPickerProps = false,
        variant = ""
    } = props;
    const errorState = errors && name && errors[name] && touched && touched[name];
    const phoneInput = React.useRef(null);

    const handleisValid = (e) => {
        return phoneInput.current?.isValidNumber(e)
    }
    React.useEffect(() => {
        setIsValid(() => { return handleisValid })
    }, [])

    return (
        <View style={styles.inputWrapper}>
            <TextStyle style={[styles.labelStyle, labelStyle]}>{label}</TextStyle>
            <PhoneInput
                ref={phoneInput}
                containerStyle={[
                    styles.containerStyle,
                    errorState && styles.errorStyles,
                    square && styles.squareContainer,
                    containerStyle2,
                ]}
                textInputProps={{
                    selectionColor: theme.colors.text.white
                }}

                textContainerStyle={[styles.inputContainer, errorState && styles.errorTextContainer]}
                placeholder={placeholder}
                textInputStyle={styles.textStyle}
                // codeTextStyle={styles.textStyle}
                layout="first"
                {...props}
                disableArrowIcon={disableArrowIcon}
                countryPickerProps={countryPickerProps}
            // countryPickerProps={{disableNativeModal: false}}
            />
            {/* {errorState && <ValidationMessage type="error" message={errors[name]} centered={centered} />} */}
        </View>
    );
};
