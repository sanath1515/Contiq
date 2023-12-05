import { screen, render, fireEvent } from '@testing-library/react';
import { Navbar } from '.';
import * as router from 'react-router';

describe('Navbar testcases', () => {
  const navigate = jest.fn();
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  it('Navbar component renders as expected', () => {
    render(<Navbar activeTab="Home" />);
    const element = screen.getByTestId('navigation');
    expect(element).toBeInTheDocument();
  });
  it('Activates nav-option accordingly', () => {
    render(<Navbar activeTab="Home" />);
    const filesNavItem = screen.getByTestId('nav-item-Files');
    fireEvent.click(filesNavItem);
    expect(navigate).toBeCalledWith('/files');
    const homeNavItem = screen.getByTestId('nav-item-Home');
    fireEvent.click(homeNavItem);
    expect(navigate).toBeCalledWith('/home');
  });
});
