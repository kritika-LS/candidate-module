import * as Yup from 'yup';
import { professionsList, specialtiesMap } from '../constants';

export const workHistorySchema = Yup.object().shape({
    facilityname: Yup.string()
      .required('Worked With/Facility Name is required')
      .max(128, 'Facility Name cannot exceed 128 characters'),
    profession: Yup.string()
      .required('Profile title profession is required')
      .oneOf(professionsList, 'Please choose from the list'),
    specialty: Yup.string()
      .required('Skills worked/specialty is required')
      .test(
        'is-valid-specialty',
        'Please choose from the list',
        function (value) {
          const { profession } = this.parent;
          return (
            !profession ||
            (specialtiesMap[profession] && specialtiesMap[profession].includes(value as string))
          );
        }
      ),
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
    mobileNumber: Yup.string()
      .required('Employer Mobile Number is required')
      .matches(/^\+\d{1,4}\d{7,12}$/, 'Please enter a valid mobile number'),
    notes: Yup.string()
      .required('Reason for Leaving is required')
      .max(128, 'Reason for Leaving cannot exceed 128 characters'),
    summaryOfWork: Yup.string()
      .required('Summary of work is required'),
    supervisorName: Yup.string()
      .required('Supervisor Name is required')
      .max(128, 'Supervisor Name cannot exceed 128 characters'),
    numberOfFacilityBeds: Yup.string()
      .required('Number of facility beds is required'),
    numberOfBedsInUnit: Yup.string()
      .required('Number of beds in unit is required'),
    employmentType: Yup.string()
      .required('Employment type is required'),
    nurseToPatientRatio: Yup.string()
      .required('Nurse to patient ratio is required'),
    shift: Yup.string()
      .required('Shift is required'),
    chargeExperience: Yup.string()
      .required('Charge experience is required'),
  });