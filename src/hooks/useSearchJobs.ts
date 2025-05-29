import { useState, useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAppDispatch, useAppSelector } from './useAppDispatch';
import { fetchRecommendedJobs } from '../store/thunk/jobs.thunk';
import { parseJobSearchQuery } from '../store/thunk/parseJobSearchQuery.thunk';
import { fetchJobsMatching } from '../store/thunk/jobsMatching.thunk';
import { fetchRecommendedJobsWithFilters } from '../store/thunk/fetchRecommendedJobsWithFilters.thunk';
import { fetchCandidateSearchCriteria } from '../store/thunk/candidateSearchCriteria.thunk';
import { clearJobsError } from '../store/slices/jobs.slice';
import { clearCandidateSearchCriteriaError } from '../store/slices/candidateSearchCriteria.slice';
import { buildJobSearchRequestBody } from '../utils/jobSearchUtils';
import { JobSearchRequestBody } from '../models/types/jobSearch';
import { Job } from '../models/types/Dashboard';
import { CandidatePoolJobsApiResponse } from '../models/types/candidatePoolJobs';
import Toast from 'react-native-toast-message';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

type SearchJobsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SearchJobs'>;

export const useSearchJobs = () => {
  const navigation = useNavigation<SearchJobsNavigationProp>();
  const dispatch = useAppDispatch();

  // Redux states
  const recommendedJobs = useAppSelector((state) => state.jobs.jobs) as unknown as CandidatePoolJobsApiResponse;
  const matchingJobs = useAppSelector((state) => state.jobsMatching.jobs) as Job[];
  const loadingJobs = useAppSelector((state) => state.jobs.loading);
  const errorJobs = useAppSelector((state) => state.jobs.error);
  const parsedQueryData = useAppSelector((state) => state.parseJobSearchQuery.data);
  const loadingParse = useAppSelector((state) => state.parseJobSearchQuery.loading);
  const errorParse = useAppSelector((state) => state.parseJobSearchQuery.error);
  const loadingMatchingJobs = useAppSelector((state) => state.jobsMatching.loading);
  const errorMatchingJobs = useAppSelector((state) => state.jobsMatching.error);

  // State management
  const [searchValue, setSearchValue] = useState("");
  const [chips, setChips] = useState<string[]>([]);
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<string[]>([]);
  const [contractLength, setContractLength] = useState<[number, number]>([1, 52]);
  const [selectedShifts, setSelectedShifts] = useState<string[]>([]);
  const [saveSearchModalVisible, setSaveSearchModalVisible] = useState(false);
  const [saveSearchInput, setSaveSearchInput] = useState("");
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [editingSearch, setEditingSearch] = useState<string | null>(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortByOption, setSortByOption] = useState<'RELEVANCE' | 'NEWEST' | 'PAYRATE'>('RELEVANCE');
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [showSaveSearch, setShowSaveSearch] = useState(false);

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMoreJobs, setHasMoreJobs] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const PAGE_SIZE = 10;

  // Refs
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const jobDataToDisplay = chips.length > 0 ? matchingJobs : (recommendedJobs?.responsePayload || []);
  const totalResults = chips.length > 0 ? (matchingJobs?.length || 0) : (recommendedJobs?.totalResults || 0);

  const handleSearchValueChange = (val: string) => setSearchValue(val);

  const executeSearch = useCallback(async (query: string, page: number = 0) => {
    if (!query.trim()) {
      dispatch(fetchRecommendedJobs({ 
        page, 
        pageSize: PAGE_SIZE, 
        durationFrom: null,
        durationTo: null,
        job_category: "Healthcare",
        sortBy: sortByOption
      }));
      return;
    }

    try {
      const requestBody = buildJobSearchRequestBody(
        null,
        { selectedEmploymentTypes, selectedShifts, contractLength },
        sortByOption,
        query,
        page * PAGE_SIZE, // skip
        PAGE_SIZE // limit
      );

      requestBody.job_titles = [query];
      requestBody.jobTitles = query;
      requestBody.searchInputs = query;

      const result = await dispatch(fetchJobsMatching({ 
        page, 
        pageSize: PAGE_SIZE, 
        requestBody 
      })).unwrap();

      // Update hasMoreJobs based on the response
      setHasMoreJobs(result.length === PAGE_SIZE);
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Search Failed',
        text2: err.message || 'Failed to perform search.',
      });
      console.error("Search execution error:", err);
    }
  }, [dispatch, selectedEmploymentTypes, selectedShifts, contractLength, sortByOption]);

  const loadMoreJobs = useCallback(async () => {
    if (!hasMoreJobs || isLoadingMore) return;

    setIsLoadingMore(true);
    const nextPage = currentPage + 1;

    try {
      if (chips.length > 0) {
        await executeSearch(chips[0], nextPage);
      } else {
        await dispatch(fetchRecommendedJobs({ 
          page: nextPage, 
          pageSize: PAGE_SIZE, 
          durationFrom: null,
          durationTo: null,
          job_category: "Healthcare",
          sortBy: sortByOption
        }));
      }
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more jobs:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [currentPage, hasMoreJobs, isLoadingMore, chips, executeSearch, dispatch, sortByOption]);

  const handleAddChip = () => {
    const trimmed = searchValue.trim();
    if (trimmed && !chips.includes(trimmed)) {
      setChips([...chips, trimmed]);
      setCurrentPage(0); // Reset pagination on new search
      setHasMoreJobs(true);
      executeSearch(trimmed);
    }
    setSearchValue("");
  };

  const handleRemoveChip = (chip: string) => {
    const updatedChips = chips.filter((c) => c !== chip);
    setChips(updatedChips);
    setCurrentPage(0); // Reset pagination on chip removal
    setHasMoreJobs(true);
    if (updatedChips.length === 0) {
      dispatch(fetchRecommendedJobs({ 
        page: 0, 
        pageSize: 10, 
        durationFrom: null,
        durationTo: null,
        job_category: "Healthcare",
        sortBy: sortByOption
      }));
    } else {
      executeSearch(updatedChips[0] || '');
    }
  };

  const handleClearAll = () => {
    setChips([]);
    setSearchValue("");
    setCurrentPage(0); // Reset pagination
    setHasMoreJobs(true);
    dispatch(fetchRecommendedJobs({ 
      page: 0, 
      pageSize: PAGE_SIZE, 
      durationFrom: null,
      durationTo: null,
      job_category: "Healthcare",
      sortBy: sortByOption
    }));
  };

  const handleFilterPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleToggleEmploymentType = (type: string) => {
    setSelectedEmploymentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleContractLengthChange = (range: [number, number]) => {
    if (range[0] !== contractLength[0] || range[1] !== contractLength[1]) {
      setContractLength(range);
    }
  };

  const handleToggleShift = (shift: string) => {
    setSelectedShifts((prev) =>
      prev.includes(shift) ? prev.filter((s) => s !== shift) : [...prev, shift]
    );
  };

  const handleResetFilters = () => {
    setSelectedEmploymentTypes([]);
    setContractLength([1, 52]);
    setSelectedShifts([]);
    setIsFilterApplied(false);
    setCurrentPage(0); // Reset pagination
    setHasMoreJobs(true);
  };

  const handleSaveFilters = () => {
    // const requestBody: Partial<JobSearchRequestBody> = {
    //   employmentTypes: selectedEmploymentTypes,
    //   shiftTypes: selectedShifts,
    //   durationFrom: contractLength[0],
    //   durationTo: contractLength[1],
    //   sortBy: sortByOption === 'Newest' ? 'NEWEST' : sortByOption === 'Highest Pay' ? 'PAYRATE' : 'RELEVANCE'
    // };

    // dispatch(fetchRecommendedJobsWithFilters({
    //   page: 0,
    //   pageSize: 10,
    //   requestBody
    // }));

    // setIsFilterApplied(true);
    console.log("------------- ")
    setShowSaveSearch(true)
    // bottomSheetModalRef.current?.close();
    // openSaveSearchModal();
  };

  const openSaveSearchModal = (searchName?: string) => {
    setSaveSearchInput("");
    setEditingSearch(searchName || null);
    setSaveSearchModalVisible(true);
    bottomSheetModalRef?.current?.dismiss();
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

  const handleSheetChanges = useCallback((index: number) => {
    setIsFilterApplied(true);
    if (index === -1) {
      const requestBody: Partial<JobSearchRequestBody> = {
        employmentTypes: selectedEmploymentTypes,
        shiftTypes: selectedShifts,
        durationFrom: null,
        durationTo: null,
        job_category: 'Healthcare',
        sortBy: sortByOption
      };

      dispatch(fetchRecommendedJobsWithFilters({
        page: 0,
        pageSize: 10,
        requestBody
      }));
    }
  }, [dispatch, selectedEmploymentTypes, selectedShifts, contractLength, sortByOption]);
  
  const handleApplyFilter = () => {
    handleFilterBottomsheetClose();
  }

  const handleFilterBottomsheetClose = () => {
    setIsFilterApplied(true);
    setCurrentPage(0); // Reset pagination when filters change
    setHasMoreJobs(true);
    const requestBody: Partial<JobSearchRequestBody> = {
      employmentTypes: selectedEmploymentTypes,
      shiftTypes: selectedShifts,
      durationFrom: null,
      durationTo: null,
      job_category: 'Healthcare',
      sortBy: sortByOption
    };

    dispatch(fetchRecommendedJobsWithFilters({
      page: 0,
      pageSize: PAGE_SIZE,
      requestBody
    }));
    bottomSheetModalRef?.current?.close();
  };

  const calculateFilterCount = () => {
    let count = 0;
    if (selectedEmploymentTypes.length > 0) count++;
    if (contractLength[0] !== 1 || contractLength[1] !== 52) count++;
    if (selectedShifts.length > 0) count++;
    return count;
  };

  return {
    // States
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
    jobDataToDisplay,
    totalResults,
    loadingJobs,
    loadingParse,
    loadingMatchingJobs,
    bottomSheetModalRef,
    isFilterApplied,
    showSaveSearch,
    currentPage,
    hasMoreJobs,
    isLoadingMore,
    PAGE_SIZE,

    // Handlers
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
    setSortByOption,
    setSaveSearchInput,
    executeSearch,
    setShowSaveSearch,
    handleApplyFilter,
    loadMoreJobs,
    setCurrentPage,
    setHasMoreJobs,
  };
};