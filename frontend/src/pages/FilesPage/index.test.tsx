import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  renderHook,
  act
} from '@testing-library/react';
import FilesPage from '.';
import * as router from 'react-router';
import { BodyContent } from './components';
import * as services from '../../services';
import axios from '@src/services/API';
import { when } from 'jest-when';
import { FileResponse, mapFilesData } from './utils';
import { useGoogleApi } from './useGoogleApi';

const mockGdriveFilesData = [
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
];

const navigate = jest.fn();

const useGoogleApiMock = {
  isSignedIn: true,
  signIn: jest.fn(),
  processIndividualFile: jest
    .fn()
    .mockResolvedValue(new File([''], 'test.pdf')),
  gDriveFilesData: mockGdriveFilesData,
  listFiles: jest.fn(),
  load: jest.fn()
};
jest.mock('./useGoogleApi', () => ({
  useGoogleApi: () => useGoogleApiMock
}));

jest.spyOn(axios, 'post').mockResolvedValue({ data: {} });

jest.mock('../HomePage/hooks', () => ({
  useFiles: () => ({
    files: [
      {
        documentTitle: 'File 1',
        imgSrc: 'file1-thumbnail.jpg',
        iconAlt: 'pdf',
        iconSrc: 'assets/icons/pdf.svg',
        imgAlt: 'File 1'
      },
      {
        documentTitle: 'File 2',
        imgSrc: 'file2-thumbnail.jpg',
        iconAlt: 'pdf',
        iconSrc: 'assets/icons/pdf.svg',
        imgAlt: 'File 2'
      }
    ]
  })
}));
const mockResponseNotificationData = [
  {
    id: 1,
    user_id: 1,
    actor_id: 2,
    actor_name: 'Jane',
    action: 'uploaded',
    file_id: 0,
    file_name: 'Document1.pdf',
    is_read: 0,
    created_at: '2023-08-03T03:33:00.000Z'
  },
  {
    id: 2,
    user_id: 1,
    actor_id: 1,
    actor_name: 'John',
    action: 'requested access',
    file_id: 2,
    file_name: 'Document2.pdf',
    is_read: 0,
    created_at: '2023-08-04T04:44:00.000Z'
  }
];
const mockResponse = {
  data: {
    name: 'John Doe'
  }
};
const mockUserResponse = [
  {
    id: 1,
    fullname: 'Sai Charan Chetpelly',
    email: 'saicharan.chetpelly@zemosolabs.com',
    password: 'Password@123'
  }
];

const mockProps = {
  userId: 1,
  handleExtraProp: jest.fn()
};
jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
jest
  .spyOn(services, 'fetchNotificationData')
  .mockResolvedValue(mockResponseNotificationData);
jest.spyOn(services, 'fetchUserName').mockResolvedValue(mockResponse);
jest.spyOn(services, 'getAllUsers').mockResolvedValue(mockUserResponse);
describe('FilesPage Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    global.gc && global.gc();
  });

  it('renders without errors', () => {
    const { container } = render(<FilesPage />);
    expect(container).toBeInTheDocument();
  });

  it('navigates to /home when Home button is clicked', () => {
    render(<FilesPage />);
    const homeLink = screen.getByTestId('nav-item-Home');
    fireEvent.click(homeLink);
    expect(navigate).toBeCalledWith('/home');

    const fileLink = screen.getByTestId('nav-item-Files');
    fireEvent.click(fileLink);
    expect(navigate).toBeCalledWith('/files');
  });
  it('should handle search input change', () => {
    render(<FilesPage />);

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'New Value' } });
  });
});

describe('BodyContent Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    global.gc && global.gc();
  });

  it('renders without errors', () => {
    const { container } = render(<BodyContent {...mockProps} />);
    expect(container).toBeInTheDocument();
  });

  it('opens upload modal when the button is clicked', () => {
    const { getByAltText, getByText } = render(<BodyContent {...mockProps} />);
    const uploadButton = getByAltText('add');
    fireEvent.click(uploadButton);
    expect(getByText('Upload files')).toBeInTheDocument();
    const chooseFiles = screen.getByText('Choose files');
    fireEvent.click(chooseFiles);
    const fileInput = screen.getByTestId('fileInput');
    const testFile = new File(['file content'], 'test.pdf', {
      type: 'application/pdf'
    });
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    fireEvent.click(screen.getByText('Upload File'));
  });

  it('should close upload modal when back button is clicked', async () => {
    const { getByAltText, queryByText } = render(
      <BodyContent {...mockProps} />
    );
    const uploadButton = getByAltText('add');
    fireEvent.click(uploadButton);
    const backButton = getByAltText('back');
    fireEvent.click(backButton);
    await waitFor(() => {
      expect(queryByText('Upload files')).not.toBeInTheDocument();
    });
  });

  it('should handle gdrive click', async () => {
    const { getByAltText, getByRole, getByText, getByTestId, getAllByRole } =
      render(<BodyContent {...mockProps} />);
    fireEvent.click(getByAltText('add'));
    fireEvent.click(getByRole('tab', { name: 'Cloud storage' }));
    fireEvent.click(getByAltText('Google Drive'));

    await waitFor(() => {
      expect(useGoogleApiMock.listFiles).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(getByText('Add files')).toBeInTheDocument();
    });
    fireEvent.click(getByTestId('drive-folder-Zemoso decks'));
    fireEvent.click(getAllByRole('checkbox')[0]);
    fireEvent.click(getByText('Sync'));
    fireEvent.click(getByAltText('close'));
  });
  it('should handle duplication upload modal when the button is clicked', () => {
    const { getByAltText, getByText } = render(<BodyContent {...mockProps} />);
    const uploadButton = getByAltText('add');
    fireEvent.click(uploadButton);
    expect(getByText('Upload files')).toBeInTheDocument();
    const chooseFiles = screen.getByText('Choose files');
    fireEvent.click(chooseFiles);
    const fileInput = screen.getByTestId('fileInput');
    const testFile = new File(['file content'], 'test.pdf', {
      type: 'application/pdf'
    });
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    fireEvent.click(screen.getByText('Upload File'));
  });
});

const axiosPostSpy = jest.spyOn(axios, 'post');

describe('mapFilesData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    global.gc && global.gc();
  });

  it('maps an array of FileResponse objects to FilesDataType objects', () => {
    const fileResponseData = [
      {
        id: 'file1',
        mimeType: 'application/pdf',
        modifiedTime: '2023-09-08T10:00:00Z',
        name: 'file1.pdf'
      },
      {
        id: 'file2',
        mimeType: 'image/jpeg',
        modifiedTime: '2023-09-08T12:00:00Z',
        name: 'file2.jpg'
      }
    ];

    const result = mapFilesData(fileResponseData);

    const expectedFilesData = [
      {
        fileName: 'file1.pdf',
        isChecked: false,
        id: 'file1'
      },
      {
        fileName: 'file2.jpg',
        isChecked: false,
        id: 'file2'
      }
    ];

    expect(result).toEqual(expectedFilesData);
  });

  it('handles an empty array gracefully', () => {
    const fileResponseData: FileResponse[] = [];

    const result = mapFilesData(fileResponseData);

    expect(result).toEqual([]);
  });
});
