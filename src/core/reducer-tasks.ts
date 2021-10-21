import {tasksPropsType} from '../App';
import {v1} from 'uuid';
import {addToDoListAT, removeToDoListAT} from './reducer-todolist';

export type removeTaskAT = {
    type: 'REMOVE-TASK'
    taskID: string
    toDoListId: string
}
export type addTaskAT = {
    type: 'ADD-TASK'
    title: string
    toDoListId: string
}
export type changeCheckboxAT = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    checked: boolean
    toDoListId: string
}
export type changedTitleTaskAT = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    toDoListId: string
    taskId: string
}

export type tasksActionTypes = removeTaskAT | addTaskAT | changeCheckboxAT | changedTitleTaskAT | removeToDoListAT | addToDoListAT

export const tasksReducer = (tasks: tasksPropsType, action: tasksActionTypes): tasksPropsType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...tasks, [action.toDoListId]: tasks[action.toDoListId].filter(task => task.id !== action.taskID)}
        case 'ADD-TASK':
            return {...tasks, [action.toDoListId]: [{id: v1(), term: action.title, isDone: false}, ...tasks[action.toDoListId]]}
        case 'CHANGE-TASK-STATUS':
            return {...tasks, [action.toDoListId]: tasks[action.toDoListId].map(task => task.id === action.id ? {...task, isDone: action.checked} : task)}
        case 'CHANGE-TASK-TITLE':
            return {...tasks, [action.toDoListId]: tasks[action.toDoListId].map(task => task.id === action.taskId ? {...task, term: action.title} : task)}
        case 'REMOVE-TODOLIST':
            let newState = {...tasks}
            delete newState[action.toDoListId]
            return newState
        case 'ADD-TODOLIST':
            return {[action.toDoListId]: [], ...tasks}
        default:
            return tasks
    }
}

export const removeTaskAC = (taskID: string, toDoListId: string): removeTaskAT => {
    return {
        type: 'REMOVE-TASK',
        taskID,
        toDoListId
    }
}
export const addTaskAC = (title: string, toDoListId: string): addTaskAT => {
    return {
        type: 'ADD-TASK',
        title,
        toDoListId
    }
}
export const changeCheckboxAC = (id: string, checked: boolean, toDoListId: string): changeCheckboxAT => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id,
        checked,
        toDoListId
    }
}
export const changedTitleTaskAC = (title: string, toDoListId: string, taskId: string): changedTitleTaskAT => {
    return {
        type: 'CHANGE-TASK-TITLE',
        title,
        toDoListId,
        taskId
    }
}