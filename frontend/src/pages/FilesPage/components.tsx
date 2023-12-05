import Button from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import UploadFilesModal from '@components/organisms/UploadFilesModal';
import { Typography, styled } from '@mui/material';
import { Stack } from '@mui/system';
import theme from '@src/theme/theme';
import {
  FILES_PAGE_CONSTANTS,
  FOLDERS_DATA,
  FilesDataType
} from '@src/utils/constants';
import { useContext, useEffect, useState } from 'react';
import Files from '@components/organisms/Files';
import SyncModal from '@components/organisms/SyncModal';
import { AddFilesModal } from '@components/organisms/AddFilesModal';
import { FolderModal } from '@components/organisms/FolderModal';
import { useGoogleApi } from './useGoogleApi';
import { useLoading } from './useLoading';
import { useGoogleDriveFileProcessing } from './useGoogleDriveFileProcessing';
import { FilesUploadedContext } from '@src/App';
import { useUserContext } from '@src/utils/ThemeContext';
import { useFileUpload } from './hooks';
import { checkFileExistence } from './utils';
import { UploadOptionsModal } from '@components/organisms/UploadOptionsModal';
import { UploadProgressModal } from '@components/organisms/UploadProgressModal';
import { useNavigate } from 'react-router';
import axios from '@src/services/API';

const StyledFilesContainerStack = styled(Stack)`
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 100%;
  &::-webkit-scrollbar {
    width: 5px;
    background: none;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.palette.grey[100]};
    border-radius: ${theme.spacing(1)};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.palette.grey[100]};
  }

  &::-webkit-scrollbar-vertical {
    width: ${theme.spacing(1.25)};
    background: none;
  }

  &::-webkit-scrollbar-thumb:vertical {
    background: ${theme.palette.grey[100]};
    border-radius: ${theme.spacing(1)};
  }

  &::-webkit-scrollbar-thumb:vertical:hover {
    background: ${theme.palette.grey[100]};
  }
`;

