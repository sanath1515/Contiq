import { render } from '@testing-library/react';
import Tabs from '.';
import React from 'react';
import '@testing-library/jest-dom';

test('renders Tabs component with tab items', () => {
  const tabItems = [
    { id: 1, name: 'Tab 1', disabled: false },
    { id: 2, name: 'Tab 2', disabled: true },
    { id: 3, name: 'Tab 3', disabled: false }
  ];
  const activeIndex = 0;

  render(<Tabs tabItems={tabItems} activeIndex={activeIndex} />);
});
