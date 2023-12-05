import { StoryFn, Meta } from '@storybook/react';
import { Signin } from '.';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'organisms/Signin',
  component: Signin
} as Meta<typeof Signin>;

const Template: StoryFn<typeof Signin> = () => (<BrowserRouter><Signin /></BrowserRouter>);

export const Default = Template.bind({});
