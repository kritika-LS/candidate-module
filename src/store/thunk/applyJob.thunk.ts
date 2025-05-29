import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApplyJobService } from '../../api/services/applyJob.service'; // Adjust path
import {
 applyJobStart,
 applyJobSuccess,
 applyJobFailure,
} from '../slices/applyJob.slice'; // Adjust path
import { ApiError } from '../../models/types/common'; // Assuming you have this type for API errors

export const applyForJob = createAsyncThunk(
 'applyJob/applyForJob',
 async (jobId: string, { dispatch }) => {
   try {
     dispatch(applyJobStart());
     await ApplyJobService.applyForJob(jobId);
     dispatch(applyJobSuccess(jobId)); // Pass jobId back on success for potential UI updates
     return jobId;
   } catch (error) {
     const apiError = error as ApiError;
     dispatch(
       applyJobFailure(apiError.message || 'Failed to apply for job'),
     );
     throw error;
   }
 },
);
