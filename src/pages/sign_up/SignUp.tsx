import {Alert, Button, Grid, TextField} from '@mui/material'
import React, {useReducer, useState} from 'react';
import logo from '../../assets/logo.png';
import {useLazyQuery, useMutation} from '@apollo/client'
import {SIGN_UP} from '../../graphql/mutations';
import {useNavigate} from 'react-router-dom';
import {IS_VENDOR_EMAIL_USED, IS_VENDOR_USERNAME_USED} from '../../graphql/queries';
import {useTranslation} from 'react-i18next';
import Snackbar from '@mui/material/Snackbar';
import {signUpStyles} from "./SignUpStyles";
import {initialSignUpCredentialsState} from "./reducers/SignUpCredentialsReducerState";
import {signUpCredentialsReducer} from "./reducers/SignUpCredentialsReducer";
import {
    SIGN_UP_ADRESS_PLACEHOLDER_KEY,
    SIGN_UP_CONFIRM_PASSWORD_PLACEHOLDER_KEY,
    SIGN_UP_CREATE_ACCOUNT_KEY,

    SIGN_UP_EMAIL_PLACEHOLDER_KEY,
    SIGN_UP_ERROR_ACCOUNT_CREATION_KEY,
    SIGN_UP_PASSWORD_PLACEHOLDER_KEY
    , SIGN_UP_PHONE_PLACEHOLDER,

    SIGN_UP_SHOP_NAME_PLACEHOLDER_KEY,

    SIGN_UP_USERNAME_PLACEHOLDER_KEY
} from "../../translations/keys/SignUpTranslationKeys";


