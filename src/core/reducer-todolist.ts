import {v1} from 'uuid';
import {TodolistType} from '../api/api';

let initialState: TodolistStateType[] = []

export const todolistsReducer = (todolists: TodolistStateType[] = initialState, action: todolistActionTypes): TodolistStateType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(ft => ft.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [...todolists, {id: action.todolistId, title: action.title, filter: 'All', addedDate: "", order: 0}]
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(m => m.id === action.todolistId ? {...m, title: action.title} : m)
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(mt => mt.id === action.todolistId ? {...mt, filter: action.filterId} : mt)
        default:
            return todolists
    }
}

// actions
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const)
export const addTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', title, todolistId: v1()} as const)
export const changeTodolistTitleAC = (title: string, todolistId: string) => ({type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const)
export const filterTaskAC = (filterId: FilterProps, todolistId: string) => ({type: 'CHANGE-TODOLIST-FILTER', todolistId, filterId} as const)

// types
export type todolistActionTypes =
    | RemoveTodolistAT
    | AddTodolistAT
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof filterTaskAC>

export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>

export type FilterProps = 'All' | 'Active' | 'Completed'
export type TodolistStateType = TodolistType & {filter: FilterProps}