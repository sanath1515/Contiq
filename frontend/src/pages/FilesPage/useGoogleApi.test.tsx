import { renderHook, waitFor } from '@testing-library/react';
import { useGoogleApi } from './useGoogleApi';
import { gapi } from 'gapi-script';
import { when } from 'jest-when';
const mockListFilesResponse = {
  body: JSON.stringify({
    files: [
      {
        id: 'file1Id',
        mimeType: 'application/pdf',
        modifiedTime: '2023-09-08T12:00:00Z',
        name: 'File1.pdf'
      },
      {
        id: 'file2Id',
        mimeType: 'application/pdf',
        modifiedTime: '2023-09-08T13:00:00Z',
        name: 'File2.pdf'
      }
    ]
  })
};

jest.mock('gapi-script');

const listFilesSpy = jest.spyOn(gapi.client.drive.files, 'list');
const signInGetSpy = jest.spyOn(gapi.auth2.getAuthInstance().isSignedIn, 'get');
const initSpy = jest.spyOn(gapi.client, 'init');

describe('useGoogleApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize Google API', async () => {
    const { result } = renderHook(() => useGoogleApi());
    initSpy.mockResolvedValueOnce({});
    result.current.initClient();
    result.current.load();
    listFilesSpy.mockResolvedValueOnce(mockListFilesResponse);
    result.current.listFiles();
  });

  it('should log error to console when list file gives error', async () => {
    listFilesSpy.mockRejectedValue(new Error('error'));
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const { result } = renderHook(() => useGoogleApi());
    result.current.listFiles();
    await waitFor(() => {
      expect(consoleErrorSpy).toBeCalled();
    });
  });

  it('should log error to console when initialisation gives error', async () => {
    initSpy.mockRejectedValueOnce(new Error('error'));

    const consoleErrorSpy = jest.spyOn(console, 'error');
    const { result } = renderHook(() => useGoogleApi());
    result.current.initClient();
    await waitFor(() => {
      expect(consoleErrorSpy).toBeCalled();
    });
  });
});

describe('processIndividualFile', () => {
  it('should return a valid file when a valid response is received', async () => {
    const fileId = 'validFileId';
    const folderModalData = [
      { id: 'validFileId', fileName: 'file.pdf', isChecked: true }
    ];

    const mockRes = {
      body: 'fileContents',
      headers: { 'content-type': 'application/pdf' }
    };

    signInGetSpy.mockReturnValueOnce(true);

    const { result, rerender } = renderHook(() => useGoogleApi());
    result.current.setIsApiInitialized(true);
    rerender();

    jest.spyOn(gapi.client.drive.files, 'get').mockResolvedValueOnce(mockRes);

    result.current.processIndividualFile(fileId, folderModalData);
  });

  it('should return null when an invalid response is received', async () => {
    const fileId = 'invalidFileId';
    const folderModalData = [
      { id: 'validFileId', fileName: 'file.pdf', isChecked: true }
    ];

    const mockRes = {};

    jest.spyOn(gapi.client.drive.files, 'get').mockResolvedValue(mockRes);

    const { result, rerender } = renderHook(() => useGoogleApi());
    result.current.setIsApiInitialized(true);
    rerender();
    await waitFor(() => {
      expect(result.current.processIndividualFile(fileId, folderModalData))
        .toBeNull;
    });
  });

  it('should log error to console when api is not initialised', async () => {
    const mockRes = {};
    const fileId = 'invalidFileId';
    const folderModalData = [
      { id: 'validFileId', fileName: 'file.pdf', isChecked: true }
    ];

    const consoleErrorSpy = jest.spyOn(console, 'error');
    const { result } = renderHook(() => useGoogleApi());
    result.current.processIndividualFile(fileId, folderModalData);
    await waitFor(() => {
      expect(consoleErrorSpy).toBeCalled();
    });
  });
  it('should log error to console when exception occurs', async () => {
    const fileId = 'invalidFileId';
    const folderModalData = [
      { id: 'validFileId', fileName: 'file.pdf', isChecked: true }
    ];

    jest
      .spyOn(gapi.client.drive.files, 'get')
      .mockRejectedValue(new Error('error'));
    const { result, rerender } = renderHook(() => useGoogleApi());
    result.current.setIsApiInitialized(true);
    rerender();
    const consoleErrorSpy = jest.spyOn(console, 'error');
    result.current.processIndividualFile(fileId, folderModalData);
    await waitFor(() => {
      expect(consoleErrorSpy).toBeCalled();
    });
  });
});
