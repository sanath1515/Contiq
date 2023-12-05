import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Calendar, { CalendarProps } from '.';

export default {
  title: 'molecules/Calendar',
  component: Calendar
} as Meta;

const Template: StoryFn<CalendarProps> = (args) => <Calendar {...args} />;

export const Default = Template.bind({});
Default.args = {
  onDateSelect: (formattedDate: string) => {
    console.log('Selected Formatted Date from Storybook: ', formattedDate);
  },
  openCalendar: true
};
export const EndDateisToday = Template.bind({});
EndDateisToday.args = {
  ...Default.args,
  endDate: new Date()
};
export const StartDateisToday = Template.bind({});
StartDateisToday.args = {
  ...Default.args,
  startDate: new Date()
};
