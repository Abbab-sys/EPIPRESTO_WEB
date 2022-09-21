import { gql } from '@apollo/client'

export const LOGIN = gql`
  query LoginVendor($email: String!, $password: String!) {
    loginVendor(email: $email, password: $password) {
      _id
      store {
        _id
      }
    }
}
`

export const IS_VENDOR_USERNAME_USED = gql`
  query Query($username: String!) {
    isVendorUsernameUsed(username: $username)
  }
`

export const IS_VENDOR_EMAIL_USED = gql`
  query Query($email: String!) {
    isVendorEmailUsed(email: $email)
  }
`