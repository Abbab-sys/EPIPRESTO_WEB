import {Alert, Button, Grid, Link, Snackbar, TextField, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import logo from '../../assets/logo.png';
import {useLazyQuery} from '@apollo/client/react';
import {LOGIN_BY_EMAIL, LOGIN_BY_USERNAME} from '../../queries';
import {VendorContext} from '../../context/Vendor';
import {useTranslation} from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';

const useStyles = makeStyles({
    root: {
        background: "linear-gradient(135deg, rgb(255, 88, 88), rgb(240, 152, 25))",
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        minHeight: '100vh',
        padding: '10px'
    },
    form: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: '10px',
        boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
        background: 'white',
    },
    input: {
        margin: '15px !important',
        width: "85%"
    },
    link: {
        margin: '15px',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    button: {
        boxShadow: "0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)"
    }
})

interface Credentials {
    email: string,
    password: string,
    showPassword: boolean
}

interface ErrorMessage {
    emailError: string;
    passwordError: string;
}

const initialErrorState: ErrorMessage = {
    emailError: '',
    passwordError: '',
}

const Login = () => {
    const {t} = useTranslation('translation')
    const classes = useStyles()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState<Credentials>({
        email: "",
        password: "",
        showPassword: false,
    })
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const {setStoreId} = useContext(VendorContext);

    const [loginByEmail] = useLazyQuery(LOGIN_BY_EMAIL);

    const [loginByUsername] = useLazyQuery(LOGIN_BY_USERNAME);

    const [errorMessage, setErrorMessage] = useState<ErrorMessage>(initialErrorState);

    const handleChange =
        (prop: keyof Credentials, errorProp: keyof ErrorMessage) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setErrorMessage((oldErrorMessage) => ({...oldErrorMessage, [errorProp]: ""}));
            setCredentials({...credentials, [prop]: event.target.value});
        };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleErrorChange =
        (prop: keyof ErrorMessage, message: string) => {
            setErrorMessage((oldErrorMessage) => ({...oldErrorMessage, [prop]: message}));
        };

    const handleCreateAccount = () => {
        navigate("/sign-up")
    }

    const isValid = () => {
        setErrorMessage(initialErrorState);
        let isAllValid = true
        if (credentials.email.length === 0) {
            handleErrorChange("emailError", t('login.errorMessages.emailError'));
            isAllValid = false
        }
        if (credentials.password.length === 0) {
            handleErrorChange("passwordError", t('login.errorMessages.passwordError'));
            isAllValid = false
        }
        console.log("VALID: ", isAllValid)
        return isAllValid
    }

    const handleLogin = async () => {
        if (isValid()) {
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(credentials.email)) {
                const emailLoginResponse = await loginByEmail({
                    variables: {
                        email: credentials.email,
                        password: credentials.password
                    }
                })
                if (await emailLoginResponse.data.loginVendorByEmail.code === 200) {
                    setStoreId(await emailLoginResponse.data.loginVendorByEmail.vendorAccount.store._id)
                    navigate("/synchronization")
                } else {
                    setSnackbarOpen(true)
                }
            } else {
                const usernameLoginResponse = await loginByUsername({
                    variables: {
                        username: credentials.email,
                        password: credentials.password
                    }
                })
                if (await usernameLoginResponse.data.loginVendorByUsername.code === 200) {
                    setStoreId(await usernameLoginResponse.data.loginVendorByUsername.vendorAccount.store._id)
                    navigate("/synchronization")
                } else {
                    setSnackbarOpen(true)
                }
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
                <img src={logo} height={"80px"} width={"200px"}></img>
                <TextField
                    variant='standard'
                    className={classes.input}
                    color="warning"
                    placeholder={t('login.email')}
                    value={credentials.email}
                    onChange={handleChange('email', 'emailError')}
                    error={errorMessage.emailError.length > 0}
                    helperText={errorMessage.emailError}
                />
                <TextField
                    variant='standard'
                    className={classes.input}
                    color="warning"
                    placeholder={t('login.password')}
                    type={
                        credentials.showPassword ? 'text' :
                            'password'}
                    value={credentials.password}
                    onChange={handleChange('password', 'passwordError')}
                    error={errorMessage.passwordError.length > 0}
                    helperText={errorMessage.passwordError}
                />
                <Button
                    variant="contained"
                    style={{background: '#ffa500', margin: '15px'}}
                    onClick={handleLogin}>
                    {t('login.login')}
                </Button>
                <Typography display="inline-block">
                    {t('login.newTo')}
                </Typography>
                <Link style={{margin: '15px'}} className={classes.link} onClick={handleCreateAccount}>
                    {t('login.createAccount')}
                </Link>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                        {t('login.errorMessages.credentialsError')}
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>
    )
}

export default Login
