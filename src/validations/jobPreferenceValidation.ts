import * as yup from 'yup';
import moment from 'moment';

export const jobPreferenceSchema = yup.object().shape({
  employmentType: yup
    .string()
    .required('Employment type is required'),

  availabilityDate: yup
    .date()
    .required('Availability start date is required')
    .test(
      'not-in-past',
      'Start date cannot be in the past',
      (value) => !value || moment(value).isSameOrAfter(moment(), 'day')
    ),

  shift: yup
    .string()
    .nullable(),

  selectedStates: yup
    .string()
    .min(1, 'Please select at least one state'),
});
