import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import theme from '../../../theme/theme';
import InputField from '.';

export default {
  title: 'atoms/InputField',
  component: InputField,
  argTypes: {
    onChange: { action: 'changed' }
  }
} as Meta<typeof InputField>;

const Template: StoryFn<typeof InputField> = (args) => <InputField {...args} />;

export const EmailInput = Template.bind({});

EmailInput.args = {
  variant: 'outlined',
  placeholder: 'john@example.com',
  type: 'email',
  sx: {
    width: '356px',
    color: theme.palette.textColor.mediumEmphasis,
    '.MuiOutlinedInput-root': {
      padding: '0px'
    },
    '.MuiOutlinedInput-root input': {
      padding: '13px 0px 13px 10px',
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '22px',
      height: '22px'
    }
  },
};
