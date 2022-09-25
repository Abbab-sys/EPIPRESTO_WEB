export type LoginCredentialsStateReducerAction =
    | { type: 'CHANGE_AUTH', newAuth: string }
    | { type: 'CHECK_LOGIN_CREDENTIALS' }
    | { type: 'CHANGE_PASSWORD', newPassword: string }
    | { type: 'CHANGE_PASSWORD_VISIBILITY', showPassword: boolean }
