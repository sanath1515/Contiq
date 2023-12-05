import { screen, render, fireEvent } from '@testing-library/react';
import { AddFilesModal } from '.';
import { ADD_FILES, FOLDERS_DATA } from '@src/utils/constants';

const mockProps = {
  handleZemosoDecksClick: jest.fn()
};

describe('Add files modal  test cases', () => {
  it('Add files modal renders as expected', () => {
    render(
      <AddFilesModal {...mockProps} folders={FOLDERS_DATA} openModal={true} />
    );
    const title = screen.getByText(ADD_FILES);
    expect(title).toBeInTheDocument();
  });
  it('Clicking zemosodecks folder', () => {
    render(
      <AddFilesModal {...mockProps} folders={FOLDERS_DATA} openModal={true} />
    );
    const zemosodecksFolder = screen.getByTestId('drive-folder-Zemoso decks');
    fireEvent.click(zemosodecksFolder);
    const backbutton = screen.getByRole('button', { name: 'Back' });
    fireEvent.click(backbutton);
  });
});
