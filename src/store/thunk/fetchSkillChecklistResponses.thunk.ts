import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSkillChecklistResponsesStart, fetchSkillChecklistResponsesSuccess, fetchSkillChecklistResponsesFailure } from '../slices/skillChecklist.slice';
import { SkillChecklistApiResponse, SkillChecklistRequestBody } from '../../models/types/skillChecklist';
import { SkillChecklistService } from '../../api/services/skillChecklist.service';
import { ApiError } from '../../models/types/common';

export const fetchSkillChecklistResponses = createAsyncThunk(
 'skillChecklist',
 async (payload: SkillChecklistRequestBody, { dispatch }) => {
   try {
     // Pass the status from the payload to the start action
     dispatch(fetchSkillChecklistResponsesStart(payload.status));
     const response: SkillChecklistApiResponse = await SkillChecklistService.getResponses(payload);
     // Pass the status along with items and totalResults to the success action
     dispatch(fetchSkillChecklistResponsesSuccess({
       items: response?.responsePayload,
       totalResults: response?.totalResults,
       status: payload?.status // Pass the status here
     }));
     console.log({response});
     return response;
   } catch (error) {
    console.log({error})
     const apiError = error as ApiError;
     // Pass the status along with the error message to the failure action
     dispatch(fetchSkillChecklistResponsesFailure({
       error: apiError?.message || 'Failed to fetch skill checklist responses',
       status: payload?.status // Pass the status here
     }));
     throw error;
   }
 },
);
