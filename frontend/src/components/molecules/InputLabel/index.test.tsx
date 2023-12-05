import { screen, render, fireEvent } from '@testing-library/react';
import { InputLabel } from '.';
import theme from '@src/theme/theme';

describe('InputLabel component testcases', () => {
  const mockOnChange = jest.fn();
  it('InputLabel component renders as expected', () => {
    render(
      <InputLabel
        label="Email ID"
        labelColor={theme.palette.textColor.black}
        labelVariant={'body1'}
        placeholder={'john@example.com'}
        variant={'outlined'}
        type={'email'}
        onChange={mockOnChange}
      />
    );
    const labelText = screen.getByText('Email ID');
    expect(labelText).toBeInTheDocument();
    const emailInput = screen.getByPlaceholderText('john@example.com');
    fireEvent.change(emailInput, { target: { value: 'saicharan@gmail.com' } });
    expect(mockOnChange).toHaveBeenCalled();
  });
});
