import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckBox from './index';

describe('CheckBox', () => {
  test('renders checkbox with default props', () => {
    render(<CheckBox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  test("renders checked checkbox when 'checked' prop is passed as true", () => {
    render(<CheckBox checked={true} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });
});
