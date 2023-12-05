import { Meta, StoryObj } from '@storybook/react';
import MuiButton from './index';
import Icon from '../Icon';
import addIcon from '../../../../public/assets/icons/addIcon.svg';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof MuiButton> = {
  title: 'Atoms/Button',
  component: MuiButton,
  argTypes: {
    variant: { control: 'select', options: ['contained', 'outlined', 'text'] }
  }
};

export default meta;

type Story = StoryObj<typeof MuiButton>;
export const ButtonStory: Story = {
  args: {
    text: 'Add files',
    variant: 'contained',
    startIcon: <Icon src={addIcon} alt={'addicon'}></Icon>,
    onClick: () => {
      action('Button Clicked')();
    }
  }
};
