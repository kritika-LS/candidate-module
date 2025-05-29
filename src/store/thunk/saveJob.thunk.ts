import { createAsyncThunk } from '@reduxjs/toolkit';
import { SaveJobService } from '../../api/services/saveJob.service'; // Adjust path
import {
  saveJobStart,
  saveJobSuccess,
  saveJobFailure,
} from '../slices/saveJob.slice'; // Adjust path
import { ApiError } from '../../models/types/common'; // Assuming you have this type

export const saveJob = createAsyncThunk(
  'saveJob/saveJob',
  async (jobId: string, { dispatch }) => {
    try {
      dispatch(saveJobStart());
      await SaveJobService.saveJob(jobId);
      dispatch(saveJobSuccess(jobId)); // Pass jobId back on success for potential UI updates
      return jobId;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(
        saveJobFailure(apiError.message || 'Failed to save job'),
      );
      throw error;
    }
  },
);