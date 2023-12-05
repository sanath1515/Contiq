import React from 'react';

export interface GifProps {
  src: string;
  width?: string;
  height?: string;
  alt?: string;
}

const Gif = (props: GifProps) => {
  const { src, width, height, alt } = props;

  return <img src={src} width={width} height={height} alt={alt}></img>;
};

export default Gif;
