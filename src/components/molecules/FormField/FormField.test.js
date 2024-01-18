import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormField from './FormField';
import { renderWithProviders } from 'helpers/renderWithProviders';

import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';

it('Form Field test', () => {
  //z wykorzystaniem helpers/renderWithThemeProvider:
  //   renderWithThemeProvider(<FormField label={'name'} name={'name'} id={'name'} />);
  render(
    <ThemeProvider theme={theme}>
      <FormField label={'name'} name={'name'} id={'name'} />
    </ThemeProvider>
  );
});
