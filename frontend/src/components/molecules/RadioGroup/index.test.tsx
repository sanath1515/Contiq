import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RadioButtonsGroup from './index';
import { CHOOSE_OPTIONS } from '../../../utils/constants';

describe('RadioButtonsGroup', () => {
  test('renders the form label correctly', () => {
    render(<RadioButtonsGroup formLabel="Form Label" options={[]} />);
    expect(screen.getByText('Form Label')).toBeInTheDocument();
  });

  test('renders radio buttons for each option', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    render(<RadioButtonsGroup formLabel="Form Label" options={options} />);
    options.forEach((option) => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
  });

  test('selects the default option', () => {
    render(
      <RadioButtonsGroup formLabel="Form Label" options={CHOOSE_OPTIONS} />
    );
    const defaultOption = screen.getByLabelText(CHOOSE_OPTIONS[1]);
    expect(defaultOption).toBeChecked();
  });

  test('changes the selected option on radio button click', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    render(<RadioButtonsGroup formLabel="Form Label" options={options} />);
    const radioOption = screen.getByLabelText('Option 1');

    fireEvent.click(radioOption);

    expect(radioOption).toBeChecked();
  });
});
