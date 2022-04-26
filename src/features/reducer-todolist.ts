import {todolistsAPI, TodolistType} from '../api/api';
import {Dispatch} from 'redux';
import {AppActionType, changeAppErrorValue, changeAppLoadingStatus} from './app-reducer';
import {AxiosError} from 'axios';
import {ApiResultCode, RequestStatusType} from '../utils/enums';

let initialState: TodolistDomainType[] = []

export const todolistsReducer = (todolists: TodolistDomainType[] = initialState, action: TodolistActionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(t => ({...t, filter: 'All', entityStatus: RequestStatusType.idle}))
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'All', entityStatus: RequestStatusType.idle}, ...todolists]
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(mt => mt.id === action.todolistId ? {...mt, filter: action.filterId} : mt)
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(m => m.id === action.todolistId ? {...m, title: action.title} : m)
        case 'REMOVE-TODOLIST':
            return todolists.filter(ft => ft.id !== action.todolistId)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return todolists.map(t => t.id === action.todolistId ? {...t, entityStatus: action.entityStatus} : t)
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
export const changeTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', todolistId, entityStatus} as const)

// thunks
export const setTodolistsTC = () => (dispatch: Dispatch<TodolistActionTypes>) => {
    dispatch(changeAppLoadingStatus(RequestStatusType.loading))
    todolistsAPI.getTodolists()
        .then(res => dispatch(setTodolistsAC(res.data)))
        .catch((err: AxiosError) => dispatch(changeAppErrorValue(err.message)))
        .finally(()=> dispatch(changeAppLoadingStatus(RequestStatusType.succeeded)))
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<TodolistActionTypes>) => {
    dispatch(changeAppLoadingStatus(RequestStatusType.loading))
    todolistsAPI.createTodolist(title)
        .then(res => res.data.resultCode === ApiResultCode.success
                ? dispatch(addTodolistAC(res.data.data.item))
                : dispatch(changeAppErrorValue(res.data.messages ? res.data.messages[0] : 'Some error is occurred')))
        .catch((err: AxiosError) => dispatch(changeAppErrorValue(err.message)))
        .finally(()=> dispatch(changeAppLoadingStatus(RequestStatusType.succeeded)))
}
export const changeTodolistTitleTC = (title: string, todolistId: string) => (dispatch: Dispatch<TodolistActionTypes>) => {
    dispatch(changeAppLoadingStatus(RequestStatusType.loading))
    dispatch(changeTodolistEntityStatusAC(todolistId, RequestStatusType.loading))
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => res.data.resultCode === ApiResultCode.success
                ? dispatch(changeTodolistTitleAC(title, todolistId))
                : dispatch(changeAppErrorValue(res.data.messages ? res.data.messages[0] : "Some error is occurred")))
        .catch((err: AxiosError) => dispatch(changeAppErrorValue(err.message)))
        .finally(()=> {
            dispatch(changeAppLoadingStatus(RequestStatusType.succeeded))
            dispatch(changeTodolistEntityStatusAC(todolistId, RequestStatusType.succeeded))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodolistActionTypes>) => {
    dispatch(changeAppLoadingStatus(RequestStatusType.loading))
    dispatch(changeTodolistEntityStatusAC(todolistId, RequestStatusType.loading))
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => res.data.resultCode === ApiResultCode.success
                ? dispatch(removeTodolistAC(todolistId))
                : dispatch(changeAppErrorValue(res.data.messages ? res.data.messages[0] : "Some error is occurred")))
        .catch((err: AxiosError) => dispatch(changeAppErrorValue(err.message)))
        .finally(()=> dispatch(changeAppLoadingStatus(RequestStatusType.succeeded)))
}

// types
export type TodolistActionTypes =
    | SetTodolistsAT
    | AddTodolistAT
    | ReturnType<typeof filterTaskAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | RemoveTodolistAT
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | AppActionType

export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>

export type FilterProps = 'All' | 'Active' | 'Completed'
export type TodolistDomainType = TodolistType & { filter: FilterProps, entityStatus: RequestStatusType }