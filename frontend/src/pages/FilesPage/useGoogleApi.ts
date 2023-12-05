import { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import { FilesDataType } from '@src/utils/constants';
import { mapFilesData } from './utils';

export function useGoogleApi() {
  const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
  ];
  const SCOPES =
    'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.readonly';
  const API_KEY = process.env.REACT_APP_GAPI_API_KEY as string;
  const CLIENT_ID = process.env.REACT_APP_GAPI_CLIENT_ID as string;

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [gDriveFilesData, setGdriveFilesData] = useState<Array<FilesDataType>>(
    []
  );
  const [isApiInitialized, setIsApiInitialized] = useState(false);

  const initClient = () => {
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      })
      .then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        authInstance.isSignedIn.listen(
          (signedIn: boolean | ((prevState: boolean) => boolean)) => {
            setIsSignedIn(signedIn);
          }
        );
        setIsSignedIn(authInstance.isSignedIn.get());
        setIsApiInitialized(true);
      })
      .catch((error: any) => {
        console.error('Google API initialization error:', error);
        setIsApiInitialized(false);
      });
  };

  useEffect(() => {
    console.log('Api initialised', isApiInitialized);
  }, [isApiInitialized]);
  const load = () => {
    gapi.load('client:auth2', initClient);
  };

  const signIn = () => {
    gapi.auth2.getAuthInstance().signIn();
  };
  useEffect(() => {
    load();
  }, []);
  const listFiles = () => {
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name, mimeType, modifiedTime)',
        q: "mimeType='application/pdf'"
      })
      .then((response: { body: string }) => {
        const obj = JSON.parse(response.body);
        const mappedFilesData = mapFilesData(obj.files);
        setGdriveFilesData(mappedFilesData);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  };

  const processIndividualFile = async (
    id: string,
    folderModalData: FilesDataType[]
  ) => {
    try {
      // Ensure API is initialized here as well if needed
      if (!isApiInitialized) {
        console.error('Google API client not initialized');
        return null;
      }

      const res = await gapi.client.drive.files.get({
        fileId: id,
        alt: 'media'
      });

      if (res.body) {
        let binary = res.body;
        let l = binary.length;
        let array = new Uint8Array(l);
        for (var i = 0; i < l; i++) {
          array[i] = binary.charCodeAt(i);
        }
        let blob = new Blob([array], { type: 'application/octet-stream' });
        const file = new File(
          [blob],
          folderModalData.find((item) => item.id === id)?.fileName ??
            'sample.pdf',
          {
            type: 'application/pdf'
          }
        );
        return file;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    initClient,
    isSignedIn,
    listFiles,
    processIndividualFile,
    gDriveFilesData,
    isApiInitialized,
    load,
    signIn,
    setIsApiInitialized
  };
}
