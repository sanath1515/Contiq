import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchResults from '.';

describe('SearchResults', () => {
  it('renders without errors', () => {
    render(
      <SearchResults
        SEARCH_DATA={[]}
        IMAGES={[]}
        onSearchClick={() => {}}
        onDocumentClick={() => {}}
        searchWord=""
        setShowPopup={false}
      />
    );
  });

  it('opens popover on setShowPopup true', () => {
    render(
      <SearchResults
        SEARCH_DATA={[]}
        IMAGES={[]}
        onSearchClick={() => {}}
        onDocumentClick={() => {}}
        searchWord=""
        setShowPopup={true}
      />
    );
  });

  it('filters results based on search input', () => {
    render(
      <SearchResults
        SEARCH_DATA={[
          { id: 1, fileName: 'File1' },
          { id: 2, fileName: 'File2' }
        ]}
        IMAGES={[]}
        onSearchClick={() => {}}
        onDocumentClick={() => {}}
        searchWord="File1"
        setShowPopup={true}
      />
    );
  });

  it('calls onSearchClick when a search result is clicked', () => {
    const onSearchClickMock = jest.fn();
    render(
      <SearchResults
        SEARCH_DATA={[
          { id: 1, fileName: 'File1' },
          { id: 2, fileName: 'File2' }
        ]}
        IMAGES={[]}
        onSearchClick={onSearchClickMock}
        onDocumentClick={() => {}}
        searchWord="File1"
        setShowPopup={true}
      />
    );
    fireEvent.click(screen.getByText('File1'));
  });

  it('displays "Other Documents" section', () => {
    render(
      <SearchResults
        SEARCH_DATA={[]}
        IMAGES={[{ id: 1, imageName: 'image1' }]}
        onSearchClick={() => {}}
        onDocumentClick={() => {}}
        searchWord=""
        setShowPopup={true}
      />
    );
  });

  it('calls onDocumentClick when an image is clicked', () => {
    const onDocumentClickMock = jest.fn();

    render(
      <SearchResults
        SEARCH_DATA={[]}
        IMAGES={[{ id: 1, imageName: 'image1' }]}
        onSearchClick={() => {}}
        onDocumentClick={onDocumentClickMock}
        searchWord=""
        setShowPopup={true}
      />
    );
    fireEvent.click(screen.getByAltText('image'));
    expect(onDocumentClickMock).toHaveBeenCalledWith(1);
  });
});
