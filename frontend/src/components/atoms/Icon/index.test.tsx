import React from 'react';
import { render } from '@testing-library/react';
import Icon from './';

test('renders an icon', () => {
  const { getByAltText } = render(<Icon src="icon.png" alt="Icon Alt Text" />);
  const iconElement = getByAltText('Icon Alt Text');
  expect(iconElement).toBeInTheDocument();
  expect(iconElement.tagName).toBe('IMG');
});
