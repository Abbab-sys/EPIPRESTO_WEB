import { Button, Grid, Input, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';
import shopify_logo from '../../assets/shopify_logo.png';
import woocommerce_logo from '../../assets/woocommerce_logo.png';
import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { SYNCH_SHOPIFY } from '../../mutations';
import { VendorContext } from '../../context/Vendor';

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
    '&.Mui-selected': {
      background: 'linear-gradient(135deg, rgb(255, 88, 88), rgb(240, 152, 25)) !important'
    }
  },
  input: {
    margin: '15px',
    width: "87%"
  }
})

enum ApiType {
  SHOPIFY="SHOPIFY",
  WOOCOMMERCE="WOOCOMMERCE"
}

interface SynchronizeInput {
  apiToken: string,
  shopDomain: string
}

const Synchronisation = () => {

  const classes = useStyles();
  const { storeId, setStoreId } = useContext(VendorContext)
  const [apiType, setApiType] = useState<ApiType>(ApiType.SHOPIFY)
  const [synchronizeInput, setSynchronizeInput] = useState<SynchronizeInput>({
    apiToken: '',
    shopDomain: ''
  });
  const [synchronize, { loading, error, data }] = useMutation(SYNCH_SHOPIFY);

  const handleApi = () => (
    event: React.MouseEvent<HTMLElement>,
    api: ApiType,
  ) => {
    console.log(api)
    if(api !== null){
      setApiType(api);
    }
  };

  const handleChange = (prop: keyof SynchronizeInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if(prop === 'apiToken') setStoreId(event.target.value)
    setSynchronizeInput({ ...synchronizeInput, [prop]: event.target.value });
  };

  return(
    <Grid
      container
      xs={12} 
      spacing={0}
      direction="column"
      className={classes.root}>
      <Grid item xs={3} className={classes.form} direction="column">
        <ToggleButtonGroup 
          value={apiType}
          exclusive
          onChange={handleApi()}
          style={{ margin: '15px'}}
          >
          <ToggleButton defaultChecked value={ApiType.SHOPIFY} className={classes.api}>
            <img src={shopify_logo} height={"100px"} width={"100px"}/>
          </ToggleButton>
          <ToggleButton value={ApiType.WOOCOMMERCE} className={classes.api}>
            <img src={woocommerce_logo} height={"100px"} width={"100px"}/>
          </ToggleButton>
          </ToggleButtonGroup>
          <Input
            color="warning"
            placeholder="API Token"
            value={synchronizeInput.apiToken}
            onChange={handleChange('apiToken')}
            className={classes.input}
          ></Input>
          {apiType === ApiType.SHOPIFY &&(
            <Input
              color="warning"
              placeholder="Domain name"
              value={synchronizeInput.shopDomain}
              onChange={handleChange('shopDomain')}
              className={classes.input}
              ></Input>
          )}
          <Button
            variant="contained" 
            style={{ background: '#ffa500', margin: '15px'}}
            onClick={() => 
              synchronize({
                variables: { shopifyCreds : synchronizeInput } 
              })
            }>
            SYNCHRONISE
          </Button>
      </Grid>
    </Grid>
  )

}

export default Synchronisation