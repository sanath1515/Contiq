import { screen, render, fireEvent } from '@testing-library/react';
import { Signin } from '.';
import {
  CREATE_A_PASSWORD_PLACEHOLDER,
  EMAIL_PLACEHOLDER,
  VALID_EMAIL_ERROR_MESSAGE,
  VALID_PASSWORD_ERROR_MESSAGE
} from '@src/utils/constants';
import * as services from '../../../services';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
const navigate = jest.fn();
jest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    loginWithRedirect: jest.fn(),
  }),
}));
const mockUserResponse = {
  data:
    {
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
const mockLoginResponse = {
  data:
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWljaGFyYW5AZ21haWwuY29tIiwiaWF0IjoxNjk1MTEzMjk4LCJleHAiOjE2OTUxMTUwOTh9.aDw40IY1w-46yoL9cH8yZ6NG_vIuD0XCnuVXZDopuq4',
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {}
};
const mockNotFoundLoginResponse = {
  data:
    'Unable to generate token',
  status: 404,
  statusText: 'Not Found',
  headers: {},
  config: {}
};
describe('Signin component testcases', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });
  it('Entering email field incorrectly', () => {
    render(<BrowserRouter><Signin /></BrowserRouter>);
    const emailInput = screen.getByPlaceholderText(EMAIL_PLACEHOLDER);
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'saicharan@gmail' } });
    const emailErrorMessage = screen.getByText(VALID_EMAIL_ERROR_MESSAGE);
    expect(emailErrorMessage).toBeInTheDocument();
  });
  it('Entering password field incorrectly', () => {
    render(<BrowserRouter><Signin /></BrowserRouter>);
    const passwordInput = screen.getByPlaceholderText(
      CREATE_A_PASSWORD_PLACEHOLDER
    );
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'Saicharan' } });
    const passwordErrorMessage = screen.getByText(VALID_PASSWORD_ERROR_MESSAGE);
    expect(passwordErrorMessage).toBeInTheDocument();
  });
  it('Entering all fields correctly and checking if button is enabled', () => {
    jest.spyOn(services, 'login').mockResolvedValue(mockLoginResponse as any);
    jest
  .spyOn(services, 'getUserByEmail')
  .mockResolvedValue(mockUserResponse as any);
    render(<BrowserRouter><Signin /></BrowserRouter>);
    const emailInput = screen.getByPlaceholderText(EMAIL_PLACEHOLDER);
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'saicharan@gmail.com' } });
    const passwordInput = screen.getByPlaceholderText(
      CREATE_A_PASSWORD_PLACEHOLDER
    );
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'Saicharan@12' } });
    const createAccountButton = screen.getByRole('button', {
      name: 'Sign In'
    });
    expect(createAccountButton).toBeInTheDocument();
    expect(createAccountButton).toBeEnabled();
    fireEvent.click(createAccountButton);
    fireEvent.change(passwordInput, { target: { value: 'Saicharan@123' } });
    expect(createAccountButton).toBeEnabled();
    fireEvent.click(createAccountButton);
  });
  it('Entering all fields correctly and login with wrong credentials', () => {
    jest
  .spyOn(services, 'getUserByEmail')
  .mockResolvedValue(mockUserResponse as any);
    jest.spyOn(services, 'login').mockResolvedValue(mockNotFoundLoginResponse as any);
    render(<BrowserRouter><Signin /></BrowserRouter>);
    const emailInput = screen.getByPlaceholderText(EMAIL_PLACEHOLDER);
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'saicharan@gmail.com' } });
    const passwordInput = screen.getByPlaceholderText(
      CREATE_A_PASSWORD_PLACEHOLDER
    );
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'Saicharan@12' } });
    const createAccountButton = screen.getByRole('button', {
      name: 'Sign In'
    });
    expect(createAccountButton).toBeInTheDocument();
    expect(createAccountButton).toBeEnabled();
    fireEvent.click(createAccountButton);
    fireEvent.change(passwordInput, { target: { value: 'Saicharan@123' } });
    expect(createAccountButton).toBeEnabled();
    fireEvent.click(createAccountButton);
  });
  it('handling API error', () => {
    jest
  .spyOn(services, 'getUserByEmail')
  .mockResolvedValue(mockUserResponse as any);
    jest.spyOn(services, 'login').mockRejectedValue(mockLoginResponse as any);
    render(<BrowserRouter><Signin /></BrowserRouter>);
    const emailInput = screen.getByPlaceholderText(EMAIL_PLACEHOLDER);
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'saicharan@gmail.com' } });
    const passwordInput = screen.getByPlaceholderText(
      CREATE_A_PASSWORD_PLACEHOLDER
    );
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'Saicharan@12' } });
    const createAccountButton = screen.getByRole('button', {
      name: 'Sign In'
    });
    expect(createAccountButton).toBeInTheDocument();
    expect(createAccountButton).toBeEnabled();
    fireEvent.click(createAccountButton);
    fireEvent.change(passwordInput, { target: { value: 'Saicharan@123' } });
    expect(createAccountButton).toBeEnabled();
    fireEvent.click(createAccountButton);
  });
  it("handle google signin",()=>{
    render(<BrowserRouter><Signin /></BrowserRouter>);
    const googleLogin = screen.getByTestId("google-login");
    fireEvent.click(googleLogin);
    expect(useAuth0().loginWithRedirect).toHaveBeenCalledTimes(0);
  })
  it("handle forgotpassword navigation to page",()=>{
    render(<BrowserRouter><Signin /></BrowserRouter>);
    fireEvent.click(screen.getByText("Forgot password?"));
    expect(navigate).toBeCalledWith('/resetPassword');
  })
  it("handle signup navlink navigates to page",()=>{
    render(<BrowserRouter><Signin /></BrowserRouter>);
    fireEvent.click(screen.getByText("Sign Up"));
    expect(navigate).toBeCalledWith('/signup');
  })
});
