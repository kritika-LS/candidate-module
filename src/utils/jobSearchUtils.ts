import { ParseJobSearchQueryResponse } from "../api/services/parseJobSearchQuery.service";
import { JobSearchRequestBody } from "../models/types/jobSearch";


// Define an interface for the filter parameters to pass to the utility function
interface JobSearchFilters {
 selectedEmploymentTypes: string[];
 selectedShifts: string[];
 contractLength: [number, number];
}

/**
 * Builds the request body for the jobs/matching API call.
 * @param parsedData The parsed data from the parseJobSearchQuery API.
 * @param filters Current filter selections (employment types, shifts, contract length).
 * @param sortByOption The current sort by option (e.g., 'Relevance', 'Newest', 'Highest Pay').
 * @param query The original search query string.
 * @param page The page number for pagination.
 * @param pageSize The page size for pagination.
 * @returns A complete JobSearchRequestBody object.
 */
export const buildJobSearchRequestBody = (
 parsedData: ParseJobSearchQueryResponse['responsePayload'],
 filters: JobSearchFilters,
 sortByOption: string,
 query: string,
 page: number,
 pageSize: number,
): JobSearchRequestBody => {
 const { selectedEmploymentTypes, selectedShifts, contractLength } = filters;

 const sortBy =
   sortByOption === 'Newest'
     ? 'NEWEST'
     : sortByOption === 'Highest Pay'
     ? 'PAYRATE'
     : 'RELEVANCE';

 return {
   profileTitles: null,
   jobsToExclude: null,
   employmentTypes: selectedEmploymentTypes,
   shiftTypes: selectedShifts,
   durationFrom: null,
   durationTo: null,
   sortBy: sortBy,
   sortOrder: 'Desc',
   job_ids: [],
   external_job_id: null,
   job_reference_numbers: [],
   job_description_url: null,
   job_titles: parsedData?.jobTitle ? [parsedData.jobTitle] : [],
   job_category: 'Healthcare' || null,
   bill_rate_type: null,
   bill_rate_minimum: null,
   bill_rate_maximum: null,
   pay_rate_type: null,
   pay_rate_minimum: null,
   pay_rate_maximum: null,
   overall_years_of_experience_minimum: null,
   overall_years_of_experience_maximum: null,
   job_experience_level: null,
   currency: null,
   job_type: null,
   work_from: null,
   facility_name: null,
   locations: [{
     country: null,
     state: null,
     city: null,
     abb_city: null,
     abb_state: null,
     abb_country: null
   }],
   shift_type: null,
   shift_start_time: null,
   shift_end_time: null,
   shift_timezone: null,
   shift_details: null,
   minimum_education: null,
   number_of_openings: null,
   posted_on: null,
   refreshed_on: null,
   valid_from: null,
   duration: null,
   valid_till: null,
   benefits: [],
   status: null,
   number_of_views: null,
   social_media_url: null,
   vendor_neutrality: null,
   allowed_to_work_in_other_jobs: null,
   limit_for_applications: null,
   limit_for_shortlists: null,
   key_skills: [],
   certifications: [],
   jobTitles: query,
   page: page,
   searchInputs: query
 };
};
