import React from 'react';
import { Avatar as MuiAvatar, styled } from '@mui/material';

export interface AvatarProps {
  src: string;
  alt: string;
  innerRef?: React.RefObject<HTMLDivElement>;
}

const StyledAvatar = styled(MuiAvatar)`
  height: 36px;
  width: 36px;
`;

const Avatar = (props: AvatarProps) => {
  const { src, alt, innerRef } = props;
  return <StyledAvatar src={src} alt={alt} ref={innerRef}></StyledAvatar>;
};

export default Avatar;
