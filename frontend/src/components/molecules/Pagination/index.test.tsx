import React from 'react';
import { render } from '@testing-library/react';
import Pagination from '.';

test('renders Pagination component', () => {
  render(
    <Pagination
      currentPage={1}
      totalPages={10}
      zoomLevel={100}
      decreaseZoom={() => {}}
      increaseZoom={() => {}}
    />
  );
});
