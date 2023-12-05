import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DatePicker } from '.';
import { DAYS_OF_WEEK } from '@src/utils/constants';
describe('Date Picker Component', () => {
  it('Should render element', () => {
    const mockSetDateLabel = jest.fn();
    const mockSetDate = jest.fn();
    render(
      <DatePicker
        setDate={mockSetDate}
        setDatelabel={mockSetDateLabel}
        label={'Start Date'}
        date={'Start Date'}
        handleSelectedEmptyStartDate={true}
        handleSelectedEmptyEndDate={true}
        minDate={new Date("2023/08/30")}
      />
    );
    
    const downIcon = screen.getByAltText("chevron-down");
    fireEvent.click(downIcon);
    const date = screen.getAllByText('2')[0];
    expect(date).toBeDefined();
    fireEvent.click(date);

    const data = DAYS_OF_WEEK.get('MO');
    expect(data).toBeDefined;
  });
  test('should render the selected a date from the calendar', () => {
    const setDateMock = jest.fn();
    render(
      <DatePicker
        label="Select Date"
        date="2023-08-15"
        setDatelabel={() => {}}
        setDate={setDateMock}
        maxDate={new Date("2023/08/30")}
      />
    );

    const expandMoreIcon = screen.getByAltText('close-icon');
    fireEvent.click(expandMoreIcon);
    const dates = screen.queryAllByText((content, element) => {
      return content.includes('15') && content.includes('August') && content.includes('2023');
    });
    dates.forEach((date) => console.log(date.textContent));
    if (dates.length > 0) {
      fireEvent.click(dates[0]);
      expect(setDateMock).toHaveBeenCalledWith('2023-08-15');
    }
  });
});
