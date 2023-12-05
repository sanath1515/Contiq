import { Typography } from '@components/atoms/Typography';
import { Grid, styled } from '@mui/material';
import React from 'react';
import { Add, Remove } from '@mui/icons-material';
import theme from '@src/theme/theme';
import { appendPercentage, formatPageInfo } from '@src/utils/function';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  zoomLevel: number;
  decreaseZoom: () => void;
  increaseZoom: () => void;
}
const StyledBar = styled(Grid)({
  borderRadius: theme.spacing(2),
  background: theme.palette.grey[400],
  alignItems: 'center',
  padding: `${theme.spacing(2)} ${theme.spacing(7.5)}`,
  display: 'flex',
  justifyContent: 'space-between',
  color: theme.palette.textColor.highEmphasis,
  minWidth: `${theme.spacing(79)}`,
  minHeight: 'max-content'
});
const StyledZoomLevel = styled(Grid)({
  borderRadius: theme.spacing(2.2),
  background: theme.palette.grey[300],
  color: theme.palette.textColor.white,
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
});
const Pagination = ({
  currentPage,
  totalPages,
  zoomLevel,
  decreaseZoom,
  increaseZoom
}: PaginationProps) => {
  return (
    <StyledBar container justifyContent={'space-between'}>
      <Grid item>
        <Typography variant="body1">
          {formatPageInfo(currentPage, totalPages)}
        </Typography>
      </Grid>
      <Grid item>
        <StyledZoomLevel container gap={3}>
          <Grid item>
            <Remove onClick={decreaseZoom} />
          </Grid>
          <Grid item>
            <Typography variant="body1">
              {appendPercentage(zoomLevel)}
            </Typography>
          </Grid>
          <Grid item>
            <Add onClick={increaseZoom} />
          </Grid>
        </StyledZoomLevel>
      </Grid>
    </StyledBar>
  );
};

export default Pagination;
