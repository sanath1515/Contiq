import Icon from '@components/atoms/Icon';
import { Typography } from '@components/atoms/Typography';
import Tabs from '@components/molecules/Tabs';
import { Modal, Stack, styled, Box, Divider } from '@mui/material';
import theme from '@src/theme/theme';
import { UPLOAD_FILES_MODAL_CONSTANTS } from '@src/utils/constants';
import React, { useRef, useState } from 'react';

import {
  StyledContainerBox,
  UploadBlock,
  UploadCloudOptionsBlock,
  UploadSelectedFileBlock
} from './components';
import { UploadOptionsModal } from '../UploadOptionsModal';
import { UploadProgressModal } from '../UploadProgressModal';

export interface UploadFileModalProps {
  isOpen: boolean;
  handleClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  handleFileOnUploadClick: (file: File) => void;
  handleGdriveOptionClick: () => void;
  handleExtraProp: () => void;
  isFileExists?: boolean;
}

const StyledModalBox = styled(Box)`
  background-color: ${theme.palette.grey[400]};
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledDivider = styled(Divider)`
  background: ${theme.palette.grey[300]};
`;

const StyledContentStack = styled(Stack)`
  border: 2px dashed ${theme.palette.grey[200]};
  border-radius: 8px;
`;

const UploadFilesModal = (props: UploadFileModalProps) => {
  const {
    isOpen,
    handleClose,
    handleFileOnUploadClick,
    handleGdriveOptionClick,
    handleExtraProp
  } = props;

  const [tabActiveIndex, setTabActiveIndex] = useState(0);

  const [selectedFile, setSelectedFile] = useState<File>();

  const [isFileSelected, setIsFileSelected] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadOptionsModal, setUploadOptionsModal] = useState(false);

  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setTabActiveIndex(newValue);
  };

  const handleFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setSelectedFile(e.target.files[0]);
      setIsFileSelected(true);
    }
  };

  const openFileInput = () => {
    if (fileInputRef.current != null) {
      fileInputRef.current.click();
    }
  };

  const handleUploadButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (selectedFile) {
      handleFileOnUploadClick(selectedFile);
      setIsFileSelected(false);
      handleClose(e, 'escapeKeyDown');
      // setUploadOptionsModal(true);
    }
  };

  const handleBackClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isFileSelected) {
      setIsFileSelected(false);
    }
    if (!isFileSelected && tabActiveIndex == 0) {
      handleClose(e, 'escapeKeyDown');
    }
  };

  const StyledTabs = styled(Tabs)`
    && {
      text-transform: none;
      justify-content: space-between;
    }
  `;
  return (
    <>
      <Modal
        open={isOpen}
        onClose={(e) => {
          handleClose(e, 'backdropClick');
        }}
      >
        <StyledModalBox width={'51vw'}>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            padding={theme.spacing(5)}
          >
            <Stack
              direction={'row'}
              gap={theme.spacing(3)}
              alignItems={'center'}
            >
              <StyledContainerBox onClick={handleBackClick} padding={0}>
                <Icon
                  testId="back-icon"
                  src={UPLOAD_FILES_MODAL_CONSTANTS.backIconSrc}
                  alt="back"
                  style={{ width: theme.spacing(6), height: theme.spacing(6) }}
                ></Icon>
              </StyledContainerBox>
              <Typography variant="h3" color={theme.palette.textColor.white}>
                {UPLOAD_FILES_MODAL_CONSTANTS.uploadFilesText}
              </Typography>
            </Stack>
            <Box onClick={(e) => handleClose(e, 'backdropClick')}>
              <Icon
                testId="close-icon"
                src={UPLOAD_FILES_MODAL_CONSTANTS.closeIconSrc}
                alt="close"
              ></Icon>
            </Box>
          </Stack>
          <StyledDivider />
          <StyledTabs
            tabItems={UPLOAD_FILES_MODAL_CONSTANTS.uploadTabItems}
            activeIndex={tabActiveIndex}
            handleChange={handleTabChange}
          />
          <StyledContentStack
            margin={theme.spacing(5)}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            height={'30vw'}
            borderRadius={'4px'}
          >
            {tabActiveIndex == 0 && !isFileSelected && (
              <UploadBlock
                fileInputRef={fileInputRef}
                handleFileUploadChange={handleFileUploadChange}
                openFileInput={openFileInput}
              />
            )}
            {tabActiveIndex == 0 && isFileSelected && selectedFile && (
              <UploadSelectedFileBlock
                handleUploadButtonClick={(e) => {
                  handleUploadButtonClick(e);
                }}
                selectedFile={selectedFile}
              />
            )}
            {tabActiveIndex == 1 && (
              <UploadCloudOptionsBlock
                handleGdriveOptionClick={handleGdriveOptionClick}
              />
            )}
          </StyledContentStack>
        </StyledModalBox>
      </Modal>
    </>
  );
};

export default UploadFilesModal;
