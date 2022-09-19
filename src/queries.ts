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