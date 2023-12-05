import { StoryFn, Meta } from '@storybook/react';
import { UploadProgressModal } from '.';

export default {
  title: 'organisms/UploadProgressModal',
  component: UploadProgressModal
} as Meta<typeof UploadProgressModal>;

const Template: StoryFn<typeof UploadProgressModal> = (args) => (
  <UploadProgressModal {...args} />
);

export const Default = Template.bind({});

Default.args = {
  openModal: true,
  fileName: 'Contract agreement.pdf',
  handleClose:()=>{},
  handleExtraProp:()=>{},
  loading:false
};
