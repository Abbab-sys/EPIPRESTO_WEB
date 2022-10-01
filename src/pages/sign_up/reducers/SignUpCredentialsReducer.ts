import {SignUpCredentialsReducerState} from "./SignUpCredentialsReducerState";
import {SignUpCredentialsReducerActions} from "./SignUpCredentialsReducerActions";
import {initialSignUpErrorMessage} from "../../../interfaces/SignUpInterfaces";
import {
  SIGN_UP_ADRESS_ERROR_MESSAGE_KEY,
  SIGN_UP_CONFIRM_PASSWORD_ERROR_MESSAGE_KEY,
  SIGN_UP_EMAIL_ERROR_EMPTY_KEY,
  SIGN_UP_EMAIL_ERROR_FORMAT_ERROR_KEY, SIGN_UP_EMAIL_ERROR_USED_KEY,
  SIGN_UP_PASSWORD_ERROR_MESSAGE_KEY,
  SIGN_UP_PHONE_ERROR_MESSAGE_KEY,
  SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY,
  SIGN_UP_USERNAME_ERROR_EMPTY_KEY, SIGN_UP_USERNAME_ERROR_USED_KEY
} from "../../../translations/keys/SignUpTranslationKeys";

export function signUpCredentialsReducer(state: SignUpCredentialsReducerState, action: SignUpCredentialsReducerActions): SignUpCredentialsReducerState {
  switch (action.type) {
    case 'CHANGE_SHOP_NAME':
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          shopName: action.newShopName
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          shopNameError: new Set()
        }
      }
    case 'CHANGE_EMAIL':
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          email: action.newEmail
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          emailError: new Set()
        }
      }
    case 'CHANGE_ADDRESS':
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          address: action.newAddress
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          addressError: new Set()
        }
      }
    case 'CHANGE_PHONE':
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          phone: action.newPhone
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          phoneError: new Set()
        }
      }
    case 'CHANGE_USERNAME':
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          username: action.newUsername
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          usernameError: new Set()
        }
      }
    case 'CHANGE_PASSWORD':
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          password: action.newPassword
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          passwordError: new Set()
        }
      }
    case 'CHANGE_CONFIRM_PASSWORD':
      return {
        ...state,
        verifyPassword: action.newConfirmPassword,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          verifyPasswordError: new Set()
        }
      }
    case 'CHECK_SIGN_UP_CREDENTIALS':
      const errorMessage = {...initialSignUpErrorMessage}
      const emailFormatIsInvalid = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.accountInput.email)
      if (state.accountInput.shopName === '') {
        errorMessage.shopNameError.add(SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY)
      } else {
        errorMessage.shopNameError.delete(SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY)
      }
      if (state.accountInput.email === '') {
        errorMessage.emailError.add(SIGN_UP_EMAIL_ERROR_EMPTY_KEY)
      } else {
        errorMessage.emailError.delete(SIGN_UP_EMAIL_ERROR_EMPTY_KEY)
      }
      if (emailFormatIsInvalid) {
        errorMessage.emailError.add(SIGN_UP_EMAIL_ERROR_FORMAT_ERROR_KEY)
      } else {
        errorMessage.emailError.delete(SIGN_UP_EMAIL_ERROR_FORMAT_ERROR_KEY)
      }
      if (state.accountInput.username === '') {
        errorMessage.usernameError.add(SIGN_UP_USERNAME_ERROR_EMPTY_KEY)
      }
      else{
        errorMessage.usernameError.delete(SIGN_UP_USERNAME_ERROR_EMPTY_KEY)
      }
      if (state.accountInput.password === '') {
        errorMessage.passwordError.add(SIGN_UP_PASSWORD_ERROR_MESSAGE_KEY)
      }
      else{
        errorMessage.passwordError.delete(SIGN_UP_PASSWORD_ERROR_MESSAGE_KEY)
      }
      if (state.accountInput.password !== state.verifyPassword) {
        errorMessage.verifyPasswordError.add(SIGN_UP_CONFIRM_PASSWORD_ERROR_MESSAGE_KEY)
      }
      else{
        errorMessage.verifyPasswordError.delete(SIGN_UP_CONFIRM_PASSWORD_ERROR_MESSAGE_KEY)
      }
      if (state.accountInput.address === '') {
        errorMessage.addressError.add(SIGN_UP_ADRESS_ERROR_MESSAGE_KEY)
      }
      else{
        errorMessage.addressError.delete(SIGN_UP_ADRESS_ERROR_MESSAGE_KEY)
      }
      if (state.accountInput.phone === '') {
        errorMessage.phoneError.add(SIGN_UP_PHONE_ERROR_MESSAGE_KEY)
      }
      else{
        errorMessage.phoneError.delete(SIGN_UP_PHONE_ERROR_MESSAGE_KEY)
      }
      return {
        ...state,
        signUpErrorMessage: errorMessage
      }
    case 'SET_USERNAME_AS_ALREADY_USED':
      state.signUpErrorMessage.usernameError.add(SIGN_UP_USERNAME_ERROR_USED_KEY)
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          usernameError: state.signUpErrorMessage.usernameError
        }
      }

    case 'SET_USERNAME_AS_UNUSED':
      state.signUpErrorMessage.usernameError.delete(SIGN_UP_USERNAME_ERROR_USED_KEY)

      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          usernameError: state.signUpErrorMessage.usernameError
        }
      }
    case 'SET_EMAIL_AS_ALREADY_USED':
      state.signUpErrorMessage.emailError.add(SIGN_UP_EMAIL_ERROR_USED_KEY)
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          emailError: state.signUpErrorMessage.emailError

        }
      }
    case 'SET_EMAIL_AS_UNUSED':
      state.signUpErrorMessage.emailError.delete(SIGN_UP_EMAIL_ERROR_USED_KEY)
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          emailError: state.signUpErrorMessage.emailError
        }
      }
    default:
      return state;
  }
}



