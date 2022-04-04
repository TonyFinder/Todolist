import {todolistsAPI, TodolistType} from '../api/api';
import {Dispatch} from 'redux';

let initialState: TodolistStateType[] = []

export const todolistsReducer = (todolists: TodolistStateType[] = initialState, action: todolistActionTypes): TodolistStateType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(t => ({...t, filter: 'All'}))
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'All'}, ...todolists]
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(mt => mt.id === action.todolistId ? {...mt, filter: action.filterId} : mt)
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(m => m.id === action.todolistId ? {...m, title: action.title} : m)
        case 'REMOVE-TODOLIST':
            return todolists.filter(ft => ft.id !== action.todolistId)
        default:
            return todolists
    }
}

// actions
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const filterTaskAC = (filterId: FilterProps, todolistId: string) => ({type: 'CHANGE-TODOLIST-FILTER', todolistId, filterId} as const)
export const changeTodolistTitleAC = (title: string, todolistId: string) => ({type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const)
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const)

// thunks
export const setTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => dispatch(setTodolistsAC(res.data)))
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then(res => dispatch(addTodolistAC(res.data.data.item)))
}
export const changeTodolistTitleTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => dispatch(changeTodolistTitleAC(title, todolistId)))
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => dispatch(removeTodolistAC(todolistId)))
}

// types
export type todolistActionTypes =
    | SetTodolistsAT
    | AddTodolistAT
    | ReturnType<typeof filterTaskAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | RemoveTodolistAT

export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>

export type FilterProps = 'All' | 'Active' | 'Completed'
export type TodolistStateType = TodolistType & {filter: FilterProps}