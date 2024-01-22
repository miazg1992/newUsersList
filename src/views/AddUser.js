import React, { useState, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import FormField from 'components/molecules/FormField/FormField';
import { Button } from 'components/atoms/Button/Button';
import { UserShape } from 'types';
import { ViewWrapper } from 'components/molecules/ViewWrapper/ViewWrapper';
import { Title } from 'components/atoms/Title/Title';
import { UsersContext } from 'providers/UsersProvider';
import { users as usersData } from 'data/users';

const initialFormState = {
  name: '',
  attendance: '',
  average: '',
  consent: false,
  error: {},
};

const actionTypes = {
  inputChange: 'INPUT CHANGE',
  clearValues: 'CLEAR VALUES',
  consentToggle: 'CONSENT TOGGLE',
  throwError: 'THROW ERROR',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.inputChange:
      return {
        ...state,
        [action.field]: action.value,
      };
    case actionTypes.clearValues:
      return initialFormState;
    case actionTypes.consentToggle:
      console.log('zmiana zgody');
      return {
        ...state,
        consent: !state.consent,
      };
    case 'THROW ERROR':
      return {
        ...state,
        error: [action.errorValue],
      };
    default:
      return state;
  }
};

const AddUser = () => {
  const [formValues, dispatch] = useReducer(reducer, initialFormState);

  const context = useContext(UsersContext);

  const handleInputChange = (e) => {
    dispatch({
      type: 'INPUT CHANGE',
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();
    if (formValues.consent) {
      context.handleAddUser(formValues);
      dispatch({ type: 'CLEAR VALUES' });
    } else {
      dispatch({ type: 'THROW ERROR', errorValue: 'You need to give consent' });
    }
  };
  return (
    <ViewWrapper as="form" onSubmit={handleSubmitUser}>
      <Title>Add new student</Title>
      <FormField label="Name" id="name" name="name" value={formValues.name} onChange={handleInputChange} />
      <FormField label="Attendance" id="attendance" name="attendance" value={formValues.attendance} onChange={handleInputChange} />
      <FormField label="Average" id="average" name="average" value={formValues.average} onChange={handleInputChange} />
      <FormField
        label="Consent"
        id="consent"
        name="consent"
        value={formValues.consent}
        type="Checkbox"
        onChange={() => dispatch({ type: actionTypes.consentToggle })}
      />
      <Button type="submit">Add</Button>
      {formValues.error.length ? <p>{'Formularz zawiera błędy'}</p> : null}
      {console.log(formValues.consent)}
      {/* {formValues.consent ? null : <p>{'nie ma zgody'}</p>} */}
    </ViewWrapper>
  );
};

export default AddUser;
