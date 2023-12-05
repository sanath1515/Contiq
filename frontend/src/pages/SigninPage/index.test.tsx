import { screen, render } from '@testing-library/react';
import { SigninPage } from '.';
import { BrowserRouter } from 'react-router-dom';
describe('Signin page testcases', () => {
  it('signin page renders as expected', () => {
    render(<BrowserRouter><SigninPage /></BrowserRouter>);
    const element = screen.getByTestId('signin-component');
    expect(element).toBeInTheDocument();
  });
});
