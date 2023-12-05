import { screen, render } from '@testing-library/react';
import { CreateNewPassword } from './index';
import { BrowserRouter } from 'react-router-dom';

describe('Create New Page Testcases', () => {
  it('create new  page renders as expected', () => {
    render(<BrowserRouter><CreateNewPassword /></BrowserRouter>);
    const element = screen.getByTestId('create-password-component');
    expect(element).toBeInTheDocument();
  });
});
