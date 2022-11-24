export interface ShopifySyncInput {
    apiToken: string,
    shopDomain: string
}

export interface WoocommerceSyncInput {
    shopDomain: string,
    consumerKey: string,
    consumerSecretKey: string
}
export interface SyncErrorMessage {
    apiTokenError: string;
    shopDomainShopifyError: string;
    shopDomainWooError: string;
    shopConsumerKeyError: string;
    shopConsumerSecretError: string;
}
export const initialSyncErrorMessage: SyncErrorMessage = {
    apiTokenError: '',
    shopDomainShopifyError: '',
    shopDomainWooError: '',
    shopConsumerKeyError: '',
    shopConsumerSecretError: ''
}

