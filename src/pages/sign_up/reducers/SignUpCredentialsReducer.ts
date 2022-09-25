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
                    shopNameError: ''
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
                    emailError: ''
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
                    addressError: ''
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
                    phoneError: ''
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
                    usernameError: ''
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
                    passwordError: ''
                }
            }
        case 'CHANGE_CONFIRM_PASSWORD':
            return {
                ...state,
                verifyPassword: action.newConfirmPassword,
                signUpErrorMessage: {
                    ...state.signUpErrorMessage,
                    verifyPasswordError: ''
                }
            }
        case 'CHECK_SIGN_UP_CREDENTIALS':
            const errorMessage = {...initialSignUpErrorMessage}
            const emailFormatIsInvalid = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.accountInput.email)
            if (state.accountInput.shopName === '') {
                errorMessage.shopNameError = SIGN_UP_SHOP_NAME_ERROR_MESSAGE_KEY
            }
            if (state.accountInput.email === '') {
                errorMessage.emailError = SIGN_UP_EMAIL_ERROR_EMPTY_KEY
            } else if (emailFormatIsInvalid) {
                errorMessage.emailError = SIGN_UP_EMAIL_ERROR_FORMAT_ERROR_KEY
            }
            if (state.accountInput.username === '') {
                errorMessage.usernameError = SIGN_UP_USERNAME_ERROR_EMPTY_KEY
            }
            if (state.accountInput.password === '') {
                errorMessage.passwordError = SIGN_UP_PASSWORD_ERROR_MESSAGE_KEY
            }
            if (state.accountInput.password !== state.verifyPassword) {
                errorMessage.verifyPasswordError = SIGN_UP_CONFIRM_PASSWORD_ERROR_MESSAGE_KEY
            }
            if (state.accountInput.address === '') {
                errorMessage.addressError = SIGN_UP_ADRESS_ERROR_MESSAGE_KEY
            }
            if (state.accountInput.phone === '') {
                errorMessage.phoneError = SIGN_UP_PHONE_ERROR_MESSAGE_KEY
            }
            return {
                ...state,
                signUpErrorMessage: errorMessage
            }
        case 'SET_USERNAME_AS_ALREADY_USED':
            return {
                ...state,
                signUpErrorMessage: {
                    ...state.signUpErrorMessage,
                    usernameError: SIGN_UP_USERNAME_ERROR_USED_KEY
                }
            }
        case 'SET_USERNAME_AS_UNUSED':
            return {
                ...state,
                signUpErrorMessage: {
                    ...state.signUpErrorMessage,
                    usernameError: ''
                }
            }
        case 'SET_EMAIL_AS_ALREADY_USED':
            return {
                ...state,
                signUpErrorMessage: {
                    ...state.signUpErrorMessage,
                    emailError: SIGN_UP_EMAIL_ERROR_USED_KEY

                }
            }
        case 'SET_EMAIL_AS_UNUSED':
            return {
                ...state,
                signUpErrorMessage: {
                    ...state.signUpErrorMessage,
                    emailError: ''
                }
            }
        default:
            return state;
    }
}



