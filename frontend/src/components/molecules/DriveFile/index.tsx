import React from 'react';
import { Stack, Typography, styled } from '@mui/material';
import theme from '../../../theme/theme';
import CheckedIcon from '../../../../public/assets/icons/checked.svg';
import Icon from '@components/atoms/Icon';
import CheckBox from '@components/atoms/Checkbox';

interface DriveFileProps {
  checked: boolean;
  onChange: () => void;
  fileSrc: string;
  fileAlt: string;
  fileName: string;
}

const StyledOuterBox = styled(Stack)({
  paddingLeft: '1.39vw',
  flexDirection: 'row',
  gap: '1.71vw',
  backgroundColor: theme.palette.grey[400],
  borderRadius: '4px',
  width: '47.43vw',
  height: '5.41vw',
  alignItems: 'center',
  justifyContent: 'flex-start',
  border: `1px solid ${theme.palette.grey[300]}`,
  color: theme.palette.textColor.white
});

const StyledCheckbox = styled(CheckBox)({
  color: theme.palette.textColor.white
});

const ImageStyles = {
  width: '3.66vw',
  height: '3.66vw'
};

export const Drivefile = ({
  checked,
  onChange,
  fileSrc,
  fileAlt,
  fileName
}: DriveFileProps) => {
  return (
    <StyledOuterBox>
      <StyledCheckbox
        disableRipple
        disableFocusRipple
        disableTouchRipple
        checked={checked}
        onChange={onChange}
        checkedIcon={<Icon src={CheckedIcon} alt="checkbox-icon" />}
      />
      <Icon src={fileSrc} alt={fileAlt} style={ImageStyles}/>
      <Typography variant="body1">{fileName}</Typography>
    </StyledOuterBox>
  );
};
