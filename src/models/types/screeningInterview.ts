 // src/models/types/candidateInterviewScreening.ts

 /**
  * Defines the structure of a single interview screening record.
  * Adjust fields and types based on your actual API response.
  */
 export interface InterviewScreeningItem {
  [x: string]: string;
  interviewId: string; // Unique ID for the interview
  candidateId: string; // ID of the candidate
  jobId: string;       // ID of the job related to the interview
  interviewDate: string; // Date of the interview (e.g., "YYYY-MM-DD")
  interviewTime: string; // Time of the interview (e.g., "HH:MM AM/PM")
  interviewerName: string; // Name of the interviewer
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'PENDING'; // Example statuses
  interviewType: 'PHONE' | 'VIDEO' | 'IN_PERSON'; // Example interview types
  // Add any other fields present in your interview screening data
 }

 /**
  * Defines the overall structure of the API response for interview screening data.
  */
 export interface CandidateInterviewScreeningApiResponse {
  status: string;           // API call status (e.g., "OK", "ERROR")
  errorId: string | null;   // Error ID if the status is not OK
  successMessage: string | null; // Success message if applicable
  errorMessages: string | null; // Error messages if applicable
  totalResults: number;     // Total count of matching records (for pagination)
  responsePayload: InterviewScreeningItem[]; // Array of interview screening items
 }

 /**
  * Defines the request parameters for fetching interview screening data.
  * Based on the curl, pageFrom and pageSize are the primary parameters.
  */
 export interface FetchCandidateInterviewScreeningRequest {
  pageFrom: number; // Starting index for pagination (e.g., 0)
  pageSize: number; // Number of items to return per page (e.g., 10)
  // Add any other filter/sort parameters if the API supports them via query params
 }
