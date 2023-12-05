import React from 'react';
import { Box, Modal, Stack, styled } from '@mui/material';
import theme from '@src/theme/theme';
import './styles.css';
import { Typography } from '@components/atoms/Typography';
import MuiButton from '@components/atoms/Button';
import {
  CANCEL_BUTTON_LABEL,
  UPLOAD_BUTTON_LABEL,
  UPLOAD_MODAL_CAPTION,
  UPLOAD_OPTIONS
} from '@src/utils/constants';

interface UploadOptionsModalProps {
  openModal: boolean;
  fileName: string;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onUpload: () => void;
}

const CenteredModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const ModalOutline = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.04vw',
  width: '31.91vw',
  borderRadius: '4px',
  backgroundColor: `${theme.palette.grey[400]}`,
  padding: '1.75vw',
  color: theme.palette.textColor.white
});

const ModalFooter = styled(Stack)({
  flexDirection: 'row',
  gap: '1.46vw',
  justifyContent: 'flex-end'
});

const StyledCancelButton = styled(MuiButton)({
  backgroundColor: theme.palette.grey[400],
  border: `1px solid ${theme.palette.grey[100]}`,
  width: '4.61vw',
  height: '2.63vw',
  color: theme.palette.textColor.white,
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.textColor.white
  },
  alignItems: 'center'
});

const StyledUploadButton = styled(MuiButton)({
  backgroundColor: theme.palette.primary[500],
  border: 'none',
  width: '7.02vw',
  height: '2.63vw',
  color: theme.palette.textColor.white,
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.textColor.white
  },
  alignItems: 'center'
});

export const UploadOptionsModal = ({
  openModal,
  onCancel,
  onUpload,
  fileName
}: UploadOptionsModalProps) => {
  return (
    <CenteredModal open={openModal} data-testid="upload-options-modal">
      <ModalOutline>
        <Typography variant="h3">{UPLOAD_OPTIONS}</Typography>
        <Typography variant="h3" color={theme.palette.textColor.highEmphasis}>
          <span className="title">{fileName}</span> {UPLOAD_MODAL_CAPTION}
        </Typography>
        <ModalFooter>
          <StyledCancelButton
            variant="contained"
            text={CANCEL_BUTTON_LABEL}
            onClick={onCancel}
          />
          <StyledUploadButton
            variant="contained"
            text={UPLOAD_BUTTON_LABEL}
            onClick={onUpload}
          />
        </ModalFooter>
      </ModalOutline>
    </CenteredModal>
  );
};
