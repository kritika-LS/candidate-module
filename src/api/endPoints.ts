export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/Authenticate',
  },
  CANDIDATE_ONBOARDING: { // NEW: Add this section
    onboard: '/api/v1/candidate/onboard', // NEW: Add this endpoint
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
    educationDelete: '/api/v1/candidate/education/',
    professionalInformation: '/api/v1/candidate/professional-information',
    references: '/api/v1/candidate/references',
    resume: '/api/v1/candidate/resume',
    searchCriteria: '/api/v1/candidate/search-criteria',
    getScreening: '/api/v1/candidate/interview/screening',
    reSchedule: '/api/v1/candidate/interview/screening/re-schedule',
    doNotDisturb: '/api/v1/candidate/do-not-disturb',
    reverify: '/api/v1/candidate/reverify',
    notifications: '/api/v1/candidate/notifications',
    markAllNotificationsAsRead: '/api/v1/candidate/notifications/read-all',
    unreadNotificationsCount: '/api/v1/candidate/notifications/unread-count',
    markNotificationAsRead: '/api/v1/candidate/notifications/read',
    getScreeningDetails: '/public/api/v1/candidate/interview/screening/details',
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
  SKILL_CHECKLIST: {
    getResponses: '/api/v1/skill-checklist/get-responses',
    saveResponses: '/api/v1/skill-checklist/save-responses',
  },
} as const;
