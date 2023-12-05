import Icon from '@components/atoms/Icon';
import { Typography } from '@components/atoms/Typography';
import { Box, Stack, styled } from '@mui/material';
import theme from '@src/theme/theme';
import React from 'react';

export interface UserMenuItemProps {
  label: string;
  iconSrc: string;
  iconAlt: string;
  handleClick: React.MouseEventHandler<HTMLDivElement>;
}

const StyledUserMenuItemBox = styled(Box)`
  cursor: pointer;
`;

const UserMenuItem = (props: UserMenuItemProps) => {
  const { label, iconSrc, handleClick, iconAlt } = props;
  return (
    <StyledUserMenuItemBox
      onClick={handleClick}
      data-testid={`user-menu-item-${label}`}
    >
      <Stack
        width={'11.34vw'}
        gap={theme.spacing(2)}
        alignItems={'center'}
        direction={'row'}
        bgcolor={theme.palette.textColor.white}
      >
        <Icon src={iconSrc} alt={iconAlt}></Icon>
        <Typography variant="body2" color={theme.palette.textColor.black}>
          {label}
        </Typography>
      </Stack>
    </StyledUserMenuItemBox>
  );
};

export default UserMenuItem;
