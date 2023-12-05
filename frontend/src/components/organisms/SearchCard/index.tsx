import Icon from '@components/atoms/Icon';
import { AppBar, Box, Popover, Stack, styled } from '@mui/material';
import theme from '@src/theme/theme';
import { SEARCH_CARD_CONSTANTS } from '@src/utils/constants';
import SimpleSnackbar from '@components/molecules/Popover';

import React, { useRef, useState } from 'react';
import { splitParagraph } from './utils';
import { Typography } from '@components/atoms/Typography';

export interface SearchCardProps {
  searchQuery: string;
  totalResults: number;
  currentResult: number;
  fileTitle: string;
  totalSlides: number;
  currentSlide: number;
  paragraph: string;
  filepath: string;
  togglePopOver: () => void;
  handleUpClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleDownClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const StyledModalStack = styled(Stack)`
  position: absolute;
  top: ${theme.spacing(6)};
  right: ${theme.spacing(8)};
`;

const StyledClickableBox = styled(Box)`
  cursor: pointer;
`;
interface StyledParagraphStackProps {
  hasOverflow: boolean;
}
const StyledParagraphStack = styled(Box)<StyledParagraphStackProps>`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  position: relative;

  &::after {
    content: 'more...';
    position: absolute;
    bottom: 0;
    right: 0;
    background: transparent;
    opacity: ${({ hasOverflow }) => (hasOverflow ? 1 : 0)};
    font-family: Manrope-Regular;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    transform: translate(12%);
    color: ${theme.palette.textColor.lowEmphasis};
  }
`;

const RenderedParagraph = (paragraph: string, searchQuery: string) => {
  const { beforeQuery, queryPart, afterQuery } = splitParagraph(
    paragraph,
    searchQuery
  );
  return (
    <Typography
      variant="caption2"
      color={theme.palette.textColor.lowEmphasis}
      flex={1}
    >
      {beforeQuery}
      <b style={{ color: theme.palette.textColor.black }}>{queryPart}</b>
      {afterQuery}
    </Typography>
  );
};

const SearchCard = (props: SearchCardProps) => {
  const {
    searchQuery,
    totalResults,
    currentResult,
    fileTitle,
    totalSlides,
    currentSlide,
    paragraph,
    togglePopOver,
    handleUpClick,
    handleDownClick
  } = props;

  const [isMinimized, setIsMinimized] = useState(false);

  const appBarRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(paragraph);
    togglePopOver();
  };

  return (
    <>
      <AppBar>
        <StyledModalStack
          direction={'column'}
          ref={appBarRef}
          width={'28.25vw'}
          bgcolor={theme.palette.structural.background3}
          borderRadius={theme.spacing(1)}
          border={`1px solid ${theme.palette.grey[100]}`}
          sx={{ top: '100px' }}
        >
          <Stack
            direction={'row'}
            gap={theme.spacing(4)}
            padding={`${theme.spacing(3)} ${theme.spacing(1)}`}
            width={'100%'}
          >
            <Stack
              direction={'row'}
              padding={`0 ${theme.spacing(2)}`}
              flex={1}
              justifyContent={'space-between'}
            >
              <Typography variant="body2" color={theme.palette.textColor.black}>
                {searchQuery}
              </Typography>
              <Stack
                direction={'row'}
                gap={theme.spacing(4)}
                alignItems={'center'}
              >
                <Stack direction={'row'}>
                  <Typography
                    variant="body2"
                    color={theme.palette.textColor.black}
                  >
                    {currentResult}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={theme.palette.textColor.lowEmphasis}
                  >
                    /{totalResults}
                  </Typography>
                </Stack>
                {SEARCH_CARD_CONSTANTS.headerIcons.map((icon) => (
                  <StyledClickableBox
                    height={theme.spacing(6)}
                    width={theme.spacing(6)}
                    key={icon.alt}
                    onClick={(e) =>
                      icon.alt == 'up' ? handleUpClick(e) : handleDownClick(e)
                    }
                  >
                    <Icon src={icon.iconSrc} alt={icon.alt}></Icon>
                  </StyledClickableBox>
                ))}
                <StyledClickableBox
                  height={theme.spacing(6)}
                  width={theme.spacing(6)}
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  <Icon
                    src={
                      isMinimized
                        ? SEARCH_CARD_CONSTANTS.maximizeIcon.iconSrc
                        : SEARCH_CARD_CONSTANTS.minimizeIcon.iconSrc
                    }
                    alt={
                      isMinimized
                        ? SEARCH_CARD_CONSTANTS.maximizeIcon.alt
                        : SEARCH_CARD_CONSTANTS.minimizeIcon.alt
                    }
                  ></Icon>
                </StyledClickableBox>
              </Stack>
            </Stack>
          </Stack>
          {!isMinimized ? (
            <Stack
              padding={`${theme.spacing(5)} ${theme.spacing(6)}`}
              gap={theme.spacing(3)}
              borderTop={`0.5px solid ${theme.palette.grey[100]}`}
            >
              <Stack
                direction={'row'}
                width={'100%'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Stack direction={'column'} gap={theme.spacing(1)}>
                  <Typography
                    variant="body1"
                    color={theme.palette.textColor.black}
                  >
                    {fileTitle}
                  </Typography>
                  <Stack
                    direction={'row'}
                    gap={theme.spacing(1)}
                    alignItems={'center'}
                  >
                    <Typography
                      variant="overline"
                      color={theme.palette.textColor.mediumEmphasis}
                    >
                      {SEARCH_CARD_CONSTANTS.slideText}
                    </Typography>
                    <Stack direction={'row'}>
                      <Typography
                        variant="overline"
                        color={theme.palette.textColor.black}
                      >
                        {currentSlide}
                      </Typography>
                      <Typography
                        variant="overline"
                        color={theme.palette.textColor.mediumEmphasis}
                      >
                        /{totalSlides}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack direction={'row'} gap={theme.spacing(2)}>
                  <StyledClickableBox onClick={() => handleCopy()}>
                    <Icon
                      src={SEARCH_CARD_CONSTANTS.copyIconSrc}
                      alt="copy"
                    ></Icon>
                  </StyledClickableBox>
                  <Box>
                    <Icon
                      src={SEARCH_CARD_CONSTANTS.moreIconSrc}
                      alt="more"
                    ></Icon>
                  </Box>
                </Stack>
              </Stack>
              <StyledParagraphStack hasOverflow={paragraph.length > 220}>
                {RenderedParagraph(paragraph, searchQuery)}
              </StyledParagraphStack>
            </Stack>
          ) : (
            <></>
          )}
        </StyledModalStack>
      </AppBar>
    </>
  );
};

export default SearchCard;
