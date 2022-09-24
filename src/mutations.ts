import { gql } from '@apollo/client'

export const SIGN_UP = gql`
  mutation Mutation($accountInput: VendorAccountInput) {
    vendorSignUp(accountInput: $accountInput) {
      code
      message
    }
  }
`

export const SYNCH_SHOPIFY = gql`
  mutation Mutation($shopifyCreds: ShopifyCredentials!) {
    synchronizeShopifyStore(shopifyCreds: $shopifyCreds) {
      code
      message
    }
  }
`

export const SYNCH_WOOCOMMERCE = gql`
  mutation Mutation($woocommerceCreds: WoocommerceCredentials!) {
    synchronizeWoocommerceStore(woocommerceCreds: $woocommerceCreds) {
      code
      message
    }
  }
`