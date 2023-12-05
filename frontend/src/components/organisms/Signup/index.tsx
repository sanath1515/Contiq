import React from 'react';
import { Typography } from '@components/atoms/Typography';
import { GoogleLogin } from '@components/molecules/GoogleLogin';
import { InputLabel } from '@components/molecules/InputLabel';
import { Box, Button, Divider, Stack, styled } from '@mui/material';
import theme from '@src/theme/theme';
import {
  ALREADY_HAVE_AN_ACCOUNT,
  CREATE_ACCOUNT,
  CREATE_A_PASSWORD_PLACEHOLDER,
  EMAIL_LABEL,
  EMAIL_PLACEHOLDER,
  EMAIL_REGEX,
  NAME_LABEL,
  NAME_PLACEHOLDER,
  NAME_REGEX,
  OR,
  PASSWORD_LABEL,
  PASSWORD_REGEX,
  SIGN_IN,
  SIGN_UP,
  VALID_EMAIL_ERROR_MESSAGE,
  VALID_NAME_ERROR_MESSAGE,
  VALID_PASSWORD_ERROR_MESSAGE
} from '@src/utils/constants';
import { User } from '@src/utils/interfaces/User';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';

const StyledOutline = styled(Stack)({
  height: 'auto',
  padding: '5.85vw 5.85vw',
  backgroundColor: theme.palette.textColor.white
});

const StyledInnerStack = styled(Stack)({
  gap: '2.34vw'
});

const StyledInputsStack = styled(Stack)({
  gap: '1.46vw'
});

export const StyledButton = styled(Button)({
  textTransform: 'none',
  height: '3.51vw',
  width: '26.06vw',
  borderRadius: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.textColor.white
  },
  backgroundColor: theme.palette.primary[500],
  color: `${theme.palette.textColor.white}`,
  '&.Mui-disabled': {
    backgroundColor: theme.palette.primary[100],
    color: theme.palette.textColor.white
  }
});

export const StyledDivider = styled(Divider)({
  '.MuiDivider-wrapper': {
    padding: '0px'
  }
});

const StyledFooter = styled(Stack)({
  width: '26.06vw',
  marginTop: '2.04vw',
  gap: '2.04vw'
});

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center'
});

interface SignUpProps {
  handleSignUp?: (user: User) => void;
}

export const SignUp = (props: SignUpProps) => {
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const isNameValid = (name: string): boolean => {
    return NAME_REGEX.test(name);
  };

  const isEmailValid = (email: string): boolean => {
    return EMAIL_REGEX.test(email) && email.indexOf('@@') === -1;
  };

  const isPasswordValid = (password: string): boolean => {
    return PASSWORD_REGEX.test(password);
  };

  const isFormValid = () => {
    return (
      isNameValid(state.name) &&
      isEmailValid(state.email) &&
      isPasswordValid(state.password)
    );
  };

  const handleSignin = () => {
    navigate("/")
  }
  return (
    <StyledOutline>
      <StyledInnerStack>
        <Typography variant="h2" color={theme.palette.textColor.black}>
          {SIGN_UP}
        </Typography>
        <StyledInputsStack>
          <Box>
            <InputLabel
              name="name"
              label={NAME_LABEL}
              labelColor={theme.palette.textColor.black}
              labelVariant="body1"
              placeholder={NAME_PLACEHOLDER}
              variant={'outlined'}
              value={state.name}
              type={'text'}
              onChange={handleChange}
            />
            {!isNameValid(state.name) && state.name !== '' && (
              <Typography variant="caption1" color={'red'}>
                {VALID_NAME_ERROR_MESSAGE}
              </Typography>
            )}
          </Box>
          <Box>
            <InputLabel
              name="email"
              label={EMAIL_LABEL}
              labelColor={theme.palette.textColor.black}
              labelVariant="body1"
              placeholder={EMAIL_PLACEHOLDER}
              variant={'outlined'}
              value={state.email}
              type={'text'}
              onChange={handleChange}
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
              value={state.password}
              type={'password'}
              onChange={handleChange}
            />
            {!isPasswordValid(state.password) && state.password !== '' && (
              <Typography variant="caption1" color={'red'}>
                {VALID_PASSWORD_ERROR_MESSAGE}
              </Typography>
            )}
          </Box>
        </StyledInputsStack>
        <StyledButton
          data-testid="signup-button"
          disableElevation
          disableFocusRipple
          disableRipple
          disableTouchRipple
          disabled={!isFormValid()}
          onClick={() => props.handleSignUp && props.handleSignUp(state)}
        >
          <Typography variant="body1">{CREATE_ACCOUNT}</Typography>
        </StyledButton>
      </StyledInnerStack>
      <StyledFooter>
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
            onClick={handleSignin}
          >
            {ALREADY_HAVE_AN_ACCOUNT}
            <span
              style={{
                color: theme.palette.primary.primary300,
                cursor: 'pointer'
              }}
            >
              {SIGN_IN}
            </span>
          </Typography>
        </StyledBox>
      </StyledFooter>
    </StyledOutline>
  );
};
