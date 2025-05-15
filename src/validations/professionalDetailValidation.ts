import * as yup from 'yup';

export const professionalDetailsSchema = yup.object().shape({
  experience: yup
    .string()
    .required('Years of experience is required.')
    .matches(
      /^\d{1,2}(\.\d{1,2})?$/,
      'Enter a valid experience (up to 2 digits before decimal, max 11 years).'
    )
    .test(
      'max',
      'Experience cannot exceed 11 years.',
      value => !value || parseFloat(value) <= 11
    ),

  profession: yup
    .string()
    .required('Profession is required.'),

  specialty: yup
    .string()
    .required('Primary Specialty is required.'),
});
