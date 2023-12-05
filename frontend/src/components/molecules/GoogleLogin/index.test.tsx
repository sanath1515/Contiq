import { screen, render } from '@testing-library/react';
import { GoogleLogin } from '.';

describe('Googlelogin testcases', () => {
  test('GoogleLogin component renders as expected', () => {
    render(<GoogleLogin />);
    const element = screen.getByTestId('google-login');
    expect(element).toBeInTheDocument();
  });
});
