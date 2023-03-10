import {Button, Grid, TextField, ToggleButton, ToggleButtonGroup} from '@mui/material';
import shopify_logo from '../../assets/shopify_logo.png';
import woocommerce_logo from '../../assets/woocommerce_logo.png';
import React, {useReducer} from 'react';
import {useMutation} from '@apollo/client';
import {SYNC_SHOPIFY, SYNC_WOOCOMMERCE} from '../../graphql/mutations';
import {useTranslation} from 'react-i18next';
import {synchronisationStyles} from "./SynchronisationStyles";
import {
  SYNCHRONIZATION_DOMAIN_NAME_PLACEHOLDER_KEY,
  SYNCHRONIZATION_ERROR_KEY,
  SYNCHRONIZATION_KEY,
  SYNCHRONIZATION_SHOPIFY_API_TOKEN_PLACEHOLDER_KEY,
  SYNCHRONIZATION_SUCCESS_KEY,
  SYNCHRONIZATION_WOOCOMMERCE_CONSUMER_KEY_PLACEHOLDER_KEY,
  SYNCHRONIZATION_WOOCOMMERCE_CONSUMER_SECRET_PLACEHOLDER_KEY
} from "../../translations/keys/SynchronizationKeys";
import {ApiType} from "../../enums/SynchronizationEnums";
import {syncCredentialsReducer} from "./reducers/SyncCredentialsReducer";
import {initialSyncCredentialsStateReducer, SyncCredentialsReducerState} from "./reducers/SyncCredentialsReducerState";
import {useSnackbar} from "../../hooks/UiHooks/UiHooks";

/*
 * Name: Synchronization Page
 * Description: This file contains the synchronization page
 * Author: Adam Naoui, Alessandro van Reusel and Zouhair Derouich
 */

