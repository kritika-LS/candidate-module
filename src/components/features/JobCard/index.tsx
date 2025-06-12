import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextStyle } from '../../common/Text';
import Icon from '../../common/Icon/Icon';
import { styles } from './styles';
import { theme } from '../../../theme';
import Toast from 'react-native-toast-message';
import { saveJob } from '../../../store/thunk/saveJob.thunk';
import { unsaveJob } from '../../../store/thunk/unsaveJob.thunk';
import { RootState } from '../../../store';
import { ApiError } from '../../../models/types/common';
import { fetchDashboardStatistics } from '../../../store/thunk/dashboardStats.thunk';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch';
import moment from 'moment';
import { JobDetails } from '../../../models/types/jobDetails';
import { applyForJob } from '../../../store/thunk/applyJob.thunk';
import { useNavigation } from '@react-navigation/native';
import { formatTime } from '../../../utils/formatTime';
import { fetchRecommendedJobs } from '../../../store/thunk/jobs.thunk';

interface JobCardProps {
  job: JobDetails;
  onPress?: () => void;
  currentTab?: 'saved' | 'applications' | 'onboardings' | 'assignments';
  fetchJobs: () => void;
  screen?: 'JobPreviewScreen' | 'MyJobsScreen';
  onApplyWithChecklist?: (checklistId: string, jobTitle: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onPress, currentTab, fetchJobs, screen, onApplyWithChecklist }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [applyLoading, setApplyLoading] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const formatLocation = () => {
    const parts = [];
    if (job.city) parts.push(job.city);
    if (job.state) parts.push(job.state);
    if (job.country) parts.push(job.country);
    return parts.length > 0 ? parts.join(', ') : '-';
  };

  const formatPayRate = () => {
    if (job.payRateMinimum === null && job.payRateMaximum === null) return 'Payrate not specified';
    const minRate = job.payRateMinimum !== null ? `$${job.payRateMinimum}` : '';
    const maxRate = job.payRateMaximum !== null ? `$${job.payRateMaximum}` : '';

    if (minRate && maxRate) {
      return `${minRate} - ${maxRate} / week`;
    } else if (minRate) {
      return `${minRate} / week`;
    } else if (maxRate) {
      return `${maxRate} / week`;
    }
    return 'Payrate not specified';
  };

  const handleToggleSaveJob = useCallback(async () => {
    if (!job.jobId) {
      Toast.show({ type: 'error', text1: 'Job ID is missing' });
      return;
    }
    const isCurrentlySaved = (job.candidateProcessStatus === 'S' || currentTab === 'saved');
    if (bookmarkLoading) return;
    setBookmarkLoading(true);
    try {
      if (isCurrentlySaved) {
        await dispatch(unsaveJob(job.jobId)).unwrap();
        Toast.show({ type: 'success', text1: `Job "${job.jobTitle || 'Unknown'}" unsaved successfully!` });
      } else {
        await dispatch(saveJob(job.jobId)).unwrap();
        Toast.show({ type: 'success', text1: `Job "${job.jobTitle || 'Unknown'}" saved successfully!` });
      }
      fetchJobs();
      dispatch(fetchDashboardStatistics());
    } catch (err: unknown) {
      const apiError = err as ApiError;
      Toast.show({
        type: 'error',
        text1: 'Action Failed',
        text2: apiError.message || `Could not ${isCurrentlySaved ? 'unsave' : 'save'} the job.`,
      });
    } finally {
      setBookmarkLoading(false);
    }
  }, [job, currentTab, bookmarkLoading, dispatch, fetchJobs]);

  const handleApply = useCallback(async () => {
    if (!job.jobId) {
      Toast.show({ type: 'error', text1: 'Job ID is missing', text2: 'Cannot apply for job without a valid ID.' });
      return;
    }
    if (applyLoading) return;
    setApplyLoading(true);
    try {
      await dispatch(applyForJob(job.jobId)).unwrap();
      Toast.show({ type: 'success', text1: `Successfully applied for "${job.jobTitle || 'Unknown'}"!` });
      fetchJobs();
      dispatch(fetchDashboardStatistics());
      await dispatch(fetchRecommendedJobs({ 
        page: 0, 
        pageSize: 10, 
        sortBy: 'RELEVANCE',
        job_category: 'Healthcare'
      }));
      navigation.goBack();
    } catch (err: unknown) {
      const apiError = err as ApiError;
      Toast.show({
        type: 'error',
        text1: 'Application Failed',
        text2: apiError.message || 'Could not apply for the job.',
      });
    } finally {
      setApplyLoading(false);
    }
  }, [job, applyLoading, dispatch, fetchJobs, navigation]);

  const shouldHideDetails = screen === 'JobPreviewScreen' && currentTab === 'applications';

  console.log({job})

  const CardContent = (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.jobHeader}>
        <View style={styles.jobTitleContainer}>
          <TextStyle size='sm' variant='bold' numberOfLines={2}>
            {job.jobTitle || '-'}
          </TextStyle>
          {job.jobType && <TextStyle size='xs' style={styles.tag}>{job.jobType}</TextStyle>}
        </View>

