import React from 'react';
import { render } from '@testing-library/react';
import Gif from '.';

describe('Gif Component', () => {
  it('should render with required props', () => {
    const src = 'test.gif';
    const { getByAltText } = render(<Gif src={src} alt="Test GIF" />);
    const gifElement = getByAltText('Test GIF');
    expect(gifElement).toBeInTheDocument();
    expect(gifElement).toHaveAttribute('src', src);
  });

  it('should render with optional props', () => {
    const src = 'test.gif';
    const width = '100';
    const height = '100';
    const alt = 'Test GIF';
    const { getByAltText } = render(
      <Gif src={src} width={width} height={height} alt={alt} />
    );
    const gifElement = getByAltText(alt);
    expect(gifElement).toBeInTheDocument();
    expect(gifElement).toHaveAttribute('src', src);
    expect(gifElement).toHaveAttribute('width', width);
    expect(gifElement).toHaveAttribute('height', height);
  });
});
