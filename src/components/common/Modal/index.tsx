import React from 'react';
import {
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import Modal from 'react-native-modal';
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

const CustomModal: React.FC<Props> = ({
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
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropColor={"#00000066"}
    >
      <View style={styles.container}>  {/* ✅ Center wrapper */}
        <View style={[styles.modalContainer, style]}>
          {/* Header */}
          {title && (
            <View style={styles.header}>
              <TextStyle size='md' style={styles.title}>{title}</TextStyle>
              <TouchableOpacity onPress={onClose} style={styles.crossIcon}>
                <Icon name="close" size={16} color={theme.colors.grey[500]} />
              </TouchableOpacity>
            </View>
          )}

          {/* Body */}
          <View style={styles.body}>
            {children}
          </View>

          {/* Footer */}
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
                  <TextStyle
                    style={[
                      styles.primaryText,
                      primaryButtonDisabled && { color: '#888' }
                    ]}
                  >
                    {primaryButtonText}
                  </TextStyle>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </Modal>

  );
};

export default CustomModal;


