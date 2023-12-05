import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserMenu from '.';
import { USER_MENU_OPTIONS } from '@src/utils/constants';
import { useAuth0 } from '@auth0/auth0-react';
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    logout: jest.fn()
  })
}));
describe('UserMenu component', () => {
  const handleLogoutMock = jest.fn();
  const mockUserName = 'John Doe';
  const mockUserId = 12345;
  const mockAnchorEl = document.createElement('div');

  it('should render user name and id correctly', () => {
    const { getByText } = render(
      <UserMenu
        userName={mockUserName}
        userId={mockUserId}
        handleLogout={handleLogoutMock}
        isOpen={true}
        handleClose={() => {}}
        anchorEl={mockAnchorEl}
      />
    );

    expect(getByText(mockUserName)).toBeInTheDocument();
    expect(getByText(mockUserId)).toBeInTheDocument();
  });

  it('shoul call handleLogout when "Logout" is clicked', () => {
    const { getByText } = render(
      <UserMenu
        userName={mockUserName}
        userId={mockUserId}
        handleLogout={handleLogoutMock}
        isOpen={true}
        handleClose={() => {}}
        anchorEl={mockAnchorEl}
      />
    );

    const logoutOption = getByText('Logout');
    fireEvent.click(logoutOption);

    expect(useAuth0().logout).toHaveBeenCalledTimes(0);

    const profileOption = getByText('Profile');
    fireEvent.click(profileOption);
  });

  it('should not call handleLogout when anything other than "Logout" is clicked', () => {
    const { getByText } = render(
      <UserMenu
        userName={mockUserName}
        userId={mockUserId}
        handleLogout={handleLogoutMock}
        isOpen={true}
        handleClose={() => {}}
        anchorEl={mockAnchorEl}
      />
    );

    const profileOption = getByText('Profile');
    fireEvent.click(profileOption);
    expect(handleLogoutMock).toBeCalledTimes(0);
  });

  it('should render user menu options', () => {
    const { getByText } = render(
      <UserMenu
        userName={mockUserName}
        userId={mockUserId}
        handleLogout={handleLogoutMock}
        isOpen={true}
        handleClose={() => {}}
        anchorEl={mockAnchorEl}
      />
    );

    USER_MENU_OPTIONS.forEach((option) => {
      const { label } = option;
      const menuItem = getByText(label);
      expect(menuItem).toBeInTheDocument();
    });
  });
});
