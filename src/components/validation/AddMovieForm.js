import * as yup from 'yup';

export const movieSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required('Movie title is required.'),
    
  year: yup
    .number()
    .typeError('Year must be a number')
    .required('Year is required')
    .min(1888, 'Year is too old')
    .max(2020, 'Year cannot be later than 2020'),

  format: yup
    .string()
    .oneOf(['VHS', 'DVD', 'Blu-Ray'], 'Invalid format.')
    .required('Movie format is required.'),

  actors: yup
    .string()
    .trim()
    .required('Actor list is required.')
    .test('has-actors', 'At least one actor is required', value => {
      return value.split(',').map(s => s.trim()).filter(Boolean).length > 0;
    }),
});
