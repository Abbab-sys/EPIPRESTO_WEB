export interface AccountInput {
    shopName: string;
    email: string;
    address: string;
    phone: string;
    username: string;
    password: string;
}

export interface SignUpErrorMessage {
    shopNameError: Set<string>;
    emailError: Set<string>;
    addressError: Set<string>;
    phoneError: Set<string>;
    usernameError: Set<string>;
    passwordError: Set<string>;
    verifyPasswordError: Set<string>;
}
export const initialSignUpErrorMessage: SignUpErrorMessage = {
    shopNameError: new Set(),
    emailError: new Set(),
    addressError: new Set(),
    phoneError: new Set(),
    usernameError: new Set(),
    passwordError: new Set(),
    verifyPasswordError: new Set()
}
