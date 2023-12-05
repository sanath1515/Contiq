import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { DatePicker } from '.';

export default {
  title: 'molecules/Datepicker',
  component: DatePicker
} as Meta<typeof DatePicker>;

const Template: StoryFn<typeof DatePicker> = () => {
  const [datelabel, setDatelabel] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | undefined>();
  return (
    <DatePicker
      label={'Start date'}
      date={datelabel}
      setDatelabel={setDatelabel}
      setDate={setStartDate}
    />
  );
};

export const Datepicker = Template.bind({});
Datepicker.args = {};
