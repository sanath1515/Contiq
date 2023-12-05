import { StoryFn, Meta } from '@storybook/react';
import { Navbar } from '.';
import { NAV_LIST_DATA } from '../../../utils/constants';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'organisms/Navbar',
  component: Navbar
} as Meta<typeof Navbar>;

const Template: StoryFn<typeof Navbar> = (args) => (
  <BrowserRouter>
    <Navbar {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  activeTab: 'Home'
};
