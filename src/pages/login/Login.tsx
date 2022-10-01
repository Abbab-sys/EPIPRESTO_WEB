import {Alert, Button, CircularProgress, Grid, Link, Snackbar, TextField, Typography} from '@mui/material'
import React, {useContext, useEffect, useReducer, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import logo from '../../assets/logo.png';
import {useLazyQuery} from '@apollo/client/react';
import {LOGIN_BY_EMAIL, LOGIN_BY_USERNAME} from '../../graphql/queries';
import {VendorContext} from '../../context/Vendor';
import {useTranslation} from 'react-i18next';
import {loginStyles} from "./LoginStyles";
import {
    LOGIN_CREATE_ACCOUNT,
    LOGIN_CREDENTIALS_ERROR,
    LOGIN_EMAIL_KEY, LOGIN_LOGIN_KEY, LOGIN_NEW_TO_APP_KEY,
    LOGIN_PASSWORD_KEY,
    SERVER_ERROR
} from "../../translations/keys/LoginTranslationKeys";

import {
    initialLoginCredentialsStateReducer,
    LoginCredentialsReducerState
} from "./reducers/LoginCredentialsReducerState";
import {loginCredentialsReducer} from "./reducers/LoginCredentialsReducer";


const Login = () => {
    document.onkeydown = (event) => {
        if(event.key === "Enter") handleLogin()
    }
    const {t: translation} = useTranslation('translation')
    const classes = loginStyles()
    const navigate = useNavigate()
    const {storeId, setStoreId} = useContext(VendorContext);
    useEffect(() => {
        if (storeId.length > 0) {
            navigate('/synchronization')
        }
    }, [navigate, storeId]);

    const [{credentials, errorMessage}, dispatchCredentialsState]
        = useReducer(loginCredentialsReducer, initialLoginCredentialsStateReducer);

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [loginByEmail, { loading: emailAuthLoading, error: emailAuthError, data: emailAuthData }] = useLazyQuery(LOGIN_BY_EMAIL);
    const [loginByUsername, { loading: usernameAuthLoading, error: usernameAuthError, data: usernameAuthData }] = useLazyQuery(LOGIN_BY_USERNAME);

    useEffect(() => {
        if (emailAuthLoading || emailAuthError || !emailAuthData|| !emailAuthData.loginVendorByEmail !== null) return
        const serverResponse = emailAuthData.loginVendorByEmail
        const loggedWithSuccess = serverResponse.code === 200
        if (loggedWithSuccess) {
            setStoreId(serverResponse.vendorAccount.store._id)
        } else {
            setSnackbarOpen(true)
        }
    }, [emailAuthLoading, emailAuthError, emailAuthData, setStoreId])

    useEffect(() => {
        if (usernameAuthLoading || usernameAuthError || !usernameAuthData || !usernameAuthData.loginVendorByUsername) return
        const serverResponse = usernameAuthData.loginVendorByUsername
        const loggedWithSuccess = serverResponse.code === 200
        if (loggedWithSuccess) {
            setStoreId(serverResponse.vendorAccount.store._id)
        } else {
            setSnackbarOpen(true)
        }
    }, [usernameAuthLoading, usernameAuthError, usernameAuthData, setStoreId])

    const handleSnackbarClosing = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    function areAllCredentialsFieldsValid(credsState: LoginCredentialsReducerState): boolean {
        return credsState.credentials.auth.length > 0 && credsState.credentials.password.length > 0
    }

    const handleLogin = () => {
        dispatchCredentialsState({type: 'CHECK_LOGIN_CREDENTIALS'})
        const areCredentialsValid = areAllCredentialsFieldsValid({credentials, errorMessage})

        if (areCredentialsValid) {
            const isAuthEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(credentials.auth)
            isAuthEmail
        			? loginByEmail({variables: {email: credentials.auth, password: credentials.password}})
              : loginByUsername({variables: {username: credentials.auth, password: credentials.password}})
        }
    }

    return (
        <Grid
            container
            xs={12}
            spacing={0}
            direction="column"
            className={classes.root}>
            <Grid container xs={4} className={classes.form} direction="column">
                <img src={logo} height={"80px"} width={"200px"} alt={"Épipresto logo"}></img>
                <Grid item direction="row" className={classes.innerForm}>
                    <TextField
                        variant='standard'
                        className={classes.input}
                        color="warning"
                        placeholder={translation(LOGIN_EMAIL_KEY)}
                        value={credentials.auth}
                        onChange={(event) => dispatchCredentialsState({
                            type: "CHANGE_AUTH",
                            newAuth: event.target.value
                        })}
                        error={errorMessage.authErrorTranslationKey.length > 0}
                        helperText={errorMessage.authErrorTranslationKey.length > 0?translation(errorMessage.authErrorTranslationKey):""}
                    />
                </Grid>
                <Grid item direction="row" className={classes.innerForm}>
                    <TextField
                        variant='standard'
                        className={classes.input}
                        color="warning"
                        placeholder={translation(LOGIN_PASSWORD_KEY)}
                        type={
                            credentials.showPassword ? 'text' :
                                'password'}
                        value={credentials.password}
                        onChange={(event) => dispatchCredentialsState({
                            type: "CHANGE_PASSWORD",
                            newPassword: event.target.value
                        })}
                        error={errorMessage.passwordErrorTranslationKey.length > 0}
                        helperText={errorMessage.passwordErrorTranslationKey.length > 0?translation(errorMessage.passwordErrorTranslationKey):""}
                    />
                </Grid>
                <Grid item direction="row" className={classes.innerForm}>
                    {emailAuthLoading || usernameAuthLoading ? <CircularProgress></CircularProgress>
                        : (<Button
                        type='submit'
                        variant="contained"
                        style={{background: '#ffa500', margin: '15px', width:'auto !important'}}
                        onClick={handleLogin}
                        >
                        {translation(LOGIN_LOGIN_KEY)}
                    </Button>)
                    }
                </Grid>
                <Grid item direction="row" className={classes.innerForm}>
                    <Typography display="inline-block">
                        {translation(LOGIN_NEW_TO_APP_KEY)}
                    </Typography>
                </Grid>
                <Grid item direction="row" className={classes.innerForm}>
                    <Link style={{margin: '15px'}} className={classes.link} onClick={() => navigate("/sign-up")}>
                        {translation(LOGIN_CREATE_ACCOUNT)}
                    </Link>
                </Grid>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClosing}>
                    <Alert onClose={handleSnackbarClosing} severity="error" sx={{width: '100%'}}>
                        {emailAuthError || usernameAuthError ? translation(SERVER_ERROR) : translation(LOGIN_CREDENTIALS_ERROR)}
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>
    )
}

export default Login
