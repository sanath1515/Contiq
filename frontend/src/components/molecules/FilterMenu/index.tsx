import {
  Box,
  Divider,
  Menu,
  MenuItem,
  PopoverVirtualElement,
  styled
} from '@mui/material';
import React from 'react';
import theme from '../../../theme/theme';
import { Typography } from '../../atoms/Typography';

export interface FilterMenuProps {
  isOpen: boolean;
  filterLabel: string;
  handleClose?: () => void;
  options: Array<{
    label: string;
    onClick?: React.MouseEventHandler<HTMLLIElement>;
  }>;
  anchorEl?:
    | Element
    | PopoverVirtualElement
    | (() => Element)
    | (() => PopoverVirtualElement)
    | null;
}

const StyledMenuBox = styled(Box)`
  width: 18.3vw;
  background-color: ${theme.palette.grey[400]};
`;

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiList-root': {
    paddingTop: 0,
    paddingBottom: 0
  },

  '& .MuiMenuItem-root': {
    paddingLeft: theme.spacing(5),
    paddingBottom: theme.spacing(3)
  },

  border: `1px solid ${theme.palette.grey[100]}`
}));

const StyledDivider = styled(Divider)`
  margin-top: ${theme.spacing(3)};
  margin-bottom: ${theme.spacing(3)};
  background-color: ${theme.palette.textColor.lowEmphasis};
`;

const FilterMenu = (props: FilterMenuProps) => {
  const { isOpen, filterLabel, options, anchorEl, handleClose } = props;
  return (
    <StyledMenu open={isOpen} anchorEl={anchorEl} onClose={handleClose}>
      <StyledMenuBox>
        <Box marginLeft={theme.spacing(5)} paddingTop={theme.spacing(3)}>
          <Typography variant="body1" color={theme.palette.textColor.white}>
            {filterLabel}
          </Typography>
        </Box>
        <StyledDivider />
        {options.map((option) => (
          <MenuItem onClick={option.onClick} key={option.label}>
            <Typography
              variant="caption1"
              color={theme.palette.textColor.white}
            >
              {option.label}
            </Typography>
          </MenuItem>
        ))}
      </StyledMenuBox>
    </StyledMenu>
  );
};

export default FilterMenu;
