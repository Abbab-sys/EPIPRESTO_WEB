import {Button, CircularProgress, Grid, Link, TextField, Typography,} from '@mui/material';
import React, {useContext, useEffect, useReducer} from 'react';
import {useNavigate} from 'react-router-dom';
import logo from '../../assets/logo.png';
import {useLazyQuery} from '@apollo/client/react';
import {LOGIN_BY_EMAIL, LOGIN_BY_USERNAME} from '../../graphql/queries';
import {VendorContext} from '../../context/Vendor';
import {useTranslation} from 'react-i18next';
import {loginStyles} from './LoginStyles';
import {
  LOGIN_CREATE_ACCOUNT,
  LOGIN_EMAIL_KEY,
  LOGIN_LOGIN_KEY,
  LOGIN_NEW_TO_APP_KEY,
  LOGIN_NOT_VERIFIED_EMAIL_KEY,
  LOGIN_PASSWORD_KEY,
  SERVER_ERROR_KEY,
} from '../../translations/keys/LoginTranslationKeys';

import {
  initialLoginCredentialsStateReducer,
  LoginCredentialsReducerState,
} from './reducers/LoginCredentialsReducerState';
import {loginCredentialsReducer} from './reducers/LoginCredentialsReducer';
import {useSnackbar} from '../../hooks/UiHooks/UiHooks';
import {ApolloError} from '@apollo/client';

/*
 * Name: Login Page
 * Description: This file contains the login page
 * Author: Adam Naoui, Alessandro van Reusel and Zouhair Derouich
 */

