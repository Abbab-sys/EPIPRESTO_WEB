/*
 * Name: Login's interfaces
 * Description: This file contains all the interfaces used in the login page
 * Author: Adam Naoui
 */

export interface Credentials {
  auth: string,
  password: string,
  showPassword: boolean
}

export interface LoginErrorMessage {
  authErrorTranslationKey: string;
  passwordErrorTranslationKey: string;
}

export const initialLoginErrorMessage: LoginErrorMessage = {
  authErrorTranslationKey: '',
  passwordErrorTranslationKey: '',
}
