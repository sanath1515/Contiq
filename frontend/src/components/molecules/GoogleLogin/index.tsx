import React from 'react';
import Icon from '@components/atoms/Icon';
import { Stack, styled } from '@mui/material';
import theme from '@src/theme/theme';
import GoogleIcon from '../../../../public/assets/icons/google.svg';
import { Typography } from '@components/atoms/Typography';
import { CONTINUE_WITH_GOOGLE } from '@src/utils/constants';

interface GoogleLoginProps {
  onClick?: () => void;
}

const StyledStack = styled(Stack)({
  flexDirection: 'row',
  width: '26.06vw',
  height: '3.51vw',
  backgroundColor: theme.palette.structural.background3,
  borderRadius: '4px',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.87vw',
  '&:hover': {
    cursor: 'pointer'
  }
});
const IconStyles = {
  width: '1.9vw',
  height: '1.9vw'
};
export const GoogleLogin = ({ onClick }: GoogleLoginProps) => {
  return (
    <StyledStack onClick={onClick} data-testid="google-login">
      <Icon src={GoogleIcon} alt="google-icon" style={IconStyles} />
      <Typography variant="body1" color={theme.palette.grey[500]}>
        {CONTINUE_WITH_GOOGLE}
      </Typography>
    </StyledStack>
  );
};
