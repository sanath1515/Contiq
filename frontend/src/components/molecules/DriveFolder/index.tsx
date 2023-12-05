import { Box, Stack } from '@mui/material';
import React from 'react';
import Icon from '../../atoms/Icon';
import theme from '@src/theme/theme';
import { Typography } from '../../atoms/Typography';

export interface DriveFolderProps {
  name: string;
  handleClick: React.MouseEventHandler<HTMLDivElement>;
}

const DriveFolder = (props: DriveFolderProps) => {
  const { name, handleClick } = props;
  return (
    <Box onClick={handleClick} data-testid={`drive-folder-${name}`}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        width={'47.43vw'}
        height={'5.41vw'}
        bgcolor={theme.palette.grey[400]}
        alignItems={'center'}
        padding={`${theme.spacing(3)} ${theme.spacing(4)}`}
        border={`1px solid ${theme.palette.grey[300]}`}
        borderRadius={'4px'}
      >
        <Stack direction={'row'} gap={theme.spacing(4)}>
          <Stack
            alignItems={'center'}
            justifyContent={'center'}
            height={'3.66vw'}
            width={'3.66vw'}
            bgcolor={theme.palette.grey[300]}
            border={`1px solid ${theme.palette.grey[100]}`}
            borderRadius={'7px'}
          >
            <Icon
              style={{ height: '1.25vw', width: '1.25vw' }}
              src="assets/icons/folder.svg"
              alt="folder"
            ></Icon>
          </Stack>
          <Box alignSelf={'center'}>
            <Typography variant="body1" color={theme.palette.textColor.white}>
              {name}
            </Typography>
          </Box>
        </Stack>
        <Icon
          style={{ height: '1.75vw', width: '1.75vw' }}
          src="assets/icons/chevron-right.svg"
          alt="right"
        ></Icon>
      </Stack>
    </Box>
  );
};

export default DriveFolder;
