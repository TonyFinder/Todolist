import {authReducer, setLoggedIn} from './auth-reducer';

let initialState = {
    isLoggedIn: false
}

test('set todolists', () => {
    let finalState = authReducer(initialState, setLoggedIn(true))

    expect(initialState).toEqual({
        isLoggedIn: false
    })
    expect(finalState).toEqual({
        isLoggedIn: true
    })
})