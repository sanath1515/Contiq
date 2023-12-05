import { Meta, StoryFn } from '@storybook/react';
import ResetPassword, { ResetPasswordProps } from '.';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'organisms/ResetPassword',
  component: ResetPassword
} as Meta;

const Template: StoryFn<ResetPasswordProps> = (args) => (
  <BrowserRouter><ResetPassword {...args} /></BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  emailId: 'john@example.com'
};
