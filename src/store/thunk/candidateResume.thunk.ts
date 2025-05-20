import { createAsyncThunk } from '@reduxjs/toolkit';
import { CandidateResumeService } from '../../api/services/candidateResume.service'; // Adjust path
import {
  uploadResumeStart,
  uploadResumeSuccess,
  uploadResumeFailure,
} from '../slices/candidateResume.slice'; // Adjust path
import { ApiError } from '../../models/types/common'; // Assuming you have this type

export const uploadCandidateResume = createAsyncThunk(
  'candidateResume/uploadCandidateResume',
  async (resumeFile: FormData, { dispatch }) => {
    try {
      dispatch(uploadResumeStart());
      const response = await CandidateResumeService.uploadResume(resumeFile);
      dispatch(uploadResumeSuccess(response));
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(
        uploadResumeFailure(apiError.message || 'Failed to upload resume'),
      );
      throw error;
    }
  },
);