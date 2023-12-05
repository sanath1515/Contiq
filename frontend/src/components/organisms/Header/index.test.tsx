import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  waitFor,
  act
} from '@testing-library/react';
import Header, { HeaderProps } from './index';
import { useAuth0 } from '@auth0/auth0-react';
import * as router from 'react-router';

import * as services from '../../../services';
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    logout: jest.fn()
  })
}));
const navigate = jest.fn();
jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
const mockResponseNotificationData = [
  {
    id: 1,
    user_id: 1,
    actor_id: 1,
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

describe('Header', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
  const mockProps: HeaderProps = {
    user: {
      userName: 'John Doe',
      userId: 3,
      avatarUrl: 'avatar.svg'
    },
    handleExtraProp:true
  };
  it('renders without errors', async () => {
    jest
      .spyOn(services, 'fetchNotificationData')
      .mockResolvedValue(mockResponseNotificationData);
    jest.spyOn(services, 'fetchUserName').mockResolvedValue(mockResponse);
    jest.spyOn(services, 'updateNotificationReadStatus').mockResolvedValue();
    render(<Header {...mockProps} />);
    await waitFor(() => {
      expect(screen.getByText('CONTIQ')).toBeInTheDocument();
    });
  });
  it('should handle Notification Click', () => {
    jest
      .spyOn(services, 'fetchNotificationData')
      .mockResolvedValue(mockResponseNotificationData);
    jest.spyOn(services, 'fetchUserName').mockResolvedValue(mockResponse);
    jest.spyOn(services, 'updateNotificationReadStatus').mockResolvedValue();
    render(<Header {...mockProps} />);
    fireEvent.click(screen.getByTestId('notification-button'));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    const closeButton = screen.getByAltText('close');
    fireEvent.click(closeButton);
  });
  it('should call handleLogout when logout is clicked', () => {
    jest
      .spyOn(services, 'fetchNotificationData')
      .mockResolvedValue(mockResponseNotificationData);
    jest.spyOn(services, 'fetchUserName').mockResolvedValue(mockResponse);
    jest.spyOn(services, 'updateNotificationReadStatus').mockResolvedValue();
    render(<Header {...mockProps} />);
    fireEvent.click(screen.getByAltText(mockProps.user.userName));
    fireEvent.click(screen.getByText('Logout'));
    expect(useAuth0().logout).toHaveBeenCalledTimes(0);
  });
  
  it('should  handleSearchChange when a search value is entered', () => {
    jest
      .spyOn(services, 'fetchNotificationData')
      .mockResolvedValue(mockResponseNotificationData);
    jest.spyOn(services, 'fetchUserName').mockResolvedValue(mockResponse);
    jest.spyOn(services, 'updateNotificationReadStatus').mockResolvedValue();
    render(<Header {...mockProps} />);
    fireEvent.change(screen.getByPlaceholderText('Search'), {
      target: { value: 'Test Search' }
    });
    const document = screen.getByText("environmental issues.pdf");
    fireEvent.click(document);
  });
  it('should close userMenu when escape button is clicked', async () => {
    jest
      .spyOn(services, 'fetchNotificationData')
      .mockResolvedValue(mockResponseNotificationData);
    jest.spyOn(services, 'fetchUserName').mockResolvedValue(mockResponse);
    jest.spyOn(services, 'updateNotificationReadStatus').mockResolvedValue();
    render(<Header {...mockProps} />);
    fireEvent.click(screen.getByAltText(mockProps.user.userName));
    expect(screen.getByText('Logout')).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('presentation').firstChild ||
        document.createElement('button')
    );
    await waitForElementToBeRemoved(() => screen.queryByText('Logout'));
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });
  it('should handle errors API error', () => {
    jest
      .spyOn(services, 'fetchNotificationData')
      .mockRejectedValue('Error fetching notifications');
    jest.spyOn(services, 'fetchUserName').mockResolvedValue(mockResponse);
    jest.spyOn(services, 'updateNotificationReadStatus').mockResolvedValue();
    render(<Header {...mockProps} />);
    fireEvent.click(screen.getByTestId('notification-button'));
    const closeButton = screen.getByAltText('close');
    fireEvent.click(closeButton);
  });
});
