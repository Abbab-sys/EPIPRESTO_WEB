export type SignUpCredentialsReducerActions =
    | { type: 'CHANGE_SHOP_NAME', newShopName: string }
    | { type: 'CHANGE_EMAIL', newEmail: string }
    | { type: 'CHANGE_ADDRESS', newAddress: string }
    | { type: 'CHANGE_PHONE', newPhone: string }
    | { type: 'CHANGE_USERNAME', newUsername: string }
    | { type: 'CHANGE_PASSWORD', newPassword: string }
    | { type: 'CHANGE_CONFIRM_PASSWORD', newConfirmPassword: string }
    | { type: 'CHECK_SIGN_UP_CREDENTIALS'}
    | { type: 'SET_USERNAME_AS_ALREADY_USED'}
    | { type: 'SET_EMAIL_AS_ALREADY_USED'}
    | { type: 'SET_USERNAME_AS_UNUSED'}
    | { type: 'SET_EMAIL_AS_UNUSED'}

