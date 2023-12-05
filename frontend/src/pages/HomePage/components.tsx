import { Box, styled } from '@mui/material';
import { Stack, height } from '@mui/system';
import theme from '@src/theme/theme';
import { HOME_PAGE_CONSTANTS } from '@src/utils/constants';
import PresentationCard from '@components/molecules/PresentationCard';
import Icon from '@components/atoms/Icon';
import { Typography } from '@components/atoms/Typography';
import { useUserContext } from '@src/utils/ThemeContext';
import { useEffect } from 'react';

const StyledContainerStack = styled(Stack)`
  overflow-y: auto;
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
export const BodyContent = ({ userId }: { userId: number }) => {
  const { files, handleUpdateFiles } = useUserContext();
  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

  const recentFiles = files.filter((file) => {
    const createdAtDate = new Date(file.createdAt);
    return createdAtDate >= fifteenDaysAgo;
  });

  console.log('recent files', files);
  useEffect(() => {
    handleUpdateFiles();
  }, []);

  return (
    <StyledContainerStack
      direction={'column'}
      width={'100%'}
      height={'100%'}
      gap={theme.spacing(6)}
    >
      <Box padding={`${theme.spacing(7)} ${theme.spacing(6)}`}>
        <Typography variant="h2">{HOME_PAGE_CONSTANTS.heading}</Typography>
      </Box>
      {recentFiles.length > 0 && (
        <Stack paddingLeft={theme.spacing(6)} gap={theme.spacing(6)}>
          <Typography variant="h3" color={theme.palette.textColor.lowEmphasis}>
            {HOME_PAGE_CONSTANTS.recentText}
          </Typography>
          <StyledContainerStack
            width="100%"
            height={'70vh'}
            flexWrap={'wrap'}
            direction={'row'}
            gap={theme.spacing(6)}
          >
            {recentFiles.map((file) => (
              <PresentationCard {...file} />
            ))}
          </StyledContainerStack>
        </Stack>
      )}
      {(!recentFiles || recentFiles.length == 0) && (
        <Stack
          height={'100%'}
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Icon
            src={HOME_PAGE_CONSTANTS.emptyIconSrc}
            alt="empty"
            style={{ width: '19.76vw', height: '12.22vw' }}
          ></Icon>
          <Typography variant="subtitle1" color={theme.palette.textColor.black}>
            {HOME_PAGE_CONSTANTS.fileNotAvailableText}
          </Typography>
          <Typography
            variant="body2"
            color={theme.palette.textColor.lowEmphasis}
          >
            {HOME_PAGE_CONSTANTS.syncText}
          </Typography>
        </Stack>
      )}
    </StyledContainerStack>
  );
};
