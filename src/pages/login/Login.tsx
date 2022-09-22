import { Button, Grid, Link, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useQuery } from '@apollo/client/react';
import { LOGIN } from '../../queries';
import { VendorContext } from '../../context/Vendor';
import { useTranslation } from 'react-i18next';
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
    boxShadow:"0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
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
  emailError:string;
  passwordError:string;
}

const initialErrorState: ErrorMessage = {
  emailError: '',
  passwordError: '',
}

const Login = () => {
  const { t } = useTranslation('translation')
  const classes = useStyles()
  const navigate = useNavigate()
  const state = useContext(VendorContext)
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
    showPassword: false,
  })

  const { loading, error, data } = useQuery(LOGIN, {
    variables: { email: credentials.email, password: credentials.password }
  },);

  const handleChange =
    (prop: keyof Credentials) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials({ ...credentials, [prop]: event.target.value });
  };

  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(initialErrorState);

  const handleErrorChange =
    (prop: keyof ErrorMessage, message: string) => {
      setErrorMessage((oldErrorMessage) => ({ ...oldErrorMessage, [prop]: message }));
    };

  const handleClickShowPassword = () => {
    setCredentials({
      ...credentials,
      showPassword: !credentials.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleCreateAccount = () => {
    navigate("/sign-up")
  }

  const isValid = () => {
    setErrorMessage(initialErrorState);
    let isAllValid = true
    if(credentials.email.length === 0) {handleErrorChange("emailError", t('login.errorMessages.emailError')); isAllValid = false}
    if(credentials.password.length === 0) {handleErrorChange("passwordError", t('login.errorMessages.passwordError')); isAllValid = false}
    return isAllValid
  }

  const handleLogin = () => {
    if(isValid()){
      // await login({variables: {email: credentials.email, password: credentials.password}})
      if(loading) {
        //TODO: HANDLE LOADING
      } else if(error){
        //TODO: HANDLE WRONG EMAIL OR PASSWORD
        console.log(error)
      } else {
        state.setStoreId(data.loginVendor.store._id)
        navigate("/synchronization")
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
          className={classes.input}
          color="warning"
          placeholder={t('login.email')}
          value={credentials.email}
          onChange={handleChange('email')}
          error = {errorMessage.emailError.length > 0}
          helperText = {errorMessage.emailError}
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
          onChange={handleChange('password')}
          error = {errorMessage.passwordError.length > 0}
          helperText = {errorMessage.passwordError}
          />
          <Button 
            variant="contained" 
            style={{ background: '#ffa500', margin: '15px'}}
            onClick={handleLogin}>
              {t('login.login')}
          </Button>  
        {/* <Typography className={classes.input} display="inline-block">
          New to Épipresto? */}
          <Link style={{ margin: '15px'}} className={classes.link} onClick={handleCreateAccount}>
            {t('login.createAccount')}
          </Link>
        {/* </Typography> */}
      </Grid>
    </Grid>
  )
}

export default Login