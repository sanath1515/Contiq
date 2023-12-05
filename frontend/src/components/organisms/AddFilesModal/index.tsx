import React from 'react';
import { Box, Button, Modal, Stack, styled } from '@mui/material';
import Icon from '@components/atoms/Icon';
import theme from '@src/theme/theme';
import ChevronLeftIcon from '../../../../public/assets/icons/chevron-left.svg';
import CrossIcon from '../../../../public/assets/icons/cross-icon.svg';
import { Typography } from '@components/atoms/Typography';
import DriveFolder from '@components/molecules/DriveFolder';
import {
  ADD_FILES,
  BACK,
  CHOOSE_OPTIONS,
  FORM_LABEL,
  SYNC
} from '@src/utils/constants';
import RadioButtonsGroup from '@components/molecules/RadioGroup';

type FolderType = {
  id: number;
  folderName: string;
};

interface AddFilesModalProps {
  folders: FolderType[];
  openModal: boolean;
  handleZemosoDecksClick: () => void;
}

export const CenteredModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export const ModalOutline = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '50.95vw',
  height: '43.77vw',
  borderRadius: theme.spacing(1),
  backgroundColor: `${theme.palette.grey[400]}`,
  padding: '1.75vw 1.75vw 2.92vw 1.75vw',
  color: theme.palette.textColor.white,
  justifyContent: 'space-between'
});

export const ModalHeader = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '2.04vw'
});

const StyledChooseFolder = styled(Stack)({
  marginBottom: '2.34vw',
  marginTop: '1.18vw'
});

export const StyledDriveFolders = styled(Stack)({
  gap: '1.17vw'
});
export const Scroll = styled(Box)({
  overflowY: 'scroll',
  maxHeight: '26vw',
  '&::-webkit-scrollbar': {
    width: '0em',
    height: '0em'
  },
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent'
  }
});

export const StyledOutlineButton = styled(Button)({
  textTransform: 'none',
  width: '5.49vw',
  height: '2.48vw',
  borderRadius: theme.spacing(0.75),
  '&:hover': {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.grey[200]
  },
  backgroundColor: theme.palette.grey[400],
  color: theme.palette.grey[200],
  border: `1px solid ${theme.palette.grey[200]}`
});

export const StyledContainedButton = styled(Button)({
  textTransform: 'none',
  width: '5.49vw',
  height: '2.48vw',
  borderRadius: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.textColor.white
  },
  backgroundColor: theme.palette.primary[500],
  color: `${theme.palette.textColor.white}`,
  '&.Mui-disabled': {
    backgroundColor: theme.palette.primary[100],
    color: `${theme.palette.textColor.white}`
  }
});

export const StyledButtonStack = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '0.87vw'
});

export const AddFilesModal = ({
  folders,
  openModal,
  handleZemosoDecksClick
}: AddFilesModalProps) => {
  const handleFilesModal = (index: number) => {
    if (index === 0) {
      handleZemosoDecksClick();
    }
  };

  return (
    <>
      <CenteredModal open={openModal}>
        <>
          <ModalOutline>
            <Box>
              <ModalHeader>
                <Stack direction="row" gap="1.53vw">
                  <Icon src={ChevronLeftIcon} alt="chevron-left" />
                  <Typography variant="h3">{ADD_FILES}</Typography>
                </Stack>
                <Icon src={CrossIcon} alt="cross-icon" />
              </ModalHeader>
              <StyledChooseFolder>
                <RadioButtonsGroup
                  formLabel={FORM_LABEL}
                  options={CHOOSE_OPTIONS}
                />
              </StyledChooseFolder>
              <Scroll>
                <StyledDriveFolders>
                  {folders.map((folder, index) => (
                    <DriveFolder
                      key={folder.id}
                      name={folder.folderName}
                      handleClick={() => handleFilesModal(index)}
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
              >
                <Typography variant="body1">{BACK}</Typography>
              </StyledOutlineButton>
              <StyledContainedButton
                disableElevation
                disableFocusRipple
                disableRipple
                disableTouchRipple
                disabled
              >
                <Typography variant="body1">{SYNC}</Typography>
              </StyledContainedButton>
            </StyledButtonStack>
          </ModalOutline>
        </>
      </CenteredModal>
    </>
  );
};
