import { render, screen, fireEvent } from '@testing-library/react';
import Files from './';
import { presentationArray } from '@src/utils/constants';
import { FileProps } from './index';

describe('Files Component', () => {
  const mockProps: FileProps = {
    presentationArray: presentationArray,
    handleFileClick: jest.fn()
  };
  it('renders the component', () => {
    render(<Files {...mockProps} />);
    expect(screen.getByText('All files')).toBeInTheDocument();
    expect(screen.getByText('File type')).toBeInTheDocument();
  });

  it('handles file type dropdown', () => {
    render(<Files {...mockProps} />);
    const fileTypeDropdown = screen.getByText('File type');
    fireEvent.click(fileTypeDropdown);
    fireEvent.click(screen.getAllByRole('menuitem')[0]);
  });

  it(' not handles file type dropdown', () => {
    render(<Files {...mockProps} />);
    const fileTypeDropdown = screen.getByText('File type');
    fireEvent.click(fileTypeDropdown);
    fireEvent.click(fileTypeDropdown);
  });

  it('handles start date', () => {
    render(<Files {...mockProps} />);
    const startDateButton = screen.getAllByAltText('chevron-down');
    fireEvent.click(startDateButton[0]);
    const date = screen.getAllByText('2')[0];
    expect(date).toBeDefined();
    fireEvent.click(date);
  });

  it('handles end date', () => {
    render(<Files {...mockProps} />);
    const startDateButton = screen.getAllByAltText('chevron-down');
    fireEvent.click(startDateButton[1]);
    const date = screen.getAllByText('2')[0];
    expect(date).toBeDefined();
    fireEvent.click(date);
  });

  it('handles most relevant', () => {
    render(<Files {...mockProps} />);
    const testDropdown = screen.getByText('Most relevant');
    expect(testDropdown).toBeInTheDocument();
  });

  it('should handle publish option for published by me selection', () => {
    render(<Files {...mockProps} />);

    const fileTypeDropdown = screen.getByText('Publish setting');
    fireEvent.click(fileTypeDropdown);
    fireEvent.click(screen.getAllByRole('menuitem')[0]);
  });

  it('should handle publish option for Published by Sales team selection', () => {
    render(<Files {...mockProps} />);
    const publishDropdown = screen.getByText('Publish setting');
    fireEvent.click(publishDropdown);
    const publishOption = screen.getByText('Published by Sales team');
    fireEvent.click(publishOption);
    fireEvent.click(publishOption);
  });

  it('should handle publish option for Published by others selection', () => {
    render(<Files {...mockProps} />);
    const publishDropdown = screen.getByText('Publish setting');
    fireEvent.click(publishDropdown);
    const publishOption = screen.getByText('Published by others');
    fireEvent.click(publishOption);
    fireEvent.click(publishOption);
  });

  it('should update selected pdf file type value', () => {
    render(<Files {...mockProps} />);
    const fileTypeDropdown = screen.getByText('File type');
    fireEvent.click(fileTypeDropdown);
    const pdfOption = screen.getByText('PDF');
    fireEvent.click(pdfOption);
  });

  it('should update selected ppt file type value', () => {
    render(<Files {...mockProps} />);
    const fileTypeDropdown = screen.getByText('File type');
    fireEvent.click(fileTypeDropdown);
    const pptOption = screen.getByText('PPT');
    fireEvent.click(pptOption);
  });

  it('should update selected image file type value', () => {
    render(<Files {...mockProps} />);
    const fileTypeDropdown = screen.getByText('File type');
    fireEvent.click(fileTypeDropdown);
    const pptOption = screen.getByText('Image');
    fireEvent.click(pptOption);
  });
});
