import { createAsyncThunk } from '@reduxjs/toolkit';
import { UnsaveJobService } from '../../api/services/unsaveJob.service'; // Adjust path
import {
 unsaveJobStart,
 unsaveJobSuccess,
 unsaveJobFailure,
} from '../slices/unsaveJob.slice'; // Adjust path
import { ApiError } from '../../models/types/common'; // Assuming you have this type

export const unsaveJob = createAsyncThunk(
 'unsaveJob/unsaveJob',
 async (jobId: string, { dispatch }) => {
   try {
     dispatch(unsaveJobStart());
     await UnsaveJobService.unsaveJob(jobId);
     dispatch(unsaveJobSuccess(jobId)); // Pass jobId back on success
     return jobId;
   } catch (error) {
     const apiError = error as ApiError;
     dispatch(
       unsaveJobFailure(apiError.message || 'Failed to unsave job'),
     );
     throw error;
   }
 },
);
