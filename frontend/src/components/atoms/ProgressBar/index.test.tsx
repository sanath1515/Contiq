import React from 'react';
import { render, screen } from '@testing-library/react';
import LinearLoader from '.';

describe('LinearLoader testcases', () => {
  test('should renders LinearLoader component with initial progress', () => {
    render(<LinearLoader progress={10} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    const initialProgress = Number(progressBar.getAttribute('aria-valuenow'));
    expect(initialProgress).toBe(10);
  });
});
