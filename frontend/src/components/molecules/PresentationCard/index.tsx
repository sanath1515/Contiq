import React from 'react';
import { Box, styled } from '@mui/material';
import theme from '../../../theme/theme';
import { Typography } from '@components/atoms/Typography';
import Icon from '../../atoms/Icon';

export interface IPresentationProps {
  imgSrc: string;
  imgAlt: string;
  documentTitle: string;
  iconSrc: string;
  iconAlt: string;
  createdAt: Date;
}

const OuterBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1vw',
  maxWidth: '21.22vw',
  alignItems: 'flex-start'
});

const StyledCard = styled(Box)({
  padding: '1.17vw',
  maxWidth: '21.22vw',
  borderRadius: '8px',
  background: theme.palette.structural.background3
});

const InnerBox = styled(Box)({
  display: 'flex',
  gap: '1vw'
});

const IconStyles = {
  width: '1.75vw',
  height: '1.75vw'
};
const ImageStyles = {
  borderRadius: '5px',
  height: '11.71vw',
  width: '18.88vw'
};
const PresentationCard = ({
  iconSrc,
  imgSrc,
  documentTitle,
  iconAlt,
  imgAlt,
  createdAt
}: IPresentationProps) => {
  return (
    <OuterBox data-testid="presentation-card">
      <StyledCard>
        <Icon src={imgSrc} alt={imgAlt} style={ImageStyles} />
      </StyledCard>
      <InnerBox>
        <Icon src={iconSrc} alt={iconAlt} style={IconStyles} />
        <Typography
          children={documentTitle}
          variant="body1"
          color={theme.palette.textColor.black}
        />
      </InnerBox>
    </OuterBox>
  );
};

export default PresentationCard;
