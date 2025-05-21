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
        disableArrowIcon = false,
        countryPickerProps = {},
        variant = "",
        onBlur = () => {}, // Added onBlur prop
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
            {label && <TextStyle style={[styles.labelStyle, labelStyle]}>{label}</TextStyle>}
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
                ]}
                placeholder={placeholder}
                textInputStyle={styles.textStyle}
                layout="first"
                disableArrowIcon={disableArrowIcon}
                countryPickerProps={countryPickerProps}
                onBlur={onBlur} // Added onBlur handler
                {...props}
            />
            {errorState && (
                <TextStyle variant="regular" size="xs" style={styles.errorText}>
                    {error}
                </TextStyle>
            )}
        </View>
    );
};
