import Gif from '@components/atoms/Gif';
import Icon from '@components/atoms/Icon';
import { Typography } from '@components/atoms/Typography';
import Notification from '@components/molecules/Notification';
import {
  Box,
  Menu,
  MenuItem,
  PopoverOrigin,
  PopoverPosition,
  PopoverVirtualElement,
  styled
} from '@mui/material';
import { Stack } from '@mui/system';
import theme from '@src/theme/theme';
import { NOTIFICATIONS_CARD_CONSTANTS } from '@src/utils/constants';
import React from 'react';

export interface NotificationsCardProps {
  isOpen: boolean;
  notificationsData: Array<{
    id: number;
    userName: string;
    notificationText: string;
    dateTime: { day: number; month: string; time: string };
    avatarSrc: string;
  }> | null;
  handleNotificationClick(id: number): void;
  handleClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  anchorEl:
    | Element
    | (() => Element)
    | PopoverVirtualElement
    | (() => PopoverVirtualElement)
    | null;

  anchorOrigin?: PopoverOrigin;
  anchorPosition?: PopoverPosition;
}

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiList-root': {
    paddingTop: 0,
    paddingBottom: 0
  },
  '& .MuiMenuItem-root': {
    padding: 0
  },
  marginTop: theme.spacing(5),
  marginLeft: -64
}));

const StyledContainerBox = styled(Box)`
  border-radius: ${theme.spacing(1)};
  border-top: none;
  box-sizing: border-box;
`;

const StyledCloseBox = styled(Box)`
  cursor: pointer;
`;

const StyledScrollableBox = styled(Box)`
  overflow-y: auto;
  height: -o-calc(32.79vw - ${theme.spacing(14)}); /* opera */
  height: -webkit-calc(32.79vw - ${theme.spacing(14)}); /* google, safari */
  height: -moz-calc(32.79vw - ${theme.spacing(14)}); /* firefox */
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

const StyledGifBox = styled(Stack)`
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
`;

const NotificationsCard = (props: NotificationsCardProps) => {
  const {
    isOpen,
    handleClose,
    notificationsData,
    handleNotificationClick,
    anchorEl,
    anchorOrigin,
    anchorPosition
  } = props;
  return (
    <StyledMenu
      anchorOrigin={anchorOrigin}
      anchorPosition={anchorPosition}
      open={isOpen}
      onClose={handleClose}
      anchorEl={anchorEl}
    >
      <StyledContainerBox width={'29.30vw'} height={'32.79vw'}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          padding={theme.spacing(3)}
          borderBottom={`1px solid ${theme.palette.grey[100]}`}
          position={'sticky'}
          top={0}
          zIndex={1}
          height={theme.spacing(14)}
          bgcolor={theme.palette.textColor.white}
          overflow={'hidden'}
        >
          <Typography variant="h3" color={theme.palette.textColor.black}>
            {NOTIFICATIONS_CARD_CONSTANTS.label}
          </Typography>
          <StyledCloseBox onClick={(e) => handleClose(e, 'backdropClick')}>
            <Icon
              src={NOTIFICATIONS_CARD_CONSTANTS.closeIconSrc}
              alt="close"
            ></Icon>
          </StyledCloseBox>
        </Stack>
        <StyledScrollableBox>
          {notificationsData != null ? (
            notificationsData.map((notification) => (
              <MenuItem
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <Notification
                  src={notification.avatarSrc}
                  alt={notification.userName}
                  notificationText={notification.notificationText}
                  dateTime={notification.dateTime}
                  userName={notification.userName}
                />
              </MenuItem>
            ))
          ) : (
            <StyledGifBox height="9.51vw" marginTop={'50%'} marginLeft={'50%'}>
              <Gif
                src={NOTIFICATIONS_CARD_CONSTANTS.progressAnimSrc}
                height={theme.spacing(34)}
                alt="loading"
              ></Gif>
            </StyledGifBox>
          )}
        </StyledScrollableBox>
      </StyledContainerBox>
    </StyledMenu>
  );
};

export default NotificationsCard;
