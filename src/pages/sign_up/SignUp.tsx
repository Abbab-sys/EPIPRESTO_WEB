import { Button, Grid, Input, styled, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import logo from '../../assets/logo.png';

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

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      bottomBorderColor: 'red',
    },
    '&:hover fieldset': {
      bottomBorderColor: '#ffa500',
    },
    '&.Mui-focused fieldset': {
      bottomBorderColor: '#ffa500',
    },
  },
});

interface State {
  shopName: string;
  userName: string;
  address: string;
  email: string;
  phone: string;
  password: string;
  showPassword: boolean;
}

const SignUp = () => {

  const classes = useStyles()
  const [values, setValues] = useState<State>({
    shopName: '',
    userName: '',
    address: '',
    email: '',
    phone: '',
    password: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return(
    <Grid 
      container
      xs={12} 
      spacing={0}
      direction="column"
      className={classes.root}>
      <Grid container xs={4} className={classes.form} direction="column">
        <img src={logo} height={"80px"} width={"200px"}></img>
        <Input color="warning" style={{ width: "100%", maxWidth: "-webkit-fill-available" }} className={classes.input} placeholder="Shop name" 
        value={values.shopName} onChange={handleChange('shopName')}/>
        <Grid item direction="row" className={classes.innerForm}>
          <Input className={classes.input} color="warning" placeholder="Username" value={values.userName} onChange={handleChange('userName')}/>
          <Input className={classes.input} color="warning" placeholder="Address" value={values.address} onChange={handleChange('address')}/>
        </Grid>
        <Grid item direction="row" className={classes.innerForm}>
          <Input className={classes.input} color="warning" placeholder="Email" value={values.email} onChange={handleChange('email')}/>
          <Input className={classes.input} color="warning" placeholder="Phone" value={values.phone} onChange={handleChange('phone')}/>
        </Grid>
        <Grid item direction="row" className={classes.innerForm}>
          <Input 
            className={classes.input}
            color="warning"
            placeholder="Password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}/>
          <Input className={classes.input} color="warning" placeholder="Confirm Password"/>
        </Grid>
        <Button variant="contained" style={{ background: '#ffa500', margin: '15px'}}>
            Create account
        </Button>
      </Grid>
    </Grid>
  )
}

export default SignUp