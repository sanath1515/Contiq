import { Meta, StoryFn } from "@storybook/react";
import DriveFolder, { DriveFolderProps } from ".";

export default {
  title: "Molecules/Drivefolder",
  component: DriveFolder,
} as Meta;

const Template: StoryFn<DriveFolderProps> = (args) => <DriveFolder {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "Zemoso Decks",
  handleClick: () => {},
};
