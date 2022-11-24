export interface AccountInput {
    shopName: string;
    email: string;
    address: string;
    phone: string;
    username: string;
    password: string;
    shopCategory: Category | '';
}
export enum Category{
    FRUITS_AND_VEGETABLES = 'FRUITS_AND_VEGETABLES',
    FISH_AND_SEAFOOD = 'FISH_AND_SEAFOOD',
    HEALTHY = 'HEALTHY',
    KETO = 'KETO',
    BAKERY = 'BAKERY',
    WORLD_PRODUCTS = 'WORLD_PRODUCTS',
    BUTCHER = 'BUTCHER',
    OTHER = 'OTHER'
}

export interface SignUpErrorMessage {
    shopNameError: Set<string>;
    emailError: Set<string>;
    addressError: Set<string>;
    phoneError: Set<string>;
    usernameError: Set<string>;
    passwordError: Set<string>;
    verifyPasswordError: Set<string>;
    shopCategoryError: Set<string>;
}
export const initialSignUpErrorMessage: SignUpErrorMessage = {
    shopNameError: new Set(),
    emailError: new Set(),
    addressError: new Set(),
    phoneError: new Set(),
    usernameError: new Set(),
    passwordError: new Set(),
    verifyPasswordError: new Set(),
    shopCategoryError: new Set()
}
