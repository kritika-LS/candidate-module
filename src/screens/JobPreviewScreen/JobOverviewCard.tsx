import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment'; // Import moment
import { TextStyle } from '../../components/common/Text';
import { styles } from './styles';

// Assuming these styles are defined in './styles.js' or './styles.ts'
// (Keeping the placeholder comment for clarity, use your actual styles)
/*
const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },
  educationLabel: {
    fontSize: 14,
    color: '#666',
  },
  educationValue: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  overviewItem: {
    width: '48%', // Approx half width for two columns
    marginBottom: 12,
  },
  overviewLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  overviewValue: {
    fontSize: 14,
    fontWeight: '500',
  },
};
*/

interface JobData {
  jobId: string;
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
  skillData: {
    keyword: string;
    lastUsed: string | null;
  }[];
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
  additionalFields: string | null;
  checklistId: string | null;
  status: string;
  statusFullText: string | null;
  numberOfViews: number;
  socialMediaUrl: string | null;
  allowedToWorkInOtherJobs: string;
  limitForApplications: number | null;
  limitForShortlists: number | null;
  interviewConfigurations: string | null;
  interviewStopCriteria: string | null;
  numberOfCalendarSchedulesToBlock: number | null;
  expiryMinutesForAcceptingSchedules: number | null;
  jobEducationalQualifications: any[];
}

interface JobOverview {
  Education: string;
  'Start Date': string;
  'End Date': string;
  Duration: string;
  'Shift Schedule': string;
  Workplace: string;
  Experience: string;
  'Shift Timing': string;
  'Shift Type': string;
}

const gridFields: { label: string; key: keyof JobOverview }[] = [
  { label: 'Start Date', key: 'Start Date' },
  { label: 'End Date', key: 'End Date' },
  { label: 'Duration', key: 'Duration' },
  { label: 'Shift Schedule', key: 'Shift Schedule' },
  { label: 'Workplace', key: 'Workplace' },
  { label: 'Experience', key: 'Experience' },
  { label: 'Shift Timing', key: 'Shift Timing' },
  { label: 'Shift Type', key: 'Shift Type' },
];

// Helper function to format dates using Moment.js
const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  // Use moment() to parse the date string and then .format() for desired output
  return moment(dateString).format('MMM D, YYYY'); // e.g., "Nov 18, 2024"
};

const formatTimeWithColon = (timeString: string | null): string => {
  if (!timeString || timeString.length !== 4 || !/^\d+$/.test(timeString)) {
    return 'N/A'; // Handle null, empty, or invalid input
  }
  return `${timeString.substring(0, 2)}:${timeString.substring(2, 4)}`;
};

// Helper function to map raw job data to JobOverview interface
const mapJobDataToOverview = (job: JobData): JobOverview => {
  const startDate = formatDate(job.validFrom);
  const endDate = formatDate(job.validTill);
  const duration = job.duration ? `${parseInt(job.duration)} Days` : '-'; // Parse integer for duration
  const formattedStartTime = formatTimeWithColon(job.shiftStartTime);
  const formattedEndTime = formatTimeWithColon(job.shiftEndTime);

  const shiftTiming = (job.shiftStartTime && job.shiftEndTime) ?
    `${formattedStartTime} - ${formattedEndTime}` : 'N/A';
  const shiftSchedule = job.shiftDetails || (job.shiftType ? `${job.shiftType}` : '-');
  const workplace = job.city && job.state ? `${job.city}, ${job.state}` : '-';
  const experience = job.overallYearsOfExperienceMinimum ?
    `${job.overallYearsOfExperienceMinimum} Year(s)` : '-';
  const education = job.minimumEducationFullText || job.minimumEducation || 'Not Specified';

  return {
    Education: education,
    'Start Date': startDate,
    'End Date': endDate,
    Duration: duration,
    'Shift Schedule': shiftSchedule,
    Workplace: workplace,
    Experience: experience,
    'Shift Timing': shiftTiming,
    'Shift Type': job.shiftType || 'N/A',
  };
};

const JobOverviewCard = ({ jobData }: { jobData: JobData }) => {
  const overview = mapJobDataToOverview(jobData);

  return (
    <View style={styles.card}>
      <TextStyle variant="bold" size="md" style={styles.sectionTitle}>Job Overview</TextStyle>
      {/* Education row */}
      <View style={{ marginBottom: 12 }}>
        <Text style={styles.educationLabel}>Education:</Text>
        <Text style={styles.educationValue}>{overview.Education}</Text>
      </View>
      {/* Grid rows */}
      <View style={styles.overviewGrid}>
        {gridFields.map(field => (
          <View style={styles.overviewItem} key={field.key}>
            <Text style={styles.overviewLabel}>{field.label}</Text>
            <Text style={styles.overviewValue}>{overview[field.key]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default JobOverviewCard;