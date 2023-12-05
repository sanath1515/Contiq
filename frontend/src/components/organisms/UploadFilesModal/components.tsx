import Button from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import { Typography } from '@components/atoms/Typography';
import { Box, Stack, styled } from '@mui/material';
import theme from '@src/theme/theme';
import { UPLOAD_FILES_MODAL_CONSTANTS } from '@src/utils/constants';

export interface UploadBlockProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  openFileInput: () => void;
  handleFileUploadChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StyledContainerBox = styled(Box)`
  cursor: pointer;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const StyledFileInput = styled('input')`
  display: none;
`;

const StyledUploadButton = styled(Button)`
  padding: ${theme.spacing(2)} ${theme.spacing(6)};
`;

export const UploadBlock = (props: UploadBlockProps) => {
  const { fileInputRef, openFileInput, handleFileUploadChange } = props;
  return (
    <>
      <Stack direction={'column'} gap={theme.spacing(10)} alignItems={'center'}>
        <Stack
          direction={'column'}
          gap={theme.spacing(3)}
          alignItems={'center'}
        >
          <Icon
            src={UPLOAD_FILES_MODAL_CONSTANTS.uploadIconsSrc}
            alt="upload"
            style={{ width: '1.8vw' }}
          ></Icon>
          <Typography variant="subtitle2" color={theme.palette.textColor.white}>
            {UPLOAD_FILES_MODAL_CONSTANTS.dropFilesText}
          </Typography>
        </Stack>
        <StyledContainerBox
          padding={`${theme.spacing(2)} ${theme.spacing(6)}`}
          border={`1px solid ${theme.palette.textColor.white}`}
          borderRadius={theme.spacing(1)}
          onClick={() => {
            openFileInput();
          }}
        >
          <Typography variant="body1" color={theme.palette.textColor.white}>
            {UPLOAD_FILES_MODAL_CONSTANTS.chooseFilesText}
          </Typography>
          <StyledFileInput
            ref={fileInputRef}
            type="file"
            onChange={handleFileUploadChange}
            accept=".pdf"
            data-testid="fileInput"
          ></StyledFileInput>
        </StyledContainerBox>
      </Stack>
    </>
  );
};

export interface UploadSelectedFileBlockProps {
  selectedFile: File;
  handleUploadButtonClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export const UploadSelectedFileBlock = (
  props: UploadSelectedFileBlockProps
) => {
  const { selectedFile, handleUploadButtonClick } = props;

  return (
    <>
      <Stack direction={'column'} gap={theme.spacing(8)} alignItems={'center'}>
        <Stack
          direction={'column'}
          gap={theme.spacing(2)}
          alignItems={'center'}
        >
          <Icon
            src={UPLOAD_FILES_MODAL_CONSTANTS.pdfIconSrc}
            style={{
              width: theme.spacing(20),
              height: theme.spacing(20)
            }}
            alt="pdf"
          ></Icon>
          <Typography variant="body1" color={theme.palette.textColor.white}>
            {selectedFile.name}
          </Typography>
        </Stack>
        <StyledUploadButton
          variant="contained"
          text={UPLOAD_FILES_MODAL_CONSTANTS.uploadText}
          onClick={(e) => {
            handleUploadButtonClick(e);
          }}
        ></StyledUploadButton>
      </Stack>
    </>
  );
};

export interface UploadCloudOptionsBlockProps {
  handleGdriveOptionClick: () => void;
}

export const UploadCloudOptionsBlock = (
  props: UploadCloudOptionsBlockProps
) => {
  const { handleGdriveOptionClick } = props;

  return (
    <>
      <Stack direction={'column'} gap={theme.spacing(8)} alignItems={'center'}>
        <Box width={'15.44vw'}>
          <Typography
            variant="subtitle2"
            color={theme.palette.textColor.white}
            textAlign={'center'}
          >
            {UPLOAD_FILES_MODAL_CONSTANTS.gdriveHelperText}
          </Typography>
        </Box>
        <Stack direction={'row'} gap={theme.spacing(8)}>
          {UPLOAD_FILES_MODAL_CONSTANTS.cloudOptions.map((option, index) => (
            <StyledContainerBox
              padding={theme.spacing(2.25)}
              key={option.alt}
              bgcolor={theme.palette.textColor.white}
              borderRadius={theme.spacing(1)}
              onClick={() =>
                index == 0 ? handleGdriveOptionClick() : () => {}
              }
            >
              <Icon
                style={{
                  width: theme.spacing(8),
                  height: theme.spacing(8)
                }}
                src={option.iconSrc}
                alt={option.alt}
              ></Icon>
            </StyledContainerBox>
          ))}
        </Stack>
      </Stack>
    </>
  );
};
