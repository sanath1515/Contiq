import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreatePassword from './index';
import { BrowserRouter } from 'react-router-dom';

test('renders without errors', () => {
  render(<BrowserRouter><CreatePassword /></BrowserRouter>);
});

test('displays error message when passwords do not match', () => {
  const { getByText, getByPlaceholderText } = render(<BrowserRouter><CreatePassword /></BrowserRouter>);

  const newPasswordInput = getByPlaceholderText('New Password');
  const confirmPasswordInput = getByPlaceholderText('Confirm new password');
  const button = getByText('Reset Password');

  fireEvent.change(newPasswordInput, { target: { value: 'password1' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'password2' } });

  fireEvent.click(button);

  const errorMessage = getByText('Passwords do not match');
  expect(errorMessage).toBeInTheDocument();
  fireEvent.change(confirmPasswordInput, { target: { value: '' } });
  expect(errorMessage).not.toBeInTheDocument();
});
test('updates newPassword and newPasswordError correctly on input change', () => {
  const { getByPlaceholderText, getByText } = render(<BrowserRouter><CreatePassword /></BrowserRouter>);

  const newPasswordInput = getByPlaceholderText(
    'New Password'
  ) as HTMLInputElement;

  fireEvent.change(newPasswordInput, { target: { value: 'pass' } });
  expect(newPasswordInput.value).toBe('pass');
  const errorMessage = getByText(
    'Password must have atleast 6 characters. Password must contain at least one uppercase letter. Password must contain at least one digit. Password must contain at least one special character.'
  );
  expect(errorMessage).toBeInTheDocument();
  fireEvent.change(newPasswordInput, { target: { value: '' } });
  expect(errorMessage).not.toBeInTheDocument();
});

test('when password Matches Sucess Page', () => {
  const { getByText, getByPlaceholderText } = render(<BrowserRouter><CreatePassword /></BrowserRouter>);
  const newPasswordInput = getByPlaceholderText('New Password');
  const confirmPasswordInput = getByPlaceholderText('Confirm new password');
  const button = getByText('Reset Password');
  fireEvent.change(newPasswordInput, { target: { value: '' } });
  fireEvent.change(confirmPasswordInput, { target: { value: '' } });
  fireEvent.click(button);
  fireEvent.change(newPasswordInput, { target: { value: 'Pass@1234' } });
  fireEvent.change(confirmPasswordInput, { target: { value: '123' } });
  const errorMessage = getByText('Passwords do not match');
  expect(errorMessage).toBeInTheDocument();
  fireEvent.change(newPasswordInput, { target: { value: 'Pass@123' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'Pass@123' } });
  fireEvent.click(button);
});
