import React from 'react';
import { Grid, styled } from '@mui/material';
import BackgroundImage from '../../../../public/assets/images/image.png';
import Icon from '../../atoms/Icon';

interface LandingTemplateProps {
  rightBody: React.ReactNode;
}

const StyledLeftBody = styled(Icon)({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  backgroundSize: '100% 100%'
});

const LandingTemplate = ({ rightBody }: LandingTemplateProps) => {
  return (
    <Grid container>
      <Grid item xs={7}>
        <StyledLeftBody src={BackgroundImage} alt={'image'}></StyledLeftBody>
      </Grid>
      <Grid item xs={5}>
        {rightBody}
      </Grid>
    </Grid>
  );
};

export default LandingTemplate;
