 export interface SkillChecklistRequestBody {
  checklistName: string;
  pageFrom: number;
  pageSize: number;
  sortBy: 'TITLE' | 'DATE' | string; // Add other sort options if known
  status: 'S' | 'D' | 'A' | null; // S: Submitted/Completed, D: Draft, A: Approved/Assigned (based on curl examples)
 }

 // actual API response structure
 export interface SkillChecklistItem {
  responseId: number; // Changed from 'id' to 'responseId' and type to number
  checklistId: number; // Added based on API response
  title: string;
  fileName: string; // Added based on API response
  template: string; // Added based on API response (HTML content)
  // status: 'S' | 'D' | 'A'; // This field is not directly in the item, but can be derived or passed in request
  // submissionDate: string; // Removed as it's not in the provided response
  [key: string]: any; // Fallback for unknown properties
 }

 export interface SkillChecklistApiResponse {
  status: string;
  errorId: string | null;
  successMessage: string | null;
  errorMessages: string | null;
  totalResults: number;
  responsePayload: SkillChecklistItem[];
 }
