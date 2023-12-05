import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import RadioButton from '.';

test('render Typography', () => {
  const element = render(<RadioButton label="one" />);
  expect(element).toBeDefined();
});

test('check clicking radio button', () => {
  const onChange = jest.fn();
  const { getByRole } = render(<RadioButton onChange={onChange} />);
  fireEvent.click(getByRole('radio'));
  expect(onChange).toHaveBeenCalled();
});
