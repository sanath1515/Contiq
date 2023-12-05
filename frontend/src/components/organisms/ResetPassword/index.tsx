import React, { useState } from 'react';
import MuiButton from '../../atoms/Button/index';
import InputField from '../../atoms/InputField';
import { Typography } from '../../atoms/Typography';
import { PASSWORD_CONSTANTS } from '../../../utils/constants';
import theme from '../../../theme/theme';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router';

export interface ResetPasswordProps {
  emailId: string;
}
const buttonStyles = {
  width: '26.06vw',
  height: '3.51vw',
  backgroundColor: theme.palette.primary[500],
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: theme.palette.primary[500]
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: theme.palette.primary[500]
  }
};

const ResetPassword: React.FC<ResetPasswordProps> = (props) => {
  const navigate = useNavigate();
  const [value,setValue] = useState<string>("");
  const handleButtonClick = () => {
    navigate("/createPassword");
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }
  return (
    <Grid
      container
      spacing={0}
      className="custom-grid"
      data-testid="reset-component"
    >
      <Grid
        item
        xs={12}
        width={'17.5vw'}
        sx={{ marginBottom: theme.spacing(0) }}
      >
        <Typography variant="h2">
          {PASSWORD_CONSTANTS.RESET_YOUR_PASSWORD}
        </Typography>
      </Grid>
      <Grid item width={'15vw'} sx={{ marginBottom: theme.spacing(6) }}>
        <Typography
          variant="overline"
          color={theme.palette.textColor.mediumEmphasis}
        >
          {PASSWORD_CONSTANTS.RESET_PASSWORD_CONTENT}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: theme.spacing(0) }}>
        <Typography variant="body1"> {PASSWORD_CONSTANTS.EMAIL}</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        width="26.06vw"
        sx={{ marginBottom: theme.spacing(6) }}
      >
        <InputField
          variant={'outlined'}
          type={'text'}
          value={value}
          onChange={handleChange}
          placeholder={''}
          InputProps={{ readOnly: true }}
          sx={{
            width: '26.06vw',
            border: `1px solid ${theme.palette.grey[100]}`
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <MuiButton
          text={
            <Typography variant="body1" color={theme.palette.textColor.white}>
              {PASSWORD_CONSTANTS.SENT}
            </Typography>
          }
          sx={buttonStyles}
          variant={'text'}
          onClick={handleButtonClick}
        />
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
