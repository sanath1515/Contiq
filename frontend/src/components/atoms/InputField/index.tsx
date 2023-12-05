import React from 'react';
import {
  InputAdornment,
  SxProps,
  TextField,
  TextFieldProps
} from '@mui/material';

interface ITextFieldProps extends Omit<TextFieldProps, 'onChange'> {
  variant: 'outlined' | 'standard' | 'filled';
  startIcon?: React.ReactNode;
  type: 'text' | 'email' | 'password';
  value?: string;
  placeholder: string;
  sx?: SxProps;
  helperText?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  name?: string;
  innerRef?: React.RefObject<HTMLDivElement>;
}
const InputField = ({
  variant,
  placeholder,
  type,
  sx,
  startIcon,
  value,
  onChange,
  name,
  onClick,
  helperText,
  innerRef
}: ITextFieldProps) => {
  return (
    <>
      <TextField
        variant={variant}
        placeholder={placeholder}
        type={type}
        name={name}
        sx={sx}
        value={value}
        helperText={helperText}
        onChange={onChange}
        onClick={onClick}
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          )
        }}
        ref={innerRef}
      />
    </>
  );
};

export default InputField;
