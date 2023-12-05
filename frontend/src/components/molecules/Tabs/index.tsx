import React from 'react';
import { Tabs as MuiTabs, Tab, Box, SxProps, styled } from '@mui/material';
import { Typography } from '../../atoms/Typography';
import theme from '@src/theme/theme';

interface ItemProps {
  id: number;
  name: string;
  disabled: boolean;
}
interface TabsProps {
  tabItems: ItemProps[];
  sx?: SxProps;
  activeIndex?: number;
  handleChange?: (e: React.SyntheticEvent, newValue: number) => void;
  value?: number;
}
const CustomTab = styled(Tab)({
  '&.Mui-selected': { color: theme.palette.textColor.white },
  color: theme.palette.textColor.mediumEmphasis
});
const Tabs = ({ tabItems, sx, activeIndex, handleChange }: TabsProps) => {
  return (
    <Box>
      <MuiTabs value={activeIndex} onChange={handleChange} variant="fullWidth">
        {tabItems.map((item, index) => {
          return (
            <CustomTab
              key={item.id}
              label={<Typography variant="body1">{item.name}</Typography>}
              sx={sx}
              disabled={item.disabled}
              value={index}
            />
          );
        })}
      </MuiTabs>
    </Box>
  );
};

export default Tabs;
