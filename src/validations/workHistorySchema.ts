import * as Yup from 'yup';

export const workHistorySchema = Yup.object().shape({
    facilityname: Yup.string()
      .required('Worked With/Facility Name is required')
      .max(128, 'Facility Name cannot exceed 128 characters'),
    profession: Yup.string()
      .required('Profile title profession is required'),
    specialty: Yup.string()
      .required('Skills worked/specialty is required'),
    typeofBusiness: Yup.string()
      .required('Type of Business/facility is required'),
    startDate: Yup.string()
      .required('Start Date is required')
      .test(
        'is-future-date',
        'Start Date cannot be a future date',
        value => {
          return value ? new Date(value) <= new Date() : true;
        }
      ),
    endDate: Yup.string().when('currentlyWorking', {
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
    address: Yup.object().shape({
      address: Yup.string().required('Address is required'),
      zipCode: Yup.string().required('Zip Code is required'),
      city: Yup.string().required('City is required'),
      stateCode: Yup.string().required('State is required'),
      countryCode: Yup.string().required('Country is required'),
    }),
    nurseToPatientRatio: Yup.string()
      .required('Nurse to patient ratio is required'),
    shift: Yup.string()
      .required('Shift is required'),
    chargeExperience: Yup.string()
      .required('Charge experience is required'),
    Chartingsystem: Yup.string()
      .required('Charting system is required')
  });