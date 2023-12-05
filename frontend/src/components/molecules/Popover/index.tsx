import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { SnackbarProps as Props, styled, Box } from '@mui/material';
import theme from '../../../theme/theme';
import { Typography } from '../../atoms/Typography';

interface SimpleSnackbarProps extends Props {
  Text: string;
  handlingClose: () => void;
  buttonTestId?: string;
  innerRef?: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
}

const StyledBox = styled(Box)({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2),
  width: '14.64vw',
  borderRadius: theme.spacing(1),
  color: theme.palette.textColor.white,
  background: theme.palette.grey[400],
  position: "absolute",
  top: "15vw",
  right: theme.spacing(8)
});

const StyledText = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3)
});

const StyledIconButton = styled(IconButton)({
  color: theme.palette.textColor.white
});

export default function SimpleSnackbar(props: SimpleSnackbarProps) {
  const { Text, handlingClose, buttonTestId, innerRef, isOpen } = props;

  return (
    <>
      {isOpen && (
        <StyledBox ref={innerRef}>
          <StyledText>
            <CheckCircleIcon />
            <Typography variant="body1">{Text}</Typography>
          </StyledText>
          <StyledIconButton data-testid={buttonTestId} onClick={handlingClose}>
            <CloseIcon />
          </StyledIconButton>
        </StyledBox>
      )}
    </>
  );
}
