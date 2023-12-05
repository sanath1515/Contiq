import { Meta, StoryFn } from '@storybook/react';
import { ButtonComponentProps, ButtonWithIcon } from '.';
import NotificationSvg from '../../../../public/assets/icons/notification.svg';
import NotificationCountSvg from '../../../../public/assets/icons/notification-1.svg';
import Adduser from '../../../../public/assets/icons/add user.svg';

export default {
  title: 'Atoms/ButtonWithIcon',
  component: ButtonWithIcon
} as Meta;

const Template: StoryFn<ButtonComponentProps> = (args) => (
  <ButtonWithIcon {...args} />
);

export const NotificationButton = Template.bind({});
NotificationButton.args = {
  variant: 'outlined',
  width: '2.75rem',
  height: '2.75rem',
  borderRadius: '.5rem',
  startIconPath: NotificationSvg,
  sx: {
    boxShadow: 'none',
    ':hover': {
      boxShadow: 'none'
    }
  }
};

export const NotificationButtonCount = Template.bind({});
NotificationButtonCount.args = {
  variant: 'outlined',
  width: '2.75rem',
  height: '2.75rem',
  borderRadius: '.5rem',
  startIconPath: NotificationCountSvg,
  sx: {
    boxShadow: 'none',
    ':hover': {
      boxShadow: 'none'
    }
  }
};

export const AddUserButton = Template.bind({});
AddUserButton.args = {
  variant: 'outlined',
  width: '2.75rem',
  height: '2.75rem',
  borderRadius: '.5rem',
  startIconPath: Adduser,
  sx: {
    boxShadow: 'none',
    ':hover': {
      boxShadow: 'none'
    }
  }
};