const SignUp = () => {
    const {t: translation} = useTranslation('translation')
    const classes = signUpStyles()
    const navigate = useNavigate()

    const [{verifyPassword, accountInput, signUpErrorMessage}, dispatchCredentialsState]
        = useReducer(signUpCredentialsReducer, initialSignUpCredentialsState);

    const [errorOpen, setErrorOpen] = useState(false);

    const [isEmailUsed] = useLazyQuery(IS_VENDOR_EMAIL_USED);
    const [isUsernameUsed] = useLazyQuery(IS_VENDOR_USERNAME_USED);
    const [signUp] = useMutation(SIGN_UP);

    const handleSnackbarClosing = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);
    };

    function areAllCredentialsFieldsValid(): boolean {
        const currErrorMessages = signUpErrorMessage;
        return currErrorMessages.emailError === '' &&
            currErrorMessages.usernameError === '' &&
            currErrorMessages.passwordError === '' &&
            currErrorMessages.verifyPasswordError === '' &&
            currErrorMessages.shopNameError === '' &&
            currErrorMessages.addressError === '' &&
            currErrorMessages.phoneError === '';
    }

    const handleCreateAccount = async () => {
        dispatchCredentialsState({type: 'CHECK_SIGN_UP_CREDENTIALS'});
        const areCredentialsValid = areAllCredentialsFieldsValid()
        if (areCredentialsValid) {
            const response = await signUp({variables: {accountInput: accountInput}})
            if (response.data.vendorSignUp.code === 200) {
                navigate("/login")
            } else {
                setErrorOpen(true)
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
                <Grid container className={classes.innerForm}>
                    <img src={logo} height={"80px"} width={"200px"} alt={"Épipresto logo"}></img>
                </Grid>
                <Grid item direction="row" className={classes.innerForm}>
                    <TextField
                        variant='standard'
                        color="warning"
                        className={classes.input}
                        placeholder={translation(SIGN_UP_SHOP_NAME_PLACEHOLDER_KEY)}
                        value={accountInput.shopName}
                        onChange={(event) => dispatchCredentialsState({
                            type: "CHANGE_SHOP_NAME",
                            newShopName: event.target.value
                        })}
                        error={signUpErrorMessage.shopNameError.length > 0}
                        helperText={translation(signUpErrorMessage.shopNameError)}
                    />
                </Grid>
                <Grid item direction="row" className={classes.innerForm}>
                    <TextField
                        variant='standard'
                        className={classes.input}
                        color="warning"
                        placeholder={translation(SIGN_UP_USERNAME_PLACEHOLDER_KEY)}
                        value={accountInput.username}
                        onChange={(event) => dispatchCredentialsState({
                            type: "CHANGE_USERNAME",
                            newUsername: event.target.value
                        })}
                        onBlur={async () => {
                            const response = await isUsernameUsed({variables: {username: accountInput.username}})
                            if (response.data.isVendorUsernameUsed) {
                                dispatchCredentialsState({
                                    type: "SET_USERNAME_AS_ALREADY_USED",
                                })
                            } else {
                                dispatchCredentialsState({
                                    type: "SET_USERNAME_AS_UNUSED",
                                })
                            }
                        }
                        }
                        error={signUpErrorMessage.usernameError.length > 0}
                        helperText={translation(signUpErrorMessage.usernameError)}
                    />
                    <TextField
                        variant='standard'
                        className={classes.input}
                        color="warning"
                        placeholder={translation(SIGN_UP_ADRESS_PLACEHOLDER_KEY)}
                        value={accountInput.address}
                        onChange={(event) => dispatchCredentialsState({
                            type: "CHANGE_ADDRESS",
                            newAddress: event.target.value
                        })}
                        error={signUpErrorMessage.addressError.length > 0}
                        helperText={translation(signUpErrorMessage.addressError)}
                    />
                </Grid>
                <Grid item direction="row" className={classes.innerForm}>
                    <TextField
                        variant='standard'
                        className={classes.input}
                        color="warning"
                        placeholder={translation(SIGN_UP_EMAIL_PLACEHOLDER_KEY)}
                        value={accountInput.email}
                        onChange={(event) => dispatchCredentialsState({
                            type: "CHANGE_EMAIL",
                            newEmail: event.target.value
                        })}
                        onBlur={async () => {
                            const response = await isEmailUsed({variables: {email: accountInput.email}})
                            if (response.data.isVendorEmailUsed) {
                                dispatchCredentialsState({
                                    type: "SET_EMAIL_AS_ALREADY_USED",
                                })
                            } else {
                                dispatchCredentialsState({
                                    type: "SET_EMAIL_AS_UNUSED",
                                })
                            }
                        }}
                        error={signUpErrorMessage.emailError.length > 0}
                        helperText={translation(signUpErrorMessage.emailError)}
                    />
                    <TextField
                        variant='standard'
                        className={classes.input}
                        color="warning"
                        placeholder={translation(SIGN_UP_PHONE_PLACEHOLDER)}
                        value={accountInput.phone}
                        onChange={(event) => dispatchCredentialsState({
                            type: "CHANGE_PHONE",
                            newPhone: event.target.value
                        })}
                        error={signUpErrorMessage.phoneError.length > 0}
                        helperText={translation(signUpErrorMessage.phoneError)}
                    />
                </Grid>
                <Grid item direction="row" className={classes.innerForm}>
                    <TextField
                        variant='standard'
                        className={classes.input}
                        color="warning"
                        placeholder={translation(SIGN_UP_PASSWORD_PLACEHOLDER_KEY)}
                        type={'password'}
                        value={accountInput.password}
                        onChange={(event) => dispatchCredentialsState({
                            type: "CHANGE_PASSWORD",
                            newPassword: event.target.value
                        })}
                        error={signUpErrorMessage.passwordError.length > 0}
                        helperText={translation(signUpErrorMessage.passwordError)}
                    />
                    <TextField
                        variant='standard'
                        className={classes.input}
                        color="warning"
                        type={'password'}
                        value={verifyPassword}
                        placeholder={translation(SIGN_UP_CONFIRM_PASSWORD_PLACEHOLDER_KEY)}
                        onChange={(event) => dispatchCredentialsState({
                            type: "CHANGE_CONFIRM_PASSWORD",
                            newConfirmPassword: event.target.value
                        })}
                        error={signUpErrorMessage.verifyPasswordError.length > 0}
                        helperText={translation(signUpErrorMessage.verifyPasswordError)}
                    />
                </Grid>
                {(
                    <Button
                        variant="contained"
                        style={{background: '#ffa500', margin: '15px'}}
                        onClick={handleCreateAccount}>
                        {translation(SIGN_UP_CREATE_ACCOUNT_KEY)}
                    </Button>
                )
                }
                <Snackbar
                    open={errorOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClosing}>
                    <Alert onClose={handleSnackbarClosing} severity="error" sx={{width: '100%'}}>
                        {translation(SIGN_UP_ERROR_ACCOUNT_CREATION_KEY)}
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>
    )
}

export default SignUp
