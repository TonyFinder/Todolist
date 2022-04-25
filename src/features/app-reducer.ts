import {RequestStatusType} from '../utils/enums';

let initialState = {
    loadingStatus: RequestStatusType.idle,
    errorServer: null as NullPossibleType<string>
}

export const appReducer = (state: initialStateType = initialState, action: AppActionType): initialStateType => {
    switch (action.type) {
        case 'APP/CHANGE-STATUS':
            return {...state, loadingStatus: action.loadingStatus}
        case 'APP/CHANGE-ERROR-VALUE':
            return {...state, errorServer: action.errorServer}
        default:
            return state
    }
}

// actions
export const changeAppLoadingStatus = (loadingStatus: RequestStatusType) => ({type: 'APP/CHANGE-STATUS', loadingStatus} as const)
export const changeAppErrorValue = (errorServer: NullPossibleType<string>) => ({type: 'APP/CHANGE-ERROR-VALUE', errorServer} as const)

// types
export type NullPossibleType<T> = null | T
export type AppActionType = ReturnType<typeof changeAppLoadingStatus> | ReturnType<typeof changeAppErrorValue>
type initialStateType = typeof initialState