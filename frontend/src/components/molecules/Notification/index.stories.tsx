import { Meta, StoryFn } from "@storybook/react";
import Notification, { NotificationProps } from ".";

export default {
  title: "Molecules/Notification",
  component: Notification,
} as Meta;

const Template: StoryFn<NotificationProps> = (args) => (
  <Notification {...args} />
);

export const Default = Template.bind({});
Default.args = {
  src: "assets/icons/Avatar.svg",
  alt: "avatar",
  notificationText: "has uploaded company agreement.pdf",
  userName: "Amit",
  dateTime: { day: 10, month: "June", time: "10:30 AM" },
};
