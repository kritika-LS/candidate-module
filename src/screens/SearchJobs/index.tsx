import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from "react-native";
import { SearchSection } from "../../components/features/SearchSection";
import JobCard from "../../components/features/JobCard";
import Toast from "react-native-toast-message";
import CustomModal from "../../components/common/Modal";
import Icon from "../../components/common/Icon/Icon";
import { EmptyJobs } from '../../components/features/EmptyJobs';
import { TextStyle } from "../../components/common/Text";
import { FilterSheetModal } from "../../components/features/SearchSection/FilterSheetModal";
import { useNavigation } from '@react-navigation/native';
import { styles } from "./styles";
import { SaveSearchModal } from '../../components/features/SearchSection/SaveSearchModal';

const mockJobs: any[] = [
  {
    id: 1,
    jobTitle: "Registered Nurse",
    jobType: "Travel",
    facilityName: "Starlight Medical Center",
    city: "Syracuse",
    state: "NY",
    country: "US",
    jobReferenceNumber: "RE-1032YPL",
    payRateMinimum: "$2484",
    payRateMaximum: "$2681",
    jobExperienceLevel: "0-2 years",
    shiftDetails: "3x12",
    validFrom: "Dec 02, 2024",
    validTill: "Mar 02, 2025",
    duration: "3 Months",
    numberOfOpenings: 1,
    postedOn: "2 days ago"
  },
  // ...add more mock jobs as needed
];

export const SearchJobs = () => {
  const [sort, setSort] = useState("Relevance");
  const [searchValue, setSearchValue] = useState("");
  const [chips, setChips] = useState<string[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  // Filter state
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<string[]>([]);
  const [contractLength, setContractLength] = useState<[number, number]>([1, 2]);
  const [selectedShifts, setSelectedShifts] = useState<string[]>([]);

  // Save search modal state
  const [saveSearchModalVisible, setSaveSearchModalVisible] = useState(false);
  const [saveSearchInput, setSaveSearchInput] = useState("");
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [editingSearch, setEditingSearch] = useState<string | null>(null);

  const navigation = useNavigation();

  const handleSearchValueChange = (val: string) => setSearchValue(val);

  const handleAddChip = () => {
    const trimmed = searchValue.trim();
    if (trimmed && !chips.includes(trimmed)) {
      setChips([...chips, trimmed]);
    }
    setSearchValue("");
  };

  const handleRemoveChip = (chip: string) => {
    setChips(chips.filter((c) => c !== chip));
  };

  const handleClearAll = () => {
    setChips([]);
  };

  const handleFilterPress = () => {
    setFilterVisible(true);
  };

  // FilterSheet handlers
  const handleToggleEmploymentType = (type: string) => {
    setSelectedEmploymentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };
  const handleContractLengthChange = (range: [number, number]) => {
    setContractLength(range);
  };
  const handleToggleShift = (shift: string) => {
    setSelectedShifts((prev) =>
      prev.includes(shift) ? prev.filter((s) => s !== shift) : [...prev, shift]
    );
  };
  const handleResetFilters = () => {
    setSelectedEmploymentTypes([]);
    setContractLength([1, 2]);
    setSelectedShifts([]);
  };
  const handleSaveFilters = () => {
    setFilterVisible(false);
    // Optionally trigger job search/filtering here
  };

  // Save search modal logic
  const openSaveSearchModal = (searchName?: string) => {
    setSaveSearchInput("");
    setEditingSearch(searchName || null);
    setSaveSearchModalVisible(true);
    setFilterVisible(false);
  };
  const closeSaveSearchModal = () => {
    setSaveSearchModalVisible(false);
    setEditingSearch(null);
  };
  const handleSaveSearch = () => {
    if (saveSearchInput.trim()) {
      if (!savedSearches.includes(saveSearchInput.trim())) {
        setSavedSearches([...savedSearches, saveSearchInput.trim()]);
      }
      closeSaveSearchModal();
      Toast.show({ type: 'success', text1: 'Search saved successfully' });
    }
  };
  const handleDeleteSavedSearch = (name: string) => {
    setSavedSearches(savedSearches.filter(s => s !== name));
    if (editingSearch === name) {
      setEditingSearch(null);
      setSaveSearchInput("");
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <SearchSection
        searchValue={searchValue}
        onSearchValueChange={handleSearchValueChange}
        onSearch={handleAddChip}
        chips={chips}
        onRemoveChip={handleRemoveChip}
        onClearAll={handleClearAll}
        onFilterPress={handleFilterPress}
        openSaveSearchModal={openSaveSearchModal}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {mockJobs.length === 0 ? (
          <EmptyJobs />
        ) : (
          <View style={styles.jobsSection}>
            <View style={styles.jobsHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.jobsCount}>{mockJobs.length} Jobs for you</Text>
                <TouchableOpacity style={styles.bookmarkIconBtn} onPress={() => openSaveSearchModal(savedSearches[0])}>
                  <Icon name="bookmark-outline" size={20} color="#1976D2" />
                </TouchableOpacity>
              </View>
              <View style={styles.sortRow}>
                <Text style={styles.sortLabel}>Sort by</Text>
                <TouchableOpacity style={styles.sortDropdown}>
                  <Text style={styles.sortValue}>{sort}</Text>
                  {/* Add dropdown icon if needed */}
                </TouchableOpacity>
              </View>
            </View>
            {mockJobs.map((job) => (
              <JobCard 
                key={job.id}
                job={job}
                onPress={() => navigation.navigate('JobPreviewScreen')}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <FilterSheetModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onReset={handleResetFilters}
        onSaveSearch={() => openSaveSearchModal()}
        selectedEmploymentTypes={selectedEmploymentTypes}
        onToggleEmploymentType={handleToggleEmploymentType}
        contractLength={contractLength}
        onContractLengthChange={handleContractLengthChange}
        selectedShifts={selectedShifts}
        onToggleShift={handleToggleShift}
      />
      {/* Save Search Modal */}
      <SaveSearchModal
        visible={saveSearchModalVisible}
        value={saveSearchInput}
        onChange={setSaveSearchInput}
        onSave={handleSaveSearch}
        onClose={closeSaveSearchModal}
        savedSearches={savedSearches}
        onDelete={handleDeleteSavedSearch}
        onChipPress={openSaveSearchModal}
      />
    </SafeAreaView>
  );
};