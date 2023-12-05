import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DriveFolder from '.';
import '@testing-library/jest-dom';

describe('DriveFolder component', () => {
  const mockProps = {
    name: 'Folder Name',
    handleClick: jest.fn()
  };

  it('should render correctly with provided props', () => {
    const { getByText, getByAltText } = render(<DriveFolder {...mockProps} />);

    const folderName = getByText('Folder Name');
    expect(folderName).toBeInTheDocument();

    const folderIcon = getByAltText('folder');
    expect(folderIcon).toBeInTheDocument();

    const rightIcon = getByAltText('right');
    expect(rightIcon).toBeInTheDocument();
  });

  it('should call handleClick when clicked', () => {
    const { getByTestId } = render(<DriveFolder {...mockProps} />);
    const folderComponent = getByTestId(`drive-folder-${mockProps.name}`);
    fireEvent.click(folderComponent);

    expect(mockProps.handleClick).toHaveBeenCalled();
  });
});
