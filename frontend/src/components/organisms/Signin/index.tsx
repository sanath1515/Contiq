import React from 'react';
import { Box, FormControlLabel, Stack, styled } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import CheckBox from '@components/atoms/Checkbox';
import { Typography } from '@components/atoms/Typography';
import { InputLabel } from '@components/molecules/InputLabel';
import theme from '@src/theme/theme';
import {
  CREATE_A_PASSWORD_PLACEHOLDER,
  DONT_HAVE_ACCOUNT,
  EMAIL_LABEL,
  EMAIL_PLACEHOLDER,
  EMAIL_REGEX,
  FORGOT_PASSWORD,
  OR,
  PASSWORD_LABEL,
  PASSWORD_REGEX,
  REMEMBER_ME,
  SIGNIN_ERROR_MESSAGE,
  SIGN_IN,
  SIGN_UP,
  VALID_EMAIL_ERROR_MESSAGE,
  VALID_PASSWORD_ERROR_MESSAGE
} from '@src/utils/constants';
import { StyledButton, StyledDivider } from '../Signup';
import { GoogleLogin } from '@components/molecules/GoogleLogin';
import { getUserByEmail, login } from '@src/services';
import { useNavigate } from 'react-router';
import { useUserContext } from '@src/utils/ThemeContext';

const StyledOutline = styled(Stack)({
  maxWidth: '41.43vw',
  height: 'auto',
  padding: '5.85vw 9.51vw 9.95vw 5.85vw',
  backgroundColor: theme.palette.textColor.white
});

const StyledInputsStack = styled(Stack)({
  gap: '1.46vw'
});

const StyledCheckbox = styled(CheckBox)({
  '& .MuiSvgIcon-root': {
    fontSize: 21
  },
  '&.MuiCheckbox-root': {
    color: `${theme.palette.grey[100]}`
  },
  '&.Mui-checked': {
    color: theme.palette.primary[500]
  }
});

const StyledRowBox = styled(Stack)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const StyledFooter = styled(Stack)({
  gap: '2.04vw',
  marginTop: '1.46vw'
});

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center'
});

export const Signin = () => {
  const {handleUpdateCurrUser} = useUserContext();
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const [state, setState] = React.useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = React.useState<string>('');

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
    setMessage('');
  };

  const isEmailValid = (email: string): boolean => {
    return EMAIL_REGEX.test(email) && email.indexOf('@@') === -1;
  };

  const isPasswordValid = (password: string): boolean => {
    return PASSWORD_REGEX.test(password);
  };

  const isFormValid = () => {
    return isEmailValid(state.email) && isPasswordValid(state.password);
  };
  const userDataFetch = async () => {
    try {
      const response = await login(state.email, state.password);
      console.log(response);
      if (response.status == 200) {
        setMessage('');
        const userResponse = await getUserByEmail(state.email);
        handleUpdateCurrUser(userResponse.data.id, userResponse.data.name, userResponse.data.email);
        localStorage.setItem("token",response.data);
        navigate("/home")
      } else {
        setMessage(SIGNIN_ERROR_MESSAGE);
      }
    } catch (error) {
      setMessage('API error');
    }
  };
  const handleSignin = () => {
    userDataFetch();
  };

  const handleForgotPassword = () => {
    navigate("/resetPassword")
  }
  const handleSignup = () => {
    navigate("/signup")
  }
  return (
    <StyledOutline data-testid="signin-component">
      <Typography
        variant="h2"
        color={theme.palette.textColor.black}
        sx={{
          marginBottom: '2.34vw'
        }}
      >
        {SIGN_IN}
      </Typography>
      <StyledInputsStack>
        <Box>
          <InputLabel
            name="email"
            label={EMAIL_LABEL}
            labelColor={theme.palette.textColor.black}
            labelVariant="body1"
            placeholder={EMAIL_PLACEHOLDER}
            variant={'outlined'}
            type={'text'}
            onChange={handleInputChange}
          />
          {!isEmailValid(state.email) && state.email !== '' && (
            <Typography variant="caption1" color={'red'}>
              {VALID_EMAIL_ERROR_MESSAGE}
            </Typography>
          )}
        </Box>
        <Box>
          <InputLabel
            name="password"
            label={PASSWORD_LABEL}
            labelColor={theme.palette.textColor.black}
            labelVariant="body1"
            placeholder={CREATE_A_PASSWORD_PLACEHOLDER}
            variant={'outlined'}
            type={'password'}
            onChange={handleInputChange}
          />
          {!isPasswordValid(state.password) && state.password !== '' && (
            <Typography variant="caption1" color={'red'}>
              {VALID_PASSWORD_ERROR_MESSAGE}
            </Typography>
          )}
        </Box>
      </StyledInputsStack>
      {message && (
        <Typography variant="caption1" color={'red'}>
          {message}
        </Typography>
      )}
      <StyledRowBox>
        <FormControlLabel
          control={
            <StyledCheckbox
              disableFocusRipple
              disableRipple
              disableTouchRipple
              defaultChecked
            />
          }
          label={
            <Typography
              variant="caption1"
              color={theme.palette.textColor.mediumEmphasis}
            >
              {REMEMBER_ME}
            </Typography>
          }
        />
        <Typography
          variant="caption1"
          color={theme.palette.primary[500]}
          sx={{
            cursor: 'pointer'
          }}
          onClick={() => handleForgotPassword()}
        >
          {FORGOT_PASSWORD}
        </Typography>
      </StyledRowBox>
      <StyledFooter>
        <StyledButton
          disableElevation
          disableFocusRipple
          disableRipple
          disableTouchRipple
          disabled={!isFormValid()}
          onClick={handleSignin}
        >
          <Typography variant="body1">{SIGN_IN}</Typography>
        </StyledButton>
        <StyledDivider variant="fullWidth" textAlign="center">
          <Typography
            variant="caption1"
            color={theme.palette.textColor.mediumEmphasis}
            margin="0px 1.46vw 0px 1.46vw"
          >
            {OR}
          </Typography>
        </StyledDivider>
        <GoogleLogin
          onClick={() => {
            loginWithRedirect();
          }}
        />
        <StyledBox>
          <Typography
            variant="caption1"
            color={theme.palette.textColor.mediumEmphasis}
            onClick={()=>handleSignup()}
          >
            {DONT_HAVE_ACCOUNT}
            <span
              style={{
                color: theme.palette.primary.primary300,
                cursor: 'pointer'
              }}
            >
              {SIGN_UP}
            </span>
          </Typography>
        </StyledBox>
      </StyledFooter>
    </StyledOutline>
  );
};
