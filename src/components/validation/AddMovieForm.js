import * as yup from 'yup';

export const movieSchema = yup.object().shape({
  title: yup.string().trim().required('Movie title is required.'),
  year: yup
    .number()
    .typeError('Year must be a number.')
    .min(1800, 'Year must be no earlier than 1800.')
    .max(new Date().getFullYear(), 'Year cannot be in the future.')
    .required('Year is required.'),
  format: yup
    .string()
    .oneOf(['VHS', 'DVD', 'Blu-Ray'], 'Invalid format.')
    .required('Movie format is required.'),
  actors: yup
    .string()
    .trim()
    .required('Actor list is required.'),
});