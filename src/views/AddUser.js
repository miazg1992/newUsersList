import React, { useState, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import FormField from 'components/molecules/FormField/FormField';
import { Button } from 'components/atoms/Button/Button';
import { UserShape } from 'types';
import { ViewWrapper } from 'components/molecules/ViewWrapper/ViewWrapper';
import { Title } from 'components/atoms/Title/Title';
import { UsersContext } from 'providers/UsersProvider';
import { useForm } from 'hooks/useForm';
import { users as usersData } from 'data/users';

const initialFormState = {
  name: '',
  attendance: '',
  average: '',
  consent: false,
  error: {},
};

const AddUser = () => {
  const { handleAddUser } = useContext(UsersContext);

  const { formValues, handleInputChange, handleClearForm, handleThrowError, handleToggleConsent } = useForm(initialFormState);

  const handleSubmitUser = (e) => {
    e.preventDefault();
    if (formValues.consent) {
      handleAddUser(formValues);
      handleClearForm(initialFormState);
    } else {
      handleThrowError('You need to give consent');
    }
  };
  return (
    <ViewWrapper as="form" onSubmit={handleSubmitUser}>
      <Title>Add new student</Title>
      <FormField label="Name" id="name" name="name" value={formValues.name} onChange={handleInputChange} />
      <FormField label="Attendance" id="attendance" name="attendance" value={formValues.attendance} onChange={handleInputChange} />
      <FormField label="Average" id="average" name="average" value={formValues.average} onChange={handleInputChange} />
      <FormField label="Consent" id="consent" name="consent" value={formValues.consent} type="Checkbox" onChange={handleToggleConsent} />
      <Button type="submit">Add</Button>
      {formValues.error.length ? <p>{formValues.error}</p> : null}
    </ViewWrapper>
  );
};

export default AddUser;
