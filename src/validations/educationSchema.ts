import * as Yup from 'yup';

export const educationSchema = Yup.object().shape({
  levelOfEducation: Yup.string()
    .required('Level of Education is required'),
  modeOfEducation: Yup.string()
    .required('Mode of Education is required'),
  degreeName: Yup.string()
    .required('Name of Degree is required')
    .max(128, 'Degree Name cannot exceed 128 characters'),
  universityName: Yup.string()
    .required('University Name is required')
    .max(128, 'University Name cannot exceed 128 characters'),
  startDate: Yup.string()
    .required('Start Date is required'),
  endDate: Yup.string().when('currentlyStudying', {
    is: false,
    then: (schema) => schema
      .required('End Date is required')
      .test(
        'is-earlier-than-start',
        'End Date cannot be earlier than Start Date',
        function (value) {
          const { startDate } = this.parent;
          return value && startDate ? new Date(value) >= new Date(startDate) : true;
        }
      ),
    otherwise: (schema) => schema.notRequired(),
  }),
  currentlyStudying: Yup.boolean(),
  specialisation: Yup.string()
    .nullable(),
  grade: Yup.string()
    .nullable(),
  certifiedDate: Yup.string()
    .nullable(),
  city: Yup.string()
    .required('City is required'),
  state: Yup.string()
    .required('State is required'),
  country: Yup.string()
    .required('Country is required'),
  document: Yup.mixed()
    .nullable()
    .test(
      'fileSize',
      'File size should not exceed 10 MB',
      (value) => !value || (value.size <= 10 * 1024 * 1024)
    )
    .test(
      'fileType',
      'Unsupported file format',
      (value) => !value || ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type)
    ),
});