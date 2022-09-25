import {LoginCredentialsStateReducerAction} from "./LoginCredentialsReducerActions"
import {LoginCredentialsReducerState} from "./LoginCredentialsReducerState";
import {initialLoginErrorMessage} from "../../../interfaces/LoginInterfaces";
import {LOGIN_EMAIL_ERROR_KEY, LOGIN_PASSWORD_ERROR_KEY} from "../../../translations/keys/LoginTranslationKeys";

export function loginCredentialsReducer(state: LoginCredentialsReducerState, action: LoginCredentialsStateReducerAction): LoginCredentialsReducerState {
    switch (action.type) {
        case 'CHANGE_AUTH':
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    auth: action.newAuth
                },
                errorMessage: {
                    ...state.errorMessage,
                    authErrorTranslationKey: ''
                }
            }
        case 'CHANGE_PASSWORD':
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    password: action.newPassword
                },
                errorMessage: {
                    ...state.errorMessage,
                    passwordErrorTranslationKey: ''
                }
            }
        case 'CHANGE_PASSWORD_VISIBILITY':
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    showPassword: action.showPassword
                }
            }
        case 'CHECK_LOGIN_CREDENTIALS':
            const errorMessage = {...initialLoginErrorMessage};
            if (state.credentials.auth === '') {
                errorMessage.authErrorTranslationKey = LOGIN_EMAIL_ERROR_KEY;
            }
            if (state.credentials.password === '') {
                errorMessage.passwordErrorTranslationKey = LOGIN_PASSWORD_ERROR_KEY;
            }
            return {
                ...state,
                errorMessage: errorMessage
            }
        default:
            return state;
    }
}



