import {
    SyncErrorMessage,
    initialSyncErrorMessage,
    ShopifySyncInput,
    WoocommerceSyncInput
} from "../../../interfaces/SynchronisationInterfaces";
import {ApiType} from "../../../enums/SynchronizationEnums";

export interface SyncCredentialsReducerState {
    shopifyCredentials: ShopifySyncInput;
    woocommerceCredentials: WoocommerceSyncInput;
    errorMessage: SyncErrorMessage;
    apiType: ApiType;
}

export const initialSyncCredentialsStateReducer: SyncCredentialsReducerState = {
    shopifyCredentials: {
        apiToken: '',
        shopDomain: ''
    },
    woocommerceCredentials: {
        shopDomain: '',
        consumerKey: '',
        consumerSecretKey: ''
    },
    errorMessage: initialSyncErrorMessage,
    apiType: ApiType.SHOPIFY
}
