import { gql } from '@apollo/client'

export const LOGIN_BY_EMAIL = gql`
  query Query($email: String!, $password: String!) {
    loginVendorByEmail(email: $email, password: $password) {
      code
      message
      vendorAccount {
        _id
        store {
          _id
        }
      }
    }
  }
`

export const LOGIN_BY_USERNAME = gql`
  query Query($username: String!, $password: String!) {
    loginVendorByUsername(username: $username, password: $password) {
      code
      message
      vendorAccount {
        _id
        store {
          _id
        }
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