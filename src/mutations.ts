import { gql } from '@apollo/client'

export const SIGN_UP = gql`
  mutation Mutation($accountInput: VendorAccountInput) {
    vendorSignUp(accountInput: $accountInput) {
      _id
      store {
        _id
      }
    }
  }
`