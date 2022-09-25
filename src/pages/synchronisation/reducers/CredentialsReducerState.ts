import {
    ErrorMessage,
    initialErrorMessage,
    ShopifySyncInput,
    WoocommerceSyncInput
} from "../../../interfaces/SynchronisationInterfaces";
import {ApiType} from "../../../enums/SynchronizationEnums";

export interface CredentialsStateReducer {
    shopifyCredentials: ShopifySyncInput;
    woocommerceCredentials: WoocommerceSyncInput;
    errorMessage: ErrorMessage;
    apiType: ApiType;
}

export const initialCredentialsStateReducer: CredentialsStateReducer = {
    shopifyCredentials: {
        apiToken: '',
        shopDomain: ''
    },
    woocommerceCredentials: {
        shopDomain: '',
        consumerKey: '',
        consumerSecretKey: ''
    },
    errorMessage: initialErrorMessage,
    apiType: ApiType.SHOPIFY
}
