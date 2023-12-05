import React, { useEffect, useState } from 'react';
import { Box, Modal, Stack, styled } from '@mui/material';
import theme from '@src/theme/theme';
import CrossIcon from '../../../../public/assets/icons/cross-icon.svg';
import PdfIcon from '../../../../public/assets/icons/pdf.svg';
import Icon from '@components/atoms/Icon';
import { Typography } from '@components/atoms/Typography';
import LinearLoader from '@components/atoms/ProgressBar';
import { UPLOADING } from '@src/utils/constants';

interface UploadProgressModalProps {
  openModal: boolean;
  fileName: string;
  handleClose:()=>void;
  handleExtraProp:()=>void;
  loading:boolean;
}
const CenteredModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const ProgressModalOutline = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '50.95vw',
  height: '37.18vw',
  backgroundColor: `${theme.palette.grey[400]}`,
  padding: '2.15vw',
  color: theme.palette.textColor.white
});

const CrossIconStyles = {
  width: '0.96vw',
  height: '0.96vw'
};

const PdfIconStyles = {
  width: '6.29vw',
  height: '6.29vw'
};

const ModalHeader = styled(Stack)({
  alignItems: 'flex-end'
});

const ModalBody = styled(Stack)({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center'
});

const PdfDetailBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.58vw'
});

const ProgressBarBox = styled(Stack)({
  marginTop: '2.34vw'
});

const ProgressStatus = styled(Box)({
  display: 'flex',
  alignSelf: 'flex-end'
});

export const UploadProgressModal = ({
  openModal,
  fileName,
  handleClose,
  handleExtraProp,
  loading
}: UploadProgressModalProps) => {
  const [progress, setProgress] = useState(10);
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (openModal) {
      if (loading) {
        timer = setInterval(() => {
          setProgress((prevProgress) => {
            const newProgress = Math.min(prevProgress + 5, 80);
            if (newProgress === 80 && timer) {
              clearInterval(timer);
            }
            return newProgress;
          });
        }, 200);
      } else {
        timer = setInterval(() => {
          setProgress((prevProgress) => {
            const newProgress = Math.min(prevProgress + 5, 100);
            if (newProgress === 100 && timer) {
              handleClose();
              handleExtraProp();
              clearInterval(timer);
            }
            return newProgress;
          });
        }, 200);
      }
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [openModal,loading]);
  return (
    <CenteredModal open={openModal} data-testid="upload-progress-modal">
      <ProgressModalOutline>
        <ModalHeader>
          <Icon src={CrossIcon} alt="pdf-icon" style={CrossIconStyles} />
        </ModalHeader>
        <ModalBody>
          <PdfDetailBox>
            <Icon src={PdfIcon} alt="modal-close-icon" style={PdfIconStyles} onClick={handleClose}/>
            <Typography variant="body1">{fileName}</Typography>
          </PdfDetailBox>
          <ProgressBarBox>
            <LinearLoader progress={progress} />
            <ProgressStatus>
              <Typography>{UPLOADING}</Typography>
            </ProgressStatus>
          </ProgressBarBox>
        </ModalBody>
      </ProgressModalOutline>
    </CenteredModal>
  );
};
