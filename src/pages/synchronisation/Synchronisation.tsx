import { Button, Grid, Input, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';
import shopify_logo from '../../assets/shopify_logo.png';
import woocommerce_logo from '../../assets/woocommerce_logo.png';
import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { SYNCH_SHOPIFY } from '../../mutations';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';

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
  shopConsumerKey: string,
  shopConsumerSecret: string
}

const Synchronisation = () => {
  const { t } = useTranslation('translation')
  const classes = useStyles();
  const [apiType, setApiType] = useState<ApiType>(ApiType.SHOPIFY)
  const [shopifyCreds, setShopifyCreds] = useState<ShopifyInput>({
    apiToken: '',
    shopDomain: ''
  });
  const [woocommerceCreds, setWoocommerceCreds] = useState<WoocommerceInput>({
    shopDomain: '',
    shopConsumerKey: '',
    shopConsumerSecret: ''
  })
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

  const handleShopifyChange = (prop: keyof ShopifyInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setShopifyCreds({ ...shopifyCreds, [prop]: event.target.value });
  };

  const handleWoocommerceChange = (prop: keyof WoocommerceInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setWoocommerceCreds({ ...woocommerceCreds, [prop]: event.target.value });
  };

  const handleSynchronisation = () => {
    synchronize({ variables: { shopifyCreds : shopifyCreds } })
    if(loading) {
      //TODO: HANDLE LOADING
    } else if(error){
      //TODO: HANDLE WRONG EMAIL OR PASSWORD
      console.log(error)
    } else if(data != null){
      console.log(data)
    }
  }

  console.log(shopifyCreds)

  return(
    <Grid
      container
      xs={12} 
      spacing={0}
      direction="column"
      className={classes.root}>
      {/* {loading && (<CircularProgress />)} */}
      <Grid item xs={5} className={classes.form} direction="column">
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
            <Grid item className={classes.innerForm} direction="column">
              <Input
                color="warning"
                placeholder={t('synchronization.shopify.apiToken')}
                value={shopifyCreds.apiToken}
                onChange={handleShopifyChange('apiToken')}
                className={classes.input}
                ></Input>
              <Input
                color="warning"
                placeholder={t('synchronization.domainName')}
                value={shopifyCreds.shopDomain}
                onChange={handleShopifyChange('shopDomain')}
                className={classes.input}
                ></Input>
              </Grid>
          )}
          {apiType === ApiType.WOOCOMMERCE && (
            <Grid item className={classes.innerForm} direction="column">
              <Input
                color="warning"
                placeholder={t('synchronization.domainName')}
                value={woocommerceCreds.shopDomain}
                onChange={handleWoocommerceChange('shopDomain')}
                className={classes.input}
                ></Input>
              <Input
                color="warning"
                placeholder={t('synchronization.woocommerce.consumerKey')}
                value={woocommerceCreds.shopConsumerKey}
                onChange={handleWoocommerceChange('shopConsumerKey')}
                className={classes.input}
                ></Input>
                <Input
                color="warning"
                placeholder={t('synchronization.woocommerce.consumerSecret')}
                value={woocommerceCreds.shopConsumerSecret}
                onChange={handleWoocommerceChange('shopConsumerSecret')}
                className={classes.input}
                ></Input>
            </Grid>
          )}
          <Button
            variant="contained" 
            style={{ background: '#ffa500', margin: '15px'}}
            onClick={handleSynchronisation}>
            {t('synchronization.synchronize')}
          </Button>
      </Grid>
    </Grid>
  )

}

export default Synchronisation