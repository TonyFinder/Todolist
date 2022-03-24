import {v1} from 'uuid';
import {TodolistType} from '../api/api';

export type removeTodolistAT = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type addTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type changeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string,
    todolistId: string
}

export type filterTaskAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filterId: FilterProps,
    todolistId: string
}
export type todolistActionTypes = removeTodolistAT | addTodolistAT | changeTodolistTitleAT | filterTaskAT

export type FilterProps = 'All' | 'Active' | 'Completed'
export type TodolistStateType = TodolistType & {filter: FilterProps}

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

export const removeTodolistAC = (todolistId: string): removeTodolistAT => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId: todolistId
    }
}
export const addTodolistAC = (title: string): addTodolistAT => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistId: v1()
    }
}
export const changeTodolistTitleAC = (title: string, todolistId: string): changeTodolistTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId: todolistId,
        title
    }
}
export const filterTaskAC = (filterId: FilterProps, todolistId: string): filterTaskAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId,
        filterId
    }
}