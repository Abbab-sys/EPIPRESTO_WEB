export interface AccountInput {
    shopName: string;
    email: string;
    address: string;
    phone: string;
    username: string;
    password: string;
}

export interface SignUpErrorMessage {
    shopNameError: string;
    emailError: string;
    addressError: string;
    phoneError: string;
    usernameError: string;
    passwordError: string;
    verifyPasswordError: string;
}
export const initialSignUpErrorMessage: SignUpErrorMessage = {
    shopNameError: '',
    emailError: '',
    addressError: '',
    phoneError: '',
    usernameError: '',
    passwordError: '',
    verifyPasswordError: ''
}
