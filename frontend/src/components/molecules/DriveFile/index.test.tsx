import { screen, render, fireEvent } from '@testing-library/react';
import { Drivefile } from '.';
import FileIcon from '../../../../public/assets/icons/file drive.svg';
describe('Drivefile testcases', () => {
  test('DRivefile component renders as expected', () => {
    const mockOnChange = jest.fn();
    render(
      <Drivefile
        checked={false}
        onChange={mockOnChange}
        fileSrc={FileIcon}
        fileAlt={''}
        fileName="COmpany overview"
      />
    );
    const checkbxInput = screen.getByRole('checkbox');
    expect(checkbxInput).toBeInTheDocument();
    fireEvent.click(checkbxInput);
    expect(mockOnChange).toHaveBeenCalled();
  });
});
