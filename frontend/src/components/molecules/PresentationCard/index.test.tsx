import React from 'react';
import { screen, render } from '@testing-library/react';
import PresentationCard from '.';
import ProfileIage from '../../../../public/assets/icons/profile.svg';
import PdfIcon from '../../../../public/assets/icons/pdf.svg';

describe('Presentation Card', () => {
  test('Should render component', () => {
    render(
      <PresentationCard
        imgSrc={ProfileIage}
        documentTitle={'profile.pdf'}
        imgAlt="image not found"
        iconSrc={PdfIcon}
        iconAlt="icon not found"
        createdAt={new Date('20-Sep-2023')}
      />
    );
    const element = screen.getByTestId('presentation-card');
    expect(element).toBeInTheDocument();
  });
});
