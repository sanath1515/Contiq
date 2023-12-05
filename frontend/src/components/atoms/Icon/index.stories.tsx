import { Meta, StoryObj } from '@storybook/react';
import Icon from '.';
import logo from '../../../../public/assets/icons/logo.svg';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon
};

export default meta;

type Story = StoryObj<typeof Icon>;
export const IconStory: Story = {
  args: {
    src: logo,
    alt: 'logo'
  }
};
