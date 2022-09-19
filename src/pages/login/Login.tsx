import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Button, Grid, IconButton, Input, InputAdornment, Link } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useQuery } from '@apollo/client/react';
import { LOGIN } from '../../queries';

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(135deg, rgb(255, 88, 88), rgb(240, 152, 25))",
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
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
  input: {
    margin: '15px',
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

const Login = () => {

  const classes = useStyles()
  const navigate = useNavigate()
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

  const handleLogin = () => {
    console.log(data)
    if(loading) {
      //TODO: HANDLE LOADING
    } else if(error){
      //TODO: HANDLE WRONG EMAIL OR PASSWORD
    } else if(data.loginVendor != null){
      navigate("/synchronisation")
    }
  }

  console.log(credentials)
  return(
    <Grid 
      container
      xs={12} 
      spacing={0}
      direction="column"
      className={classes.root}>
      <Grid item xs={3} className={classes.form} direction="column">
        <img src={logo} height={"80px"} width={"200px"}></img>
        <Input
          className={classes.input}
          color="warning"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange('email')}/>
        <Input 
          className={classes.input}
          color="warning"
          placeholder="Password"
          type={
            credentials.showPassword ? 'text' : 
            'password'}
          value={credentials.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {credentials.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          />
        <Button 
          variant="contained" 
          style={{ background: '#ffa500', margin: '15px'}}
          onClick={handleLogin}>
            LOG IN
        </Button>
        {/* <Typography className={classes.input} display="inline-block">
          New to Épipresto? */}
          <Link className={classes.link} onClick={handleCreateAccount}>
            {'Create an account'}
          </Link>
        {/* </Typography> */}
      </Grid>
    </Grid>
  )
}

export default Login