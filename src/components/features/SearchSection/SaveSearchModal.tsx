import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CustomModal from '../../common/Modal';
import Icon from '../../common/Icon/Icon';
import { TextStyle } from '../../common/Text';
import { theme } from '../../../theme';

interface SaveSearchModalProps {
  visible: boolean;
  value: string;
  onChange: (val: string) => void;
  onSave: () => void;
  onClose: () => void;
  savedSearches: string[];
  onDelete: (name: string) => void;
  onChipPress: (name: string) => void;
}

export const SaveSearchModal: React.FC<SaveSearchModalProps> = ({
  visible,
  value,
  onChange,
  onSave,
  onClose,
  savedSearches,
  onDelete,
  onChipPress,
}) => {
  return (
    <CustomModal
      isVisible={visible}
      title="Save search"
      onClose={onClose}
      primaryButtonText="Save"
      onPrimaryPress={onSave}
      primaryButtonDisabled={!value.trim()}
      style={styles.modalStyle}
    >
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.saveSearchInput}
          placeholder="Enter search name"
          value={value}
          onChangeText={onChange}
        />
      </View>
      {savedSearches.length > 0 && (
        <View style={styles.savedSearchesWrapper}>
          <TextStyle style={styles.savedSearchesTitle}>Saved searches</TextStyle>
          <View style={styles.savedSearchesChipsRow}>
            {savedSearches.map((name) => (
              <TouchableOpacity
                key={name}
                style={styles.savedSearchChip}
                onPress={() => onChipPress(name)}
              >
                <TextStyle size="sm" style={styles.savedSearchChipText}>{name}</TextStyle>
                <TouchableOpacity onPress={() => onDelete(name)}>
                  <Icon name="trash-can-outline" size={14} color={theme.colors.status.error} style={styles.trashIcon} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    minHeight: 180,
    justifyContent: 'center',
  },
  inputWrapper: {
    marginTop: 8,
  },
  saveSearchInput: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  savedSearchesWrapper: {
    marginTop: 18,
  },
  savedSearchesTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  savedSearchesChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  savedSearchChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1976D2',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  savedSearchChipText: {
    marginRight: 4,
  },
  trashIcon: {
    marginLeft: 4,
  },
}); 