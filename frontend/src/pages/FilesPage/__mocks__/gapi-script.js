const mockListFilesResponse = {
    body: JSON.stringify({
      files: [
        {
          id: 'file1Id',
          mimeType: 'application/pdf',
          modifiedTime: '2023-09-08T12:00:00Z',
          name: 'File1.pdf',
        },
        {
          id: 'file2Id',
          mimeType: 'application/pdf',
          modifiedTime: '2023-09-08T13:00:00Z',
          name: 'File2.pdf',
        },
      ],
    }),
  };
export const gapi= {
    load: jest.fn(), 
    auth2: {
      init: jest.fn(),
      getAuthInstance: jest.fn(() => ({
        isSignedIn: {
            get:jest.fn()
        },
        signIn: jest.fn(),
      })),
    },
    client: {
      init: jest.fn(), 
      drive:{
        files: {
          get: jest.fn(), 
          list:jest.fn(),
        },
      },
    }
    };
  

  