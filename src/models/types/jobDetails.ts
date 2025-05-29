// src/models/types/jobDetails.ts

export interface SkillData {
  keyword: string;
  lastUsed: string | null;
}

export interface JobDetails {
  jobId: string;
  appliedDate: string;
  jobReferenceNumber: string;
  externalJobId: string;
  enterpriseId: string;
  facilityName: string;
  clientEnterpriseId: string | null;
  facilityEnterpriseId: string | null;
  mspEnterpriseId: string | null;
  enterpriseUserId: number;
  jobDescriptionUrl: string | null;
  jobDescriptionText: string;
  jobTitle: string;
  jobCategory: string;
  skillData: SkillData[];
  payRateType: string;
  payRateTypeFullText: string | null;
  payRateMinimum: number | null;
  payRateMaximum: number | null;
  overallYearsOfExperienceMinimum: number | null;
  overallYearsOfExperienceMaximum: number | null;
  jobExperienceLevel: string | null;
  jobExperienceLevelFullText: string | null;
  currency: string;
  jobType: string;
  workFrom: string;
  workFromFullText: string | null;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  latitude: number | null;
  longitude: number | null;
  shiftType: string;
  shiftStartTime: string;
  shiftEndTime: string;
  shiftTimezone: string | null;
  shiftDetails: string | null;
  minimumEducation: string | null;
  minimumEducationFullText: string | null;
  numberOfOpenings: number;
  postedOn: string;
  refreshedOn: string;
  validFrom: string;
  duration: string;
  validTill: string;
  benefits: string | null;
  additionalFields: any | null;
  checklistId: string | null;
  status: string;
  statusFullText: string | null;
  numberOfViews: number;
  socialMediaUrl: string | null;
  allowedToWorkInOtherJobs: string;
  limitForApplications: number | null;
  limitForShortlists: number | null;
  interviewConfigurations: any | null;
  interviewStopCriteria: any | null;
  numberOfCalendarSchedulesToBlock: number | null;
  expiryMinutesForAcceptingSchedules: number | null;
  jobEducationalQualifications: any[];
  // Fix: Add candidateProcessStatus property here
  candidateProcessStatus?: 'S' | 'A' | 'O' | 'N' | null; // Mark as optional if it might sometimes be missing, or required if always present. Adjust union type based on actual statuses like 'S' for Saved, 'A' for Applied, etc.
}

export interface JobDetailsPayload {
  jobDetails: JobDetails;
  candidatePoolDetails: any | null;
}

export interface JobDetailsApiResponse {
  status: string;
  errorId: string | null;
  successMessage: string | null;
  errorMessages: string | null;
  totalResults: number | null;
  responsePayload: JobDetailsPayload;
}