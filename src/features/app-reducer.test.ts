import {
    appReducer,
    changeAppErrorValue,
    changeAppLoadingStatus, initializeApp,
    NullPossibleType,
} from './app-reducer';
import {RequestStatusType} from '../utils/enums';

type instanceStateType = typeof instanceState

let instanceState = {
    loadingStatus: RequestStatusType.idle,
    errorServer: null as NullPossibleType<string>,
    isInitialized: false
}

test('Status for loading have to be changed', () => {
    let finalState: instanceStateType = appReducer(instanceState, changeAppLoadingStatus(RequestStatusType.loading))

    expect(instanceState.loadingStatus).toBe(RequestStatusType.idle)
    expect(instanceState.errorServer).toBe(null)
    expect(finalState).toEqual({
        loadingStatus: RequestStatusType.loading,
        errorServer: null,
        isInitialized: false
    })
})
test('Error value have to be changed', () => {
    let finalState: instanceStateType = appReducer(instanceState, changeAppErrorValue('I am ERROR!'))

    expect(instanceState).toEqual({
        loadingStatus: RequestStatusType.idle,
        errorServer: null,
        isInitialized: false
    })
    expect(finalState).toEqual({
        loadingStatus: RequestStatusType.idle,
        errorServer: 'I am ERROR!',
        isInitialized: false
    })
})
test('App have to be initialized', () => {
    let finalState: instanceStateType = appReducer(instanceState, initializeApp())

    expect(instanceState).toEqual({
        loadingStatus: RequestStatusType.idle,
        errorServer: null,
        isInitialized: false
    })
    expect(finalState).toEqual({
        loadingStatus: RequestStatusType.idle,
        errorServer: null,
        isInitialized: true
    })
})