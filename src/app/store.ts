import {applyMiddleware, combineReducers, createStore} from 'redux';
import {TodolistActionTypes, todolistsReducer} from '../features/reducer-todolist';
import {TasksActionTypes, tasksReducer} from '../features/reducer-tasks';
import thunk, {ThunkAction} from 'redux-thunk';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {AppActionType, appReducer} from '../features/app-reducer';

let rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export let store = createStore(rootReducer, applyMiddleware(thunk))

// useSelectorWrapper - you don't need to write AppStateRootType while using useSelector
export const useCustomSelector: TypedUseSelectorHook<AppStateRootType> = useSelector

// types
export type AppStateRootType = ReturnType<typeof rootReducer>
export type RootActionType = AppActionType | TasksActionTypes | TodolistActionTypes
// https://redux.js.org/usage/usage-with-typescript
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateRootType, unknown, RootActionType>


// @ts-ignore
window.store = store