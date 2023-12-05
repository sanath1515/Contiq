import React from 'react';
import { TypographyProps, Typography as MuiTypoography } from '@mui/material';

export const Typography = (props: TypographyProps) => {
  return <MuiTypoography {...props}>{props.children}</MuiTypoography>;
};
