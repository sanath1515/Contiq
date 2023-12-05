import { Meta, StoryFn } from "@storybook/react";
import Gif, { GifProps } from ".";

export default {
  title: "Atoms/Gif",
  component: Gif,
} as Meta;

const Template: StoryFn<GifProps> = (args) => <Gif {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: "assets/animations/loading_circle.gif",
  width: "100px",
  height: "100px",
  alt: "loading circle",
};
