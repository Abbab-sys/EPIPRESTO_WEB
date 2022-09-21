import { Button, Grid, Input, styled, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import logo from '../../assets/logo.png';
import { useMutation } from '@apollo/client'
import { SIGN_UP } from '../../mutations';
import { useNavigate } from 'react-router-dom';

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
  },
  input: {
    margin: '15px',
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

const SignUp = () => {

  const classes = useStyles()
  const navigate = useNavigate()
  const [accountInput, setAccountInput] = useState<AccountInput>({
    shopName: '',
    username: '',
    address: '',
    email: '',
    phone: '',
    password: ''
  });

  const [signUp, { loading, error, data }] = useMutation(SIGN_UP);

  const handleChange =
    (prop: keyof AccountInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setAccountInput({ ...accountInput, [prop]: event.target.value });
    };
  
  const handleCreateAccount = async () => {
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

  return(
    <Grid 
      container
      xs={12} 
      spacing={0}
      direction="column"
      className={classes.root}>
      <Grid container xs={4} className={classes.form} direction="column">
        <img src={logo} height={"80px"} width={"200px"}></img>
        <Input 
          color="warning" 
          style={{ width: "100%", maxWidth: "-webkit-fill-available" }} 
          className={classes.input} 
          placeholder="Shop name" 
          value={accountInput.shopName} 
          onChange={handleChange('shopName')}
        />
        <Grid item direction="row" className={classes.innerForm}>
          <Input 
            className={classes.input} 
            color="warning" 
            placeholder="Username" 
            value={accountInput.username} 
            onChange={handleChange('username')}
          />
          <Input 
            className={classes.input}
            color="warning"
            placeholder="Address"
            value={accountInput.address}
            onChange={handleChange('address')}
          />
        </Grid>
        <Grid item direction="row" className={classes.innerForm}>
          <Input 
            className={classes.input}
            color="warning"
            placeholder="Email"
            value={accountInput.email}
            onChange={handleChange('email')}
          />
          <Input
            className={classes.input}
            color="warning"
            placeholder="Phone"
            value={accountInput.phone}
            onChange={handleChange('phone')}
          />
        </Grid>
        <Grid item direction="row" className={classes.innerForm}>
          <Input 
            className={classes.input}
            color="warning"
            placeholder="Password"
            type={'password'}
            value={accountInput.password}
            onChange={handleChange('password')}/>
          <Input 
            className={classes.input}
            color="warning"
            type={'password'}
            placeholder="Confirm Password"/>
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