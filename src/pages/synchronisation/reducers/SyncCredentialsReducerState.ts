import {
  initialSyncErrorMessage,
  ShopifySyncInput,
  SyncErrorMessage,
  WoocommerceSyncInput
} from "../../../interfaces/SynchronisationInterfaces";
import {ApiType} from "../../../enums/SynchronizationEnums";

/*
 * Name: Synchronization Credentials Reducer
 * Description: This file contains all the initial synchronization credentials state
 * Author: Adam Naoui
 */

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
