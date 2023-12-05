import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ResetPasswordSuccess from '.';
import { BrowserRouter } from 'react-router-dom';

describe('ResetPasswordSuccess Component', () => {
  it('should render without errors', () => {
    const { getByText } = render(<BrowserRouter><ResetPasswordSuccess /></BrowserRouter>);
    expect(getByText('Continue')).toBeInTheDocument();
  });

  it('handles button click', () => {
    const { getByText } = render(<BrowserRouter><ResetPasswordSuccess /></BrowserRouter>);
    const button = getByText('Continue');
    fireEvent.click(button);
  });
});
