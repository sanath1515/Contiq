import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Typography } from '.';

export default {
  title: 'Atoms/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'h2',
        'h3',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption1',
        'overline',
        'overline2'
      ]
    }
  }
} as Meta<typeof Typography>;

const Template: StoryFn<typeof Typography> = (args) => <Typography {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: 'h2',
  children: 'Files'
};
