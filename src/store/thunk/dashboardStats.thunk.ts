import { createAsyncThunk } from '@reduxjs/toolkit';
 import { DashboardStatsService } from '../../api/services/dashboardStats.service'; // Adjust path
 import {
  fetchDashboardStatsStart,
  fetchDashboardStatsSuccess,
  fetchDashboardStatsFailure,
 } from '../slices/dashboardStats.slice'; // Adjust path
 import { ApiError } from '../../models/types/common';

 export const fetchDashboardStatistics = createAsyncThunk(
  'dashboardStats/fetchDashboardStatistics',
  async (_, { dispatch }) => { // No input needed, hence the "_"
    try {
      dispatch(fetchDashboardStatsStart());
      const response = await DashboardStatsService.getDashboardStatistics();
      dispatch(fetchDashboardStatsSuccess(response));
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(fetchDashboardStatsFailure(apiError.message || 'Failed to fetch dashboard statistics'));
      throw error;
    }
  }
 );