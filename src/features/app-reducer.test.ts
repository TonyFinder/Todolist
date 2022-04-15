import {
    appReducer,
    changeAppErrorValue,
    changeAppLoadingStatus,
    NullPossibleType,
    RequestStatusType
} from './app-reducer';

type instanceStateType = typeof instanceState

let instanceState = {
    loadingStatus: 'idle' as RequestStatusType,
    errorServer: null as NullPossibleType<string>
}

test('Status for loading have to be changed', () => {
    let finalState: instanceStateType = appReducer(instanceState, changeAppLoadingStatus('loading'))

    expect(instanceState.loadingStatus).toBe('idle')
    expect(instanceState.errorServer).toBe(null)
    expect(finalState).toEqual({
        loadingStatus: 'loading',
        errorServer: null
    })
})
test('Error value have to be changed', () => {
    let finalState: instanceStateType = appReducer(instanceState, changeAppErrorValue('I am ERROR!'))

    expect(instanceState).toEqual({
        loadingStatus: 'idle',
        errorServer: null
    })
    expect(finalState).toEqual({
        loadingStatus: 'idle',
        errorServer: 'I am ERROR!'
    })
})