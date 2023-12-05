import type { Meta, StoryObj } from '@storybook/react';
import RadioButtonsGroup from '.';
import { FORM_LABEL, CHOOSE_OPTIONS } from '../../../utils/constants';
const meta = {
  title: 'molecules/RadioButtonGroup',
  component: RadioButtonsGroup
} satisfies Meta<typeof RadioButtonsGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Folder: Story = {
  args: {
    formLabel: FORM_LABEL,
    options: CHOOSE_OPTIONS
  }
};
