import { Meta, StoryFn } from '@storybook/react';
import NotificationsCard, { NotificationsCardProps } from '.';

export default {
  title: 'Organisms/NotificationsCard',
  component: NotificationsCard,
  argTypes: {
    handleClose: { action: 'close' },
    handleNotificationClick: { action: 'notification clicked' }
  }
} as Meta;

const data = [
  {
    id: 1,
    userName: 'John',
    notificationText: 'has uploaded company profile.pdf ',
    dateTime: { day: 10, month: 'August', time: '08:30 AM' },
    avatarSrc: 'assets/icons/Avatar.svg'
  },
  {
    id: 2,
    userName: 'Jane',
    notificationText: 'has uploaded company profile.pdf ',
    dateTime: { day: 15, month: 'July', time: '03:45 PM' },
    avatarSrc: 'assets/icons/Avatar.svg'
  },
  {
    id: 3,
    userName: 'Alice',
    notificationText: 'request access to User agreement.pdf',
    dateTime: { day: 5, month: 'September', time: '10:00 AM' },
    avatarSrc: 'assets/icons/Avatar.svg'
  },
  {
    id: 4,
    userName: 'Robert',
    notificationText: 'request access to User agreement.pdf',
    dateTime: { day: 20, month: 'June', time: '11:15 AM' },
    avatarSrc: 'assets/icons/Avatar.svg'
  },
  {
    id: 5,
    userName: 'Emily',
    notificationText: 'request access to User agreement.pdf',
    dateTime: { day: 8, month: 'October', time: '02:30 PM' },
    avatarSrc: 'assets/icons/Avatar.svg'
  },
  {
    id: 6,
    userName: 'David',
    notificationText: "Congratulations! You've earned a new badge",
    dateTime: { day: 14, month: 'May', time: '09:00 AM' },
    avatarSrc: 'assets/icons/Avatar.svg'
  },
  {
    id: 7,
    userName: 'Sophia',
    notificationText: 'has uploaded company agreement.pdf ',
    dateTime: { day: 30, month: 'September', time: '05:00 AM' },
    avatarSrc: 'assets/icons/Avatar.svg'
  },
  {
    id: 8,
    userName: 'Michael',
    notificationText: 'has uploaded company agreement.pdf ',
    dateTime: { day: 18, month: 'April', time: '07:20 PM' },
    avatarSrc: 'assets/icons/Avatar.svg'
  },
  {
    id: 9,
    userName: 'Olivia',
    notificationText: 'has uploaded company agreement.pdf',
    dateTime: { day: 12, month: 'November', time: '01:10 PM' },
    avatarSrc: 'assets/icons/Avatar.svg'
  },
  {
    id: 10,
    userName: 'William',
    notificationText: 'has uploaded company agreement.pdf',
    dateTime: { day: 25, month: 'March', time: '10:45 AM' },
    avatarSrc: 'assets/icons/Avatar.svg'
  }
];

const Template: StoryFn<NotificationsCardProps> = (args) => (
  <NotificationsCard {...args} />
);

export const NoData = Template.bind({});
NoData.args = {
  isOpen: true,
  notificationsData: null
};

export const WithData = Template.bind({});
WithData.args = {
  isOpen: true,
  notificationsData: data
};
