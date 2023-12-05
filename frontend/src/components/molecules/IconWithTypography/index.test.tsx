import { render, fireEvent, screen } from '@testing-library/react';
import IconWithTypography from '.';
import '@testing-library/jest-dom';

describe('IconWithTypography component', () => {
  const defaultProps = {
    iconSrc: 'icon-source',
    label: 'Label',
    iconAlt: 'Icon'
  };

  it('should render without crashing', () => {
    render(<IconWithTypography {...defaultProps} />);
  });

  it('should display the label', () => {
    const { getByText } = render(
      <IconWithTypography {...defaultProps} />
    );
    const labelElement = getByText('Label');
    expect(labelElement).toBeInTheDocument();
  });
});