        <View style={styles.actionButtons}>
          {(currentTab === 'saved' || !currentTab) && (
            <TouchableOpacity onPress={handleToggleSaveJob} disabled={bookmarkLoading}>
              {bookmarkLoading ? (
                <ActivityIndicator size="small" color={theme.colors.primary.main} />
              ) : (
                <Icon
                  name={(currentTab === 'saved') ? 'bookmark' : 'bookmark-outline'}
                  size={16}
                  color={(currentTab === 'saved') ? theme.colors.primary.main : theme.colors.grey[500]}
                />
              )}
            </TouchableOpacity>
          )}
          {/* <Chip chipName='Active' status='completed' /> */}
        </View>
      </View>

      {/* Facility & Location */}
      <View style={[styles.flexRow, styles.companyInfoSection]}>
        {job.facilityName && (
          <View style={[styles.flexRow, { marginRight: theme.spacing.md }]}>
            <Icon name='hospital-building' size={14} color='green' />
            <TextStyle size='sm' color='green' style={styles.iconSpacing} numberOfLines={1}>
              {job.facilityName}
            </TextStyle>
          </View>
        )}
        <View style={styles.locationContainer}>
          <Icon name='map-marker-outline' color={theme.colors.grey[800]} size={14} />
          <TextStyle size='sm' color={theme.colors.grey[800]} style={styles.iconSpacing} numberOfLines={1}>
            {formatLocation()}
          </TextStyle>
        </View>
      </View>

      {/* Reference Number & Pay */}
      <View style={styles.flexRow}>
        <Icon name='file-document-outline' size={12} color={theme.colors.grey[800]} />
        <TextStyle size='xs' color={theme.colors.grey[800]} style={styles.ref} numberOfLines={1}>
          Job Reference Number: {job.jobReferenceNumber || '-'}
        </TextStyle>
      </View>

      <TextStyle size='sm' variant='medium' style={styles.rate} numberOfLines={1}>
        {formatPayRate()}
      </TextStyle>

      {/* Hide this block conditionally */}
      {!shouldHideDetails && (
        <>
          {/* Experience & Shift */}
          <View style={styles.labels}>
            <View style={styles.greenLabel}>
              <View style={styles.labelContent}>
                <Icon name='briefcase-variant-outline' size={12} color={theme.colors.green.success_100} />
                <TextStyle size='xs' color={theme.colors.green.success_100} style={styles.labelText} numberOfLines={1}>
                  Experience: {job?.overallYearsOfExperienceMinimum + ' Years' || '-'}
                </TextStyle>
              </View>
            </View>
            <View style={styles.blueLabel}>
              <View style={styles.labelContent}>
                <Icon name='timer-sand-empty' size={12} color={theme.colors.primary.main} />
                <TextStyle size='xs' color={theme.colors.primary.main} style={styles.labelText} numberOfLines={1}>
                  Shift: {job.shiftDetails ? `${job.shiftDetails} Day` : '-'}
                </TextStyle>
              </View>
            </View>
          </View>

          {/* Dates, Duration, Openings */}
          <View style={styles.detailContainer}>
            <View style={styles.detailPill}>
              <TextStyle size="xs" color={theme.colors.grey[800]} numberOfLines={1}>
                Start Date: {job.validFrom ? moment(job.validFrom).format('DD MMM, YYYY') : '-'}
              </TextStyle>
            </View>
            <View style={styles.detailPill}>
              <TextStyle size="xs" color={theme.colors.grey[800]} numberOfLines={1}>
                End Date: {job.validTill ? moment(job.validTill).format('DD MMM, YYYY') : '-'}
              </TextStyle>
            </View>
            <View style={styles.detailPill}>
              <TextStyle size="xs" color={theme.colors.grey[800]} numberOfLines={1}>
                Duration: {job.duration ? `${parseInt(job.duration)} Days` : '-'}
              </TextStyle>
            </View>
            <View style={styles.detailPill}>
              <TextStyle size="xs" color={theme.colors.grey[800]} numberOfLines={1}>
                Openings: {job.numberOfOpenings || '-'}
              </TextStyle>
            </View>
          </View>

          {/* Footer: Posted & Applied Dates */}
          <View style={styles.jobCardFooter}>
            <View style={[styles.flexRow, {justifyContent: 'space-between', flex: 1}]}>
              <View style={styles.flexRow}>
                <Icon name='clock-outline' size={12} color={theme.colors.grey[500]} />
                <TextStyle size='xs' color={theme.colors.grey[500]} style={styles.iconSpacing} numberOfLines={1}>
                  Posted {job?.refreshedOn ? formatTime(job?.refreshedOn) : '-'}
                </TextStyle>
              </View>
              { currentTab === 'applications' &&
                <View>
                  <TextStyle size='xs' color={theme.colors.grey[600]} style={styles.iconSpacing} numberOfLines={1}>
                    Applied on: <TextStyle size='xs' color={theme.colors.grey[800]}>{job.appliedDate ? moment(job.appliedDate).format('DD MMM, YYYY') : '-'}</TextStyle>
                  </TextStyle>
                </View>
              }
            </View>

            {currentTab !== 'applications' && (
              <TouchableOpacity onPress={handleApply} style={styles.applyButton} disabled={applyLoading}>
                {applyLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <TextStyle style={styles.applyText}>Apply</TextStyle>
                )}
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );

  return onPress ? (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      {CardContent}
    </TouchableOpacity>
  ) : (
    CardContent
  );
};

export default JobCard;
