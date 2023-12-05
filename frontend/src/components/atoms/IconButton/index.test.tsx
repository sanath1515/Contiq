import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ButtonWithIcon from './index';

describe('ButtonWithIcon', () => {
  it('renders the button with the correct name attribute', () => {
    render(
      <ButtonWithIcon
        name="TestButton"
        width={'278px'}
        height={'60px'}
        testId="ButtonWithIcon"
      />
    );
    const button = screen.getByTestId('ButtonWithIcon');
    expect(button).toBeInTheDocument();
  });

  it('renders with a specified variant', () => {
    render(
      <ButtonWithIcon
        name="Test Button"
        variant="outlined"
        width={'278px'}
        height={'60px'}
        testId="ButtonWithIcon"
      />
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('MuiButton-outlined');
  });

  it('styles the button with the correct width and height', () => {
    render(
      <ButtonWithIcon
        name="Test Button"
        width={'100px'}
        height={'50px'}
        testId="ButtonWithIcon"
      />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('width: 100px');
    expect(button).toHaveStyle('height: 50px');
  });

  it('calls a onClick function when button clicked', () => {
    const onClick = jest.fn();
    render(
      <ButtonWithIcon
        name="Test Button"
        onClick={onClick}
        width={'278px'}
        height={'60px'}
        testId="ButtonWithIcon"
      />
    );
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
