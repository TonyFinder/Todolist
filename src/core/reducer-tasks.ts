import {v1} from 'uuid';
import {addTodolistAT, removeTodolistAT} from './reducer-todolist';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/api';

export type removeTaskAT = {
    type: 'REMOVE-TASK'
    taskID: string
    todolistId: string
}
export type addTaskAT = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type changeCheckboxAT = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    checked: number
    todolistId: string
}
export type changedTitleTaskAT = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    todolistId: string
    taskId: string
}
export type tasksActionTypes = removeTaskAT | addTaskAT | changeCheckboxAT | changedTitleTaskAT | removeTodolistAT | addTodolistAT

export type tasksPropsType = {
    [key: string]: TaskType[]
}

let initialState: tasksPropsType = {}

export const tasksReducer = (tasks: tasksPropsType = initialState, action: tasksActionTypes): tasksPropsType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...tasks, [action.todolistId]: tasks[action.todolistId].filter(task => task.id !== action.taskID)}
        case 'ADD-TASK':
            return {...tasks, [action.todolistId]: [{id: v1(), title: action.title, status: TaskStatuses.New, addedDate: "", deadline: "",
                    description: "", order: 0, priority: TaskPriorities.Low, startDate: "", todolistId: action.todolistId}, ...tasks[action.todolistId]]}
        case 'CHANGE-TASK-STATUS':
            return {...tasks, [action.todolistId]: tasks[action.todolistId].map(task => task.id === action.id ? {...task, status: action.checked} : task)}
        case 'CHANGE-TASK-TITLE':
            return {...tasks, [action.todolistId]: tasks[action.todolistId].map(task => task.id === action.taskId ? {...task, title: action.title} : task)}
        case 'REMOVE-TODOLIST':
            let newState = {...tasks}
            delete newState[action.todolistId]
            return newState
        case 'ADD-TODOLIST':
            return {[action.todolistId]: [], ...tasks}
        default:
            return tasks
    }
}

export const removeTaskAC = (taskID: string, todolistId: string): removeTaskAT => {
    return {
        type: 'REMOVE-TASK',
        taskID,
        todolistId: todolistId
    }
}
export const addTaskAC = (title: string, todolistId: string): addTaskAT => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId: todolistId
    }
}
export const changeCheckboxAC = (id: string, checked: number, todolistId: string): changeCheckboxAT => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id,
        checked,
        todolistId: todolistId
    }
}
export const changedTitleTaskAC = (title: string, todolistId: string, taskId: string): changedTitleTaskAT => {
    return {
        type: 'CHANGE-TASK-TITLE',
        title,
        todolistId: todolistId,
        taskId
    }
}