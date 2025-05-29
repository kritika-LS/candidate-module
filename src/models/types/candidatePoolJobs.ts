import { Job } from './Dashboard';

export interface CandidatePoolJobsApiResponse {
  status: string;
  errorId: string | null;
  successMessage: string | null;
  errorMessages: string | null;
  totalResults: number | null;
  responsePayload: Job[];
}