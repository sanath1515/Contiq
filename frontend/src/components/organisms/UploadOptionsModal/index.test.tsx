import { screen, render, fireEvent } from '@testing-library/react';
import { UploadOptionsModal } from '.';

describe('Uploadoptions Modal testcases', () => {
  const mockOnCancel = jest.fn();
  const mockOnUpload = jest.fn();
  test('Uploaad modal renders correctly', () => {
    render(
      <UploadOptionsModal
        openModal={true}
        fileName="Contract agreement.pdf"
        onCancel={mockOnCancel}
        onUpload={mockOnUpload}
      />
    );
    const modal = screen.getByTestId('upload-options-modal');
    expect(modal).toBeInTheDocument();
    const uploadButton = screen.getByRole('button', { name: 'Upload' });
    fireEvent.click(uploadButton);
    expect(mockOnUpload).toHaveBeenCalled();
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
