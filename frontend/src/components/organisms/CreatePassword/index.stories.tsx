import { Meta, StoryFn } from '@storybook/react';
import CreatePassword from '.';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'organisms/CreatePassword',
  component: CreatePassword
} as Meta;

const Template: StoryFn<typeof CreatePassword> = () => (
  <BrowserRouter><CreatePassword /></BrowserRouter>
);

export const Default = Template.bind({});
