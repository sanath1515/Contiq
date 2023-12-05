import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import theme from '../../../theme/theme';
import { styled } from '@mui/material';
interface ProgressBarProps {
  progress: number;
}
const StyledBox = styled(Box)({
  width: '25.3vw'
});
const StyledLinearProgress = styled(LinearProgress)({
  height: '8px',
  borderRadius: '5px',
  backgroundColor: '#D7DFE9',
  '& .MuiLinearProgress-bar': {
    backgroundColor: `${theme.palette.structural.background4}`
  }
});
const LinearLoader = ({ progress }: ProgressBarProps) => {
  return (
    <StyledBox>
      <StyledLinearProgress variant="determinate" value={progress} />
    </StyledBox>
  );
};

export default LinearLoader;
