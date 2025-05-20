import {configureStore} from '@reduxjs/toolkit';
import jobsReducer from './slices/jobs.slice';
import pendingActionsReducer from './slices/pendingActions.slice';
import dashboardStatsReducer from './slices/dashboardStats.slice';
import candidateReducer from './slices/candidate.slice';
import candidatePersonalDetailsReducer from './slices/candidatePersonalDetails.slice';
import candidateWorkHistoryReducer from './slices/candidateWorkHistory.slice';
import candidateEducationReducer from './slices/candidateEducation.slice';
import candidateProfessionalInfoReducer from './slices/candidateProfessionalInfo.slice';
import candidateReferencesReducer from './slices/candidateReferences.slice';
import candidateResumeReducer from './slices/candidateResume.slice'; 

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    pendingActions: pendingActionsReducer,
    dashboardStats: dashboardStatsReducer,
    candidate: candidateReducer,
    candidatePersonalDetails: candidatePersonalDetailsReducer,
    candidateWorkHistory: candidateWorkHistoryReducer,
    candidateEducation: candidateEducationReducer,
    candidateProfessionalInfo: candidateProfessionalInfoReducer,
    candidateReferences: candidateReferencesReducer,
    candidateResume: candidateResumeReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
