import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Avatar from '.';

describe('Avatar Component', () => {
  const testProps = {
    src: 'test-image-url',
    alt: 'Test Alt Text'
  };

  it('should renders without crashing', () => {
    render(<Avatar {...testProps} />);
  });

  it('should render the avatar image with the provided src and alt', () => {
    const { getByAltText } = render(<Avatar {...testProps} />);
    const avatarImage = getByAltText(testProps.alt);

    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', testProps.src);
  });
});
