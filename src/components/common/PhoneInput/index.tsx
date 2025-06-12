import React from 'react';
import { Text, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { styles } from './styles';
import { theme } from '../../../theme';
import { TextStyle } from '../Text';

export const PhoneNumberInput = (props: any) => {
    const {
        handleCountryCode = () => {},
        label,
        error = "",
        touched = "",
        centered = true,
        placeholder,
        square = false,
        labelStyle,
        containerStyle2 = {},
        setIsValid = () => {},
        // disableArrowIcon = false, // Keep this as false or remove to show arrow
        countryPickerProps = {},
        variant = "",
        onBlur = () => {},
        required = false,
    } = props;

    const errorState = error && touched;
    const phoneInput = React.useRef<PhoneInput>(null);

    const handleIsValid = (number: string) => {
        return phoneInput.current?.isValidNumber(number);
    };

    React.useEffect(() => {
        setIsValid(() => handleIsValid);
    }, [setIsValid]);

    return (
        <View style={styles.inputWrapper}>
            {label && <TextStyle style={[styles.labelStyle, labelStyle]}>{label} {required && <TextStyle style={styles.asterisk}>*</TextStyle>}</TextStyle>}
            <PhoneInput
                ref={phoneInput}
                containerStyle={[
                    styles.containerStyle,
                    errorState && styles.errorStyles,
                    square && styles.squareContainer,
                    containerStyle2,
                ]}
                textInputProps={{
                    selectionColor: theme.colors.text.white,
                }}
                textContainerStyle={[
                    styles.inputContainer,
                    errorState && styles.errorTextContainer,
                    { borderLeftWidth: 0, paddingHorizontal: 0 } // Ensure no left border and minimal horizontal padding
                ]}
                placeholder={placeholder}
                textInputStyle={styles.textStyle}
                layout="first"
                disableArrowIcon={false} // Ensure the arrow icon is enabled if you want it
                countryPickerProps={countryPickerProps}
                onBlur={onBlur}
                onChangeText={props.onChangeText}
                onChangeFormattedText={props.onChangeFormattedText}
                onChangeCountry={props.onChangeCountry}
                value={props.value}
                defaultCode={props.defaultCode || "US"}
                // Add countryPickerButtonStyle to reduce the gap
                countryPickerButtonStyle={{
                    // Adjust padding or width here to reduce the gap
                    paddingHorizontal: 5, // Reduce horizontal padding
                    // You might need to experiment with width or flex property based on your exact layout
                    // width: 80, // Example: setting a fixed width
                    // flex: 0, // Example: let content determine width
                }}
            />
            {errorState && (
                <TextStyle variant="regular" size="xs" style={styles.errorText}>
                    {error}
                </TextStyle>
            )}
        </View>
    );
};