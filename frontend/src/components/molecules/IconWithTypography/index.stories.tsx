import { Meta, StoryFn } from "@storybook/react";
import IconWithTypography, { IconWithTypographyProps } from ".";

export default {
  title: "Molecules/IconwithTypography",
  component: IconWithTypography,
} as Meta;

const Template: StoryFn<IconWithTypographyProps> = (args) => (
  <IconWithTypography {...args} />
);

export const Default = Template.bind({});
Default.args = {
  iconSrc: "assets/icons/home-disabled.svg",
  iconAlt: "home",
  label: "Home",
};
