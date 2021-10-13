import {FilterProps, toDoListsPropsType} from '../App';
import {v1} from 'uuid';

export type removeToDoListAT = {
    type: 'REMOVE-TODOLIST'
    toDoListId: string
}
export type addToDoListAT = {
    type: 'ADD-TODOLIST'
    title: string
}
export type changeToDoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string,
    toDoListId: string
}
export type filterTaskAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filterId: FilterProps,
    toDoListId: string
}

export type ActionTypes = removeToDoListAT | addToDoListAT | changeToDoListTitleAT | filterTaskAT

export const todolistsReducer = (toDoLists: toDoListsPropsType[], action: ActionTypes): toDoListsPropsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return toDoLists.filter(ft => ft.id !== action.toDoListId)
        case 'ADD-TODOLIST':
            return [...toDoLists, {id: v1(), title: action.title, filter: 'All'}]
        case 'CHANGE-TODOLIST-TITLE':
            return toDoLists.map(m => m.id === action.toDoListId ? {...m, title: action.title} : m)
        case 'CHANGE-TODOLIST-FILTER':
            return toDoLists.map(mt => mt.id === action.toDoListId ? {...mt, filter: action.filterId} : mt)
        default:
            return toDoLists
    }
}

export const removeToDoListAC = (toDoListId: string): removeToDoListAT => {
    return {
        type: 'REMOVE-TODOLIST',
        toDoListId
    }
}
// Здесь вопрос как быть с v1
export const addToDoListAC = (title: string): addToDoListAT => {
    return {
        type: 'ADD-TODOLIST',
        title
    }
}

export const changeToDoListTitleAC = (title: string, toDoListId: string): changeToDoListTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        toDoListId,
        title
    }
}

export const filterTaskAC = (filterId: FilterProps, toDoListId: string): filterTaskAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        toDoListId,
        filterId
    }
}