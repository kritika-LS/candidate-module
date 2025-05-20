export const ENDPOINTS = {
    AUTH: {
      LOGIN: '/api/Authenticate',
    },
    DASHBOARD: {
        recommendedJobs: '/api/v1/candidate/jobs/recommended',
        pendingActions: '/api/v1/candidate/pending-actions',
        dashboardStatistics: '/api/v1/candidate-pool/dashboard/statistics',
    },
    CANDIDATE: {
      candidate: '/api/v1/candidate',
      personalDetails: '/api/v1/candidate/personal-details',
      workHistory: '/api/v1/candidate/work-history',
      educations: '/api/v1/candidate/educations',
      professionalInformation: '/api/v1/candidate/professional-information',
      references: '/api/v1/candidate/references',
      resume: '/api/v1/candidate/resume',
    },
  } as const;
  