import { createSlice, PayloadAction } from '@reduxjs/toolkit';

 // *** REPLACE THIS with the actual type of your dashboard statistics data! ***
 type DashboardStatistics = any;

 interface DashboardStatsState {
  statistics: DashboardStatistics | null;
  loading: boolean;
  error: string | null;
 }

 const initialState: DashboardStatsState = {
  statistics: null,
  loading: false,
  error: null,
 };

 const dashboardStatsSlice = createSlice({
  name: 'dashboardStats',
  initialState,
  reducers: {
    fetchDashboardStatsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardStatsSuccess: (state, action: PayloadAction<DashboardStatistics>) => {
      state.loading = false;
      state.statistics = action.payload;
    },
    fetchDashboardStatsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearDashboardStatsError: (state) => {
      state.error = null;
    },
  },
 });

 export const {
  fetchDashboardStatsStart,
  fetchDashboardStatsSuccess,
  fetchDashboardStatsFailure,
  clearDashboardStatsError,
 } = dashboardStatsSlice.actions;

 export default dashboardStatsSlice.reducer;