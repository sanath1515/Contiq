import { Meta, StoryFn } from '@storybook/react';
import UserMenuItem, { UserMenuItemProps } from '.';

export default {
  title: 'Molecules/UserMenuItem',
  component: UserMenuItem
} as Meta;

const Template: StoryFn<UserMenuItemProps> = (args) => (
  <UserMenuItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Profile',
  iconSrc: 'assets/icons/user2.svg',
  iconAlt: 'user',
  handleClick: () => {}
};
