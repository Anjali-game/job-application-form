import * as yup from 'yup';

const validationSchema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  position: yup.string().required('Position is required'),
  relevantExperience: yup.number()
    .typeError('Must be a number')
    .when('position', (position, schema) => {
      if (position === 'Developer' || position === 'Designer') {
        return schema.min(1, 'Must be greater than 0').required('Relevant Experience is required');
      }
      return schema;
    }),
  portfolioURL: yup.string()
    .url('Invalid URL')
    .when('position', {
      is: 'Designer',
      then: yup.string().required('Portfolio URL is required'),
    }),
  managementExperience: yup.string()
    .when('position', {
      is: 'Manager',
      then: yup.string().required('Management Experience is required'),
    }),
  additionalSkills: yup.array().min(1, 'At least one skill must be selected'),
  preferredInterviewTime: yup.date().required('Preferred Interview Time is required'),
});

export default validationSchema;
