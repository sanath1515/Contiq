import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SignUpPage from '.';
import { BrowserRouter } from 'react-router-dom';
import {
  CREATE_A_PASSWORD_PLACEHOLDER,
  EMAIL_PLACEHOLDER,
  NAME_PLACEHOLDER
} from '../../utils/constants';
import * as services from '../../services';
const mockUserResponse = {
  data: {
    id: 1,
    fullname: 'Sai Charan Chetpelly',
    email: 'saicharan.chetpelly@zemosolabs.com',
    password: 'Password@123'
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {}
};
const mockUserNotFoundResponse = {
  response: {
    data: {
      id: 1,
      fullname: 'Sai Charan Chetpelly',
      email: 'saicharan.chetpelly@zemosolabs.com',
      password: 'Password@123'
    },
    status: 404,
    statusText: 'Not Found',
    headers: {},
    config: {}
  }
};
const mockServerErrorResponse = {
  response: {
    data: {
      id: 1,
      fullname: 'Sai Charan Chetpelly',
      email: 'saicharan.chetpelly@zemosolabs.com',
      password: 'Password@123'
    },
    status: 400,
    statusText: 'Not Found',
    headers: {},
    config: {}
  }
};
describe('Signup page testcases', () => {
  it('user already exists', () => {
    render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    );
    jest
      .spyOn(services, 'getUserByEmail')
      .mockResolvedValue(mockUserResponse as any);
    jest
      .spyOn(services, 'registerUser')
      .mockResolvedValue(mockUserResponse as any);
    const nameInput = screen.getByPlaceholderText(NAME_PLACEHOLDER);
    expect(nameInput).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: 'example' } });
    const emailInput = screen.getByPlaceholderText(EMAIL_PLACEHOLDER);
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'example@gmail.com' } });
    const passwordInput = screen.getByPlaceholderText(
      CREATE_A_PASSWORD_PLACEHOLDER
    );
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'Example@123' } });
    const createAccountButton = screen.getByRole('button', {
      name: 'Create account'
    });
    expect(createAccountButton).toBeInTheDocument();
    expect(createAccountButton).toBeEnabled();
    console.log(screen.getByTestId('signup-button').textContent);
    fireEvent.click(screen.getByTestId('signup-button'));
    jest.resetModules();
    jest.clearAllMocks();
  });
  it('user not exists and trying to signup, renders without errors', () => {
    render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    );
    jest
      .spyOn(services, 'getUserByEmail')
      .mockRejectedValue(mockUserNotFoundResponse as any);
    jest
      .spyOn(services, 'registerUser')
      .mockRejectedValue(mockUserResponse as any);
    const nameInput = screen.getByPlaceholderText(NAME_PLACEHOLDER);
    expect(nameInput).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: 'example' } });
    const emailInput = screen.getByPlaceholderText(EMAIL_PLACEHOLDER);
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'example@gmail.com' } });
    const passwordInput = screen.getByPlaceholderText(
      CREATE_A_PASSWORD_PLACEHOLDER
    );
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'Example@123' } });
    const createAccountButton = screen.getByRole('button', {
      name: 'Create account'
    });
    expect(createAccountButton).toBeInTheDocument();
    expect(createAccountButton).toBeEnabled();
    console.log(screen.getByTestId('signup-button').textContent);
    fireEvent.click(screen.getByTestId('signup-button'));
  });
  it('user not exists and trying to signup', () => {
    render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    );
    jest
      .spyOn(services, 'getUserByEmail')
      .mockRejectedValue(mockUserNotFoundResponse as any);
    jest
      .spyOn(services, 'registerUser')
      .mockResolvedValue(mockUserResponse as any);
    const nameInput = screen.getByPlaceholderText(NAME_PLACEHOLDER);
    expect(nameInput).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: 'example' } });
    const emailInput = screen.getByPlaceholderText(EMAIL_PLACEHOLDER);
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'example@gmail.com' } });
    const passwordInput = screen.getByPlaceholderText(
      CREATE_A_PASSWORD_PLACEHOLDER
    );
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'Example@123' } });
    const createAccountButton = screen.getByRole('button', {
      name: 'Create account'
    });
    expect(createAccountButton).toBeInTheDocument();
    expect(createAccountButton).toBeEnabled();
    console.log(screen.getByTestId('signup-button').textContent);
    fireEvent.click(screen.getByTestId('signup-button'));
  });
  it('server error during signup', () => {
    render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    );
    jest
      .spyOn(services, 'getUserByEmail')
      .mockRejectedValue(mockServerErrorResponse as any);
    jest
      .spyOn(services, 'registerUser')
      .mockRejectedValue(mockUserResponse as any);
    const nameInput = screen.getByPlaceholderText(NAME_PLACEHOLDER);
    expect(nameInput).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: 'example' } });
    const emailInput = screen.getByPlaceholderText(EMAIL_PLACEHOLDER);
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'example@gmail.com' } });
    const passwordInput = screen.getByPlaceholderText(
      CREATE_A_PASSWORD_PLACEHOLDER
    );
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'Example@123' } });
    const createAccountButton = screen.getByRole('button', {
      name: 'Create account'
    });
    expect(createAccountButton).toBeInTheDocument();
    expect(createAccountButton).toBeEnabled();
    console.log(screen.getByTestId('signup-button').textContent);
    fireEvent.click(screen.getByTestId('signup-button'));
  });
});
