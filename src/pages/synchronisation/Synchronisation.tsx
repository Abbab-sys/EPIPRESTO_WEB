import {Alert, Button, Grid, Snackbar, TextField, ToggleButton, ToggleButtonGroup} from '@mui/material';
import shopify_logo from '../../assets/shopify_logo.png';
import woocommerce_logo from '../../assets/woocommerce_logo.png';
import React, {useReducer, useState} from 'react';
import {useMutation} from '@apollo/client';
import {SYNC_SHOPIFY, SYNC_WOOCOMMERCE} from '../../mutations';
import {useTranslation} from 'react-i18next';
import {synchronisationStyles} from "./SynchronisationStyles";
import {
    SYNCHRONIZATION_DOMAIN_NAME_PLACEHOLDER_KEY, SYNCHRONIZATION_ERROR_KEY, SYNCHRONIZATION_KEY,
    SYNCHRONIZATION_SHOPIFY_API_TOKEN_PLACEHOLDER_KEY, SYNCHRONIZATION_SUCCESS_KEY,
    SYNCHRONIZATION_WOOCOMMERCE_CONSUMER_KEY_PLACEHOLDER_KEY,
    SYNCHRONIZATION_WOOCOMMERCE_CONSUMER_SECRET_PLACEHOLDER_KEY
} from "../../translations/keys/SynchronizationKeys";
import {ApiType} from "../../enums/SynchronizationEnums";
import {
    credentialsReducer
} from "./reducers/CredentialsReducer";
import {CredentialsStateReducer, initialCredentialsStateReducer} from "./reducers/CredentialsReducerState";

const Synchronisation = () => {
    const {t: translation} = useTranslation('translation')
    const classesStyles = synchronisationStyles();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [syncError, setSyncError] = useState(false);

    const [{shopifyCredentials, errorMessage, apiType, woocommerceCredentials}, dispatchCredentialsState]
        = useReducer(credentialsReducer, initialCredentialsStateReducer);

    const [synchronizeShopifyStore] = useMutation(SYNC_SHOPIFY);
    const [synchronizeWoocommerceStore] = useMutation(SYNC_WOOCOMMERCE);

    const handleSnackbarClosing = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const isValid = (): boolean => {
        dispatchCredentialsState({type: 'CHECK_CREDENTIALS'})
        return areAllCredentialsFieldsValid({apiType, shopifyCredentials, woocommerceCredentials, errorMessage});
    }

    function areAllCredentialsFieldsValid(credsState: CredentialsStateReducer): boolean {
        if (credsState.apiType === ApiType.SHOPIFY) {
            return credsState.shopifyCredentials.apiToken !== "" && credsState.shopifyCredentials.shopDomain !== "";
        }
        return credsState.woocommerceCredentials.consumerKey !== "" && credsState.woocommerceCredentials.consumerSecretKey !== "" && credsState.woocommerceCredentials.shopDomain !== "";
    }

    const handleSynchronisation = async () => {
        const areCredentialsValid = isValid();
        if (areCredentialsValid) {
            let syncResponse = (apiType === ApiType.SHOPIFY)
                ? await synchronizeShopifyStore({variables: {shopifyCreds: shopifyCredentials}})
                : await synchronizeWoocommerceStore({variables: {woocommerceCreds: woocommerceCredentials}})
            setSyncError(syncResponse.data.synchronizeShopifyStore.code !== 200)
            setSnackbarOpen(true)
        }
        setSyncError(true)
        setSnackbarOpen(true)
    }

    return (
        <Grid
            container
            xs={12}
            spacing={0}
            direction="column"
            className={classesStyles.root}>
            <Grid container xs={3} className={classesStyles.form} direction="column">
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
                {apiType === ApiType.SHOPIFY && (
                    <Grid container className={classesStyles.innerForm} direction="column">
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
                            helperText={translation(errorMessage.apiTokenError)}
                        ></TextField>
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
                            helperText={translation(errorMessage.shopDomainShopifyError)}
                        ></TextField>
                    </Grid>
                )}
                {apiType === ApiType.WOOCOMMERCE && (
                    <Grid container className={classesStyles.innerForm} direction="column">
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
                            helperText={translation(errorMessage.shopDomainWooError)}
                        ></TextField>
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
                            helperText={translation(errorMessage.shopConsumerKeyError)}
                        ></TextField>
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
                            helperText={translation(errorMessage.shopConsumerSecretError)}
                        ></TextField>
                    </Grid>
                )}
                <Button
                    variant="contained"
                    style={{background: '#ffa500', margin: '15px'}}
                    onClick={handleSynchronisation}>
                    {translation(SYNCHRONIZATION_KEY)}
                </Button>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClosing}>
                    <Alert onClose={handleSnackbarClosing} severity={syncError ? "error" : "success"}
                           sx={{width: '100%'}}>
                        {syncError ? (
                            translation(SYNCHRONIZATION_ERROR_KEY)
                        ) : (
                            translation(SYNCHRONIZATION_SUCCESS_KEY)
                        )}
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>
    )

}

export default Synchronisation
