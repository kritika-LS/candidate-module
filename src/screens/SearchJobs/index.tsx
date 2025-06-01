import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, FlatList } from "react-native";
import { SearchSection } from "../../components/features/SearchSection";
import JobCard from "../../components/features/JobCard";
import { EmptyJobs } from '../../components/features/EmptyJobs';
import { TextStyle } from "../../components/common/Text";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { styles } from "./styles";
import { SaveSearchModal } from '../../components/features/SearchSection/SaveSearchModal';
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { fetchCandidateSearchCriteria } from "../../store/thunk/candidateSearchCriteria.thunk";
import { clearJobsError } from "../../store/slices/jobs.slice";
import { clearCandidateSearchCriteriaError } from "../../store/slices/candidateSearchCriteria.slice";
import { theme } from "../../theme";
import { FilterBottomsheet } from "../../components/features/SearchSection/FilterBottomsheet";
import { sortByOptions } from "../../constants";
import { Job } from '../../models/types/Dashboard';
import { JobDetails } from '../../models/types/jobDetails';
import { useSearchJobs } from '../../hooks/useSearchJobs';
import Icon from "../../components/common/Icon/Icon";
import { fetchRecommendedJobs } from "../../store/thunk/jobs.thunk";
import JobCardSkeleton from "../../components/features/JobCard/JobCardSkeleton";

type SearchJobsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SearchJobs'>;

// Create a function to convert Job to JobDetails
export const convertJobToJobDetails = (job: Job): JobDetails => {
  return {
    ...job,
    appliedDate: '',
    externalJobId: '',
    enterpriseId: '',
    clientEnterpriseId: null,
    facilityEnterpriseId: null,
    mspEnterpriseId: null,
    enterpriseUserId: 0,
    jobDescriptionUrl: null,
    jobDescriptionText: '',
    jobCategory: '',
    skillData: [],
    payRateType: '',
    payRateTypeFullText: null,
    payRateMinimum: job.payRateMinimum ? parseFloat(job.payRateMinimum) : null,
    payRateMaximum: job.payRateMaximum ? parseFloat(job.payRateMaximum) : null,
    overallYearsOfExperienceMinimum: job.overallYearsOfExperienceMinimum ? parseFloat(job.overallYearsOfExperienceMinimum) : null,
    overallYearsOfExperienceMaximum: job.overallYearsOfExperienceMaximum ? parseFloat(job.overallYearsOfExperienceMaximum) : null,
    jobExperienceLevelFullText: null,
    currency: '',
    workFrom: '',
    workFromFullText: null,
    zipCode: '',
    latitude: null,
    longitude: null,
    shiftType: '',
    shiftStartTime: '',
    shiftEndTime: '',
    shiftTimezone: null,
    minimumEducation: null,
    minimumEducationFullText: null,
    refreshedOn: '',
    benefits: null,
    additionalFields: null,
    checklistId: null,
    status: '',
    statusFullText: null,
    numberOfViews: 0,
    socialMediaUrl: null,
    allowedToWorkInOtherJobs: '',
    limitForApplications: null,
    limitForShortlists: null,
    interviewConfigurations: null,
    interviewStopCriteria: null,
    numberOfCalendarSchedulesToBlock: null,
    expiryMinutesForAcceptingSchedules: null,
    jobEducationalQualifications: [],
    candidateProcessStatus: null
  };
};

