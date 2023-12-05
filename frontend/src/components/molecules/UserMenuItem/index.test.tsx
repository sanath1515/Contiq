import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserMenuItem from '.';
import '@testing-library/jest-dom';

describe('UserMenuItem Component', () => {
  test('should display correct label and icon', () => {
    const mockProps = {
      label: 'Test Label',
      iconSrc: '/path/to/icon.png',
      iconAlt: 'Icon Alt Text',
      handleClick: jest.fn()
    };

    const { getByText, getByAltText } = render(<UserMenuItem {...mockProps} />);
    const labelElement = getByText('Test Label');
    const iconElement = getByAltText('Icon Alt Text');

    expect(labelElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  test('should call handleClick function when clicked', () => {
    const mockHandleClick = jest.fn();
    const mockProps = {
      label: 'Test Label',
      iconSrc: '/path/to/icon.png',
      iconAlt: 'Icon Alt Text',
      handleClick: mockHandleClick
    };

    const { getByTestId } = render(<UserMenuItem {...mockProps} />);
    const menuItem = getByTestId(`user-menu-item-${mockProps.label}`);

    fireEvent.click(menuItem);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
