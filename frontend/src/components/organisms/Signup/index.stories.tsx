import { StoryFn, Meta } from '@storybook/react';
import { SignUp } from '.';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'organisms/SIgnup',
  component: SignUp
} as Meta<typeof SignUp>;

const Template: StoryFn<typeof SignUp> = () => <BrowserRouter><SignUp /></BrowserRouter>;

export const Default = Template.bind({});
