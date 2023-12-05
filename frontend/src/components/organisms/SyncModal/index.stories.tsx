import { Meta, StoryFn } from '@storybook/react';
import SyncModal, { SyncModalProps } from '.';

export default {
  title: 'Organisms/SyncModal',
  component: SyncModal
} as Meta;

const Template: StoryFn<SyncModalProps> = (args) => <SyncModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  handleClose: () => {},
  completedItems: 1,
  totalItems: 2,
  estimatedTime: '10 mins'
};
