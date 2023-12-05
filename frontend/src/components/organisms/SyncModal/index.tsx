import Gif from '@components/atoms/Gif';
import Icon from '@components/atoms/Icon';
import { Modal, Stack, Typography, Box, styled } from '@mui/material';
import theme from '@src/theme/theme';
import { SYNC_MODAL_CONSTANTS } from '@src/utils/constants';
import React from 'react';

export interface SyncModalProps {
  isOpen: boolean;
  handleClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  estimatedTime: string;
  totalItems: number;
  completedItems: number;
}

const StyledModalContainer = styled(Stack)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SyncModal = (props: SyncModalProps) => {
  const { isOpen, handleClose, estimatedTime, totalItems, completedItems } =
    props;

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <StyledModalContainer
        direction={'column'}
        justifyContent={'center'}
        width={'51vw'}
        height={'66vh'}
        bgcolor={theme.palette.grey[400]}
        position={'relative'}
        borderRadius={'4px'}
      >
        <Box
          position={'absolute'}
          top={24}
          right={24}
          onClick={(e) => handleClose(e, 'backdropClick')}
        >
          <Icon src={SYNC_MODAL_CONSTANTS.closeIconPath} alt="close"></Icon>
        </Box>
        <Stack
          bgcolor={theme.palette.textColor.white}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          width={'6.29vw'}
          height={'6.29vw'}
          alignSelf={'center'}
        >
          <Icon
            src={SYNC_MODAL_CONSTANTS.gDriveIconPath}
            alt="google-drive"
            style={{ width: '4vw', height: '4vw' }}
          ></Icon>
        </Stack>
        <Stack
          direction={'column'}
          alignSelf={'center'}
          alignItems={'center'}
          marginTop={theme.spacing(6)}
        >
          <Stack direction={'row'} gap={theme.spacing(2)} borderRadius={'4px'}>
            <Gif
              src={'assets/animations/loading_circle.gif'}
              alt="loading"
              width="30px"
            ></Gif>
            <Typography variant="h3" color={theme.palette.textColor.white}>
              {SYNC_MODAL_CONSTANTS.syncMessage}
            </Typography>
          </Stack>
          <Box
            width={'13.83vw'}
            alignSelf={'center'}
            textAlign={'center'}
            marginTop={theme.spacing(4)}
          >
            <Typography
              variant="body2"
              color={theme.palette.textColor.highEmphasis}
            >
              {SYNC_MODAL_CONSTANTS.helperMessage}
            </Typography>
          </Box>
        </Stack>
        <Box position={'absolute'} bottom={0} width={'100%'}>
          <Stack
            direction={'row'}
            padding={`0 ${theme.spacing(6)} ${theme.spacing(6)} ${theme.spacing(
              6
            )}`}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography
              variant="body2"
              color={theme.palette.textColor.white}
            >{`${SYNC_MODAL_CONSTANTS.estimated} ${estimatedTime}`}</Typography>
            <Typography
              variant="body2"
              color={theme.palette.textColor.white}
            >{`${SYNC_MODAL_CONSTANTS.completed} ${completedItems}/${totalItems}`}</Typography>
          </Stack>
        </Box>
      </StyledModalContainer>
    </Modal>
  );
};

export default SyncModal;
