import { Box, Stack, styled } from '@mui/material';
import theme from '@src/theme/theme';
import { Page } from 'react-pdf';

const StyledClickableBox = styled(Box)`
  cursor: pointer;
`;

export interface ThumbnailsProps {
  numPages?: number;
  currentPage?: number;
  onPageClick: (index: number) => void;
}

export const StyledScrollableStack = styled(Stack)`
  height: 95vh;
  &::-webkit-scrollbar {
    width: 5px;
    background: none;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.palette.grey[100]};
    border-radius: ${theme.spacing(1)};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.palette.grey[100]};
  }

  &::-webkit-scrollbar-vertical {
    width: ${theme.spacing(1.25)};
    background: none;
  }

  &::-webkit-scrollbar-thumb:vertical {
    background: ${theme.palette.grey[100]};
    border-radius: ${theme.spacing(1)};
  }

  &::-webkit-scrollbar-thumb:vertical:hover {
    background: ${theme.palette.grey[100]};
  }
`;

export const Thumbnails = (props: ThumbnailsProps) => {
  const { currentPage, numPages, onPageClick } = props;
  const thumbnailElements = Array.from(new Array(numPages), (_, index) => (
    <StyledClickableBox
      key={`thumbnail_${index + 1}`}
      onClick={() => onPageClick(index + 1)}
      border={
        currentPage === index + 1
          ? `2px solid ${theme.palette.primary[500]}`
          : `1px solid ${theme.palette.grey[200]}`
      }
      marginBottom={theme.spacing(2.5)}
      padding={`${theme.spacing(1)} ${theme.spacing(2)}`}
      borderRadius={theme.spacing(0.5)}
      data-testid="thumbnail"
    >
      <Page
        pageNumber={index + 1}
        width={180}
        height={240}
        renderTextLayer={false}
        renderAnnotationLayer={false}
      />
    </StyledClickableBox>
  ));

  return (
    <>
      {thumbnailElements}    
    </>
  );
};
