import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UploadFilesModal from '.';
import { UPLOAD_FILES_MODAL_CONSTANTS } from '@src/utils/constants';

describe('UploadFilesModal', () => {
  it('should render without crashing', () => {
    const handleClose = jest.fn();
    const { getByText } = render(
      <UploadFilesModal
        isOpen={true}
        handleClose={handleClose}
        handleFileOnUploadClick={jest.fn()}
        handleGdriveOptionClick={jest.fn()}
        handleExtraProp={jest.fn()}
      />
    );

    expect(
      getByText(UPLOAD_FILES_MODAL_CONSTANTS.uploadFilesText)
    ).toBeInTheDocument();
  });

  it('should show the correct tab content based on the active tab index', () => {
    const handleClose = jest.fn();
    const { getByText, queryByText } = render(
      <UploadFilesModal
        isOpen={true}
        handleClose={handleClose}
        handleFileOnUploadClick={jest.fn()}
        handleGdriveOptionClick={jest.fn()}
        handleExtraProp={jest.fn()}
      />
    );

    expect(
      getByText(UPLOAD_FILES_MODAL_CONSTANTS.dropFilesText)
    ).toBeInTheDocument();
    expect(
      queryByText(UPLOAD_FILES_MODAL_CONSTANTS.pdfIconSrc)
    ).not.toBeInTheDocument();

    fireEvent.click(getByText('Cloud storage'));

    expect(
      getByText(UPLOAD_FILES_MODAL_CONSTANTS.gdriveHelperText)
    ).toBeInTheDocument();
  });
  it('should call handleClose when clicking the close icon', () => {
    const handleClose = jest.fn();
    const { getByTestId } = render(
      <UploadFilesModal
        isOpen={true}
        handleClose={handleClose}
        handleFileOnUploadClick={jest.fn()}
        handleGdriveOptionClick={jest.fn()}
        handleExtraProp={jest.fn()}
      />
    );

    fireEvent.click(getByTestId('close-icon'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
  it('should call handleGdriveOptionClick when clicking the Google Drive option', () => {
    const handleGdriveOptionClick = jest.fn();
    render(
      <UploadFilesModal
        isOpen={true}
        handleClose={jest.fn()}
        handleFileOnUploadClick={jest.fn()}
        handleGdriveOptionClick={handleGdriveOptionClick}
        handleExtraProp={jest.fn()}
      />
    );
    fireEvent.click(screen.getByRole('tab', { name: 'Cloud storage' }));
    fireEvent.click(screen.getByAltText('Google Drive'));
    expect(handleGdriveOptionClick).toHaveBeenCalledTimes(1);
  });
  it('should not call handleGdriveOptionClick when clicking option other than the Google Drive option', () => {
    const handleGdriveOptionClick = jest.fn();
    render(
      <UploadFilesModal
        isOpen={true}
        handleClose={jest.fn()}
        handleFileOnUploadClick={jest.fn()}
        handleGdriveOptionClick={handleGdriveOptionClick}
        handleExtraProp={jest.fn()}
      />
    );
    fireEvent.click(screen.getByRole('tab', { name: 'Cloud storage' }));
    fireEvent.click(screen.getByAltText('Dropbox'));
    expect(handleGdriveOptionClick).toHaveBeenCalledTimes(0);
  });

  it('should  handle back click correctly in initial state', () => {
    const handleClose = jest.fn();
    const handleFileOnUploadClick = jest.fn();
    const handleGdriveOptionClick = jest.fn();

    render(
      <UploadFilesModal
        isOpen={true}
        handleClose={handleClose}
        handleFileOnUploadClick={handleFileOnUploadClick}
        handleGdriveOptionClick={handleGdriveOptionClick}
        handleExtraProp={jest.fn()}
      />
    );
    fireEvent.click(screen.getByAltText('back'));
    expect(handleClose).toBeCalled();
  });
  it('should  handle back click correctly when file has been uploaded', () => {
    const handleClose = jest.fn();
    const handleFileOnUploadClick = jest.fn();
    const handleGdriveOptionClick = jest.fn();

    render(
      <UploadFilesModal
        isOpen={true}
        handleClose={handleClose}
        handleFileOnUploadClick={handleFileOnUploadClick}
        handleGdriveOptionClick={handleGdriveOptionClick}
        handleExtraProp={jest.fn()}
      />
    );
    fireEvent.click(
      screen.getByText(UPLOAD_FILES_MODAL_CONSTANTS.chooseFilesText)
    );
    const fileInput = screen.getByTestId('fileInput');
    const testFile = new File(['file content'], 'test.pdf', {
      type: 'application/pdf'
    });
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    fireEvent.click(screen.getByAltText('back'));
    expect(handleClose).toBeCalledTimes(0);
  });

  it('should call handle close when escape key is pressed', () => {
    const handleClose = jest.fn();
    const handleFileOnUploadClick = jest.fn();
    const handleGdriveOptionClick = jest.fn();

    render(
      <UploadFilesModal
        isOpen={true}
        handleClose={handleClose}
        handleFileOnUploadClick={handleFileOnUploadClick}
        handleGdriveOptionClick={handleGdriveOptionClick}
        handleExtraProp={jest.fn()}
      />
    );
    fireEvent.keyDown(
      screen.getByText(UPLOAD_FILES_MODAL_CONSTANTS.uploadFilesText),
      {
        key: 'Escape',
        code: 'Escape'
      }
    );
    expect(handleClose).toBeCalled();
  });
});
