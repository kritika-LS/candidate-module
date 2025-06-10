import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScreeningDetailsItem } from '../../models/types/screeningDetails';

interface ScreeningDetailsState {
  details: ScreeningDetailsItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: ScreeningDetailsState = {
  details: null,
  loading: false,
  error: null,
};

const screeningDetailsSlice = createSlice({
  name: 'screeningDetails',
  initialState,
  reducers: {

    fetchScreeningDetailsStart: (state) => {
      state.loading = true;
      state.error = null;
      state.details = null;
    },

    fetchScreeningDetailsSuccess: (
      state,
      action: PayloadAction<ScreeningDetailsItem>
    ) => {
      state.loading = false;
      state.details = action.payload;
    },

    fetchScreeningDetailsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.details = null;
    },

    clearScreeningDetailsError: (state) => {
      state.error = null;
    },

    clearScreeningDetailsData: (state) => {
      state.details = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchScreeningDetailsStart,
  fetchScreeningDetailsSuccess,
  fetchScreeningDetailsFailure,
  clearScreeningDetailsError,
  clearScreeningDetailsData,
} = screeningDetailsSlice.actions;

export default screeningDetailsSlice.reducer;
