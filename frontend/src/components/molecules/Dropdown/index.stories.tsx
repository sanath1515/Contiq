import { Meta, StoryFn } from '@storybook/react';
import Dropdown, { DropdownProps } from '.';

export default {
  title: 'Atoms/Dropdown',
  component: Dropdown
} as Meta;

const Template: StoryFn<DropdownProps> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'File Type',
  isOpen: false,
  filterLabel: 'File Type',
  options: [{ label: 'PDF' }, { label: 'PPT' }, { label: 'Image' }]
};

export const WithStartIcon = Template.bind({});
WithStartIcon.args = {
  label: 'Most relevant',
  startIconSrc: 'assets/icons/swap.svg',
  isOpen: true,
  filterLabel: '',
  options: []
};
