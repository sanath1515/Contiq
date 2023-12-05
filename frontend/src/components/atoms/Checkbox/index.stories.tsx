import { Meta, StoryFn } from '@storybook/react';
import CheckBox, { CustomCheckboxProps } from '.';

export default {
  title: 'Atoms/CheckBox',
  component: CheckBox
} as Meta;

const Template: StoryFn<CustomCheckboxProps> = (args) => <CheckBox {...args} />;

export const UncheckedBox = Template.bind({});
UncheckedBox.args = {
  checked: false
};

export const CheckedBox = Template.bind({});
CheckedBox.args = {
  checked: true
};
