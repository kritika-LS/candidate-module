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
import authReducer from './slices/auth.slice';
import saveJobReducer from './slices/saveJob.slice';
import jobDetailsReducer from './slices/jobDetails.slice';
import applyJobReducer from './slices/applyJob.slice';
import candidateSearchCriteriaReducer from './slices/candidateSearchCriteria.slice';
import candidatePoolJobsReducer from './slices/candidatePoolJobs.slice';
import unsaveJobReducer from './slices/unsaveJob.slice';
import withdrawApplicationReducer from './slices/withdrawApplication.slice';
import parseJobSearchQueryReducer from './slices/parseJobSearchQuery.slice';
import jobsMatchingReducer from './slices/jobsMatching.slice';
import recommendedJobsWithFiltersReducer from './slices/recommendedJobsWithFilters.slice';
import skillChecklistReducer from './slices/skillChecklist.slice';
import saveSkillChecklistResponseReducer from './slices/saveSkillChecklistResponse.slice'; 
import screeningInterviewsReducer from './slices/screeningInterviews.slice';
import interviewRescheduleReducer from './slices/interviewReschedule.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
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
    saveJob: saveJobReducer,
    jobDetails: jobDetailsReducer,
    applyJob: applyJobReducer,
    candidateSearchCriteria: candidateSearchCriteriaReducer,
    candidatePoolJobs: candidatePoolJobsReducer,
    unsaveJob: unsaveJobReducer,
    withdrawApplication: withdrawApplicationReducer,
    parseJobSearchQuery: parseJobSearchQueryReducer,
    jobsMatching: jobsMatchingReducer,
    recommendedJobsWithFilters: recommendedJobsWithFiltersReducer,
    skillChecklist: skillChecklistReducer,
    saveSkillChecklistResponse: saveSkillChecklistResponseReducer,
    screeningInterviews: screeningInterviewsReducer,
    interviewReschedule: interviewRescheduleReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
