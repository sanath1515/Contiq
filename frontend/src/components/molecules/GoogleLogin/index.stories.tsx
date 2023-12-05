import { StoryFn, Meta } from '@storybook/react';
import { GoogleLogin } from '.';

export default {
  title: 'molecules/GoogleLogin',
  component: GoogleLogin
} as Meta<typeof GoogleLogin>;

const Template: StoryFn<typeof GoogleLogin> = (args) => (
  <GoogleLogin {...args} />
);

export const Default = Template.bind({});
