import {ApiResultCode, RequestStatusType} from '../utils/enums';
import {authAPI} from '../api/api';
import {AppThunk} from '../app/store';
import {AxiosError} from 'axios';
import {setLoggedIn} from './auth-reducer';

let initialState = {
    loadingStatus: RequestStatusType.idle,
    errorServer: null as NullPossibleType<string>,
    isInitialized: false
}

export const appReducer = (state: AppStateType = initialState, action: AppActionType): AppStateType => {
    switch (action.type) {
        case 'APP/CHANGE-STATUS':
            return {...state, loadingStatus: action.loadingStatus}
        case 'APP/CHANGE-ERROR-VALUE':
            return {...state, errorServer: action.errorServer}
        case 'APP/INITIALIZE':
            return {...state, isInitialized: true}
        default:
            return state
    }
}

// actions
export const changeAppLoadingStatus = (loadingStatus: RequestStatusType) => ({type: 'APP/CHANGE-STATUS', loadingStatus} as const)
export const changeAppErrorValue = (errorServer: NullPossibleType<string>) => ({type: 'APP/CHANGE-ERROR-VALUE', errorServer} as const)
export const initializeApp = () => ({type: 'APP/INITIALIZE'} as const)

// thunks
export const initializeAppTC = (): AppThunk => dispatch => {
    authAPI.me()
        .then(res => res.data.resultCode === ApiResultCode.success
            ? dispatch(setLoggedIn(true))
            : dispatch(setLoggedIn(false)))
        .catch((err: AxiosError) => dispatch(changeAppErrorValue(err.message)))
        .finally(() => dispatch(initializeApp()))
}

// types
export type NullPossibleType<T> = null | T
export type AppActionType = ReturnType<typeof changeAppLoadingStatus> | ReturnType<typeof changeAppErrorValue> | ReturnType<typeof initializeApp>
export type AppStateType = typeof initialState