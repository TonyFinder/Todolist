import {AppThunk} from '../app/store';
import {changeAppErrorValue, changeAppLoadingStatus} from './app-reducer';
import {ApiResultCode, RequestStatusType} from '../utils/enums';
import {authAPI, LoginRequestType} from '../api/api';
import {handlerForAppErrorInThen} from '../utils/common-commands';
import {AxiosError} from 'axios';

let initialState = {
    isLoggedIn: false
}

export const authReducer = (state: initialStateType = initialState, action: AuthActionType): initialStateType => {
    switch (action.type) {
        case 'AUTH/SET-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

// actions
export const setLoggedIn = (isLoggedIn: boolean) => ({type: 'AUTH/SET-LOGGED-IN', isLoggedIn} as const)

// thunks
export const logInTC = (data: LoginRequestType): AppThunk => dispatch => {
    dispatch(changeAppLoadingStatus(RequestStatusType.loading))
    authAPI.login(data)
        .then(res => res.data.resultCode === ApiResultCode.success
            ? dispatch(setLoggedIn(true))
            : handlerForAppErrorInThen(dispatch, res.data.messages))
        .catch((err: AxiosError) => dispatch(changeAppErrorValue(err.message)))
        .finally(()=> dispatch(changeAppLoadingStatus(RequestStatusType.succeeded)))
}

// types
export type AuthActionType = ReturnType<typeof setLoggedIn>
type initialStateType = typeof initialState