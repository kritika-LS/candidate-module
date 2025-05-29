import React, { forwardRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { FilterSheet } from './FilterSheet';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import Bottomsheet from '../../common/Bottomsheet';
import { TextStyle } from '../../common/Text';
import Icon from '../../common/Icon/Icon';
import { theme } from '../../../theme';
import { useSearchJobs } from '../../../hooks/useSearchJobs';

interface FilterBottomsheetProps {
  onReset: () => void;
  onSaveSearch: () => void;
  selectedEmploymentTypes: string[];
  onToggleEmploymentType: (type: string) => void;
  contractLength: [number, number];
  onContractLengthChange: (range: [number, number]) => void;
  selectedShifts: string[];
  onToggleShift: (shift: string) => void;
  bottomSheetModalRef: any
  handleSheetChanges: any
  handleFilterBottomsheetClose: any;
  filterCount: number;
  value: string;
  onChange: (val: string) => void;
  onSave: () => void;
  onClose: () => void;
  savedSearches: string[];
  onDelete: (name: string) => void;
  onChipPress: (name: string) => void;
}

export const FilterBottomsheet = forwardRef<BottomSheet, FilterBottomsheetProps>(({
  onReset,
  onSaveSearch,
  selectedEmploymentTypes,
  onToggleEmploymentType,
  contractLength,
  onContractLengthChange,
  selectedShifts,
  onToggleShift,
  bottomSheetModalRef,
  handleSheetChanges,
  handleFilterBottomsheetClose,
  filterCount,
  value,
  onChange,
  onSave,
  onClose,
  savedSearches,
  onDelete,
  onChipPress,
}) => {

    const {
      showSaveSearch,
      setShowSaveSearch
    } = useSearchJobs();

    console.log({showSaveSearch})
    
  return (

    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          { !showSaveSearch ?
            <>
          <View style={styles.header}>
            <View style={styles.titleSection}>
              <TextStyle size='md' style={styles.title}>Filters</TextStyle>
              {filterCount > 0 && (
                <View style={styles.filterCount}>
                  <TextStyle size='xs' color={theme.colors.text.white}>{filterCount}</TextStyle>
                </View>
              )}
            </View>
            <TouchableOpacity onPress={handleFilterBottomsheetClose} style={styles.crossIcon}>
              <Icon name="close" size={16} color={theme.colors.grey[500]} />
            </TouchableOpacity>
          </View>
            <FilterSheet
              selectedEmploymentTypes={selectedEmploymentTypes}
              onToggleEmploymentType={onToggleEmploymentType}
              contractLength={contractLength}
              onContractLengthChange={onContractLengthChange}
              selectedShifts={selectedShifts}
              onToggleShift={onToggleShift}
              onReset={onReset}
              onSaveSearch={() => setShowSaveSearch(true)}
            />
          </>
          :
          <>
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
            </>
            }
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

FilterBottomsheet.displayName = 'FilterBottomsheet';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
    // alignItems: 'center',
  },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
      },
      title: {
        fontWeight: 'bold',
      },
      crossIcon: {
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.7,
        borderColor: theme.colors.grey[500],
        borderRadius: 50,
        alignSelf: 'flex-end',
      },
      titleSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
      },
      filterCount: {
        height: 20,
        width: 20,
        backgroundColor: theme.colors.blue.light,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
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
