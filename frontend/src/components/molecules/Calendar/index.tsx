import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import './index.css';

export interface CalendarProps {
  onDateSelect: (formattedDate: string) => void;
  endDate?: Date;
  startDate?: Date;
  openCalendar: boolean;
}

const Calendar: React.FC<CalendarProps> = (props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [open, setOpen] = useState<boolean>(props.openCalendar);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setOpen(false);
    if (date) {
      const formattedDate = dayjs(date).format('DD MMM YYYY');
      props.onDateSelect(formattedDate);
    }
  };

  const formatWeekDay = (name: string) => {
    return name.slice(0, 3).toUpperCase();
  };

  const StyledDatePicker = styled(DatePicker)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:after': {
      visibility: 'hidden'
    }
  }));

  return (
    <StyledDatePicker
      data-testid="calendar-component"
      selected={selectedDate}
      onChange={handleDateChange}
      formatWeekDay={formatWeekDay}
      open={open}
      closeOnScroll={true}
      minDate={props.startDate}
      maxDate={props.endDate}
    />
  );
};

export default Calendar;
