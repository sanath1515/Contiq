import { Meta, StoryFn } from '@storybook/react';
import Header, { HeaderProps } from '.';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'organisms/Header',
  component: Header
} as Meta;

const Template: StoryFn<HeaderProps> = (args) => (
  <BrowserRouter><Header {...args} /></BrowserRouter>
);

export const Default = Template.bind({});

Default.args = {
  user: {
    userName: 'John Doe',
    userId: 3,
    avatarUrl: 'assets/icons/Avatar.svg'
  }
};
