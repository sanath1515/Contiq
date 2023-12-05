import React from 'react';

interface IconProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  testId?: string;
  onClick?: () => void;
}

const Icon = ({ src, alt, testId, onClick, ...props }: IconProps) => {
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      data-testid={testId}
      onClick={onClick}
    />
  );
};

export default Icon;