const Login = () => {
  document.onkeydown = (event) => {
    if (event.key === 'Enter') handleLogin();
  };

  const {t: translation} = useTranslation('translation');
  const classes = loginStyles();
  const navigate = useNavigate();
  const {storeId, setStoreId} = useContext(VendorContext);

  useEffect(() => {
    if (storeId.length > 0) {
      navigate('/synchronization');
    }
  }, [navigate, storeId]);

  const [
    notVerifiedEmailSnackbar,
    {
      open: openNotVerifiedEmailSnackbar,
      close: closeNotVerifiedEmailSnackbar,
    },
  ] = useSnackbar({
    severity: 'warning',
    messageTranslationKey: LOGIN_NOT_VERIFIED_EMAIL_KEY,
  });
  const [
    serverErrorSnackbar,
    {open: openServerErrorSnackbar, close: closeServerErrorSnackbar},
  ] = useSnackbar({
    severity: 'error',
    messageTranslationKey: SERVER_ERROR_KEY,
  });

  const [{credentials, errorMessage}, dispatchCredentialsState] = useReducer(
    loginCredentialsReducer,
    initialLoginCredentialsStateReducer
  );

  const onLoginByEmailCompleted = (emailAuthData: any) => {
    const serverResponse = emailAuthData.loginVendorByEmail;
    const loggedWithSuccess = serverResponse.code === 200;
    const vendorNotVerified = serverResponse.code === 401;
    if (loggedWithSuccess) {
      setStoreId(serverResponse.vendorAccount.store._id);
      return;
    }
    if (vendorNotVerified) {
      closeServerErrorSnackbar();
      openNotVerifiedEmailSnackbar();
      return;
    }
  };
  const onLoginByUsernameCompleted = (usernameAuthData: any) => {
    const serverResponse = usernameAuthData.loginVendorByUsername;
    const loggedWithSuccess = serverResponse.code === 200;
    const vendorNotVerified = serverResponse.code === 401;
    if (loggedWithSuccess) {
      setStoreId(serverResponse.vendorAccount.store._id);
    }
    if (vendorNotVerified) {
      closeServerErrorSnackbar();
      openNotVerifiedEmailSnackbar();
      return;
    }
  };
  const onLoginError = (error: ApolloError) => {
    closeNotVerifiedEmailSnackbar();
    openServerErrorSnackbar();
  };

  const [loginByEmail, {loading: emailAuthLoading}] = useLazyQuery(
    LOGIN_BY_EMAIL,
    {
      onCompleted: onLoginByEmailCompleted,
      onError: onLoginError,
      fetchPolicy: 'no-cache',
    }
  );

  const [loginByUsername, {loading: usernameAuthLoading}] = useLazyQuery(
    LOGIN_BY_USERNAME,
    {
      onCompleted: onLoginByUsernameCompleted,
      onError: onLoginError,
      fetchPolicy: 'no-cache',
    }
  );

  const areAllCredentialsFieldsValid = (
    credsState: LoginCredentialsReducerState
  ): boolean => {
    return (
      credsState.credentials.auth.length > 0 &&
      credsState.credentials.password.length > 0
    );
  };

  const handleLogin = () => {
    dispatchCredentialsState({type: 'CHECK_LOGIN_CREDENTIALS'});
    const areCredentialsValid = areAllCredentialsFieldsValid({
      credentials,
      errorMessage,
    });

    if (areCredentialsValid) {
      const isAuthEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        credentials.auth
      );
      isAuthEmail
        ? loginByEmail({
          variables: {
            email: credentials.auth,
            password: credentials.password,
          },
        })
        : loginByUsername({
          variables: {
            username: credentials.auth,
            password: credentials.password,
          },
        });
    }
  };

  return (
    <Grid
      container
      xs={12}
      spacing={0}
      direction='column'
      className={classes.root}
    >
      <Grid container xs={4} className={classes.form} direction='column'>
        <img
          src={logo}
          height={'80px'}
          width={'200px'}
          alt={'Épipresto logo'}
        ></img>
        <Grid item direction='row' className={classes.innerForm}>
          <TextField
            variant='standard'
            className={classes.input}
            color='warning'
            placeholder={translation(LOGIN_EMAIL_KEY)}
            value={credentials.auth}
            onChange={(event) =>
              dispatchCredentialsState({
                type: 'CHANGE_AUTH',
                newAuth: event.target.value,
              })
            }
            error={errorMessage.authErrorTranslationKey.length > 0}
            helperText={
              errorMessage.authErrorTranslationKey.length > 0
                ? translation(errorMessage.authErrorTranslationKey)
                : ''
            }
          />
        </Grid>
        <Grid item direction='row' className={classes.innerForm}>
          <TextField
            variant='standard'
            className={classes.input}
            color='warning'
            placeholder={translation(LOGIN_PASSWORD_KEY)}
            type={credentials.showPassword ? 'text' : 'password'}
            value={credentials.password}
            onChange={(event) =>
              dispatchCredentialsState({
                type: 'CHANGE_PASSWORD',
                newPassword: event.target.value,
              })
            }
            error={errorMessage.passwordErrorTranslationKey.length > 0}
            helperText={
              errorMessage.passwordErrorTranslationKey.length > 0
                ? translation(errorMessage.passwordErrorTranslationKey)
                : ''
            }
          />
        </Grid>
        <Grid item direction='row' className={classes.innerForm}>
          {emailAuthLoading || usernameAuthLoading ? (
            <CircularProgress></CircularProgress>
          ) : (
            <Button
              type='submit'
              variant='contained'
              style={{
                background: '#ffa500',
                margin: '15px',
                width: 'auto !important',
              }}
              onClick={handleLogin}
            >
              {translation(LOGIN_LOGIN_KEY)}
            </Button>
          )}
        </Grid>
        <Grid item direction='row' className={classes.innerForm}>
          <Typography display='inline-block'>
            {translation(LOGIN_NEW_TO_APP_KEY)}
          </Typography>
        </Grid>
        <Grid item direction='row' className={classes.innerForm}>
          <Link
            style={{margin: '15px'}}
            className={classes.link}
            onClick={() => navigate('/sign-up')}
          >
            {translation(LOGIN_CREATE_ACCOUNT)}
          </Link>
        </Grid>
        {notVerifiedEmailSnackbar}
        {serverErrorSnackbar}
      </Grid>
    </Grid>
  );
};

export default Login;
