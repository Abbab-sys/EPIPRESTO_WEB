import {ApiType} from "../../../enums/SynchronizationEnums"

export type SyncCredentialsStateReducerAction =
    | { type: 'CHANGE_API', newApi: ApiType }
    | { type: 'CHANGE_SHOPIFY_API_TOKEN', newApiToken: string }
    | { type: 'CHANGE_SHOPIFY_DOMAIN_NAME', newDomainName: string }
    | { type: 'CHANGE_WOOCOMMERCE_DOMAIN_NAME', newDomainName: string }
    | { type: 'CHANGE_WOOCOMMERCE_CONSUMER_KEY', newConsumerKey: string }
    | { type: 'CHANGE_WOOCOMMERCE_CONSUMER_SECRET_KEY', newConsumerSecretKey: string }
    | { type: 'CHECK_CREDENTIALS'}
