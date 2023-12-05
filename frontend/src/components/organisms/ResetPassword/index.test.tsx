import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResetPassword from './index';
import { BrowserRouter } from 'react-router-dom';

describe('ResetPassword Component', () => {
  it('renders all elements correctly', () => {
    render(<BrowserRouter><ResetPassword emailId="test@example.com" /></BrowserRouter>);
    expect(screen.getByText('Reset your password')).toBeInTheDocument();
    expect(
      screen.getByText(
        'The verification mail will be sent to the mailbox please check it.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it('calls the onClick function when Send button is clicked', () => {
    const emailId = 'test@example.com';
    const { getByText } = render(<BrowserRouter><ResetPassword emailId={emailId} /></BrowserRouter>);
    const button = getByText('Send');
    fireEvent.click(button);
  });
});
