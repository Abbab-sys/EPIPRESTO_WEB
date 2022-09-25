import {AccountInput, SignUpErrorMessage} from "../../../interfaces/SignUpInterfaces";

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
        password: ''
    },
    signUpErrorMessage: {
        shopNameError: '',
        emailError: '',
        addressError: '',
        phoneError: '',
        usernameError: '',
        passwordError: '',
        verifyPasswordError: ''
    }
}
