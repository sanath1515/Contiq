import { Meta, StoryFn } from '@storybook/react';
import PdfViewer, { PdfViewerProps } from '.';

export default {
  title: 'Organisms/PdfViewer',
  component: PdfViewer
} as Meta;

const Template: StoryFn<PdfViewerProps> = (args) => <PdfViewer {...args} />;

export const Default = Template.bind({});
Default.args = {
  file: 'assets/data/sample.pdf',
  paragraph: 'Human activities',
  page: 2
};
