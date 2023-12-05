import { screen, render, fireEvent } from '@testing-library/react';
import { SignUp } from '.';
import {
  CREATE_A_PASSWORD_PLACEHOLDER,
  EMAIL_PLACEHOLDER,
  NAME_PLACEHOLDER,
  VALID_EMAIL_ERROR_MESSAGE,
  VALID_NAME_ERROR_MESSAGE,
  VALID_PASSWORD_ERROR_MESSAGE
} from '@src/utils/constants';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
const navigate = jest.fn();
jest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    loginWithRedirect: jest.fn(),
  }),
}));
describe('Signup component testcases', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });
  it('Entering name field incorrectly', () => {
    render(<BrowserRouter><SignUp /></BrowserRouter>);
    const nameInput = screen.getByPlaceholderText(NAME_PLACEHOLDER);
    expect(nameInput).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: 's' } });
    const nameErrorMessage = screen.getByText(VALID_NAME_ERROR_MESSAGE);
    expect(nameErrorMessage).toBeInTheDocument();
  });
  it('Entering email field incorrectly', () => {
    render(<BrowserRouter><SignUp /></BrowserRouter>);
    const emailInput = screen.getByPlaceholderText(EMAIL_PLACEHOLDER);
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'saicharan@gmail' } });
    const emailErrorMessage = screen.getByText(VALID_EMAIL_ERROR_MESSAGE);
    expect(emailErrorMessage).toBeInTheDocument();
  });
  it('Entering password field incorrectly', () => {
    render(<BrowserRouter><SignUp /></BrowserRouter>);
    const passwordInput = screen.getByPlaceholderText(
      CREATE_A_PASSWORD_PLACEHOLDER
    );
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'Saicharan' } });
    const passwordErrorMessage = screen.getByText(VALID_PASSWORD_ERROR_MESSAGE);
    expect(passwordErrorMessage).toBeInTheDocument();
  });
  it('Entering all fields correctly and checking if button is enabled', () => {
    const mockHandleSignUp = jest.fn();
    render(<BrowserRouter><SignUp handleSignUp={mockHandleSignUp}/></BrowserRouter>);
    const nameInput = screen.getByPlaceholderText(NAME_PLACEHOLDER);
    expect(nameInput).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: 'saicharan' } });
    const emailInput = screen.getByPlaceholderText(EMAIL_PLACEHOLDER);
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'saicharan@gmail.com' } });
    const passwordInput = screen.getByPlaceholderText(
      CREATE_A_PASSWORD_PLACEHOLDER
    );
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'Saicharan@123' } });
    const createAccountButton = screen.getByRole('button', {
      name: 'Create account'
    });
    expect(createAccountButton).toBeInTheDocument();
    expect(createAccountButton).toBeEnabled();
    fireEvent.click(createAccountButton);
  });
  it("handle google signin",()=>{
    render(<BrowserRouter><SignUp /></BrowserRouter>);
    const googleLogin = screen.getByTestId("google-login");
    fireEvent.click(googleLogin);
    expect(useAuth0().loginWithRedirect).toHaveBeenCalledTimes(0);
  })
  it("handle signin navlink",()=>{
    render(<BrowserRouter><SignUp /></BrowserRouter>);
    const signin = screen.getByText("Sign In");
    fireEvent.click(signin);
    expect(navigate).toBeCalledWith('/');
  })
});
