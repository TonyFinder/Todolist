import {
    appReducer,
    changeAppErrorValue,
    changeAppLoadingStatus,
    NullPossibleType,
} from './app-reducer';
import {RequestStatusType} from '../utils/enums';

type instanceStateType = typeof instanceState

let instanceState = {
    loadingStatus: RequestStatusType.idle,
    errorServer: null as NullPossibleType<string>
}

test('Status for loading have to be changed', () => {
    let finalState: instanceStateType = appReducer(instanceState, changeAppLoadingStatus(RequestStatusType.loading))

    expect(instanceState.loadingStatus).toBe(RequestStatusType.idle)
    expect(instanceState.errorServer).toBe(null)
    expect(finalState).toEqual({
        loadingStatus: RequestStatusType.loading,
        errorServer: null
    })
})
test('Error value have to be changed', () => {
    let finalState: instanceStateType = appReducer(instanceState, changeAppErrorValue('I am ERROR!'))

    expect(instanceState).toEqual({
        loadingStatus: RequestStatusType.idle,
        errorServer: null
    })
    expect(finalState).toEqual({
        loadingStatus: RequestStatusType.idle,
        errorServer: 'I am ERROR!'
    })
})