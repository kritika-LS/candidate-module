import { Job } from '../../models/types/Dashboard';

export const mockJob: Job = {
  jobId: '1',
  jobTitle: 'Registered Nurse',
  jobType: 'Travel',
  facilityName: 'Starlight Medical Center',
  city: 'Syracuse',
  state: 'NY',
  country: 'US',
  jobReferenceNumber: 'RE-1032YPL',
  payRateMinimum: '$2484',
  payRateMaximum: '$2681',
  overallYearsOfExperienceMinimum: '0',
  overallYearsOfExperienceMaximum: '2',
  jobExperienceLevel: '0 - 2 Years',
  shiftDetails: '3x12 Day',
  numberOfOpenings: 1,
  validFrom: 'Dec 02, 2024',
  validTill: 'Mar 02, 2025',
  duration: '3 months',
  postedOn: '2 days ago',
};

export const mockDescription = `Special Requirements\n\n• Labor and Delivery experience REQUIRED\n• OB experience REQUIRED (Labor delivery, post-partum, nursery and couplet care required)`;

export const mockOverview = {
  Education: 'Bachelor of Science in Nursing',
  'Start Date': 'Dec 02, 2024',
  'End Date': 'Mar 02, 2025',
  Duration: '3 months',
  'Shift Schedule': '3x12 Day',
  Workplace: 'Onsite',
  Experience: '0 - 2 Years',
  'Shift Timing': '8:00 AM - 5:00 PM IST',
  'Shift Type': 'Day',
};

export const mockSkills = ['Behavioural Health Nursing'];

export const mockBenefits = [
  'Competitive Pay',
  'Attractive salary with performance-based bonuses',
];

export const mockSocialUrl = 'https://socialhub.fakeuser123.com'; 