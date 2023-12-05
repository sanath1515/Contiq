import { StoryFn, Meta } from '@storybook/react';
import { AddFilesModal } from '.';
import { FOLDERS_DATA } from '@src/utils/constants';

export default {
  title: 'organisms/AddFilesModal',
  component: AddFilesModal,
  argTypes: {
    openModal: {
      control: { type: 'boolean' }
    }
  }
} as Meta<typeof AddFilesModal>;

const Template: StoryFn<typeof AddFilesModal> = (args) => (
  <AddFilesModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  openModal: true,
  folders: FOLDERS_DATA
};
