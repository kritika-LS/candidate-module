import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InterviewScreeningItem } from '../../models/types/screeningInterview';

 /**
  * Defines the state shape for the screening interviews slice.
  */
 interface ScreeningInterviewsState { // CHANGED: Interface name
  items: InterviewScreeningItem[]; // Array of interview screening records
  loading: boolean;                // Indicates if data is being fetched
  error: string | null;            // Stores any error messages
  totalResults: number;            // Total number of screening records available
 }

 /**
  * The initial state for the screening interviews slice.
  */
 const initialState: ScreeningInterviewsState = { // Used renamed interface
  items: [],
  loading: false,
  error: null,
  totalResults: 0,
 };

 const screeningInterviewsSlice = createSlice({
  name: 'screeningInterviews',
  initialState,
  reducers: {
    fetchScreeningInterviewsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    fetchScreeningInterviewsSuccess: (
      state,
      action: PayloadAction<{ items: InterviewScreeningItem[]; totalResults: number }>
    ) => {
      console.log({action},"***********************")
      state.loading = false;
      state.items = action.payload.items;
      state.totalResults = action.payload.totalResults;
    },
    
    fetchScreeningInterviewsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.items = [];
      state.totalResults = 0;
    },
    
    clearScreeningInterviewsError: (state) => {
      state.error = null;
    },
    
    clearScreeningInterviewsData: (state) => {
      state.items = [];
      state.totalResults = 0;
    },
  },
 });

 export const {
  fetchScreeningInterviewsStart,
  fetchScreeningInterviewsSuccess,
  fetchScreeningInterviewsFailure,
  clearScreeningInterviewsError,
  clearScreeningInterviewsData,
 } = screeningInterviewsSlice.actions;


 export default screeningInterviewsSlice.reducer;
