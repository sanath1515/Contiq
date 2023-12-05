import { Meta, StoryFn } from '@storybook/react';
import SearchCard, { SearchCardProps } from '.';

export default {
  title: 'Organisms/SearchCard',
  component: SearchCard
} as Meta;

const Template: StoryFn<SearchCardProps> = (args) => <SearchCard {...args} />;

export const Default = Template.bind({});

Default.args = {
  currentResult: 1,
  currentSlide: 1,
  fileTitle: 'Company agreement',
  paragraph:
    'Since being established in 1908 as a sewing machine repair business, the brother group has pursued the diversification and globalization of business in its history of',
  searchQuery: 'Repair business',
  totalResults: 4,
  totalSlides: 5
};
