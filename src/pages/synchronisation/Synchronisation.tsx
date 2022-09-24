import { Alert, Button, Grid, Input, Snackbar, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';
import shopify_logo from '../../assets/shopify_logo.png';
import woocommerce_logo from '../../assets/woocommerce_logo.png';
import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { SYNCH_SHOPIFY, SYNCH_WOOCOMMERCE } from '../../mutations';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
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
    margin: '15px !important',
    width: "87%"
  },
  innerForm: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    maxWidth: "-webkit-fill-available"
  },
})

enum ApiType {
  SHOPIFY="SHOPIFY",
  WOOCOMMERCE="WOOCOMMERCE"
}

interface ShopifyInput {
  apiToken: string,
  shopDomain: string
}

interface WoocommerceInput {
  shopDomain: string,
  consumerKey: string,
  consumerSecretKey: string
}

interface ErrorMessage {
  apiTokenError: string;
  shopDomainShopifyError: string;
  shopDomainWooError: string;
  shopConsumerKeyError: string;
  shopConsumerSecretError: string;
}

const initialErrorState: ErrorMessage = {
  apiTokenError: '',
  shopDomainShopifyError: '',
  shopDomainWooError: '',
  shopConsumerKeyError: '',
  shopConsumerSecretError: ''
}

const Synchronisation = () => {
  const { t } = useTranslation('translation')
  const classes = useStyles();
  const state = useContext(VendorContext)
  const [apiType, setApiType] = useState<ApiType>(ApiType.SHOPIFY);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(initialErrorState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [synchError, setSynchError] = useState(false);
  const [shopifyCreds, setShopifyCreds] = useState<ShopifyInput>({
    apiToken: '',
    shopDomain: ''
  });
  const [woocommerceCreds, setWoocommerceCreds] = useState<WoocommerceInput>({
    shopDomain: '',
    consumerKey: '',
    consumerSecretKey: ''
  })
  const [synchronizeShopifyStore] = useMutation(SYNCH_SHOPIFY);

  const [synchronizeWoocommerceStore] = useMutation(SYNCH_WOOCOMMERCE);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleApi = () => (
    event: React.MouseEvent<HTMLElement>,
    api: ApiType,
  ) => {
    setErrorMessage(initialErrorState);
    if(api !== null){
      setApiType(api);
    }
  };

  const handleErrorChange =
    (prop: keyof ErrorMessage, message: string) => {
      setErrorMessage((oldErrorMessage) => ({ ...oldErrorMessage, [prop]: message }));
    };


  const handleShopifyChange = (shopifyInputProp: keyof ShopifyInput, errorProp: keyof ErrorMessage) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage((oldErrorMessage) => ({ ...oldErrorMessage, [errorProp]: "" }));
    setShopifyCreds({ ...shopifyCreds, [shopifyInputProp]: event.target.value });
  };

  const handleWoocommerceChange = (wooInputProp: keyof WoocommerceInput, errorProp: keyof ErrorMessage) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage((oldErrorMessage) => ({ ...oldErrorMessage, [errorProp]: "" }));
    setWoocommerceCreds({ ...woocommerceCreds, [wooInputProp]: event.target.value });
  };

  const isValid = () =>{
      setErrorMessage(initialErrorState);
      let isAllValid = true
      if(apiType === ApiType.SHOPIFY){
        if (shopifyCreds.apiToken.length === 0) {handleErrorChange('apiTokenError', t('synchronization.shopify.apiToken.errorMessage')); isAllValid = false}
        if (shopifyCreds.shopDomain.length === 0) {handleErrorChange('shopDomainShopifyError', t('synchronization.domainName.errorMessage')); isAllValid = false}
      }else{
        if (woocommerceCreds.shopDomain.length === 0) {handleErrorChange('shopDomainWooError', t('synchronization.domainName.errorMessage')); isAllValid = false}
        if (woocommerceCreds.consumerKey.length === 0) {handleErrorChange('shopConsumerKeyError', t('synchronization.woocommerce.consumerKey.errorMessage')); isAllValid = false}
        if (woocommerceCreds.consumerSecretKey.length === 0) {handleErrorChange('shopConsumerSecretError', t('synchronization.woocommerce.consumerSecret.errorMessage')); isAllValid = false}
      }
      return isAllValid
  }

  const handleSynchronisation = async () => {
    if(isValid()){
      if(apiType === ApiType.SHOPIFY) {
        const shopifySynchResponse = await synchronizeShopifyStore({ variables: { shopifyCreds : shopifyCreds } })
        if(shopifySynchResponse.data.synchronizeShopifyStore.code === 200){
          setSynchError(false)
        } else {
          setSynchError(true)
        }
        setSnackbarOpen(true)
      } else {
        const woocommerceSynchResponse = await synchronizeWoocommerceStore({ variables: { woocommerceCreds : woocommerceCreds } })
        if(woocommerceSynchResponse.data.synchronizeWoocommerceStore.code === 200){
          setSynchError(false)
        } else {
          setSynchError(true)
        }
        setSnackbarOpen(true)
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
      <Grid container xs={3} className={classes.form} direction="column">
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
        {apiType === ApiType.SHOPIFY && (
          <Grid container className={classes.innerForm} direction="column">
            <TextField
              color="warning"
              placeholder={t('synchronization.shopify.apiToken.placeholder')}
              value={shopifyCreds.apiToken}
              onChange={handleShopifyChange('apiToken', 'apiTokenError')}
              className={classes.input}
              error = {errorMessage.apiTokenError.length > 0}
              helperText = {errorMessage.apiTokenError}
              ></TextField>
            <TextField
              color="warning"
              placeholder={t('synchronization.domainName.placeholder')}
              value={shopifyCreds.shopDomain}
              onChange={handleShopifyChange('shopDomain', 'shopDomainShopifyError')}
              className={classes.input}
              error = {errorMessage.shopDomainShopifyError.length > 0}
              helperText = {errorMessage.shopDomainShopifyError}
              ></TextField>
            </Grid>
        )}
        {apiType === ApiType.WOOCOMMERCE && (
          <Grid container className={classes.innerForm} direction="column">
            <TextField
              color="warning"
              placeholder={t('synchronization.domainName.placeholder')}
              value={woocommerceCreds.shopDomain}
              onChange={handleWoocommerceChange('shopDomain', 'shopDomainWooError')}
              className={classes.input}
              error = {errorMessage.shopDomainWooError.length > 0}
              helperText = {errorMessage.shopDomainWooError}
              ></TextField>
            <TextField
              color="warning"
              placeholder={t('synchronization.woocommerce.consumerKey.placeholder')}
              value={woocommerceCreds.consumerKey}
              onChange={handleWoocommerceChange('consumerKey', 'shopConsumerKeyError')}
              className={classes.input}
              error = {errorMessage.shopConsumerKeyError.length > 0}
              helperText = {errorMessage.shopConsumerKeyError}
              ></TextField>
              <TextField
              color="warning"
              placeholder={t('synchronization.woocommerce.consumerSecret.placeholder')}
              value={woocommerceCreds.consumerSecretKey}
              onChange={handleWoocommerceChange('consumerSecretKey', 'shopConsumerSecretError')}
              className={classes.input}
              error = {errorMessage.shopConsumerSecretError.length > 0}
              helperText = {errorMessage.shopConsumerSecretError}
              ></TextField>
          </Grid>
        )}
        <Button
          variant="contained" 
          style={{ background: '#ffa500', margin: '15px'}}
          onClick={handleSynchronisation}>
          {t('synchronization.synchronize')}
        </Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}>
          <Alert onClose={handleClose} severity={synchError ? "error" : "success"} sx={{ width: '100%' }}>
            {synchError ? (
              t('synchronization.error')
            ) : (
              t('synchronization.success')
            )}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  )

}

export default Synchronisation