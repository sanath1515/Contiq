import React from 'react';
import { styled } from '@mui/material/styles';
import { Radio, FormControlLabel } from '@mui/material';
import theme from '../../../theme/theme';

interface RadioButtonProps {
  label?: string | React.ReactNode;
  isChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const RadioButton = ({
  label,
  isChecked,
  onChange,
  value
}: RadioButtonProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
  };

  const CustomRadio = styled(Radio)`
    &.MuiRadio-root {
      color: ${theme.palette.textColor.mediumEmphasis};
      background: ${theme.palette.grey[400]};
      border-radius: 50%;
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      border: 1px solid ${theme.palette.primary[500]};
    }
    &.Mui-checked {
      & .MuiIconButton-label,
      & .MuiSvgIcon-root {
        color: ${theme.palette.textColor.white};
      }
    }
  `;

  const StyledFormControlLabel = styled(FormControlLabel)`
    & .MuiTypography-root {
      padding-left: ${theme.spacing(1)};
    }
  `;

  return (
    <StyledFormControlLabel
      control={
        <CustomRadio
          checked={isChecked}
          onChange={handleChange}
          value={value}
        />
      }
      label={label}
    />
  );
};

export default RadioButton;
