// src/models/types/onboarding.ts

export interface Address {
  addressType: string;
  addressNotes: string;
  address: string;
  zipCode: string;
  country: string;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
 }

 export interface ParsedResumeData {
  service_name?: string;
  model_name?: string;
  result?: {
    first_name?: string;
    last_name?: string;
    email_address?: string;
    mobile_number?: string;
    profile_title?: string;
    specialty?: string;
    address?: {
      address?: string;
      city?: string;
      zip_code?: string;
      country?: string;
      state?: string;
      address_type?: string;
      address_notes?: string;
    };
    overall_years_of_experience?: number;
    brief?: string;
    skills?: string[];
    wage_expectation_category?: string;
    educations?: Array<{
      level_of_education?: string;
      university_name?: string;
      name_of_degree?: string;
      completed_when?: string;
      certified_when?: string;
      expiring_on?: string;
      specialty?: string;
      graduation_status?: string;
      mode_of_education?: string;
      grade?: string;
      joined_when?: string;
      city?: string;
      country?: string;
      state?: string;
    }>;
    certifications?: any[]; // Define more specifically if needed
    licensures?: any[]; // Define more specifically if needed
    references?: any[]; // Define more specifically if needed
    work_history?: Array<{
      title?: string;
      worked_with?: string;
      skills_worked?: string;
      worked_from?: string;
      worked_till?: string;
      summary_of_work?: string;
      type_of_business?: string;
      address?: string;
      city?: string;
      country?: string;
      state?: string;
      zip_code?: string;
      employer_phone_number?: string;
      hourly_rate?: string;
      reason_for_leaving?: string;
    }>;
    alternate_phone_number?: string;
    alternate_email_address?: string;
    other_phone_number?: string;
    middle_name?: string;
    other_previously_used_name?: string;
    known_as?: string;
    nationality?: string;
    ethnicity?: string;
    date_of_birth?: string;
    gender?: string;
    workplace_preference?: string;
    work_type_preference?: string;
    rate_per_hour?: string;
    portfolio_url_1?: string;
    portfolio_url_2?: string;
    portfolio_url_3?: string;
    portfolio_url_4?: string;
    military_status?: string;
  };
  processing_time?: number;
 }

 export interface ResumeDetail {
  professionalTitle: string;
  specialties: string;
  parsedData: string; // This is a stringified JSON of ParsedResumeData
  overallYearsOfExperience: number;
 }

 export interface SkillData {
  keyword: string;
  lastUsed: string | null;
 }

 export interface OnboardingDetails {
  firstName: string;
  lastName: string;
  alternateEmailAddress: string;
  mobileNumber: string;
  address: Address[];
  overallYearsOfExperience: number;
  profileTitle: string;
  workTypePreference: string;
  availableFrom: string;
  preferredShift: string;
  preferredLocation: string;
  resumes: ResumeDetail[];
  skillData: SkillData[];
 }