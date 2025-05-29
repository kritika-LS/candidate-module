// src/models/types/jobSearch.ts

import { Job } from './Dashboard'; // Assuming Job is defined here

export interface JobSearchRequestBody {
  profileTitles: string[] | null;
  jobsToExclude: string[] | null;
  employmentTypes: string[];
  shiftTypes: string[];
  durationFrom: number;
  durationTo: number;
  sortBy: 'RELEVANCE' | 'NEWEST' | 'PAYRATE';
  sortOrder: 'Asc' | 'Desc';
  job_ids: string[];
  external_job_id: string | null;
  job_reference_numbers: string[];
  job_description_url: string | null;
  job_titles: string[];
  job_category: string | null; // Changed to null as per curl
  bill_rate_type: string | null;
  bill_rate_minimum: number | null;
  bill_rate_maximum: number | null;
  pay_rate_type: string | null;
  pay_rate_minimum: number | null;
  pay_rate_maximum: number | null;
  overall_years_of_experience_minimum: number | null;
  overall_years_of_experience_maximum: number | null;
  job_experience_level: string | null;
  currency: string | null;
  job_type: string | null;
  work_from: string | null;
  facility_name: string | null;
  locations: Array<{
    country: string | null;
    state: string | null;
    city: string | null;
    abb_city: string | null;
    abb_state: string | null;
    abb_country: string | null;
  }>;
  shift_type: string | null;
  shift_start_time: string | null;
  shift_end_time: string | null;
  shift_timezone: string | null;
  shift_details: string | null;
  minimum_education: string | null;
  number_of_openings: number | null;
  posted_on: string | null;
  refreshed_on: string | null;
  valid_from: string | null;
  duration: string | null;
  valid_till: string | null;
  benefits: string[];
  status: string | null;
  number_of_views: number | null;
  social_media_url: string | null;
  vendor_neutrality: boolean | null;
  allowed_to_work_in_other_jobs: boolean | null;
  limit_for_applications: number | null;
  limit_for_shortlists: number | null;
  key_skills: string[];
  certifications: string[];
  jobTitles: string | null;
  page: number;
  searchInputs: string | null;
}

// Define the response structure for jobs/matching
export interface JobsMatchingApiResponse {
  status: string;
  errorId: string | null;
  successMessage: string | null;
  errorMessages: string | null;
  totalResults: number;
  responsePayload: Job[]; 
}