import type { Meta, StoryObj } from '@storybook/react';
import RadioButton from '.';
import { Typography } from '../Typography';
import theme from '../../../theme/theme';

const meta = {
  title: 'atoms/RadioButton',
  component: RadioButton
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RadioButtonStory: Story = {
  args: {
    label: (
      <Typography
        variant="body2"
        sx={{ color: theme.palette.textColor.highEmphasis }}
      >
        {'Sync entire drive'}
      </Typography>
    )
  }
};

export const Selected_RadioButton: Story = {
  args: {
    label: (
      <Typography variant="body1" sx={{ color: theme.palette.textColor.white }}>
        {'Sync folders'}
      </Typography>
    )
  }
};
