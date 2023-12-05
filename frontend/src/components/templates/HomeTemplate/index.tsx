import { Grid, styled } from '@mui/material';
import theme from '@src/theme/theme';
import React from 'react';
import './styles.css';
interface HomeTemplateProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  content?: React.ReactNode;
}
const StyledOutline = styled(Grid)({
  margin: '0px',
  width: '100%',
  height: '100vh',
  display: 'grid',
  gridTemplateColumns: 'minmax(6vw, max-content) 1fr',
  gridTemplateRows: 'minmax(4.39vw, max-content) 1fr',
  backgroundColor: theme.palette.textColor.white
});

const StyledNavBar = styled(Grid)({
  gridColumnStart: '1',
  gridColumnEnd: '2',
  gridRowStart: '2',
  gridRowEnd: 'span 5'
});

const StyledHeader = styled(Grid)({
  gridColumnStart: '1',
  gridColumnEnd: 'span 2',
  gridRowStart: '1',
  gridRowEnd: '2'
});
const StyledMainContent = styled(Grid)({
  gridColumnStart: '2',
  gridColumnEnd: '3',
  gridRowStart: '2',
  gridRowEnd: '3'
});

export const HomeTemplate = ({
  sidebar,
  header,
  content
}: HomeTemplateProps) => {
  return (
    <StyledOutline>
      <StyledNavBar className={!sidebar ? 'applyBorder' : ''}>
        {sidebar}
      </StyledNavBar>
      <StyledHeader className={!header ? 'applyBorder' : ''}>
        {header}
      </StyledHeader>
      <StyledMainContent className={!content ? 'applyBorder' : ''}>
        {content}
      </StyledMainContent>
    </StyledOutline>
  );
};
