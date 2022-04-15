import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistsReducer} from '../features/reducer-todolist';
import {tasksReducer} from '../features/reducer-tasks';
import thunk from 'redux-thunk';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {appReducer} from '../features/app-reducer';

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

// @ts-ignore
window.store = store