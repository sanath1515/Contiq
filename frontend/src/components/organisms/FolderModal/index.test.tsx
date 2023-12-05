import { screen, render, fireEvent } from '@testing-library/react';
import { FolderModal } from '.';
import { FILES_DATA, ZEMOSO_DECKS } from '@src/utils/constants';

describe('Folder modal testcases', () => {
  const mockHandleClose = jest.fn();
  it('Folder modal renders as expected', () => {
    render(
      <FolderModal
        openModal={true}
        handleCloseModal={mockHandleClose}
        files={FILES_DATA}
        handleSyncClick={jest.fn()}
        handleZemosoDecksBackClick={jest.fn()}
      />
    );
    const title = screen.getByText(ZEMOSO_DECKS);
    expect(title).toBeInTheDocument();
  });
  it('Data updates on clicking checkbox', () => {
    render(
      <FolderModal
        openModal={true}
        handleCloseModal={mockHandleClose}
        files={FILES_DATA}
        handleSyncClick={jest.fn()}
        handleZemosoDecksBackClick={jest.fn()}
      />
    );
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(4);
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);
  });
  it('modal closes successfully on clicking back button', () => {
    render(
      <FolderModal
        openModal={true}
        handleCloseModal={mockHandleClose}
        files={FILES_DATA}
        handleSyncClick={jest.fn()}
        handleZemosoDecksBackClick={jest.fn()}
      />
    );
    const backButton = screen.getByRole('button', { name: 'Back' });
    fireEvent.click(backButton);
    expect(mockHandleClose).toHaveBeenCalled();
    fireEvent.click(screen.getByText('Sync'));
  });
});
