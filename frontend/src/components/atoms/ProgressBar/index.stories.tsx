import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import LinearLoader from '.';

export default {
  title: 'atoms/ProgressBar',
  component: LinearLoader,
  argTypes: {
    progress: {
      control: { type: 'select' },
      options: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    }
  }
} as Meta<typeof LinearLoader>;

const Template: StoryFn<typeof LinearLoader> = (args) => (
  <LinearLoader {...args} />
);

export const Loader = Template.bind({});
Loader.args = {
  progress: 10
};
