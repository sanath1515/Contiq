import { Meta, StoryFn } from '@storybook/react';
import UserMenu, { UserMenuProps } from '.';

export default {
  title: 'Organisms/UserMenu',
  component: UserMenu,
  argTypes: {
    handleLogout: { action: 'Logout' },
    handleClose: { action: 'close' }
  }
} as Meta;

const Template: StoryFn<UserMenuProps> = (args) => <UserMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  userId: 1231,
  userName: 'John Ross'
};
