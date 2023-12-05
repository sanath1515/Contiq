import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchCard from '.';
import { MouseEvent } from 'react';

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn()
  }
});

const overflowingText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

describe('SearchCard Component', () => {
  const mockTogglePopover = jest.fn();
  const mockHandleDownClick = jest.fn();
  const mockHandleUpClick = jest.fn();
  it('should render SearchCard component', () => {
    render(
      <SearchCard
        searchQuery="Test Query"
        totalResults={10}
        currentResult={5}
        fileTitle="Test File"
        totalSlides={20}
        currentSlide={15}
        paragraph={overflowingText}
        filepath="/assets.pdf"
        togglePopOver={mockTogglePopover} handleUpClick={mockHandleUpClick} handleDownClick={mockHandleDownClick}      />
    );
  });

  it('should toggle minimized state when maximize/minimize icon is clicked', () => {
    const { getByAltText } = render(
      <SearchCard
        searchQuery="Test Query"
        totalResults={10}
        currentResult={5}
        fileTitle="Test File"
        totalSlides={20}
        currentSlide={15}
        paragraph="Lorem ipsum dolor sit amet."
        filepath="/assets.pdf"
        togglePopOver={mockTogglePopover}
        handleUpClick={mockHandleUpClick} handleDownClick={mockHandleDownClick}
      />
    );
    const minimizeIcon = getByAltText('minimize');
    fireEvent.click(minimizeIcon);
    expect(getByAltText('maximize')).toBeInTheDocument();
  });
});