export const SearchJobs = () => {
  const navigation = useNavigation<SearchJobsNavigationProp>();
  const dispatch = useAppDispatch();
  const {
    searchValue,
    chips,
    selectedEmploymentTypes,
    contractLength,
    selectedShifts,
    saveSearchModalVisible,
    saveSearchInput,
    savedSearches,
    editingSearch,
    showSortDropdown,
    sortByOption,
    setSortByOption,
    jobDataToDisplay,
    totalResults,
    loadingJobs,
    loadingParse,
    loadingMatchingJobs,
    bottomSheetModalRef,
    isFilterApplied,
    handleSearchValueChange,
    handleAddChip,
    handleRemoveChip,
    handleClearAll,
    handleFilterPress,
    handleToggleEmploymentType,
    handleContractLengthChange,
    handleToggleShift,
    handleResetFilters,
    handleSaveFilters,
    openSaveSearchModal,
    closeSaveSearchModal,
    handleSaveSearch,
    handleDeleteSavedSearch,
    handleSheetChanges,
    handleFilterBottomsheetClose,
    calculateFilterCount,
    setShowSortDropdown,
    setSaveSearchInput,
    executeSearch,
    currentPage,
    hasMoreJobs,
    isLoadingMore,
    loadMoreJobs,
    PAGE_SIZE,
    setCurrentPage,
    setHasMoreJobs,
  } = useSearchJobs();

  const jobsErrorMessage = useAppSelector((state) => state?.jobs?.jobsObject?.errorMessages  || '');

  type SortByOption = 'RELEVANCE' | 'NEWEST' | 'PAYRATE';

  const sortByOptions: { label: string; value: SortByOption }[] = [
    { label: 'Relevance', value: 'RELEVANCE' },
    { label: 'Newest', value: 'NEWEST' },
    { label: 'Highest Pay', value: 'PAYRATE' },
  ];

  useEffect(() => {
    dispatch(fetchCandidateSearchCriteria());
    dispatch(fetchRecommendedJobs({ 
      page: 0, 
      pageSize: PAGE_SIZE, 
      sortBy: sortByOption,
      durationFrom: null,
      durationTo: null,
      job_category: 'Healthcare',
    }));

    return () => {
      dispatch(clearJobsError());
      dispatch(clearCandidateSearchCriteriaError());
    };
  }, [dispatch, sortByOption, PAGE_SIZE]);

  const overallLoading = loadingJobs || loadingParse || loadingMatchingJobs;

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary.main} />
      </View>
    );
  };

  const handleSortByChange = (option: SortByOption) => {
    setSortByOption(option);
    setShowSortDropdown(false);
    // Reset pagination when sort changes
    setCurrentPage(0);
    setHasMoreJobs(true);
    dispatch(fetchRecommendedJobs({ 
      page: 0, 
      pageSize: PAGE_SIZE, 
      durationFrom: null,
      durationTo: null,
      job_category: "Healthcare",
      sortBy: option
    }));
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
      />
  
      {overallLoading && currentPage === 0 ? ( // Only show full screen loader for initial load
        <View style={styles.loadingContainer}>
          <FlatList
            contentContainerStyle={styles.jobsSection}
            data={Array(3).fill(0)}
            keyExtractor={(_, index) => index.toString()}
            renderItem={() => <JobCardSkeleton />}
          />
        </View>
      ) : !jobDataToDisplay.length ? (
        <EmptyJobs noJobsText={`No jobs found, try refining \n your search criteria`} />
      ) : (
        <>
          {(jobsErrorMessage && isFilterApplied) && <TextStyle style={{paddingHorizontal: 16, marginTop: 12}}>{jobsErrorMessage}</TextStyle>}
          <View style={styles.jobsHeaderRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.jobsCount}>{totalResults} Jobs for you</Text>
              {/* <TouchableOpacity
                style={styles.bookmarkIconBtn}
                onPress={() => openSaveSearchModal(savedSearches[0])}
              >
                <Icon name="bookmark-outline" size={20} color="#1976D2" />
              </TouchableOpacity> */}
            </View>
            <View style={styles.sortRow}>
              <Text style={styles.sortLabel}>Sort by</Text>
              <TouchableOpacity
                style={styles.sortDropdown}
                onPress={() => setShowSortDropdown(!showSortDropdown)}
              >
                <Text style={styles.sortValue}>{sortByOptions.find(option => option.value === sortByOption)?.label || 'Relevance'}</Text>
                <Icon name="chevron-down" size={20} color={theme.colors.grey[700]} />
              </TouchableOpacity>
            </View>

            {showSortDropdown && (
              <View style={styles.suggestionsContainer}>
                <FlatList
                  data={sortByOptions}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.suggestionItem}
                      onPress={() => handleSortByChange(item.value)}
                    >
                      <TextStyle variant="regular" size="sm">
                        {item.label}
                      </TextStyle>
                    </TouchableOpacity>
                  )}
                  keyboardShouldPersistTaps="handled"
                  nestedScrollEnabled
                  style={styles.suggestionsList}
                />
              </View>
            )}
          </View>
          <View>
          <FlatList
            contentContainerStyle={styles.jobsSection}
            data={jobDataToDisplay}
            keyExtractor={(item, index) => item?.jobId?.toString() || index.toString()}
            renderItem={({ item }) => (
              <JobCard
                key={item.jobId + 'search'}
                job={convertJobToJobDetails(item)}
                fetchJobs={() => {
                  if (chips.length > 0) {
                    executeSearch(chips[0]);
                  } else {
                    dispatch(fetchRecommendedJobs({
                      page: 0,
                      pageSize: PAGE_SIZE,
                      sortBy: sortByOption,
                      durationFrom: null,
                      durationTo: null,
                      job_category: "Healthcare"
                    }));
                  }
                }}
                onPress={() => navigation.navigate('JobPreviewScreen', { jobId: item.jobId })}
              />
            )}
            onEndReached={hasMoreJobs && !isLoadingMore ? loadMoreJobs : null}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
          </View>
        </>
      )}
  
      <FilterBottomsheet
        bottomSheetModalRef={bottomSheetModalRef}
        onReset={handleResetFilters}
        onSaveSearch={handleSaveFilters}
        selectedEmploymentTypes={selectedEmploymentTypes}
        onToggleEmploymentType={handleToggleEmploymentType}
        contractLength={contractLength}
        onContractLengthChange={handleContractLengthChange}
        selectedShifts={selectedShifts}
        onToggleShift={handleToggleShift}
        handleSheetChanges={handleSheetChanges}
        handleFilterBottomsheetClose={handleFilterBottomsheetClose}
        filterCount={calculateFilterCount()}
        value={saveSearchInput}
        onChange={setSaveSearchInput}
        onSave={handleSaveSearch}
        onClose={closeSaveSearchModal}
        savedSearches={savedSearches}
        onDelete={handleDeleteSavedSearch}
        onChipPress={openSaveSearchModal}
      />
  
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