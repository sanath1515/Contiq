import { Meta, StoryObj } from '@storybook/react';
import Popover from './index';
import { TEXT } from '../../../utils/constants';

const meta: Meta<typeof Popover> = {
  title: 'Molecules/Popover',
  component: Popover
};

export default meta;

type Story = StoryObj<typeof Popover>;
export const PopoverStory: Story = {
  args: {
    Text: TEXT
  }
};
