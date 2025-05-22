import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomModal from '../../common/Modal';
import { FilterSheet } from './FilterSheet';

interface FilterSheetModalProps {
  visible: boolean;
  onClose: () => void;
  onReset: () => void;
  onSaveSearch: () => void;
  selectedEmploymentTypes: string[];
  onToggleEmploymentType: (type: string) => void;
  contractLength: [number, number];
  onContractLengthChange: (range: [number, number]) => void;
  selectedShifts: string[];
  onToggleShift: (shift: string) => void;
}

export const FilterSheetModal: React.FC<FilterSheetModalProps> = ({
  visible,
  onClose,
  onReset,
  onSaveSearch,
  selectedEmploymentTypes,
  onToggleEmploymentType,
  contractLength,
  onContractLengthChange,
  selectedShifts,
  onToggleShift,
}) => {
  return (
    <CustomModal
      isVisible={visible}
      title="Filters"
      onClose={onClose}
      primaryButtonText="Reset"
      secondaryButtonText="Save search"
      onPrimaryPress={onReset}
      onSecondaryPress={onSaveSearch}
      style={{ borderBottomLeftRadius: 32, borderBottomRightRadius: 32, marginBottom: 0, marginTop: 80 }}
    >
      <FilterSheet
        selectedEmploymentTypes={selectedEmploymentTypes}
        onToggleEmploymentType={onToggleEmploymentType}
        contractLength={contractLength}
        onContractLengthChange={onContractLengthChange}
        selectedShifts={selectedShifts}
        onToggleShift={onToggleShift}
      />
    </CustomModal>
  );
}; 