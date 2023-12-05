import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { HomeTemplate } from '.';

export default {
  title: 'templates/HomeTemplate',
  component: HomeTemplate
} as Meta<typeof HomeTemplate>;

const Template: StoryFn<typeof HomeTemplate> = (args) => (
  <HomeTemplate {...args} />
);

export const Default = Template.bind({});
Default.args = {};
