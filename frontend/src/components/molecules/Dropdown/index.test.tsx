import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown from '.';

describe('Dropdown component', () => {
  const mockProps = {
    label: 'File type',
    filterLabel: 'Test Dropdown',
    options: [{ label: 'Option 1' }, { label: 'Option 2' }],
    startIconSrc: 'test-icon.png',
    handleClick: jest.fn(),
    filterOpen: true,
    boxWidth: '20px',
    justifyContent: 'center'
  };

  it('should render correctly', () => {
    const { getByText } = render(<Dropdown {...mockProps} isOpen={true} />);

    const labelElement = getByText('Test Dropdown');

    expect(labelElement).toBeInTheDocument();
  });

  it('should call handleClick when clicked', () => {
    const { getByTestId } = render(<Dropdown {...mockProps} isOpen={true} />);
    const dropdownContainer = getByTestId('dropdown-container');

    fireEvent.click(dropdownContainer);

    expect(mockProps.handleClick).toHaveBeenCalled();
  });

  it('should display correct chevron icon based on isOpen prop', () => {
    const { getByTestId, rerender } = render(
      <Dropdown {...mockProps} isOpen={false} />
    );
    const chevronIconElement = getByTestId('dropdown-icon');

    expect(chevronIconElement.getAttribute('src')).toContain(
      'chevron-down.svg'
    );

    rerender(<Dropdown {...mockProps} isOpen={true} />);
    expect(chevronIconElement.getAttribute('src')).toContain('chevron-up.svg');
  });
});
