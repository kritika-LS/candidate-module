import { createAsyncThunk } from '@reduxjs/toolkit';
import { WithdrawApplicationService } from '../../api/services/withdrawApplication.service'; // Adjust path
import {
 withdrawApplicationStart,
 withdrawApplicationSuccess,
 withdrawApplicationFailure,
} from '../slices/withdrawApplication.slice'; // Adjust path
import { ApiError } from '../../models/types/common'; // Assuming you have this type for API errors

export const withdrawApplication = createAsyncThunk(
 'withdrawApplication/withdrawApplication',
 async (jobId: string, { dispatch }) => {
   try {
     dispatch(withdrawApplicationStart());
     await WithdrawApplicationService.withdrawApplication(jobId);
     dispatch(withdrawApplicationSuccess(jobId)); // Pass jobId back on success
     return jobId;
   } catch (error) {
     const apiError = error as ApiError;
     dispatch(
       withdrawApplicationFailure(apiError.message || 'Failed to withdraw application'),
     );
     throw error;
   }
 },
);
