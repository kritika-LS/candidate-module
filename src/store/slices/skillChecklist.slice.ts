import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SkillChecklistItem } from '../../models/types/skillChecklist'; // Import SkillChecklistItem type

// Define a sub-state structure for each checklist category
interface ChecklistCategoryState {
 items: SkillChecklistItem[];
 loading: boolean;
 error: string | null;
 totalResults: number;
}

// Define the overall state for the skillChecklist slice
interface SkillChecklistState {
 all: ChecklistCategoryState;
 submitted: ChecklistCategoryState;
 draft: ChecklistCategoryState;
 approved: ChecklistCategoryState;
}

const initialCategoryState: ChecklistCategoryState = {
 items: [],
 loading: false,
 error: null,
 totalResults: 0,
};

const initialState: SkillChecklistState = {
 all: { ...initialCategoryState },
 submitted: { ...initialCategoryState },
 draft: { ...initialCategoryState },
 approved: { ...initialCategoryState },
};

const skillChecklistSlice = createSlice({
 name: 'skillChecklist',
 initialState,
 reducers: {
   // Action to start fetching for a specific status
   fetchSkillChecklistResponsesStart: (state, action: PayloadAction<'S' | 'D' | 'A' | null>) => {
     const status = action.payload;
     if (status === 'S') {
       state.submitted.loading = true;
       state.submitted.error = null;
     } else if (status === 'D') {
       state.draft.loading = true;
       state.draft.error = null;
     } else if (status === 'A') {
       state.approved.loading = true;
       state.approved.error = null;
     } else { // For null status (all)
       state.all.loading = true;
       state.all.error = null;
     }
   },
   // Action to handle successful fetch for a specific status
   fetchSkillChecklistResponsesSuccess: (
     state,
     action: PayloadAction<{ items: SkillChecklistItem[]; totalResults: number; status: 'S' | 'D' | 'A' | null }>
   ) => {
     const { items, totalResults, status } = action.payload;
     if (status === 'S') {
       state.submitted.loading = false;
       state.submitted.items = items;
       state.submitted.totalResults = totalResults;
     } else if (status === 'D') {
       state.draft.loading = false;
       state.draft.items = items;
       state.draft.totalResults = totalResults;
     } else if (status === 'A') {
       state.approved.loading = false;
       state.approved.items = items;
       state.approved.totalResults = totalResults;
     } else { // For null status (all)
       state.all.loading = false;
       state.all.items = items;
       state.all.totalResults = totalResults;
     }
   },
   // Action to handle failed fetch for a specific status
   fetchSkillChecklistResponsesFailure: (
     state,
     action: PayloadAction<{ error: string; status: 'S' | 'D' | 'A' | null }>
   ) => {
     const { error, status } = action.payload;
     if (status === 'S') {
       state.submitted.loading = false;
       state.submitted.error = error;
       state.submitted.items = [];
       state.submitted.totalResults = 0;
     } else if (status === 'D') {
       state.draft.loading = false;
       state.draft.error = error;
       state.draft.items = [];
       state.draft.totalResults = 0;
     } else if (status === 'A') {
       state.approved.loading = false;
       state.approved.error = error;
       state.approved.items = [];
       state.approved.totalResults = 0;
     } else { // For null status (all)
       state.all.loading = false;
       state.all.error = error;
       state.all.items = [];
       state.all.totalResults = 0;
     }
   },
   // Clear error for a specific status or all
   clearSkillChecklistError: (state, action: PayloadAction<'S' | 'D' | 'A' | null | 'all'>) => {
     const status = action.payload;
     if (status === 'S') state.submitted.error = null;
     else if (status === 'D') state.draft.error = null;
     else if (status === 'A') state.approved.error = null;
     else if (status === null || status === 'all') {
       state.all.error = null;
       state.submitted.error = null;
       state.draft.error = null;
       state.approved.error = null;
     }
   },
   // Clear data for a specific status or all
   clearSkillChecklistData: (state, action: PayloadAction<'S' | 'D' | 'A' | null | 'all'>) => {
     const status = action.payload;
     if (status === 'S') {
       state.submitted.items = [];
       state.submitted.totalResults = 0;
     } else if (status === 'D') {
       state.draft.items = [];
       state.draft.totalResults = 0;
     } else if (status === 'A') {
       state.approved.items = [];
       state.approved.totalResults = 0;
     } else if (status === null || status === 'all') {
       state.all.items = [];
       state.all.totalResults = 0;
       state.submitted.items = [];
       state.submitted.totalResults = 0;
       state.draft.items = [];
       state.draft.totalResults = 0;
       state.approved.items = [];
       state.approved.totalResults = 0;
     }
   },
 },
});

export const {
 fetchSkillChecklistResponsesStart,
 fetchSkillChecklistResponsesSuccess,
 fetchSkillChecklistResponsesFailure,
 clearSkillChecklistError,
 clearSkillChecklistData,
} = skillChecklistSlice.actions;

export default skillChecklistSlice.reducer;
