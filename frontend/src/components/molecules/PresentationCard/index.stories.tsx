import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import PresentationCard from '.';
import CompanyProfileImage from '../../../../public/assets/icons/profile.svg';
import PdfIcon from '../../../../public/assets/icons/pdf.svg';

export default {
  title: 'molecules/PresentationCard',
  component: PresentationCard
} as Meta<typeof PresentationCard>;

const Template: StoryFn<typeof PresentationCard> = (args) => (
  <PresentationCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  documentTitle: 'Company Profile.pdf',
  imgSrc: CompanyProfileImage,
  imgAlt: 'Company-profile-image',
  iconSrc: PdfIcon,
  iconAlt: 'pdf-icon'
};
