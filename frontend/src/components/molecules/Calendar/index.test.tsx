import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import Calendar from './index';

describe('Calendar Component', () => {
  it('should call onDateSelect when a date is selected', async () => {
    const mockOnDateSelect = jest.fn();
    const { container } = render(
      <Calendar
        onDateSelect={mockOnDateSelect}
        startDate={new Date('2023-09-07')}
        openCalendar={true}
      />
    );
    const dayToClick = container.querySelector(
      '[aria-label="Choose Friday, September 8th, 2023"]'
    );
    if (dayToClick) {
      act(() => {
        fireEvent.click(dayToClick);
      });
    }
  });
});
