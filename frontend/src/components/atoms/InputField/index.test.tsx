import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import InputField from '.';
import SearchIcon from '../../../../public/assets/icons/search.svg';
describe('InputField testcases', () => {
  const mockOnChange = jest.fn();
  test('should renders textField', () => {
    render(
      <InputField
        variant="outlined"
        placeholder="John Cena"
        type="text"
        onChange={mockOnChange}
      />
    );
    const element = screen.getByPlaceholderText('John Cena');
    expect(element).toBeInTheDocument;
  });
  test('renders inputfield with starticon correctly', () => {
    render(
      <InputField
        variant="outlined"
        placeholder="Search"
        type="text"
        startIcon={<img src={SearchIcon} />}
        onChange={mockOnChange}
      />
    );
    const icon = screen.getByRole('img');
    expect(icon).toBeInTheDocument();
  });
  test('trigerring onchange event by entering something in inputfield', () => {
    render(
      <InputField
        variant="outlined"
        placeholder="Search"
        type="text"
        onChange={mockOnChange}
      />
    );
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'business' } });
    expect(mockOnChange).toHaveBeenCalled();
  });
});
