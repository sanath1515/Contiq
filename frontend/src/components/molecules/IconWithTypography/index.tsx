import { Stack } from '@mui/material';
import React from 'react';
import Icon from '../../atoms/Icon';
import { Typography } from '@components/atoms/Typography';

export interface IconWithTypographyProps {
  iconSrc: string;
  label: string;
  iconAlt: string;
}

const IconWithTypography = (props: IconWithTypographyProps) => {
  const { iconSrc, label, iconAlt } = props;

  return (
      <Stack
        direction={'column'}
        alignItems="center"
        gap="0.14vw"
      >
        <Icon src={iconSrc} alt={iconAlt}/>
        <Typography
          variant="caption1"
        >
          {label}
        </Typography>
      </Stack>
  );
};

export default IconWithTypography;
