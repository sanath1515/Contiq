import { StoryObj, Meta } from '@storybook/react';
import Tabs from '.';
import theme from '../../../theme/theme';

const meta: Meta<typeof Tabs> = {
  title: 'molecules/Tabs',
  component: Tabs
};

export default meta;

type story = StoryObj<typeof Tabs>;

const fileTabItems = [
  { id: 1, name: 'All files', disabled: false },
  { id: 2, name: 'Slides', disabled: true },
  { id: 3, name: 'Docs', disabled: true }
];
const uploadTabItems = [
  { id: 1, name: 'Uploads', disabled: false },
  { id: 2, name: 'Cloud storage', disabled: false }
];
export const FileTabs: story = {
  args: {
    tabItems: fileTabItems,
    sx: {
      textTransform: 'none',
      width: '85px',
      '&.Mui-selected': {
        color: theme.palette.primary[500]
      },
      color: theme.palette.textColor.mediumEmphasis
    },
    activeIndex: 0
  }
};

export const UploadTabs: story = {
  args: {
    tabItems: uploadTabItems,
    sx: {
      textTransform: 'none',
      width: '333px',
      '&.Mui-selected': {
        color: theme.palette.textColor.white
      },
      color: theme.palette.textColor.mediumEmphasis
    },
    activeIndex: 0
  }
};
