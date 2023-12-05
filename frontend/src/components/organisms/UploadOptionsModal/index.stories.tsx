import { StoryFn, Meta } from '@storybook/react';
import { UploadOptionsModal } from '.';

export default {
  title: 'organisms/UploadoptionsModal',
  component: UploadOptionsModal
} as Meta<typeof UploadOptionsModal>;

const Template: StoryFn<typeof UploadOptionsModal> = (args) => (
  <UploadOptionsModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  openModal: true,
  onCancel: () => {},
  onUpload: () => {},
  fileName: 'Contract agreement.pdf'
};
