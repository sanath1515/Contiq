import { screen, render } from '@testing-library/react';
import { PasswordSuccessPage } from './index';
import { BrowserRouter } from 'react-router-dom';
describe('Reset password success testcases', () => {
  it('Reset password success page renders as expected', () => {
    render(<BrowserRouter><PasswordSuccessPage /></BrowserRouter>);
    const element = screen.getByTestId('reset-success-component');
    expect(element).toBeInTheDocument();
  });
});
