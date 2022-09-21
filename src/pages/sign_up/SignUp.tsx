import { Button, Grid, Input, styled, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import logo from '../../assets/logo.png';
import { useMutation, useQuery } from '@apollo/client'
import { SIGN_UP } from '../../mutations';
import { useNavigate } from 'react-router-dom';
import { IS_VENDOR_EMAIL_USED, IS_VENDOR_USERNAME_USED } from '../../queries';

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
    maxWidth: "-webkit-fill-available"
  },
  input: {
    margin: '15px !important',
    // '& .MuiOutlinedInput-root': {
    //   '&:hover': {
    //     color: '#ffa500',
    //   },
    // },
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

  const { loading: emailLoading, error: emailError, data: emailData } = 
    useQuery(IS_VENDOR_EMAIL_USED, {
      variables: { email: accountInput.email }
    },);

  const { loading: usernameLoading, error: usernameError, data: usernameData } = 
    useQuery(IS_VENDOR_USERNAME_USED, {
      variables: { username: accountInput.username }
    },);

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

  const isValid = async () => {
    setErrorMessage(initialErrorState);
    console.log(usernameData)
    let isAllValid = true
    if(accountInput.shopName.length === 0) {handleErrorChange("shopNameError", "Veuillez saisir le nom de votre magasin"); isAllValid = false}
    if(accountInput.username.length === 0) {handleErrorChange("usernameError", "Veuillez saisir un pseudonyme"); isAllValid = false}
    else if(usernameLoading) {
      //TODO: HANDLE LOADING
    } else if(usernameError) {
      //TODO: HANDLE ERROR
    } else if(usernameData.isVendorUsernameUsed) {
      {handleErrorChange("usernameError", "Ce pseudonyme est déjà utilisé"); isAllValid = false}
    }
    if(accountInput.address.length === 0) {handleErrorChange("addressError", "Veuillez saisir l'adresse de votre magasin"); isAllValid = false}
    if(accountInput.phone.length === 0) {handleErrorChange("phoneError", "Veuillez saisir votre numéro de téléphone"); isAllValid = false}
    if(accountInput.email.length === 0) {handleErrorChange("emailError", "Veuillez saisir votre email"); isAllValid = false}
    else if(emailLoading) {
      //TODO: HANDLE LOADING
    } else if(emailError) {
      //TODO: HANDLE ERROR
    } else if(emailData.isVendorEmailUsed) {
      {handleErrorChange("emailError", "Cet email est déjà utilisé"); isAllValid = false}
    }
    if(accountInput.password.length === 0) {handleErrorChange("passwordError", "Veuillez saisir un mot de passe"); isAllValid = false}
    if(verifyPassword !== accountInput.password) {handleErrorChange("verifyPasswordError", "Le mot de passe de confirmation n'a pas le même mot de passe"); isAllValid = false}
    return isAllValid
  }
  
  const handleCreateAccount = async () => {
    if(await isValid()){
      await signUp({ variables: { accountInput: accountInput } })
      console.log(data)
      if(loading) {
        //TODO: HANDLE LOADING
      } else if(error){
        //TODO: HANDLE WRONG EMAIL OR PASSWORD
        console.log(error)
      } else if(data != null){
        navigate("/login")
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
      <Grid container xs={5} className={classes.form} direction="column">
        <img src={logo} height={"80px"} width={"200px"}></img>
        <TextField
          variant='standard'
          color="warning"
          style={{ width: "80%", maxWidth: "-webkit-fill-available" }} 
          className={classes.input} 
          placeholder="Shop name" 
          value={accountInput.shopName} 
          onChange={handleChange('shopName', 'shopNameError')}
          error = {errorMessage.shopNameError.length > 0}
          helperText = {errorMessage.shopNameError}
        />
        <Grid item direction="row" className={classes.innerForm}>
          <TextField 
            variant='standard'
            className={classes.input} 
            color="warning" 
            placeholder="Username" 
            value={accountInput.username} 
            onChange={handleChange('username', 'usernameError')}
            error = {errorMessage.usernameError.length > 0}
            helperText = {errorMessage.usernameError}
          />
          <TextField 
            variant='standard'
            className={classes.input}
            color="warning"
            placeholder="Address"
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
            placeholder="Email"
            value={accountInput.email}
            onChange={handleChange('email', 'emailError')}
            error = {errorMessage.emailError.length > 0}
            helperText = {errorMessage.emailError}
          />
          <TextField
            variant='standard'
            className={classes.input}
            color="warning"
            placeholder="Phone"
            value={accountInput.phone}
            onChange={handleChange('phone', 'phoneError')}
            error = {errorMessage.phoneError.length > 0}
            helperText = {errorMessage.phoneError}
          />
        </Grid>
        <Grid item direction="row" className={classes.innerForm}>
          <TextField 
            variant='standard'
            className={classes.input}
            color="warning"
            placeholder="Password"
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
            placeholder="Confirm Password"
            onChange={handleVerifyPasswordChange()}
            error = {errorMessage.verifyPasswordError.length > 0}
            helperText = {errorMessage.verifyPasswordError}
            />
        </Grid>
        <Button 
          variant="contained"
          style={{ background: '#ffa500', margin: '15px'}}
          onClick={handleCreateAccount}>
            Create account
        </Button>
      </Grid>
    </Grid>
  )
}

export default SignUp