import { Meta, StoryFn } from "@storybook/react";
import Avatar, { AvatarProps } from ".";

export default {
  title: "Atoms/Avatar",
  component: Avatar,
} as Meta;

const Template: StoryFn<AvatarProps> = (args) => <Avatar {...args}></Avatar>;

export const Default = Template.bind({});

Default.args = {
  src: "assets/icons/Avatar.svg",
  alt: "Avatar",
};
