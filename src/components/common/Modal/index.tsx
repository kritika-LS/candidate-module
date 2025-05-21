import React from 'react';
import {
  View,
  Text,
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
}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} backdropColor={"#00000066"}>
      <View style={[styles.modalContainer, style]}>
        {/* Header */}
        {title && <View style={styles.header}>
          <TextStyle size='sm' style={styles.title}>{title}</TextStyle>
          <TouchableOpacity onPress={onClose} style={styles.crossIcon}>
            <Icon name="close" size={16} color={theme.colors.grey[500]} />
          </TouchableOpacity>
        </View>}

        {/* Body */}
        <View style={styles.body}>
          {children}
        </View>

        {/* Footer */}
        {   (primaryButtonText || secondaryButtonText) &&
            <View style={styles.footer}>
          {secondaryButtonText && 
            <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={onSecondaryPress}
            >
                <TextStyle style={styles.secondaryText}>{secondaryButtonText}</TextStyle>
            </TouchableOpacity>
          }

          {primaryButtonText && 
            <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={onPrimaryPress}
            >
                <TextStyle style={styles.primaryText}>{primaryButtonText}</TextStyle>
            </TouchableOpacity>
          }
        </View>
        }
      </View>
    </Modal>
  );
};

export default CustomModal;


