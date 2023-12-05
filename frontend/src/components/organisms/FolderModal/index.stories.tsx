import { StoryFn, Meta } from '@storybook/react';
import { FolderModal } from '.';
import { FILES, FILES_DATA } from '@src/utils/constants';

export default {
  title: 'organisms/FolderModal',
  component: FolderModal,
  argTypes: {
    openModal: {
      control: { type: 'boolean' }
    }
  }
} as Meta<typeof FolderModal>;

const Template: StoryFn<typeof FolderModal> = (args) => (
  <FolderModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  openModal: true,
  files: FILES_DATA
};
