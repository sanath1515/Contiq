import React from 'react';
import {
  render,
  renderHook,
  waitFor,
  screen,
  fireEvent,
  act
} from '@testing-library/react';
import axios from '../../services/API';
import { useFiles, mapResponseToFiles } from './hooks';
import { when } from 'jest-when';
import HomePage from '.';
import * as router from 'react-router';
import * as services from '../../services';
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
const serResponse = {
  data: {
    id: 1,
    fullname: 'Sai Charan Chetpelly',
    email: 'saicharan.chetpelly@zemosolabs.com',
    password: 'Password@123'
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {}
};
const mockLoginResponse = {
  data: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWljaGFyYW5AZ21haWwuY29tIiwiaWF0IjoxNjk1MTEzMjk4LCJleHAiOjE2OTUxMTUwOTh9.aDw40IY1w-46yoL9cH8yZ6NG_vIuD0XCnuVXZDopuq4',
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {}
};
const mockNotFoundLoginResponse = {
  data: 'Unable to generate token',
  status: 404,
  statusText: 'Not Found',
  headers: {},
  config: {}
};
const mockUserResponse = {
  data: [
    {
      id: 1,
      fullname: 'Sai Charan Chetpelly',
      email: 'saicharan.chetpelly@zemosolabs.com',
      password: 'Password@123'
    }
  ],
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {}
};

jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    user: {
      given_name: 'Sai Charan',
      family_name: 'Chetpelly',
      nickname: 'saicharan.chetpelly',
      name: 'Sai Charan Chetpelly',
      picture:
        'https://lh3.googleusercontent.com/a/AAcHTte9StptTJ32XuxH7PCoIyvTsUFX0VdiY9MuyU0254bg=s96-c',
      locale: 'en',
      updated_at: '2023-08-06T17:01:47.173Z',
      email: 'saicharan.chetpelly@zemosolabs.com',
      email_verified: true,
      sub: 'google-oauth2|109240394770328938738'
    }
  })
}));
jest.spyOn(services, 'login').mockResolvedValue(mockLoginResponse as any);
jest
  .spyOn(services, 'fetchNotificationData')
  .mockResolvedValue(mockResponseNotificationData);
jest.spyOn(services, 'fetchUserName').mockResolvedValue(mockResponse);
jest
  .spyOn(services, 'getUserByEmail')
  .mockResolvedValue(mockUserResponse as any);
jest.spyOn(services, 'registerUser').mockResolvedValue(mockUserResponse as any);
const axiosSpy = jest.spyOn(axios, 'get');

const navigate = jest.fn();
const mockResponseData = [
  {
    id: 1,
    name: 'File 1',
    type: 'pdf',
    uploaded_by: 'user1',
    created_at: '2023-09-05',
    updated_at: '2023-09-05',
    thumbnail_url: 'file1-thumbnail.jpg'
  },
  {
    id: 2,
    name: 'File 2',
    type: 'pdf',
    uploaded_by: 'user2',
    created_at: '2023-09-05',
    updated_at: '2023-09-05',
    thumbnail_url: 'file2-thumbnail.jpg'
  }
];
const expectedOutput = [
  {
    id: 1,
    documentTitle: 'File 1',
    imgSrc: 'file1-thumbnail.jpg',
    iconAlt: 'pdf',
    iconSrc: 'assets/icons/pdf.svg',
    imgAlt: 'File 1',
    createdAt: new Date('2023-09-05')
  },
  {
    id: 2,
    documentTitle: 'File 2',
    imgSrc: 'file2-thumbnail.jpg',
    iconAlt: 'pdf',
    iconSrc: 'assets/icons/pdf.svg',
    imgAlt: 'File 2',
    createdAt: new Date('2023-09-05')
  }
];
describe('useFiles hook test', () => {
  it('should fetch and set files correctly', async () => {
    when(axiosSpy)
      .calledWith('/files', { params: { uploaded_by: 1 } })
      .mockResolvedValueOnce({ data: mockResponseData });

    const { result } = renderHook(() => useFiles(1));

    await waitFor(() => result.current.files == expectedOutput);
  });
});

describe('mapResponseToFiles test', () => {
  it('should map response data to files correctly', () => {
    const mappedFiles = mapResponseToFiles(mockResponseData);

    expect(mappedFiles).toEqual(expectedOutput);
  });
});
describe('HomePage', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  it('should not display files data when api calls returns an empty array', async () => {
    when(axiosSpy)
      .calledWith('/files', { params: { uploaded_by: 1 } })
      .mockResolvedValueOnce({ data: [] });
    when(axiosSpy)
      .calledWith('/files', { params: { uploaded_by: 0 } })
      .mockResolvedValueOnce({ data: [] });
    await act(async () => {
      render(<HomePage />);
    });

    expect(screen.queryByText('Recent')).not.toBeInTheDocument();
  });

  it('should handle search input change', async () => {
    when(axiosSpy)
      .calledWith('/files', { params: { uploaded_by: 1 } })
      .mockResolvedValueOnce({ data: mockResponseData });
    when(axiosSpy)
      .calledWith('/files', { params: { uploaded_by: 0 } })
      .mockResolvedValueOnce({ data: mockResponseData });

    await act(async () => {
      render(<HomePage />);
    });

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'New Value' } });
    //expect(searchInput).toHaveValue('New Value');
  });

  it('should navigate to relevant route when nav items are clicked ', async () => {
    when(axiosSpy)
      .calledWith('/files', { params: { uploaded_by: 1 } })
      .mockResolvedValueOnce({ data: mockResponseData });
    when(axiosSpy)
      .calledWith('/files', { params: { uploaded_by: 0 } })
      .mockResolvedValueOnce({ data: mockResponseData });

    await act(async () => {
      render(<HomePage />);
    });

    const homeLink = screen.getByTestId('nav-item-Home');
    fireEvent.click(homeLink);
    expect(navigate).toBeCalledWith('/home');

    const fileLink = screen.getByTestId('nav-item-Files');
    fireEvent.click(fileLink);
    expect(navigate).toBeCalledWith('/files');
  });
});
