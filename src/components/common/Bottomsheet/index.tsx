import React, {
  forwardRef,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
} from 'react';
import {
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Icon from '../Icon/Icon';
import { styles } from './styles';
import { theme } from '../../../theme';
import { TextStyle } from '../Text';

type Props = {
  isVisible: boolean;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryPress?: (e: GestureResponderEvent) => void;
  onSecondaryPress?: (e: GestureResponderEvent) => void;
  style?: object;
  primaryButtonDisabled?: boolean;
};

const Bottomsheet = forwardRef<BottomSheet, Props>(({
  isVisible,
  title,
  children,
  onClose,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryPress,
  onSecondaryPress,
  style,
  primaryButtonDisabled = false,
}, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // ✅ Forward the full BottomSheet instance (includes all methods)
  useImperativeHandle(ref, () => bottomSheetRef.current!, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1 && isVisible && onClose) {
      onClose();
    }
  }, [isVisible, onClose]);

  // useEffect(() => {
  //   if (isVisible) {
  //     bottomSheetRef.current?.snapToIndex(0);
  //   } else {
  //     bottomSheetRef.current?.close();
  //   }
  // }, [isVisible]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
        onPress={onClose}
      />
    ),
    [onClose]
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enableDynamicSizing
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      containerStyle={styles.bottomSheetContainer}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.bottomSheetBackground}
    >
      <View style={[styles.contentContainer, style]}>
        {title && (
          <View style={styles.header}>
            <TextStyle size='md' style={styles.title}>{title}</TextStyle>
            <TouchableOpacity onPress={onClose} style={styles.crossIcon}>
              <Icon name="close" size={16} color={theme.colors.grey[500]} />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.body}>{children}</View>

        {(primaryButtonText || secondaryButtonText) && (
          <View style={styles.footer}>
            {secondaryButtonText && (
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={onSecondaryPress}
              >
                <TextStyle style={styles.secondaryText}>{secondaryButtonText}</TextStyle>
              </TouchableOpacity>
            )}

            {primaryButtonText && (
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.primaryButton,
                  primaryButtonDisabled && { backgroundColor: '#ccc' }
                ]}
                onPress={primaryButtonDisabled ? undefined : onPrimaryPress}
                disabled={primaryButtonDisabled}
              >
                <TextStyle style={[
                  styles.primaryText,
                  primaryButtonDisabled && { color: '#888' }
                ]}>
                  {primaryButtonText}
                </TextStyle>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </BottomSheet>
  );
});

Bottomsheet.displayName = 'Bottomsheet';
export default Bottomsheet;
