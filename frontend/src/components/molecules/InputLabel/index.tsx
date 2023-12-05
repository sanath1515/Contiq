import React from 'react';
import { Typography } from '../../atoms/Typography';
import { Stack, styled } from '@mui/material';
import theme from '../../../theme/theme';
import InputField from '@components/atoms/InputField';

interface InputLabelProps {
  label: string;
  labelColor: string;
  labelVariant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption1'
    | 'overline'
    | 'overline2';
  placeholder: string;
  variant: 'outlined' | 'standard' | 'filled';
  type: 'text' | 'email' | 'password';
  value?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?:string;
}
const StyledStack = styled(Stack)({
  gap: '6px'
});
const InputFieldStyles = {
  width: '26.06vw',
  border: `1px solid ${theme.palette.grey[100]}`,
  borderRadius: '4px',
  backgroundColor: theme.palette.textColor.white,
  color: theme.palette.textColor.mediumEmphasis,
  '.MuiOutlinedInput-root': {
    padding: '0px'
  },
  '.MuiOutlinedInput-root input': {
    padding: '13px 0px 13px 16px',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '22px',
    height: '22px'
  }
};
export const InputLabel = ({
  labelVariant,
  label,
  labelColor,
  placeholder,
  helperText,
  variant,
  type,
  value,
  onChange,
  name,
  startIcon
}: InputLabelProps) => {
  return (
    <StyledStack>
      <Typography variant={labelVariant} color={labelColor}>
        {label}
      </Typography>
      <InputField
        variant={variant}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        helperText={helperText}
        value={value}
        startIcon={startIcon}
        sx={InputFieldStyles}
        name={name}
      />
    </StyledStack>
  );
};
