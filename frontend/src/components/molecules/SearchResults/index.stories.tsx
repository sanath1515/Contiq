import { Meta, StoryObj } from '@storybook/react';
import SearchResults from '.';
import documentImg from '../../../../public/assets/images/searchdocuments.svg';
import documentImg1 from '../../../../public/assets/images/searchdocuments1.svg';

const onSearchClick = (id: number) => {
  console.log(id);
};
const handleDocument = (id: number) => {
  console.log(id);
};
const meta: Meta<typeof SearchResults> = {
  title: 'Molecules/SearchResults',
  component: SearchResults
};

export default meta;

type Story = StoryObj<typeof SearchResults>;
export const SearchStory: Story = {
  args: {
    SEARCH_DATA: [
      { id: 1, fileName: 'Company agreement.pdf' },
      { id: 2, fileName: 'Software agreement2.pdf' },
      { id: 3, fileName: 'Software agreement3.pdf' }
    ],
    IMAGES: [
      { id: 1, imageName: documentImg },
      { id: 2, imageName: documentImg1 }
    ],
    onSearchClick: onSearchClick,
    onDocumentClick: handleDocument,
    searchWord: 'agreement',
    setShowPopup: true
  }
};
