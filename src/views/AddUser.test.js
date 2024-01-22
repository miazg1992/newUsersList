import React, { useState } from 'react';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithProviders } from 'helpers/renderWithProviders';
import AddUser from './AddUser';
import Dashboard from './Dashboard';

it('Form Field test', () => {
  //z wykorzystaniem helpers/renderWithThemeProvider:
  renderWithProviders(
    <>
      <AddUser />
      <Dashboard />
    </>
  );
  fireEvent.change(screen.getByTestId('Name'), { target: { value: 'Ja' } });
  fireEvent.change(screen.getByTestId('Attendance'), { target: { value: '45' } });
  fireEvent.change(screen.getByTestId('Average'), { target: { value: '3' } });
  fireEvent.click(screen.getByText('Add'));
  screen.getByText('Ja');
});
