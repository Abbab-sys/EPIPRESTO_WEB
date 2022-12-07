import {Category} from "../../../interfaces/SignUpInterfaces";

/*
 * Name: Sign Up Credentials Reducer
 * Description: This file contains all the possible actions for the sign up credentials reducer
 * Author: Adam Naoui
 */

export type SignUpCredentialsReducerActions =
  | { type: 'CHANGE_SHOP_NAME', newShopName: string }
  | { type: 'CHANGE_EMAIL', newEmail: string }
  | { type: 'CHANGE_ADDRESS', newAddress: string }
  | { type: 'CHANGE_PHONE', newPhone: string }
  | { type: 'CHANGE_USERNAME', newUsername: string }
  | { type: 'CHANGE_PASSWORD', newPassword: string }
  | { type: 'CHANGE_CONFIRM_PASSWORD', newConfirmPassword: string }
  | { type: 'CHANGE_CATEGORY', newCategory: Category }
  | { type: 'CHECK_SIGN_UP_CREDENTIALS' }
  | { type: 'CHECK_EMAIL' }
  | { type: 'CHECK_USERNAME' }
  | { type: 'CHECK_PASSWORD' }
  | { type: 'CHECK_CONFIRM_PASSWORD' }
  | { type: 'CHECK_SHOP_NAME' }
  | { type: 'CHECK_ADDRESS' }
  | { type: 'CHECK_PHONE' }
  | { type: 'CHECK_CATEGORY' }
  | { type: 'SET_USERNAME_AS_ALREADY_USED' }
  | { type: 'SET_EMAIL_AS_ALREADY_USED' }
  | { type: 'SET_USERNAME_AS_UNUSED' }
  | { type: 'SET_EMAIL_AS_UNUSED' }
