import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserContext } from './utils/ThemeContext';
// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
        authorizationParams={{
          redirect_uri: process.env.CALLBACK_URL as string
        }}
      >
        <UserContext>
          <App />
        </UserContext>
      </Auth0Provider>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);
