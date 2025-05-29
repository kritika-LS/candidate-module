export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/Authenticate',
  },
  DASHBOARD: {
    recommendedJobs: '/api/v1/candidate/jobs/recommended',
    pendingActions: '/api/v1/candidate/pending-actions',
    dashboardStatistics: '/api/v1/candidate-pool/dashboard/statistics',
    saveJob: '/api/v1/candidate-pool/save-job',
    jobDetails: '/api/v1/candidate',
    applyJob: '/api/v1/candidate-pool/apply-job',
  },
  CANDIDATE: {
    candidate: '/api/v1/candidate',
    personalDetails: '/api/v1/candidate/personal-details',
    workHistory: '/api/v1/candidate/work-history',
    educations: '/api/v1/candidate/educations',
    professionalInformation: '/api/v1/candidate/professional-information',
    references: '/api/v1/candidate/references',
    resume: '/api/v1/candidate/resume',
    searchCriteria: '/api/v1/candidate/search-criteria',
  },
  MYJOBS: {
    candidatePoolJobs: '/api/v1/candidate-pool/jobs',
    unsaveJob: '/api/v1/candidate-pool/unsave-job',
    withdrawApplication: '/api/v1/candidate-pool/job',
  },
  SEARCH_TAB: {
    parseJobSearchQuery: '/api/v1/utils/parse-job-search-query',
    matchingJobs: '/api/v1/candidate/jobs/matching',
  },
} as const;
