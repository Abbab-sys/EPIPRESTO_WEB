import {Credentials, LoginErrorMessage} from "../../../interfaces/LoginInterfaces";

/*
 * Name: Login Credentials Reducer State
 * Description: This file contains the initial login credentials state
 * Author: Adam Naoui
 */

export interface LoginCredentialsReducerState {
  credentials: Credentials;
  errorMessage: LoginErrorMessage;
}

export const initialLoginCredentialsStateReducer: LoginCredentialsReducerState = {
  credentials: {
    auth: '',
    password: '',
    showPassword: false
  },
  errorMessage: {
    authErrorTranslationKey: '',
    passwordErrorTranslationKey: '',
  }

}
