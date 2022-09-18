import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { makeStyles } from '@mui/styles';
import shopify_logo from '../../assets/shopify_logo.png'
import woocommerce_logo from '../../assets/woocommerce_logo.png'
import React, { useState } from 'react'

const useStyles = makeStyles({
  root: {
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
  api: {
    // height: "100px",
    // width: "100px",
  }
})

const Synchronisation = () => {

  const classes = useStyles();

  const [alignment, setAlignment] = useState<string | null>('left');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };

  return(
    <Grid
      container
      xs={12} 
      spacing={0}
      direction="column">
      <Grid item xs={3} className={classes.form} direction="column">
        <ToggleButtonGroup 
          value={alignment}
          exclusive
          onChange={handleAlignment}
          color="primary">
          <ToggleButton value="shopify" className={classes.api}>
            <img src={shopify_logo} height={"100px"} width={"100px"}/>
          </ToggleButton>
          <ToggleButton value="woocomerce" className={classes.api}>
            <img src={woocommerce_logo} height={"100px"} width={"100px"}/>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  )

}

export default Synchronisation