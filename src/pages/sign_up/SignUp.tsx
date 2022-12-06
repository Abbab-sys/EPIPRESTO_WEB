import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from '@mui/material'
import React, {useReducer} from 'react';
import logo from '../../assets/logo.png';
import {useLazyQuery, useMutation} from '@apollo/client'
import {SIGN_UP} from '../../graphql/mutations';
import {useNavigate} from 'react-router-dom';
import {IS_VENDOR_EMAIL_USED, IS_VENDOR_USERNAME_USED} from '../../graphql/queries';
import {useTranslation} from 'react-i18next';
import {signUpStyles} from "./SignUpStyles";
import {initialSignUpCredentialsState} from "./reducers/SignUpCredentialsReducerState";
import {signUpCredentialsReducer} from "./reducers/SignUpCredentialsReducer";
import {
  SIGN_UP_ADRESS_PLACEHOLDER_KEY,
  SIGN_UP_CATEGORY_KEY,
  SIGN_UP_CONFIRM_PASSWORD_PLACEHOLDER_KEY,
  SIGN_UP_CREATE_ACCOUNT_KEY,
  SIGN_UP_EMAIL_PLACEHOLDER_KEY,
  SIGN_UP_ERROR_ACCOUNT_CREATION_KEY,
  SIGN_UP_PASSWORD_PLACEHOLDER_KEY,
  SIGN_UP_PHONE_PLACEHOLDER_KEY,
  SIGN_UP_SHOP_NAME_PLACEHOLDER_KEY,
  SIGN_UP_SUCCESS_ACCOUNT_CREATION_KEY,
  SIGN_UP_USERNAME_PLACEHOLDER_KEY,
} from "../../translations/keys/SignUpTranslationKeys";
import {useTimeout} from "../../hooks/CredentialsHooks";
import {useSnackbar} from "../../hooks/UiHooks/UiHooks";
import {Category} from '../../interfaces/SignUpInterfaces';

/*
 * Name: Sign Up Page
 * Description: This file contains the sign up page
 * Author: Adam Naoui, Alessandro van Reusel and Zouhair Derouich
 */

const SignUp = () => {

  const {t: translation} = useTranslation('translation')
  const classes = signUpStyles()
  const navigate = useNavigate()


  const [{verifyPassword, accountInput, signUpErrorMessage}, dispatchCredentialsState]
    = useReducer(signUpCredentialsReducer, initialSignUpCredentialsState);

  const [confirmEmailSnackbar, {open: openConfirmEmailSnackbar, close: closeConfirmEmailSnackbar}] = useSnackbar({
    severity: 'info',
    messageTranslationKey: SIGN_UP_SUCCESS_ACCOUNT_CREATION_KEY
  })
  const [serverErrorSnackbar, {open: openServerErrorSnackbar, close: closeServerErrorSnackbar}] = useSnackbar({
    severity: 'error',
    messageTranslationKey: SIGN_UP_ERROR_ACCOUNT_CREATION_KEY
  })

  const handleEmailUsed = (emailUsedData: any) => {
    if (!emailUsedData) return
    (emailUsedData.isVendorEmailUsed)
      ? dispatchCredentialsState({type: "SET_EMAIL_AS_ALREADY_USED"})
      : dispatchCredentialsState({type: "SET_EMAIL_AS_UNUSED"})
  }
  const handleUsernameUsed = (usernameUsedData: any) => {
    if (!usernameUsedData) return
    (usernameUsedData.isVendorUsernameUsed)
      ? dispatchCredentialsState({type: "SET_USERNAME_AS_ALREADY_USED"})
      : dispatchCredentialsState({type: "SET_USERNAME_AS_UNUSED"})
  }
  const signUpResponse = (signUpData: any) => {
    if (!signUpData) return
    if (signUpData.vendorSignUp.code !== 200) {
      closeConfirmEmailSnackbar()
      openServerErrorSnackbar()
      return;
    }
    closeServerErrorSnackbar()
    openConfirmEmailSnackbar()
    setTimeout(() => {
      navigate("/login")
    }, 5000)
  }

  const [isEmailUsed, {loading: emailUsedLoading}] = useLazyQuery(IS_VENDOR_EMAIL_USED, {onCompleted: handleEmailUsed});
  const [isUsernameUsed, {loading: usernameUsedLoading}] = useLazyQuery(IS_VENDOR_USERNAME_USED, {onCompleted: handleUsernameUsed});
  const [signUp] = useMutation(SIGN_UP, {onCompleted: signUpResponse});

  useTimeout({
    callback: isEmailUsed,
    time: 500,
    callbackVars: {variables: {email: accountInput.email}},
    dependencies: [accountInput.email]
  })

  useTimeout({
    callback: isUsernameUsed,
    time: 500,
    callbackVars: {variables: {username: accountInput.username}},
    dependencies: [accountInput.username]
  })

  const areAllCredentialsFieldsValid = (): boolean => {
    const currErrorMessages = signUpErrorMessage;
    return currErrorMessages.emailError.size === 0 &&
      currErrorMessages.usernameError.size === 0 &&
      currErrorMessages.passwordError.size === 0 &&
      currErrorMessages.verifyPasswordError.size === 0 &&
      currErrorMessages.shopNameError.size === 0 &&
      currErrorMessages.addressError.size === 0 &&
      currErrorMessages.phoneError.size === 0 &&
      currErrorMessages.shopCategoryError.size === 0;
  }
  const areAllCredentialsFieldsAreFilled = (): boolean => {
    return accountInput.shopName !== '' &&
      accountInput.email !== '' &&
      accountInput.username !== '' &&
      accountInput.password !== '' &&
      verifyPassword !== '' &&
      accountInput.address !== '' &&
      accountInput.phone !== '' &&
      accountInput.shopCategory !== ''
  }

  const submitButtonShouldBeDisabled = () => {
    return emailUsedLoading ||
      usernameUsedLoading ||
      !areAllCredentialsFieldsValid()
      || !areAllCredentialsFieldsAreFilled()
  }

  const handleCreateAccount = () => {
    dispatchCredentialsState({type: 'CHECK_SIGN_UP_CREDENTIALS'});
    const areCredentialsValid = areAllCredentialsFieldsValid()
    if (areCredentialsValid) {
      signUp({variables: {accountInput: accountInput}}).then(r => console.log(r))
    }
  }
  document.onkeydown = (event) => {
    if (event.key === "Enter" && !submitButtonShouldBeDisabled()) handleCreateAccount()
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
          <FormControl
            color="warning"
            variant="standard"
            fullWidth
            className={classes.dropdown}
          >
            <InputLabel variant='standard'>{translation(SIGN_UP_CATEGORY_KEY)}</InputLabel>
            <Select
              value={accountInput.shopCategory}
              onChange={(event) => {
                dispatchCredentialsState({
                  type: "CHANGE_CATEGORY",
                  newCategory: event.target.value as Category
                })
              }}
            >
              {(Object.keys(Category) as Array<keyof typeof Category>).map((category) => (
                <MenuItem value={category}>{translation('sign_up.category.' + category)}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
            placeholder={translation(SIGN_UP_PHONE_PLACEHOLDER_KEY)}
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
      </Grid>
      {serverErrorSnackbar}
      {confirmEmailSnackbar}
    </Grid>
  )
}

export default SignUp
