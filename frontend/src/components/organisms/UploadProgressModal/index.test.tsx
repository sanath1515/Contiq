import { screen, render, act } from '@testing-library/react';
import { UploadProgressModal } from '.';

describe('UploadProgressModal testcases', () => {
  const mockHandleClose = jest.fn();
  const mockHandleExtraProp = jest.fn();
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
  test('component renders as expected', () => {
    render(
      <UploadProgressModal
        openModal={true}
        fileName="Contract agreement.pdf"
        handleClose={mockHandleClose}
        handleExtraProp={mockHandleExtraProp}
      />
    );
    const modal = screen.getByTestId('upload-progress-modal');
    expect(modal).toBeInTheDocument();
  });
  test('progress bar in modal works as expected', () => {
    render(
      <UploadProgressModal
        openModal={true}
        fileName="Contract agreement.pdf"
        handleClose={mockHandleClose}
        handleExtraProp={mockHandleExtraProp}
      />
    );

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();

    const initialProgress = Number(progressBar.getAttribute('aria-valuenow'));
    expect(initialProgress).toBe(10);
    act(() => {
      jest.advanceTimersByTime(1800);
    });

    const finalProgress = Number(progressBar.getAttribute('aria-valuenow'));
    expect(finalProgress).toBe(100);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    const afterFinalProgress = Number(
      progressBar.getAttribute('aria-valuenow')
    );
    expect(afterFinalProgress).toBe(100);
  });
});
