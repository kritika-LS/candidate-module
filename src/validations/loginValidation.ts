import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .max(128, 'Please enter a valid email address')
    .required('Please enter a valid email address'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(256, 'Input too long. Maximum allowed: 256 characters'),
});
