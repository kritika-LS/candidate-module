 // src/store/slices/saveSkillChecklistResponse.slice.ts
 import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SaveSkillChecklistResponseApiResponse } from '../../models/types/saveSkillChecklist';

 interface SaveSkillChecklistResponseState {
  loading: boolean;
  error: string | null;
  success: boolean;
  responseId: number | null; // To store the responseId from the API after successful save
 }

 const initialState: SaveSkillChecklistResponseState = {
  loading: false,
  error: null,
  success: false,
  responseId: null,
 };

 const saveSkillChecklistResponseSlice = createSlice({
  name: 'saveSkillChecklistResponse',
  initialState,
  reducers: {
    saveSkillChecklistResponseStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.responseId = null;
    },
    saveSkillChecklistResponseSuccess: (
      state,
      action: PayloadAction<SaveSkillChecklistResponseApiResponse>
    ) => {
      state.loading = false;
      state.success = true;
      state.responseId = action.payload.responsePayload?.responseId || null;
    },
    saveSkillChecklistResponseFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.responseId = null;
    },
    clearSaveSkillChecklistResponseState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.responseId = null;
    },
  },
 });

 export const {
  saveSkillChecklistResponseStart,
  saveSkillChecklistResponseSuccess,
  saveSkillChecklistResponseFailure,
  clearSaveSkillChecklistResponseState,
 } = saveSkillChecklistResponseSlice.actions;

 export default saveSkillChecklistResponseSlice.reducer;
