import { createAsyncThunk } from '@reduxjs/toolkit';
 import { CandidateWorkHistoryService } from '../../api/services/candidateWorkHistory.service'; // Adjust path
 import {
  fetchCandidateWorkHistoryStart,
  fetchCandidateWorkHistorySuccess,
  fetchCandidateWorkHistoryFailure,
 } from '../slices/candidateWorkHistory.slice'; // Adjust path
 import { ApiError } from '../../models/types/common';

 export const fetchCandidateWorkHistory = createAsyncThunk(
  'candidateWorkHistory/fetchCandidateWorkHistory',
  async (_, { dispatch }) => { // No input needed
    try {
      dispatch(fetchCandidateWorkHistoryStart());
      const response = await CandidateWorkHistoryService.getCandidateWorkHistory();
      dispatch(fetchCandidateWorkHistorySuccess(response));
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(
        fetchCandidateWorkHistoryFailure(
          apiError.message || 'Failed to fetch candidate work history',
        ),
      );
      throw error;
    }
  },
 );