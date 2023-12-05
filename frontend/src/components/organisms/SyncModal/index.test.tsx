import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SyncModal from '.';

describe('SyncModal', () => {
  it('should render with correct props', () => {
    const isOpen = true;
    const handleClose = jest.fn();
    const estimatedTime = '5 minutes';
    const totalItems = 10;
    const completedItems = 5;

    const { getByText } = render(
      <SyncModal
        isOpen={isOpen}
        handleClose={handleClose}
        estimatedTime={estimatedTime}
        totalItems={totalItems}
        completedItems={completedItems}
      />
    );

    expect(getByText('Estimated time - 5 minutes')).toBeInTheDocument();
    expect(getByText('Completed 5/10')).toBeInTheDocument();
  });

  it('shoul call handleClose when close icon is clicked', () => {
    const isOpen = true;
    const handleClose = jest.fn();
    const estimatedTime = '5 minutes';
    const totalItems = 10;
    const completedItems = 5;

    const { getByAltText } = render(
      <SyncModal
        isOpen={isOpen}
        handleClose={handleClose}
        estimatedTime={estimatedTime}
        totalItems={totalItems}
        completedItems={completedItems}
      />
    );

    const closeIcon = getByAltText('close');

    fireEvent.click(closeIcon);
    expect(handleClose).toHaveBeenCalled();
  });
});
