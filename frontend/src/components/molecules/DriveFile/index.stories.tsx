import { StoryFn, Meta } from '@storybook/react';
import { Drivefile } from '.';
import FileIcon from '../../../../public/assets/icons/file drive.svg';

export default {
  title: 'molecules/Drivefile',
  component: Drivefile
} as Meta<typeof Drivefile>;

const Template: StoryFn<typeof Drivefile> = (args) => <Drivefile {...args} />;
export const Default = Template.bind({});

Default.args = {
  checked: true,
  onChange: () => {},
  fileSrc: FileIcon,
  fileAlt: 'file-icon',
  fileName: 'Company overview'
};