export const BodyContent = ({
  userId,
  handleExtraProp
}: {
  userId: number;
  handleExtraProp: () => void;
}) => {
  const {upload,isLoading,setisLLoading} = useFileUpload();
  const { currUser } = useUserContext();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { loading, setLoading } = useLoading();
  const [isAddFilesModalOpen, setIsAddFilesModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isFileExists, setIsFileExists] = useState(false);
  const { filesUploaded } = useContext(FilesUploadedContext);
  const [totalFilesToUpload, setTotalFilesToUpload] = useState(0);
  const [driveClicked, setDriveClicked] = useState(false);
  const [uploadProgressModal, setUploadProgressModal] = useState(false);
  const [isUploadOptionsModalOpen, setIsUploadOptionModalOpen] = useState(true);
  const [loader,setLoader] = useState(false);
  const {
    isSignedIn,
    processIndividualFile,
    gDriveFilesData,
    listFiles,
    load,
    signIn
  } = useGoogleApi();
  const { files, handleUpdateFiles } = useUserContext();
  const { uploadGdriveFile } = useGoogleDriveFileProcessing();

  const [selectedFile, setSelectedFile] = useState<File>();

  const navigate = useNavigate();

  const handleGdriveClick = () => {
    setDriveClicked(true);
    if (!isSignedIn) {
      signIn();
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      listFiles();
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (gDriveFilesData && gDriveFilesData.length > 0 && driveClicked) {
      setIsAddFilesModalOpen(true);
    }
  }, [gDriveFilesData, driveClicked]);

  useEffect(() => {
    if (filesUploaded == totalFilesToUpload) {
      setLoading(false);
      handleExtraProp();
    }
  }, [filesUploaded]);

  const handleSyncClick = (files: FilesDataType[]) => {
    setTotalFilesToUpload(files.length);
    setLoading(true);
    files.forEach((file) => {
      processIndividualFile(file.id, gDriveFilesData).then((file) => {
        if (file) {
          uploadGdriveFile(file, userId, currUser.name);
        }
      });
    });
    setIsFolderModalOpen(false);
  };

  const handleOptionsModalCancel = () => {
    setIsUploadOptionModalOpen(false);
    setIsUploadModalOpen(true);
  };

  const handleUploadOptionsModal = () => {
    setIsUploadOptionModalOpen(true);

    upload(selectedFile as File, currUser.id, currUser.email, false);
    setIsUploadOptionModalOpen(false);
    setIsFileExists(false);
    setUploadProgressModal(true);
  };
  const handleFileOnUploadClick = async (file: File) => {
    setSelectedFile(file);
    const isExist = await checkFileExistence(currUser.id, file.name);
    console.log('is exist', isExist);
    if (isExist) {
      setIsFileExists(true);
      setIsUploadOptionModalOpen(true);
    } else {
      console.log('else block');
      upload(file, currUser.id, currUser.name, true);
      setUploadProgressModal(true);
    }
  };
  useEffect(() => {
    handleUpdateFiles();
  }, []);

  const handleCloseProgessModal = () => {
    setUploadProgressModal(false);
  };

  const handleFileClick = (id: number) => {
    axios
      .get(`/files/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        responseType: 'blob'
      })
      .then((res) => {
        const binaryData = res.data;
        const blob = new Blob([binaryData], {
          type: 'application/pdf'
        });
        const pdfUrl = URL.createObjectURL(blob);
        navigate('/viewPdf', { state: { pdfUrl: pdfUrl } });
      });
  };
  console.log(isLoading)
  return (
    <>
      <UploadOptionsModal
        openModal={isUploadOptionsModalOpen && isFileExists}
        fileName={selectedFile?.name ?? ''}
        onCancel={handleOptionsModalCancel}
        onUpload={handleUploadOptionsModal}
      />
      <UploadFilesModal
        isOpen={isUploadModalOpen}
        handleClose={() => setIsUploadModalOpen(!isUploadModalOpen)}
        handleGdriveOptionClick={() => {
          handleGdriveClick();
        }}
        handleFileOnUploadClick={(file: File) => {
          handleFileOnUploadClick(file);
        }}
        isFileExists={isFileExists}
        handleExtraProp={handleExtraProp}
      ></UploadFilesModal>
      <SyncModal
        isOpen={loading}
        completedItems={filesUploaded}
        estimatedTime="1min"
        handleClose={() => {
          setLoading(false);
        }}
        totalItems={totalFilesToUpload}
      ></SyncModal>
      <AddFilesModal
        openModal={isAddFilesModalOpen}
        folders={FOLDERS_DATA}
        handleZemosoDecksClick={() => {
          setIsUploadModalOpen(false);
          setIsAddFilesModalOpen(false);
          setIsFolderModalOpen(true);
        }}
      ></AddFilesModal>
      <FolderModal
        openModal={isFolderModalOpen}
        files={gDriveFilesData}
        handleZemosoDecksBackClick={() => {
          setIsUploadModalOpen(true);
          setIsAddFilesModalOpen(true);
          setIsFolderModalOpen(false);
        }}
        handleCloseModal={() => {
          setIsFolderModalOpen(false);
        }}
        handleSyncClick={handleSyncClick}
      ></FolderModal>
      <Stack direction={'column'} width={'100%'} height={'100%'}>
        <Stack
          direction={'row'}
          padding={`${theme.spacing(7)} ${theme.spacing(6)}`}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant="h2" color={theme.palette.textColor.black}>
            {FILES_PAGE_CONSTANTS.heading}
          </Typography>
          <Button
            text={FILES_PAGE_CONSTANTS.buttonLabel}
            variant="contained"
            startIcon={
              <Icon src={FILES_PAGE_CONSTANTS.addIconSrc} alt="add"></Icon>
            }
            onClick={() => setIsUploadModalOpen(true)}
          ></Button>
        </Stack>

        <StyledFilesContainerStack
          boxSizing={'border-box'}
          padding={`0 ${theme.spacing(6)}`}
          height={'100%'}
        >
          <Files
            handleFileClick={(id) => handleFileClick(id)}
            presentationArray={files}
          ></Files>
        </StyledFilesContainerStack>
      </Stack>
      <UploadProgressModal
        openModal={uploadProgressModal}
        fileName={selectedFile?.name ?? ''}
        handleClose={handleCloseProgessModal}
        handleExtraProp={handleExtraProp}
        loading={isLoading}
      />
    </>
  );
};
