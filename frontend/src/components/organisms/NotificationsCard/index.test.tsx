import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NotificationsCard from '.';

const mockProps = {
  isOpen: true,
  handleClose: jest.fn(),
  notificationsData: [
    {
      id: 1,
      userName: 'John Doe',
      notificationText: 'New message received',
      dateTime: { day: 25, month: 'August', time: '10:00 AM' },
      avatarSrc: 'avatar.jpg'
    }
  ],
  handleNotificationClick: jest.fn(),
  anchorEl: document.createElement('div')
};

describe('NotificationsCard', () => {
  test('should render notifications and handle clicks', () => {
    const { getByText, getByAltText } = render(
      <NotificationsCard {...mockProps} />
    );

    expect(getByText('Notifications')).toBeInTheDocument();

    mockProps.notificationsData.forEach((notification) => {
      expect(getByText(notification.notificationText)).toBeInTheDocument();
      expect(getByAltText(notification.userName)).toBeInTheDocument();
    });

    fireEvent.click(getByText(mockProps.notificationsData[0].notificationText));
    expect(mockProps.handleNotificationClick).toHaveBeenCalledWith(
      mockProps.notificationsData[0].id
    );
  });

  test('should render loading state when notificationsData is null', () => {
    const propsWithNullData = { ...mockProps, notificationsData: null };
    const { getByAltText } = render(
      <NotificationsCard {...propsWithNullData} />
    );

    expect(getByAltText('loading')).toBeInTheDocument();
  });

  test('should call handleClose when close button is clicked', () => {
    const { getByAltText } = render(<NotificationsCard {...mockProps} />);
    const closeButton = getByAltText('close');
    fireEvent.click(closeButton);
    expect(mockProps.handleClose).toBeCalled();
  });
});
