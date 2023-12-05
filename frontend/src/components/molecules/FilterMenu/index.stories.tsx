import { Meta, StoryFn } from '@storybook/react';
import FilterMenu, { FilterMenuProps } from '.';

export default {
  title: 'Molecules/FilterMenu',
  component: FilterMenu
} as Meta;

const Template: StoryFn<FilterMenuProps> = (args) => <FilterMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  filterLabel: 'File Type',
  options: [{ label: 'PDF' }, { label: 'PPT' }, { label: 'Image' }]
};
