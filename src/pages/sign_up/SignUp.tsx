import { Alert, Button, Grid, Input, styled, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import logo from '../../assets/logo.png';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { SIGN_UP } from '../../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { IS_VENDOR_EMAIL_USED, IS_VENDOR_USERNAME_USED } from '../../graphql/queries';
import { useTranslation } from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
//import PhoneInput from 'react-phone-number-input'
//import 'react-phone-number-input/style.css'


const useStyles = makeStyles({
  root: {
    background: "linear-gradient(135deg, rgb(255, 88, 88), rgb(240, 152, 25))",
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    minHeight: '100vh',
  },
  form: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: '10px',
    boxShadow:"0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    background: 'white',
  },
  innerForm: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  input: {
    margin: '15px !important',
    width: "100%"
  },
  button: {
    boxShadow: "0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)"
  }
})

interface AccountInput {
  shopName: string;
  email: string;
  address: string;
  phone: string;
  username: string;
  password: string;
}

interface ErrorMessage {
  shopNameError: string;
  emailError: string;
  addressError: string;
  phoneError: string;
  usernameError: string;
  passwordError: string;
  verifyPasswordError: string;
}

const initialErrorState: ErrorMessage = {
  shopNameError: '',
  emailError: '',
  addressError: '',
  phoneError: '',
  usernameError: '',
  passwordError: '',
  verifyPasswordError: ''
}

