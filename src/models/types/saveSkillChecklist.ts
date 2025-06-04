 // src/models/types/skillChecklist.ts

 export interface SkillChecklistRequestBody {
  checklistName: string;
  pageFrom: number;
  pageSize: number;
  sortBy: 'TITLE' | 'DATE' | string; // Add other sort options if known
  status: 'S' | 'D' | 'A' | null; // S: Submitted, D: Draft, A: Approved, null for all
 }

 // NEW: Interface for the request body to save skill checklist responses
 export interface SaveSkillChecklistResponseRequestBody {
  response: string; // The HTML content of the checklist
  skillChecklistId: number; // The ID of the checklist
  status: 'S' | 'D' | 'A'; // 'S' for Submitted, 'D' for Draft, 'A' for Approved
 }

 export interface SkillChecklistItem {
  responseId: number;
  checklistId: number;
  title: string;
  fileName: string;
  template: string;
  status?: 'S' | 'D' | 'A';
  [key: string]: any;
 }

 export interface SkillChecklistApiResponse {
  status: string;
  errorId: string | null;
  successMessage: string | null;
  errorMessages: string | null;
  totalResults: number;
  responsePayload: SkillChecklistItem[];
 }

 // NEW: Interface for the API response after saving
 export interface SaveSkillChecklistResponseApiResponse {
  status: string;
  errorId: string | null;
  successMessage: string | null;
  errorMessages: string | null;
  responsePayload: {
    responseId: number; // The ID of the saved response
    // Add any other relevant fields returned by the API after saving
  } | null;
 }
