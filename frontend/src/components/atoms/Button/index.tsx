import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { SxProps, styled } from '@mui/system';

interface IButtonProps extends ButtonProps {
  text: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  variant: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'large' | 'medium';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  sx?: SxProps;
}

const StyledButton = styled(Button)(() => ({
  '&.MuiButton-root': {
    textTransform: 'none',
    borderRadius: '4px',
    fontFamily: 'Manrope-Regular',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '1px'
  },
  '& .MuiButton-startIcon svg, .MuiButton-endIcon svg': {
    display: 'flex',
    placeContent: 'center'
  }
}));

const MuiButton: React.FC<IButtonProps> = ({ text, ...props }) => {
  return (
    <StyledButton {...props} disableElevation>
      {text}
    </StyledButton>
  );
};

export default MuiButton;
