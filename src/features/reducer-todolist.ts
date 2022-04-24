import {todolistsAPI, TodolistType} from '../api/api';
import {Dispatch} from 'redux';
import {AppActionType, changeAppErrorValue, changeAppLoadingStatus} from './app-reducer';
import {AxiosError} from 'axios';
import {ApiResultCode, DisableStatuses} from '../utils/enums';

let initialState: TodolistStateType[] = []

export const todolistsReducer = (todolists: TodolistStateType[] = initialState, action: TodolistActionTypes): TodolistStateType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(t => ({...t, filter: 'All', disabled: DisableStatuses.disableFalse}))
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'All', disabled: DisableStatuses.disableFalse}, ...todolists]
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(mt => mt.id === action.todolistId ? {...mt, filter: action.filterId} : mt)
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(m => m.id === action.todolistId ? {...m, title: action.title} : m)
        case 'REMOVE-TODOLIST':
            return todolists.filter(ft => ft.id !== action.todolistId)
        case 'DISABLE-TODOLIST':
            return todolists.map(t => t.id === action.todolistId ? {...t, disabled: action.disableStatus} : t)
        default:
            return todolists
    }
}

// actions
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const filterTaskAC = (filterId: FilterProps, todolistId: string) => (
    {type: 'CHANGE-TODOLIST-FILTER', todolistId, filterId} as const)
export const changeTodolistTitleAC = (title: string, todolistId: string) => (
    {type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const)
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const)
export const disableTodolistAC = (todolistId: string, disableStatus: DisableStatuses) => ({type: 'DISABLE-TODOLIST', todolistId, disableStatus} as const)

// thunks
export const setTodolistsTC = () => (dispatch: Dispatch<TodolistActionTypes>) => {
    dispatch(changeAppLoadingStatus('loading'))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
        .catch((err: AxiosError) => dispatch(changeAppErrorValue(err.message)))
        .finally(()=> dispatch(changeAppLoadingStatus('succeeded')))
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<TodolistActionTypes>) => {
    dispatch(changeAppLoadingStatus('loading'))
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === ApiResultCode.success) {
                dispatch(addTodolistAC(res.data.data.item))
            } else {
                dispatch(changeAppErrorValue(res.data.messages ? res.data.messages[0] : "Some error is occurred"))
            }
        })
        .catch((err: AxiosError) => dispatch(changeAppErrorValue(err.message)))
        .finally(()=> dispatch(changeAppLoadingStatus('succeeded')))
}
export const changeTodolistTitleTC = (title: string, todolistId: string) => (dispatch: Dispatch<TodolistActionTypes>) => {
    dispatch(changeAppLoadingStatus('loading'))
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => {
            if (res.data.resultCode === ApiResultCode.success) {
                dispatch(changeTodolistTitleAC(title, todolistId))
            } else {
                dispatch(changeAppErrorValue(res.data.messages ? res.data.messages[0] : "Some error is occurred"))
            }
        })
        .catch((err: AxiosError) => dispatch(changeAppErrorValue(err.message)))
        .finally(()=> dispatch(changeAppLoadingStatus('succeeded')))
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodolistActionTypes>) => {
    dispatch(changeAppLoadingStatus('loading'))
    dispatch(disableTodolistAC(todolistId, DisableStatuses.disableTrue))
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === ApiResultCode.success) {
                dispatch(removeTodolistAC(todolistId))
            } else {
                dispatch(changeAppErrorValue(res.data.messages ? res.data.messages[0] : "Some error is occurred"))
            }
        })
        .catch((err: AxiosError) => dispatch(changeAppErrorValue(err.message)))
        .finally(()=> dispatch(changeAppLoadingStatus('succeeded')))
}

// types
export type TodolistActionTypes =
    | SetTodolistsAT
    | AddTodolistAT
    | ReturnType<typeof filterTaskAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | RemoveTodolistAT
    | ReturnType<typeof disableTodolistAC>
    | AppActionType

export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>

export type FilterProps = 'All' | 'Active' | 'Completed'
export type TodolistStateType = TodolistType & { filter: FilterProps, disabled: DisableStatuses }