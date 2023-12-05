import { StoryFn, Meta } from '@storybook/react';
import { InputLabel } from '.';
import theme from '../../../theme/theme';

export default {
  title: 'molecules/InputLabel',
  component: InputLabel
} as Meta<typeof InputLabel>;

const Template: StoryFn<typeof InputLabel> = (args) => <InputLabel {...args} />;

export const EmailInput = Template.bind({});
EmailInput.args = {
  variant: 'outlined',
  placeholder: 'john@example.com',
  type: 'email',
  onChange: () => {},
  labelVariant: 'body1',
  labelColor: theme.palette.textColor.black,
  label: 'Email ID'
};
