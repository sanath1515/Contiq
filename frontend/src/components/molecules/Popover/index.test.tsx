import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Popover from './index';
import { TEXT } from '../../../utils/constants';

describe('SimpleSnackbar', () => {
  const handleClose = jest.fn();

  it('should call handleclose when close button is clicked', () => {
    render(<Popover Text={TEXT} handlingClose={handleClose} isOpen={true} />);

    const closeButton = screen.getByTestId('CloseIcon');
    fireEvent.click(closeButton);
    const textElement = screen.getByText(TEXT);

    expect(handleClose).toHaveBeenCalled();
    expect(textElement).toBeDefined();
  });
});
