import { Meta, StoryFn } from '@storybook/react';
import ResetPasswordSuccess from '.';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'molecules/ResetPasswordSuccess',
  component: ResetPasswordSuccess
} as Meta<typeof ResetPasswordSuccess>;

const Template: StoryFn<typeof ResetPasswordSuccess> = (args) => (
  <BrowserRouter>
    <ResetPasswordSuccess {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  handleChange: () => {}
};
