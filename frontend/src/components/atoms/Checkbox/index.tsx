import React from 'react';
import { Checkbox, CheckboxProps, styled } from '@mui/material';

const FilledCheckbox = styled(Checkbox)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.primary.main
  }
}));
export interface CustomCheckboxProps extends CheckboxProps {
  checked?: boolean;
  onChange?: () => void;
}

const CheckBox: React.FC<CustomCheckboxProps> = (props) => {
  return <FilledCheckbox data-testid="checkbox" {...props} disableRipple />;
};

export default CheckBox;
