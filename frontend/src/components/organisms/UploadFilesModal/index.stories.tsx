import { Meta, StoryFn } from '@storybook/react';
import UploadFilesModal, { UploadFileModalProps } from '.';

export default {
  title: 'Organisms/UploadFilesModal',
  component: UploadFilesModal,
  argTypes: {
    handleFileOnUploadClick: { action: 'Upload' },
    handleGdriveOptionClick: { action: 'Gdrive' },
    handleClose: { action: 'Close' }
  }
} as Meta;

const Template: StoryFn<UploadFileModalProps> = (args) => (
  <UploadFilesModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isOpen: true
};
