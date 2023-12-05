import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MuiButton from '.';

test('renders a button', () => {
  const { getByRole } = render(<MuiButton text="Click me" variant={'text'} />);
  const buttonElement = getByRole('button');
  expect(buttonElement).toBeInTheDocument();
});

test('triggers click handler when button is clicked', () => {
  const clickHandler = jest.fn();
  const { getByText } = render(
    <MuiButton text="Click me" onClick={clickHandler} variant={'text'} />
  );
  const buttonElement = getByText('Click me');

  fireEvent.click(buttonElement);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});

test('button has appropriate accessibility attributes', () => {
  const { getByRole } = render(
    <MuiButton text="Accessible Button" variant={'text'} />
  );
  const buttonElement = getByRole('button');

  expect(buttonElement).toHaveAccessibleName('Accessible Button');
  expect(buttonElement).toHaveAttribute('type', 'button');
});
