import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import theme from '@src/theme/theme';
import styled from '@emotion/styled';
import Avatar, { AvatarProps } from '../../atoms/Avatar';

export interface NotificationProps extends AvatarProps {
  userName: string;
  notificationText: string;
  dateTime: { day: number; month: string; time: string };
}

const StyledContainerStack = styled(Stack)`
  background-color: ${theme.palette.textColor.white};
  border-bottom: 0.5px solid ${theme.palette.grey[100]};
`;

const StyledTextBox = styled(Box)`
  display: inline-block;
  max-width: 360px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Notification = (props: NotificationProps) => {
  const { src, alt, userName, notificationText, dateTime } = props;
  return (
    <StyledContainerStack
      direction={'row'}
      gap={theme.spacing(3)}
      padding={theme.spacing(4)}
      width={'29.28vw'}
    >
      <Avatar src={src} alt={alt}></Avatar>
      <Stack direction={'column'}>
        <Stack direction={'row'} gap={theme.spacing(1)}>
          <Typography variant="body1" color={theme.palette.textColor.black}>
            {userName}
          </Typography>
          <StyledTextBox>
            <Typography
              variant="body2"
              color={theme.palette.textColor.lowEmphasis}
            >
              {notificationText}
            </Typography>
          </StyledTextBox>
        </Stack>
        <Stack direction={'row'}>
          {' '}
          <Typography
            variant="caption1"
            color={theme.palette.textColor.mediumEmphasis}
          >{`${dateTime.day} ${dateTime.month} ${dateTime.time}`}</Typography>
        </Stack>
      </Stack>
    </StyledContainerStack>
  );
};

export default Notification;
