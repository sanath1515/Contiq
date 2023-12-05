import React, { ChangeEvent, useState } from 'react';
import MuiButton from '../../atoms/Button/index';
import InputField from '../../atoms/InputField';
import { Typography } from '../../atoms/Typography';
import { PASSWORD_CONSTANTS } from '../../../utils/constants';
import theme from '../../../theme/theme';
import { Grid } from '@mui/material';
import { VALIDATE_PASSWORD } from '../../../utils/function';
import { useNavigate } from 'react-router';

const validateConfirmPassword = (value: string, newPassword: string) => {
  if (newPassword !== value) {
    return 'Passwords do not match';
  }
  return '';
};

const CreatePassword: React.FC = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordError, setNewPasswordError] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false); // New state variable
  const handleButtonClick = () => {
    navigate("/passwordSuccess");
  };

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPasswordValue = event.target.value;
    setNewPassword(newPasswordValue);
    const errorMessages = VALIDATE_PASSWORD(newPasswordValue);
    setNewPasswordError(errorMessages.join('\n'));
    if (event.target.value === '') {
      setNewPasswordError('');
    }
  };
  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setConfirmNewPassword(value);
    const confirmErrorMessages = validateConfirmPassword(value, newPassword);
    setConfirmPasswordError(confirmErrorMessages);
    if (value === '') {
      setConfirmPasswordError('');
    }
    updateButtonState(newPassword, value);
  };
  const updateButtonState = (
    newPasswordValue: string,
    confirmNewPasswordValue: string
  ) => {
    if (
      newPasswordValue === confirmNewPasswordValue &&
      newPasswordValue !== '' &&
      confirmNewPasswordValue !== '' &&
      !newPasswordError
    ) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };
  const buttonStyles = {
    width: '26.06vw',
    height: '3.51vw',
    backgroundColor: isButtonEnabled
      ? theme.palette.primary[500]
      : theme.palette.primary[100],
    '&:hover': {
      backgroundColor: isButtonEnabled
        ? theme.palette.primary[500]
        : theme.palette.primary[100]
    },
    '&:active': {
      backgroundColor: isButtonEnabled
        ? theme.palette.primary[500]
        : theme.palette.primary[100]
    }
  };

  return (
    <Grid
      container
      spacing={0}
      className="custom-grid"
      data-testid="create-password-component"
    >
      <Grid
        item
        xs={12}
        width={'17.5vw'}
        sx={{ marginBottom: theme.spacing(0) }}
      >
        <Typography variant="h2">
          {PASSWORD_CONSTANTS.CREATE_PASSWORD}
        </Typography>
      </Grid>
      <Grid item width={'15vw'} sx={{ marginBottom: theme.spacing(6) }}>
        <Typography
          variant="overline"
          color={theme.palette.textColor.mediumEmphasis}
        >
          {PASSWORD_CONSTANTS.CREATE_PASSWORD_CONTENT}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: theme.spacing(0) }}>
        <Typography variant="body1">
          {PASSWORD_CONSTANTS.NEW_PASSWORD}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        width="26.06vw"
        sx={{ marginBottom: theme.spacing(6) }}
      >
        <InputField
          variant={'outlined'}
          type={'password'}
          data-testid="new-password-input"
          label="new-password-input"
          value={newPassword}
          placeholder={PASSWORD_CONSTANTS.NEW_PASSWORD}
          onChange={handleNewPasswordChange}
          sx={{
            width: '26.06vw',
            border: `1px solid ${theme.palette.grey[100]}`
          }}
        />
        {newPasswordError && (
          <Typography variant="body2" color={theme.palette.error.main}>
            {newPasswordError}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: theme.spacing(0) }}>
        <Typography variant="body1">
          {' '}
          {PASSWORD_CONSTANTS.CONFIRM_NEW_PASSWORD}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        width="26.06vw"
        sx={{ marginBottom: theme.spacing(6) }}
      >
        <InputField
          data-testid="confirm-password-input"
          variant={'outlined'}
          type={'password'}
          value={confirmNewPassword}
          placeholder={PASSWORD_CONSTANTS.CONFIRM_NEW_PASSWORD}
          sx={{
            width: '26.06vw',
            border: `1px solid ${theme.palette.grey[100]}`
          }}
          onChange={handleConfirmPasswordChange}
        />
        {confirmPasswordError && (
          <Typography variant="body2" color={theme.palette.error.main}>
            {confirmPasswordError}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <MuiButton
          text={
            <Typography variant="body1" color={theme.palette.textColor.white}>
              {PASSWORD_CONSTANTS.RESET_PASSWORD}
            </Typography>
          }
          sx={buttonStyles}
          variant={'text'}
          onClick={handleButtonClick}
          data-testid="reset-password-button"
          disabled={!isButtonEnabled}
        />
      </Grid>
    </Grid>
  );
};

export default CreatePassword;
