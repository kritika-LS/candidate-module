 // src/store/thunks/saveSkillChecklistResponse.thunk.ts
 import { createAsyncThunk } from '@reduxjs/toolkit';
 import {
  saveSkillChecklistResponseStart,
  saveSkillChecklistResponseSuccess,
  saveSkillChecklistResponseFailure,
 } from '../slices/saveSkillChecklistResponse.slice'; // Import the new slice actions
 import { ApiError } from '../../models/types/common'; // Assuming ApiError is defined here
import { SaveSkillChecklistResponseRequestBody } from '../../models/types/saveSkillChecklist';
import { SkillChecklistService } from '../../api/services/skillChecklist.service';

 export const saveSkillChecklistResponse = createAsyncThunk(
  'saveSkillChecklistResponse/save',
  async (payload: SaveSkillChecklistResponseRequestBody, { dispatch }) => {
    try {
      dispatch(saveSkillChecklistResponseStart());
      const response = await SkillChecklistService.saveResponses(payload);
      dispatch(saveSkillChecklistResponseSuccess(response));
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(saveSkillChecklistResponseFailure(apiError.message || 'Failed to save skill checklist response.'));
      throw error;
    }
  }
 );