const Synchronisation = () => {
  const {t: translation} = useTranslation('translation')
  const classesStyles = synchronisationStyles();

  const [syncStatusSnackbar, {
    open: openSyncStatusSnackbar,
    update: updateSyncStatusSnackbar
  }] = useSnackbar({
    severity: 'error',
    messageTranslationKey: SYNCHRONIZATION_ERROR_KEY
  })

  const [{shopifyCredentials, errorMessage, apiType, woocommerceCredentials}, dispatchCredentialsState]
    = useReducer(syncCredentialsReducer, initialSyncCredentialsStateReducer);

  const [synchronizeShopifyStore] = useMutation(SYNC_SHOPIFY);
  const [synchronizeWoocommerceStore] = useMutation(SYNC_WOOCOMMERCE);

  function areAllCredentialsFieldsValid(credsState: SyncCredentialsReducerState): boolean {
    if (credsState.apiType === ApiType.SHOPIFY) {
      return credsState.shopifyCredentials.apiToken !== "" && credsState.shopifyCredentials.shopDomain !== "";
    }
    return credsState.woocommerceCredentials.consumerKey !== "" && credsState.woocommerceCredentials.consumerSecretKey !== "" && credsState.woocommerceCredentials.shopDomain !== "";
  }

  const handleSynchronisation = async () => {
    dispatchCredentialsState({type: 'CHECK_CREDENTIALS'})
    const areCredentialsValid = areAllCredentialsFieldsValid({
      apiType,
      shopifyCredentials,
      woocommerceCredentials,
      errorMessage
    });
    if (areCredentialsValid) {
      let syncResponse = (apiType === ApiType.SHOPIFY)
        ? await synchronizeShopifyStore({variables: {shopifyCreds: shopifyCredentials}})
        : await synchronizeWoocommerceStore({variables: {woocommerceCreds: woocommerceCredentials}})
      const syncSuccess = syncResponse.data.synchronizeShopifyStore.code === 200
      openSyncStatusSnackbar()
      if (syncSuccess) {
        updateSyncStatusSnackbar({
          messageTranslationKey: SYNCHRONIZATION_SUCCESS_KEY,
          severity: "success"
        })
        return
      }
      updateSyncStatusSnackbar({
        messageTranslationKey: SYNCHRONIZATION_ERROR_KEY,
        severity: "error"
      })
      return
    }
    openSyncStatusSnackbar()
  }

  document.onkeydown = (event) => {
    if (event.key === "Enter") handleSynchronisation().then((r) => console.log(r))
  }

  return (
    <Grid
      container
      xs={12}
      spacing={0}
      direction="column"
      className={classesStyles.root}>
      <Grid container xs={4} className={classesStyles.form} direction="column">
        <Grid item direction="row" className={classesStyles.innerForm}>

          <ToggleButtonGroup
            value={apiType}
            exclusive
            onChange={(event, newApiType) => {
              dispatchCredentialsState({type: 'CHANGE_API', newApi: newApiType})
            }}
            style={{margin: '15px'}}
          >
            <ToggleButton defaultChecked value={ApiType.SHOPIFY} className={classesStyles.api}>
              <img src={shopify_logo} height={"100px"} width={"100px"} alt={"Shopify logo"}/>
            </ToggleButton>
            <ToggleButton value={ApiType.WOOCOMMERCE} className={classesStyles.api}>
              <img src={woocommerce_logo} height={"100px"} width={"100px"} alt={"Woocommerce logo"}/>
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        {apiType === ApiType.SHOPIFY && (
          <>
            <Grid item direction="row" className={classesStyles.innerForm}>
              <TextField
                color="warning"
                placeholder={translation(SYNCHRONIZATION_SHOPIFY_API_TOKEN_PLACEHOLDER_KEY)}
                value={shopifyCredentials.apiToken}
                onChange={(event) => dispatchCredentialsState({
                  type: 'CHANGE_SHOPIFY_API_TOKEN',
                  newApiToken: event.target.value
                })}
                className={classesStyles.input}
                error={errorMessage.apiTokenError.length > 0}
                helperText={errorMessage.apiTokenError.length > 0 ? translation(errorMessage.apiTokenError) : ""}
              ></TextField>
            </Grid>
            <Grid item direction="row" className={classesStyles.innerForm}>
              <TextField
                color="warning"
                placeholder={translation(SYNCHRONIZATION_DOMAIN_NAME_PLACEHOLDER_KEY)}
                value={shopifyCredentials.shopDomain}
                onChange={(event) => dispatchCredentialsState({
                  type: 'CHANGE_SHOPIFY_DOMAIN_NAME',
                  newDomainName: event.target.value
                })}
                className={classesStyles.input}
                error={errorMessage.shopDomainShopifyError.length > 0}
                helperText={errorMessage.shopDomainShopifyError.length > 0 ? translation(errorMessage.shopDomainShopifyError) : ""}
              ></TextField>
            </Grid>
          </>
        )}
        {apiType === ApiType.WOOCOMMERCE && (
          <>
            <Grid item className={classesStyles.innerForm} direction="row">
              <TextField
                color="warning"
                placeholder={translation(SYNCHRONIZATION_DOMAIN_NAME_PLACEHOLDER_KEY)}
                value={woocommerceCredentials.shopDomain}
                onChange={(event) => dispatchCredentialsState({
                  type: 'CHANGE_WOOCOMMERCE_DOMAIN_NAME',
                  newDomainName: event.target.value
                })}
                className={classesStyles.input}
                error={errorMessage.shopDomainWooError.length > 0}
                helperText={errorMessage.shopDomainWooError.length > 0 ? translation(errorMessage.shopDomainWooError) : ""}
              ></TextField>
            </Grid>
            <Grid item className={classesStyles.innerForm} direction="row">
              <TextField
                color="warning"
                placeholder={translation(SYNCHRONIZATION_WOOCOMMERCE_CONSUMER_KEY_PLACEHOLDER_KEY)}
                value={woocommerceCredentials.consumerKey}
                onChange={(event) => dispatchCredentialsState({
                  type: 'CHANGE_WOOCOMMERCE_CONSUMER_KEY',
                  newConsumerKey: event.target.value
                })}
                className={classesStyles.input}
                error={errorMessage.shopConsumerKeyError.length > 0}
                helperText={errorMessage.shopConsumerKeyError.length > 0 ? translation(errorMessage.shopConsumerKeyError) : ""}
              ></TextField>
            </Grid>
            <Grid item className={classesStyles.innerForm} direction="row">
              <TextField
                color="warning"
                placeholder={translation(SYNCHRONIZATION_WOOCOMMERCE_CONSUMER_SECRET_PLACEHOLDER_KEY)}
                value={woocommerceCredentials.consumerSecretKey}
                onChange={(event) => dispatchCredentialsState({
                  type: 'CHANGE_WOOCOMMERCE_CONSUMER_SECRET_KEY',
                  newConsumerSecretKey: event.target.value
                })}
                className={classesStyles.input}
                error={errorMessage.shopConsumerSecretError.length > 0}
                helperText={errorMessage.shopConsumerSecretError.length > 0 ? translation(errorMessage.shopConsumerSecretError) : ""}
              ></TextField>
            </Grid>
          </>
        )}
        <Button
          variant="contained"
          style={{background: '#ffa500', margin: '15px'}}
          onClick={handleSynchronisation}>
          {translation(SYNCHRONIZATION_KEY)}
        </Button>
        {syncStatusSnackbar}
      </Grid>
    </Grid>
  )

}

export default Synchronisation
