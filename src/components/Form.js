import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import validationSchema from './validationschema';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
`;

const Title = styled.h1`
  text-align: center;
  color: white;
  font-family: 'Arial', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: all 0.3s ease-in-out;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
`;

const Label = styled.label`
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
  transition: all 0.3s ease-in-out;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  transition: all 0.3s ease-in-out;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.p`
  color: #ff6347;
  font-size: 12px;
  transition: all 0.3s ease-in-out;
`;

const Summary = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const JobApplicationForm = () => {
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      position: '',
      relevantExperience: '',
      portfolioURL: '',
      managementExperience: '',
      additionalSkills: [],
      preferredInterviewTime: '',
    }
  });

  const position = watch('position');
  const [formData, setFormData] = useState(null);

  const onSubmit = data => {
    setFormData(data);
  };

  return (
    <Container>
      <Title>Job Application Form</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <Label>Full Name</Label>
          <Input {...register("fullName")} />
          {errors.fullName && <ErrorMessage>{errors.fullName.message}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label>Email</Label>
          <Input {...register("email")} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label>Phone Number</Label>
          <Input {...register("phoneNumber")} />
          {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label>Applying for Position</Label>
          <Select {...register("position")}>
            <option value="">Select Position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </Select>
          {errors.position && <ErrorMessage>{errors.position.message}</ErrorMessage>}
        </FormField>

        {(position === 'Developer' || position === 'Designer') && (
          <FormField>
            <Label>Relevant Experience (Years)</Label>
            <Input type="number" {...register("relevantExperience")} />
            {errors.relevantExperience && <ErrorMessage>{errors.relevantExperience.message}</ErrorMessage>}
          </FormField>
        )}

        {position === 'Designer' && (
          <FormField>
            <Label>Portfolio URL</Label>
            <Input {...register("portfolioURL")} />
            {errors.portfolioURL && <ErrorMessage>{errors.portfolioURL.message}</ErrorMessage>}
          </FormField>
        )}

        {position === 'Manager' && (
          <FormField>
            <Label>Management Experience</Label>
            <Input {...register("managementExperience")} />
            {errors.managementExperience && <ErrorMessage>{errors.managementExperience.message}</ErrorMessage>}
          </FormField>
        )}

        <FormField>
          <Label>Additional Skills</Label>
          <CheckboxLabel>
            <input type="checkbox" value="JavaScript" {...register("additionalSkills")} /> JavaScript
          </CheckboxLabel>
          <CheckboxLabel>
            <input type="checkbox" value="CSS" {...register("additionalSkills")} /> CSS
          </CheckboxLabel>
          <CheckboxLabel>
            <input type="checkbox" value="Python" {...register("additionalSkills")} /> Python
          </CheckboxLabel>
          {errors.additionalSkills && <ErrorMessage>{errors.additionalSkills.message}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label>Preferred Interview Time</Label>
          <Controller
            name="preferredInterviewTime"
            control={control}
            render={({ field }) => (
              <Input type="datetime-local" {...field} />
            )}
          />
          {errors.preferredInterviewTime && <ErrorMessage>{errors.preferredInterviewTime.message}</ErrorMessage>}
        </FormField>

        <Button type="submit">Submit</Button>
      </Form>

      {formData && (
        <Summary>
          <h2>Form Summary</h2>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </Summary>
      )}
    </Container>
  );
};

export default JobApplicationForm;