const SignUp = () => {
  const { t } = useTranslation('translation')
  const classes = useStyles()
  const navigate = useNavigate()
  const [verifyPassword, setVerifyPassword] = useState<string>('')
  const [accountInput, setAccountInput] = useState<AccountInput>({
    shopName: '',
    username: '',
    address: '',
    email: '',
    phone: '',
    password: ''
  });
  const [errorOpen, setErrorOpen] = useState(false);

  const [isEmailUnique] = useLazyQuery(IS_VENDOR_EMAIL_USED);

  const [isUsernameUnique] = useLazyQuery(IS_VENDOR_USERNAME_USED);

  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(initialErrorState);

  const [signUp, { loading, error, data }] = useMutation(SIGN_UP);

  const handleChange =
    (accountInputProp: keyof AccountInput, errorMessageProp: keyof ErrorMessage) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setErrorMessage((oldErrorMessage) => ({ ...oldErrorMessage, [errorMessageProp]: "" }));
      setAccountInput({ ...accountInput, [accountInputProp]: event.target.value });
    };

  const handleErrorChange =
    (prop: keyof ErrorMessage, message: string) => {
      setErrorMessage((oldErrorMessage) => ({ ...oldErrorMessage, [prop]: message }));
    };

  const handleVerifyPasswordChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyPassword(event.target.value)
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorOpen(false);
  };

  const isValid = async () => {
    setErrorMessage(initialErrorState);
    let isAllValid = true
    if(accountInput.shopName.length === 0) {handleErrorChange("shopNameError", t('sign_up.shopName.errorMessage')); isAllValid = false}
    if(accountInput.username.length === 0) {handleErrorChange("usernameError", t('sign_up.username.errors.empty')); isAllValid = false}
    else {
     const response= await isUsernameUnique({variables: {username: accountInput.username}})
      if(response.loading) {
        //TODO: HANDLE LOADING
      } else if(response.error) {
        //TODO: HANDLE ERROR
      } else if(response.data.isVendorUsernameUsed) {
        {handleErrorChange("usernameError", t('sign_up.username.errors.used')); isAllValid = false}
      }
    }
    if(accountInput.address.length === 0) {handleErrorChange("addressError", t('sign_up.address.errorMessage')); isAllValid = false}
    if(accountInput.phone.length === 0) {handleErrorChange("phoneError", t('sign_up.phone.errorMessage')); isAllValid = false}
    if(accountInput.email.length === 0) {handleErrorChange("emailError", t('sign_up.email.errors.empty')); isAllValid = false}
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(accountInput.email)){
      handleErrorChange("emailError", t('sign_up.email.errors.formatError'));
      isAllValid = false
    }
    else {
      const response= await isEmailUnique({variables: {email: accountInput.email}})
      if(response.loading) {
        //TODO: HANDLE LOADING
      } else if(response.error) {
        //TODO: HANDLE ERROR
      } else if(response.data.isVendorEmailUsed) {
        {handleErrorChange("emailError", t('sign_up.email.errors.used')); isAllValid = false}
      }
    }
    if(accountInput.password.length === 0) {handleErrorChange("passwordError", t('sign_up.password.errorMessage')); isAllValid = false}
    if(verifyPassword !== accountInput.password) {handleErrorChange("verifyPasswordError", t('sign_up.confirmPassword.errorMessage')); isAllValid = false}
    return isAllValid
  }

  const handleCreateAccount = async () => {
    const is_valid = await isValid()
    if(is_valid){
      const response=await signUp({ variables: { accountInput: accountInput } })
      if(response.data.vendorSignUp.code === 200){
        navigate("/login")
      }else{
        setErrorOpen(true)
      }
    }
  }

  return(
    <Grid
      container
      xs={12}
      spacing={0}
      direction="column"
      className={classes.root}>
      <Grid container xs={4} className={classes.form} direction="column">
        <Grid container className={classes.innerForm}>
          <img src={logo} height={"80px"} width={"200px"}></img>
        </Grid>
        <Grid item direction="row" className={classes.innerForm}>
          <TextField
            variant='standard'
            color="warning"
            className={classes.input}
            placeholder={t('sign_up.shopName.placeholder')}
            value={accountInput.shopName}
            onChange={handleChange('shopName', 'shopNameError')}
            error = {errorMessage.shopNameError.length > 0}
            helperText = {errorMessage.shopNameError}
            />
        </Grid>
        <Grid item direction="row" className={classes.innerForm}>
          <TextField
            variant='standard'
            className={classes.input}
            color="warning"
            placeholder={t('sign_up.username.placeholder')}
            value={accountInput.username}
            onChange={handleChange('username', 'usernameError')}
            error = {errorMessage.usernameError.length > 0}
            helperText = {errorMessage.usernameError}
          />
          <TextField
            variant='standard'
            className={classes.input}
            color="warning"
            placeholder={t('sign_up.address.placeholder')}
            value={accountInput.address}
            onChange={handleChange('address', 'addressError')}
            error = {errorMessage.addressError.length > 0}
            helperText = {errorMessage.addressError}
          />
        </Grid>
        <Grid item direction="row" className={classes.innerForm}>
          <TextField
            variant='standard'
            className={classes.input}
            color="warning"
            placeholder={t('sign_up.email.placeholder')}
            value={accountInput.email}
            onChange={handleChange('email', 'emailError')}
            error = {errorMessage.emailError.length > 0}
            helperText = {errorMessage.emailError}
          />
          <TextField
            variant='standard'
            className={classes.input}
            color="warning"
            placeholder={t('sign_up.phone.placeholder')}
            value={accountInput.phone}
            onChange={handleChange('phone', 'phoneError')}
            error = {errorMessage.phoneError.length > 0}
            helperText = {errorMessage.phoneError}
          />
          {/* <PhoneInput
            className={classes.input}
            defaultCountry='CA'
            placeholder={t('sign_up.phone.placeholder')}
            value={accountInput.phone}
            onChange={(phoneNumber) => handleChange('phone', 'phoneError')}
            helperText = "TEST"
            /> */}
        </Grid>
        <Grid item direction="row" className={classes.innerForm}>
          <TextField
            variant='standard'
            className={classes.input}
            color="warning"
            placeholder={t('sign_up.password.placeholder')}
            type={'password'}
            value={accountInput.password}
            onChange={handleChange('password', 'passwordError')}
            error = {errorMessage.passwordError.length > 0}
            helperText = {errorMessage.passwordError}
            />
          <TextField
            variant='standard'
            className={classes.input}
            color="warning"
            type={'password'}
            value={verifyPassword}
            placeholder={t('sign_up.confirmPassword.placeholder')}
            onChange={handleVerifyPasswordChange()}
            error = {errorMessage.verifyPasswordError.length > 0}
            helperText = {errorMessage.verifyPasswordError}
            />
        </Grid>
        {false ? (
          <LoadingButton
            size="small"
            loading={false}
            variant="contained"
            style={{ background: '#ffa500', margin: '15px'}}
          >
            {t('sign_up.createAccount')}
          </LoadingButton>
          ) : (
          <Button
            variant="contained"
            style={{ background: '#ffa500', margin: '15px'}}
            onClick={handleCreateAccount}>
                {t('sign_up.createAccount')}
            </Button>
          )
        }
        <Snackbar
          open={errorOpen}
          autoHideDuration={6000}
          onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {t('sign_up.errorAccountCreation')}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  )
}

export default SignUp
