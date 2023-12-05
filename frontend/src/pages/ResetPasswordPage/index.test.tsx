import { screen, render } from '@testing-library/react';
import { ResetPasswordPage } from './index';
import { BrowserRouter } from 'react-router-dom';

describe('Reset Password page testcases', () => {
  it('reset password page renders as expected', () => {
    render(<BrowserRouter><ResetPasswordPage /></BrowserRouter>);
    const element = screen.getByTestId('reset-component');
    expect(element).toBeInTheDocument();
  });
});
