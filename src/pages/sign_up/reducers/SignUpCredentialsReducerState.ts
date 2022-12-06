import {AccountInput, initialSignUpErrorMessage, SignUpErrorMessage} from "../../../interfaces/SignUpInterfaces";

/*
 * Name: Sign Up Credentials Reducer
 * Description: This file contains all the initial sign up credentials state
 * Author: Adam Naoui
 */

export interface SignUpCredentialsReducerState {
  verifyPassword: string;
  accountInput: AccountInput;
  signUpErrorMessage: SignUpErrorMessage
}

export const initialSignUpCredentialsState: SignUpCredentialsReducerState = {
  verifyPassword: '',
  accountInput: {
    shopName: '',
    email: '',
    address: '',
    phone: '',
    username: '',
    password: '',
    shopCategory: ''
  },
  signUpErrorMessage: {
    ...initialSignUpErrorMessage
  }
}
