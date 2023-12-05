import { useAuth0 } from '@auth0/auth0-react';
import UserMenuItem from '@components/molecules/UserMenuItem';
import { Menu, PopoverVirtualElement, Typography, styled } from '@mui/material';
import { Stack } from '@mui/system';
import theme from '@src/theme/theme';
import { USER_MENU_OPTIONS } from '@src/utils/constants';
import React from 'react';

export interface UserMenuProps {
  handleLogout?: () => void;
  userName: string;
  userId: number;
  isOpen: boolean;
  handleClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  anchorEl:
    | Element
    | (() => Element)
    | PopoverVirtualElement
    | (() => PopoverVirtualElement)
    | null
    | undefined;
}

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiList-root': {
    paddingTop: 0,
    paddingBottom: 0
  },

  '& .MuiMenuItem-root': {
    paddingLeft: theme.spacing(5),
    paddingBottom: theme.spacing(3)
  },
  marginTop: theme.spacing(5)
}));

const UserMenu = (props: UserMenuProps) => {
  const { logout } = useAuth0();
  const { userName, userId, isOpen, handleClose, anchorEl } = props;
  const handleOnClickLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  };
  return (
    <StyledMenu
      open={isOpen}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Stack
        direction={'column'}
        border={`1px solid ${theme.palette.grey[100]}`}
        borderRadius={theme.spacing(1)}
      >
        <Stack
          direction={'column'}
          gap={theme.spacing(2)}
          padding={`${theme.spacing(1)} ${theme.spacing(3)}`}
          borderBottom={`1px solid ${theme.palette.grey[100]}`}
        >
          <Typography variant="body1" color={theme.palette.textColor.black}>
            {userName}
          </Typography>
          <Typography
            variant="overline"
            color={theme.palette.textColor.lowEmphasis}
          >
            {userId}
          </Typography>
        </Stack>
        <Stack padding={theme.spacing(3)} gap={theme.spacing(4)}>
          {USER_MENU_OPTIONS.map((option) => (
            <UserMenuItem
              key={option.label}
              label={option.label}
              iconSrc={option.iconSrc}
              iconAlt={option.iconAlt}
              handleClick={
                option.label == USER_MENU_OPTIONS[2].label
                  ? handleOnClickLogout
                  : () => {}
              }
            />
          ))}
        </Stack>
      </Stack>
    </StyledMenu>
  );
};

export default UserMenu;
