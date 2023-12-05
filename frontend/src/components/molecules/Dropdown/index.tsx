import { Box, Grid, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import theme from '../../../theme/theme';
import Icon from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';
import { getIconSrc } from '@src/utils/utils';
import FilterMenu, { FilterMenuProps } from '../FilterMenu/index';

export interface DropdownProps extends FilterMenuProps {
  label: string;
  startIconSrc: string;
  isOpen: boolean;
  handleClick: React.MouseEventHandler<HTMLDivElement>;
  filterOpen: boolean;
  boxWidth?: string;
  justifyContent: string;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const [iconSrc, setIconSrc] = useState('chevron-down.svg');

  const boxRef = useRef();

  useEffect(() => {
    const newIconSrc = getIconSrc(props.isOpen, props.label);
    setIconSrc(newIconSrc);
  }, [props.isOpen, props.label]);

  return (
    <Grid
      sx={{
        cursor: 'pointer',
        backgroundColor:
          iconSrc != 'chevron-down.svg' && iconSrc != 'chevron-up.svg'
            ? theme.palette.primary[100]
            : ''
      }}
    >
      <FilterMenu
        anchorEl={boxRef.current}
        isOpen={props.filterOpen}
        filterLabel={props.filterLabel}
        options={props.options}
      ></FilterMenu>
      <Box
        data-testid="dropdown-container"
        width={props.boxWidth}
        height={'2.7vw'}
        onClick={props.handleClick}
        border={`1px solid ${theme.palette.grey[100]}`}
        borderRadius={'4px'}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: '0.58vw',
          paddingRight: '0.58vw',
        }}
        ref={boxRef}
      >
        <Stack
          direction={'row'}
          gap={theme.spacing(1)}
          justifyContent={props.justifyContent}
        >
          {props.startIconSrc && (
            <Icon src={props.startIconSrc} alt={'startIcon'}></Icon>
          )}
          <Typography variant="body1" color={theme.palette.textColor.black}>
            {props.label}
          </Typography>
          <Icon
            testId="dropdown-icon"
            src={`assets/icons/${iconSrc}`}
            alt={'dropdown-icon'}
          />
        </Stack>
      </Box>
    </Grid>
  );
};

export default Dropdown;
