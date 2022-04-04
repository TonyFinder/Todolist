import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistsReducer} from '../reducer-todolist';
import {tasksReducer} from '../reducer-tasks';
import thunk from 'redux-thunk';

export type AppStateRootType = ReturnType<typeof rootReducer>

let rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export let store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store