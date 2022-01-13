import {combineReducers, createStore} from 'redux';
import {todolistsReducer} from '../reducer-todolist';
import {tasksReducer} from '../reducer-tasks';

export type AppStateRootType = ReturnType<typeof rootReducer>

let rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export let store = createStore(rootReducer)

// @ts-ignore
window.store = store