import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import jobsReducer from './slices/jobs.slice';
import pendingActionsReducer from './slices/pendingActions.slice';
import dashboardStatsReducer from './slices/dashboardStats.slice';
import candidateReducer from './slices/candidate.slice';
import candidatePersonalDetailsReducer from './slices/candidatePersonalDetails.slice';
import candidateProfessionalInfoReducer from './slices/candidateProfessionalInfo.slice';
// import candidateJobPreferencesReducer from './slices/candidateJobPreferences.slice';
import candidateResumeReducer from './slices/candidateResume.slice';
import onboardingReducer from './slices/onboarding.slice';
import onboardReducer from './slices/onboard.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    pendingActions: pendingActionsReducer,
    dashboardStats: dashboardStatsReducer,
    candidate: candidateReducer,
    candidatePersonalDetails: candidatePersonalDetailsReducer,
    candidateProfessionalInfo: candidateProfessionalInfoReducer,
    // candidateJobPreferences: candidateJobPreferencesReducer,
    candidateResume: candidateResumeReducer,
    onboarding: onboardingReducer,
    onboard: onboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 