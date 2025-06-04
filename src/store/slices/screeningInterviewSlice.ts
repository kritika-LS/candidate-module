import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScreeningInterviewState, ScreeningInterviewResponse } from '../../models/types/screeningInterview';

const initialState: ScreeningInterviewState = {
  data: [],
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 0,
  pageSize: 10,
};

const screeningInterviewSlice = createSlice({
  name: 'screeningInterview',
  initialState,
  reducers: {
    fetchScreeningInterviewsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchScreeningInterviewsSuccess: (state, action: PayloadAction<ScreeningInterviewResponse>) => {
      state.loading = false;
      state.data = action.payload.data;
      state.totalCount = action.payload.totalCount;
      state.currentPage = action.payload.currentPage;
      state.pageSize = action.payload.pageSize;
    },
    fetchScreeningInterviewsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchScreeningInterviewsStart,
  fetchScreeningInterviewsSuccess,
  fetchScreeningInterviewsFailure,
} = screeningInterviewSlice.actions;

export default screeningInterviewSlice.reducer; 