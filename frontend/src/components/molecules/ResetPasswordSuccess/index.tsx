import React from 'react';
import { Typography } from '../../atoms/Typography';
import { Grid, styled } from '@mui/material';
import {
  PASSWORD_RESET,
  RESET_PASSWORD_CONTENT,
  CONTINUE_TEXT
} from '../../../utils/constants';
import verified_gif from '../../../../public/assets/animations/verified.gif';
import MuiButton from '../../atoms/Button';
import theme from '../../../theme/theme';
import Icon from '../../atoms/Icon';
import { useNavigate } from 'react-router';

interface ResetPasswordSuccessProps {
  handleChange?: React.MouseEventHandler<HTMLButtonElement>;
}
const StyledIcon = styled(Icon)({
  height: theme.spacing(7.5)
});
const StyledButton = styled(MuiButton)({
  width: theme.spacing(105),
  height: theme.spacing(15),
  borderRadius: theme.spacing(1),
  top: theme.spacing(15)
});
const StyledContent = styled(Grid)({
  width: theme.spacing(80),
  height: theme.spacing(8)
});
const ResetPasswordSuccess: React.FC<ResetPasswordSuccessProps> = ({
  handleChange
}) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/")
  }
  return (
    <Grid
      container
      direction={'column'}
      className="custom-grid"
      data-testid="reset-success-component"
    >
      <Grid item>
        <Grid container gap={5}>
          <Grid item>
            <Typography variant="h2" color={theme.palette.textColor.black}>
              {PASSWORD_RESET}
            </Typography>
          </Grid>
          <Grid item>
            <StyledIcon src={verified_gif} alt={'gif'} />
          </Grid>
        </Grid>
      </Grid>
      <StyledContent marginTop={2}>
        <Grid item>
          <Typography
            variant="body1"
            color={theme.palette.textColor.mediumEmphasis}
          >
            {RESET_PASSWORD_CONTENT}
          </Typography>
        </Grid>
      </StyledContent>
      <Grid item>
        <StyledButton
          text={CONTINUE_TEXT}
          variant={'contained'}
          onClick={handleSubmit}
        />
      </Grid>
    </Grid>
  );
};

export default ResetPasswordSuccess;
