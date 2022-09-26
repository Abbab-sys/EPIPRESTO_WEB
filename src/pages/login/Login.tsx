import {Alert, Button, Grid, Link, Snackbar, TextField, Typography} from '@mui/material'
import React, {MutableRefObject, useContext, useEffect, useReducer, useRef, useState} from 'react';
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
    LOGIN_PASSWORD_KEY
} from "../../translations/keys/LoginTranslationKeys";

import {
    initialLoginCredentialsStateReducer,
    LoginCredentialsReducerState
} from "./reducers/LoginCredentialsReducerState";
import {loginCredentialsReducer} from "./reducers/LoginCredentialsReducer";


const Login = () => {
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
    const [loginByEmail] = useLazyQuery(LOGIN_BY_EMAIL);
    const [loginByUsername] = useLazyQuery(LOGIN_BY_USERNAME);

    useEffect(() => {
        document.onkeydown = (event) => {
            if(event.key === "Enter") handleLogin()
        }
    },);

    const handleSnackbarClosing = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    function areAllCredentialsFieldsValid(credsState: LoginCredentialsReducerState): boolean {
        return credsState.credentials.auth.length > 0 && credsState.credentials.password.length > 0
    }

    const handleLogin = async () => {
        dispatchCredentialsState({type: 'CHECK_LOGIN_CREDENTIALS'})
        const areCredentialsValid = areAllCredentialsFieldsValid({credentials, errorMessage})

        if (areCredentialsValid) {
            const isAuthEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(credentials.auth)
            const loginResponse = isAuthEmail
                ? await loginByEmail({variables: {email: credentials.auth, password: credentials.password}})
                : await loginByUsername({variables: {username: credentials.auth, password: credentials.password}})

            const serverResponse= (isAuthEmail)? loginResponse.data.loginVendorByEmail : loginResponse.data.loginVendorByUsername
            const loggedWithSuccess =serverResponse.code

            if (loggedWithSuccess) {
                setStoreId(serverResponse.vendorAccount.store._id)
            } else {
                setSnackbarOpen(true)
            }
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
                        helperText={translation(errorMessage.authErrorTranslationKey)}
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
                        helperText={translation(errorMessage.passwordErrorTranslationKey)}
                    />
                </Grid>
                <Grid item direction="row" className={classes.innerForm}>
                    <Button
                        type='submit'
                        variant="contained"
                        style={{background: '#ffa500', margin: '15px', width:'auto !important'}}
                        onClick={handleLogin}
                        >
                        {translation(LOGIN_LOGIN_KEY)}
                    </Button>
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
                        {translation(LOGIN_CREDENTIALS_ERROR)}
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>
    )
}

export default Login
