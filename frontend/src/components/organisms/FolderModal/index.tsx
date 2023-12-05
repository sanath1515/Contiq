import React, { useEffect, useState } from 'react';
import {
  CenteredModal,
  ModalHeader,
  ModalOutline,
  Scroll,
  StyledButtonStack,
  StyledContainedButton,
  StyledDriveFolders,
  StyledOutlineButton
} from '../AddFilesModal';
import { Box, Stack } from '@mui/material';
import ChevronLeftIcon from '../../../../public/assets/icons/chevron-left.svg';
import CrossIcon from '../../../../public/assets/icons/cross-icon.svg';
import { Typography } from '@components/atoms/Typography';
import Icon from '@components/atoms/Icon';
import { Drivefile } from '@components/molecules/DriveFile';
import FileIcon from '../../../../public/assets/icons/file-drive-icon.svg';
import { BACK, SYNC, ZEMOSO_DECKS } from '@src/utils/constants';
type FilesDataType = {
  fileName: string;
  id: string;
  isChecked: boolean;
};
interface FolderModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
  handleZemosoDecksBackClick: () => void;
  files: FilesDataType[];
  handleSyncClick: (files: FilesDataType[]) => void;
}
export const FolderModal = ({
  files,
  openModal,
  handleCloseModal,
  handleZemosoDecksBackClick,
  handleSyncClick
}: FolderModalProps) => {
  const [filesData, setFiles] = useState<FilesDataType[]>(files);
  const handleCheckbox = (file: FilesDataType) => {
    setFiles((prevFiles) =>
      prevFiles.map((prevFile) =>
        prevFile.id === file.id
          ? { ...prevFile, isChecked: !prevFile.isChecked }
          : prevFile
      )
    );
  };

  useEffect(() => {
    setFiles(files);
  }, [files]);

  return (
    <CenteredModal open={openModal}>
      <>
        <ModalOutline>
          <Box>
            <ModalHeader sx={{ marginBottom: '4.38vw' }}>
              <Stack direction="row" gap="1.53vw">
                <Icon
                  src={ChevronLeftIcon}
                  alt="chevron-left"
                  onClick={() => handleZemosoDecksBackClick()}
                />
                <Typography variant="h3">{ZEMOSO_DECKS}</Typography>
              </Stack>
              <Icon src={CrossIcon} alt="cross-icon" />
            </ModalHeader>
            <Scroll>
              <StyledDriveFolders>
                {filesData.map((file) => (
                  <Drivefile
                    key={file.id}
                    checked={file.isChecked}
                    onChange={() => handleCheckbox(file)}
                    fileSrc={FileIcon}
                    fileAlt="drive-file-icon"
                    fileName={file.fileName}
                  />
                ))}
              </StyledDriveFolders>
            </Scroll>
          </Box>
          <StyledButtonStack>
            <StyledOutlineButton
              disableElevation
              disableFocusRipple
              disableRipple
              disableTouchRipple
              onClick={handleCloseModal}
            >
              <Typography variant="body1">{BACK}</Typography>
            </StyledOutlineButton>
            <StyledContainedButton
              disableElevation
              disableFocusRipple
              disableRipple
              disableTouchRipple
              onClick={() =>
                handleSyncClick(filesData.filter((file) => file.isChecked))
              }
            >
              <Typography variant="body1">{SYNC}</Typography>
            </StyledContainedButton>
          </StyledButtonStack>
        </ModalOutline>
      </>
    </CenteredModal>
  );
};
