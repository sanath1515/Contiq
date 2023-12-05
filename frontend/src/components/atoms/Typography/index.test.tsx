import { screen, render } from '@testing-library/react';
import { Typography } from '.';

describe('Typography component tetstcases', () => {
  it('TYpography componnet renders as expected', () => {
    render(<Typography variant="h2">Files</Typography>);
    const element = screen.getByText('Files');
    expect(element).toBeInTheDocument();
  });
});
