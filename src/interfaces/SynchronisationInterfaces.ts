export interface ShopifySyncInput {
    apiToken: string,
    shopDomain: string
}

export interface WoocommerceSyncInput {
    shopDomain: string,
    consumerKey: string,
    consumerSecretKey: string
}
export interface ErrorMessage {
    apiTokenError: string;
    shopDomainShopifyError: string;
    shopDomainWooError: string;
    shopConsumerKeyError: string;
    shopConsumerSecretError: string;
}
export const initialErrorMessage: ErrorMessage = {
    apiTokenError: '',
    shopDomainShopifyError: '',
    shopDomainWooError: '',
    shopConsumerKeyError: '',
    shopConsumerSecretError: ''
}

