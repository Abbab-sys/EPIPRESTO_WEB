import {Alert, Button, Grid, TextField} from '@mui/material'
import React, {useContext, useEffect, useReducer, useState} from 'react';
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
import {VendorContext} from '../../context/Vendor';

const SignUp = () => {
  document.onkeydown = (event) => {
    if (event.key === "Enter") handleCreateAccount()
  }

  const {t: translation} = useTranslation('translation')
  const classes = signUpStyles()
  const navigate = useNavigate()

  const {setStoreId} = useContext(VendorContext);

  const [{verifyPassword, accountInput, signUpErrorMessage}, dispatchCredentialsState]
    = useReducer(signUpCredentialsReducer, initialSignUpCredentialsState);

  useEffect(() => {
    dispatchCredentialsState({type: 'CHECK_SIGN_UP_CREDENTIALS'});
  }, [accountInput.shopName ,accountInput.username,accountInput.email, accountInput.password , verifyPassword ,accountInput.phone , accountInput.address]);
  const [errorOpen, setErrorOpen] = useState(false);

  const [isEmailUsed, {
    loading: emailUsedLoading,
    data: emailUsedData
  }] = useLazyQuery(IS_VENDOR_EMAIL_USED);
  const [isUsernameUsed, {
    loading: usernameUsedLoading,
    data: usernameUsedData
  }] = useLazyQuery(IS_VENDOR_USERNAME_USED);
  const [signUp, {data: signUpData}] = useMutation(SIGN_UP);

  useEffect(() => {
    const timeout = setTimeout(() => {
      isEmailUsed({variables: {email: accountInput.email}}).then(r => console.log(r))
    }, 500)
    return () => {
      clearTimeout(timeout);
    };
  }, [accountInput.email, isEmailUsed])

  useEffect(() => {
    if (!emailUsedData) return
    (emailUsedData.isVendorEmailUsed)
      ? dispatchCredentialsState({type: "SET_EMAIL_AS_ALREADY_USED"})
      : dispatchCredentialsState({type: "SET_EMAIL_AS_UNUSED"})
  }, [emailUsedData])


  useEffect(() => {
    const timeout = setTimeout(() => {
      isUsernameUsed({variables: {username: accountInput.username}}).then(r => console.log(r))
    }, 500)
    return () => {
      clearTimeout(timeout);
    };
  }, [accountInput.username, isUsernameUsed])
  useEffect(() => {
    if (!usernameUsedData) return
    (usernameUsedData.isVendorUsernameUsed)
      ? dispatchCredentialsState({type: "SET_USERNAME_AS_ALREADY_USED"})
      : dispatchCredentialsState({type: "SET_USERNAME_AS_UNUSED"})
  }, [usernameUsedData])


  useEffect(() => {
    if (signUpData && signUpData.vendorSignUp.code === 200) {
      setStoreId(signUpData.vendorSignUp.vendorAccount.store._id)
      navigate("/synchronization")
    } else {
      setErrorOpen(true)
    }
  }, [navigate, setStoreId, signUpData])

  const handleSnackbarClosing = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorOpen(false);
  };

  const areAllCredentialsFieldsValid = (): boolean => {
    const currErrorMessages = signUpErrorMessage;
    return currErrorMessages.emailError.size === 0 &&
      currErrorMessages.usernameError.size === 0 &&
      currErrorMessages.passwordError.size === 0 &&
      currErrorMessages.verifyPasswordError.size === 0 &&
      currErrorMessages.shopNameError.size === 0 &&
      currErrorMessages.addressError.size === 0 &&
      currErrorMessages.phoneError.size === 0;
  }

  const submitButtonShouldBeDisabled = () => {
    return emailUsedLoading ||
      usernameUsedLoading ||
      !areAllCredentialsFieldsValid()
  }

  const handleCreateAccount = () => {
    dispatchCredentialsState({type: 'CHECK_SIGN_UP_CREDENTIALS'});
    const areCredentialsValid = areAllCredentialsFieldsValid()
    if (areCredentialsValid) {
      signUp({variables: {accountInput: accountInput}}).then(r => console.log(r))
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
            error={signUpErrorMessage.shopNameError.size > 0}
            helperText={signUpErrorMessage.shopNameError.size > 0 ? translation(signUpErrorMessage.shopNameError.values().next().value) : ""}
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
            error={signUpErrorMessage.usernameError.size > 0}
            helperText={(signUpErrorMessage.usernameError.size > 0) ? translation(signUpErrorMessage.usernameError.values().next().value) : ""}
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
            error={signUpErrorMessage.addressError.size > 0}
            helperText={signUpErrorMessage.addressError.size > 0 ? translation(signUpErrorMessage.addressError.values().next().value) : ""}
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
            })
            }
            error={signUpErrorMessage.emailError.size > 0}
            helperText={signUpErrorMessage.emailError.size > 0 ? translation(signUpErrorMessage.emailError.values().next().value) : ""}
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
            error={signUpErrorMessage.phoneError.size > 0}
            helperText={signUpErrorMessage.phoneError.size > 0 ? translation(signUpErrorMessage.phoneError.values().next().value) : ""}
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
            error={signUpErrorMessage.passwordError.size > 0}
            helperText={signUpErrorMessage.passwordError.size > 0 ? translation(signUpErrorMessage.passwordError.values().next().value) : ""}
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
            error={signUpErrorMessage.verifyPasswordError.size > 0}
            helperText={signUpErrorMessage.verifyPasswordError.size > 0 ? translation(signUpErrorMessage.verifyPasswordError.values().next().value) : ""}
          />
        </Grid>
        <Button
          variant="contained"
          style={{background: '#ffa500', margin: '15px'}}
          onClick={handleCreateAccount}
          disabled={submitButtonShouldBeDisabled()}
        >
          {translation(SIGN_UP_CREATE_ACCOUNT_KEY)}
        </Button>
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
