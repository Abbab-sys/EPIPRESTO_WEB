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
    case 'CHANGE_SHOP_NAME': {
      const errorMessage = {...initialSignUpErrorMessage}
      manageError(errorMessage.shopNameError, SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY, action.newShopName === '')
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          shopName: action.newShopName
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          shopNameError: errorMessage.shopNameError
        }
      }
    }
    case 'CHANGE_EMAIL': {
      const errorMessage = {...initialSignUpErrorMessage}
      const emailFormatIsInvalid = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(action.newEmail)
      manageError(errorMessage.emailError, SIGN_UP_EMAIL_ERROR_FORMAT_ERROR_KEY, emailFormatIsInvalid)
      manageError(errorMessage.emailError, SIGN_UP_EMAIL_ERROR_EMPTY_KEY, action.newEmail === '')
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          email: action.newEmail
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          emailError: errorMessage.emailError
        }
      }
    }
    case 'CHANGE_ADDRESS': {
      const errorMessage = {...initialSignUpErrorMessage}
      manageError(errorMessage.addressError, SIGN_UP_ADRESS_ERROR_MESSAGE_KEY, action.newAddress === '')
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          address: action.newAddress
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          addressError: errorMessage.addressError
        }
      }
    }
    case 'CHANGE_PHONE': {
      const errorMessage = {...initialSignUpErrorMessage}
      manageError(errorMessage.phoneError, SIGN_UP_PHONE_ERROR_MESSAGE_KEY, action.newPhone === '')
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          phone: action.newPhone
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          phoneError: errorMessage.phoneError
        }
      }
    }
    case 'CHANGE_USERNAME': {
      const errorMessage = {...initialSignUpErrorMessage}
      manageError(errorMessage.usernameError, SIGN_UP_USERNAME_ERROR_EMPTY_KEY, action.newUsername === '')
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          username: action.newUsername
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          usernameError: errorMessage.usernameError
        }
      }
    }
    case 'CHANGE_PASSWORD': {
      const errorMessage = {...initialSignUpErrorMessage}
      manageError(errorMessage.passwordError, SIGN_UP_PASSWORD_ERROR_MESSAGE_KEY, action.newPassword === '')
      manageError(errorMessage.verifyPasswordError, SIGN_UP_CONFIRM_PASSWORD_ERROR_MESSAGE_KEY, state.verifyPassword !== action.newPassword)
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          password: action.newPassword
        },
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          passwordError: errorMessage.passwordError
        }
      }
    }
    case 'CHANGE_CONFIRM_PASSWORD': {
      const errorMessage = {...initialSignUpErrorMessage}
      manageError(errorMessage.verifyPasswordError, SIGN_UP_PASSWORD_ERROR_MESSAGE_KEY, action.newConfirmPassword=== '')
      manageError(errorMessage.verifyPasswordError, SIGN_UP_CONFIRM_PASSWORD_ERROR_MESSAGE_KEY, state.accountInput.password !== action.newConfirmPassword)
      return {
        ...state,
        verifyPassword: action.newConfirmPassword,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          verifyPasswordError: errorMessage.verifyPasswordError
        }
      }
    }
    case 'CHECK_SIGN_UP_CREDENTIALS': {
      const errorMessage = {...initialSignUpErrorMessage}
      const emailFormatIsInvalid = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.accountInput.email)
      manageError(errorMessage.emailError, SIGN_UP_EMAIL_ERROR_FORMAT_ERROR_KEY, emailFormatIsInvalid)
      manageError(errorMessage.emailError, SIGN_UP_EMAIL_ERROR_EMPTY_KEY, state.accountInput.email === '')
      manageError(errorMessage.usernameError, SIGN_UP_USERNAME_ERROR_EMPTY_KEY, state.accountInput.username === '')
      manageError(errorMessage.passwordError, SIGN_UP_PASSWORD_ERROR_MESSAGE_KEY, state.accountInput.password === '')
      manageError(errorMessage.verifyPasswordError, SIGN_UP_CONFIRM_PASSWORD_ERROR_MESSAGE_KEY, state.verifyPassword === '')
      manageError(errorMessage.verifyPasswordError, SIGN_UP_PASSWORD_ERROR_MESSAGE_KEY, state.accountInput.password !== state.verifyPassword)
      manageError(errorMessage.shopNameError, SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY, state.accountInput.shopName === '')
      manageError(errorMessage.addressError, SIGN_UP_ADRESS_ERROR_MESSAGE_KEY, state.accountInput.address === '')
      manageError(errorMessage.phoneError, SIGN_UP_PHONE_ERROR_MESSAGE_KEY, state.accountInput.phone === '')
      return {
        ...state,
        signUpErrorMessage: errorMessage
      }
    }
    case 'CHECK_ADDRESS': {
      const errorMessage = {...initialSignUpErrorMessage}
      manageError(errorMessage.addressError, SIGN_UP_ADRESS_ERROR_MESSAGE_KEY, state.accountInput.address === '')
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          addressError: errorMessage.addressError
        }
      }
    }
    case 'CHECK_PHONE': {
      const errorMessage = {...initialSignUpErrorMessage}
      manageError(errorMessage.phoneError, SIGN_UP_PHONE_ERROR_MESSAGE_KEY, state.accountInput.phone === '')
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          phoneError: errorMessage.phoneError
        }
      }
    }
    case 'CHECK_SHOP_NAME': {
      const errorMessage = {...initialSignUpErrorMessage}
      manageError(errorMessage.shopNameError, SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY, state.accountInput.shopName === '')
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          shopNameError: errorMessage.shopNameError
        }
      }
    }
    case 'CHECK_EMAIL': {
      const errorMessage = {...initialSignUpErrorMessage}
      const emailFormatIsInvalid = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.accountInput.email)
      manageError(errorMessage.emailError, SIGN_UP_EMAIL_ERROR_FORMAT_ERROR_KEY, emailFormatIsInvalid)
      manageError(errorMessage.emailError, SIGN_UP_EMAIL_ERROR_EMPTY_KEY, state.accountInput.email === '')
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          emailError: errorMessage.emailError
        }
      }
    }
    case 'CHECK_USERNAME': {
      const errorMessage = {...initialSignUpErrorMessage}
      manageError(errorMessage.usernameError, SIGN_UP_USERNAME_ERROR_EMPTY_KEY, state.accountInput.username === '')
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          usernameError: errorMessage.usernameError
        }
      }
    }
    case 'CHECK_PASSWORD': {
      const errorMessage = {...initialSignUpErrorMessage}
      manageError(errorMessage.passwordError, SIGN_UP_PASSWORD_ERROR_MESSAGE_KEY, state.accountInput.password === '')
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          passwordError: errorMessage.passwordError
        }
      }
    }
    case 'CHECK_CONFIRM_PASSWORD': {
      const errorMessage = {...initialSignUpErrorMessage}
      manageError(errorMessage.verifyPasswordError, SIGN_UP_CONFIRM_PASSWORD_ERROR_MESSAGE_KEY, state.verifyPassword === '')
      manageError(errorMessage.verifyPasswordError, SIGN_UP_PASSWORD_ERROR_MESSAGE_KEY, state.accountInput.password !== state.verifyPassword)
      return {
        ...state,
        signUpErrorMessage: {
          ...state.signUpErrorMessage,
          verifyPasswordError: errorMessage.verifyPasswordError
        }
      }
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

const manageError = (errorSet: Set<string>, errorKey: string, errorCondition: boolean) => {
  if (!errorCondition && errorSet.has(errorKey)) {
    errorSet.delete(errorKey)
  }
  if (errorCondition && !errorSet.has(errorKey)) {
    errorSet.add(errorKey)
  }
  return errorSet
}


