import { Meta, StoryFn } from '@storybook/react';
import Files from '.';
import { FileProps } from './index';
import { presentationArray } from '@src/utils/constants';
export default {
  title: 'organisms/Files',
  component: Files
} as Meta;

const mockProps: FileProps = {
  presentationArray: presentationArray
};

const Template: StoryFn<typeof Files> = () => <Files {...mockProps} />;

export const Default = Template.bind({});
