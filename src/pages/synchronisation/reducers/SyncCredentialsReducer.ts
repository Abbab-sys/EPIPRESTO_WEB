import {ApiType} from "../../../enums/SynchronizationEnums";
import {
  initialSyncErrorMessage,
} from "../../../interfaces/SynchronisationInterfaces";
import {
  SYNCHRONIZATION_DOMAIN_NAME_ERROR_MESSAGE_KEY,
  SYNCHRONIZATION_SHOPIFY_API_TOKEN_ERROR_MESSAGE_KEY, SYNCHRONIZATION_WOOCOMMERCE_CONSUMER_KEY_ERROR_MESSAGE_KEY
} from "../../../translations/keys/SynchronizationKeys";
import {SyncCredentialsReducerState} from "./SyncCredentialsReducerState";
import {SyncCredentialsStateReducerAction} from "./SyncCredentialsReducerActions";

export function syncCredentialsReducer(state: SyncCredentialsReducerState, action: SyncCredentialsStateReducerAction): SyncCredentialsReducerState {
  switch (action.type) {
    case 'CHANGE_SHOPIFY_API_TOKEN':
      return {
        ...state,
        shopifyCredentials: {
          ...state.shopifyCredentials,
          apiToken: action.newApiToken
        },
        errorMessage: {
          ...state.errorMessage,
          apiTokenError: ''
        }
      }
    case 'CHANGE_SHOPIFY_DOMAIN_NAME':
      return {
        ...state,
        shopifyCredentials: {
          ...state.shopifyCredentials,
          shopDomain: action.newDomainName
        },
        errorMessage: {
          ...state.errorMessage,
          shopDomainShopifyError: ''
        }
      }
    case 'CHANGE_WOOCOMMERCE_DOMAIN_NAME':
      return {
        ...state,
        woocommerceCredentials: {
          ...state.woocommerceCredentials,
          shopDomain: action.newDomainName
        },
        errorMessage: {
          ...state.errorMessage,
          shopDomainWooError: ''
        }
      }
    case 'CHANGE_WOOCOMMERCE_CONSUMER_KEY':
      return {
        ...state,
        woocommerceCredentials: {
          ...state.woocommerceCredentials,
          consumerKey: action.newConsumerKey
        },
        errorMessage: {
          ...state.errorMessage,
          shopConsumerKeyError: ''
        }
      }
    case 'CHANGE_WOOCOMMERCE_CONSUMER_SECRET_KEY':
      return {
        ...state,
        woocommerceCredentials: {
          ...state.woocommerceCredentials,
          consumerSecretKey: action.newConsumerSecretKey
        },
        errorMessage: {
          ...state.errorMessage,
          shopConsumerSecretError: ''
        }
      }
    case 'CHANGE_API':
      if (!action.newApi) return state;
      return {
        ...state,
        errorMessage: initialSyncErrorMessage,
        apiType: action.newApi
      };
    case 'CHECK_CREDENTIALS':
      const errorMessage = {...initialSyncErrorMessage};

      if (state.apiType === ApiType.SHOPIFY && state.shopifyCredentials.apiToken === "")
        errorMessage.apiTokenError = SYNCHRONIZATION_SHOPIFY_API_TOKEN_ERROR_MESSAGE_KEY;

      if (state.apiType === ApiType.SHOPIFY && state.shopifyCredentials.shopDomain === "")
        errorMessage.shopDomainShopifyError = SYNCHRONIZATION_DOMAIN_NAME_ERROR_MESSAGE_KEY

      if (state.apiType === ApiType.WOOCOMMERCE && state.woocommerceCredentials.shopDomain === "")
        errorMessage.shopDomainWooError = SYNCHRONIZATION_DOMAIN_NAME_ERROR_MESSAGE_KEY

      if (state.apiType === ApiType.WOOCOMMERCE && state.woocommerceCredentials.consumerKey === "")
        errorMessage.shopConsumerKeyError = SYNCHRONIZATION_WOOCOMMERCE_CONSUMER_KEY_ERROR_MESSAGE_KEY

      if (state.apiType === ApiType.WOOCOMMERCE && state.woocommerceCredentials.consumerSecretKey === "")
        errorMessage.shopConsumerSecretError = SYNCHRONIZATION_WOOCOMMERCE_CONSUMER_KEY_ERROR_MESSAGE_KEY

      return {...state, errorMessage: errorMessage};

    default:
      return state;
  }
}



