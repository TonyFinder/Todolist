import axios from 'axios';
import {TaskUpdateDomainType} from '../features/reducer-tasks';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': '7c15e34d-028e-4653-86ec-6c53c32699db'
    }
})

// api
export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<any, BaseTodolistResponseType<{item: TodolistType}>, {title: string}>('todo-lists', {title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<any, BaseTodolistResponseType, {title: string}>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<any, BaseTodolistResponseType, {}>(`todo-lists/${todolistId}`)
    }
}
export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<any, BaseResponseTasksType<{item: TaskType}>, {title: string}>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, updateObject: TaskUpdateDomainType) {
        return instance.put<any, BaseResponseTasksType<{item: TaskType}>, TaskUpdateDomainType>(`todo-lists/${todolistId}/tasks/${taskId}`, updateObject)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<any, BaseResponseTasksType, {}>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

// types
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todolistId: string
    order: number
    addedDate: string
}
export type TaskUpdateType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type BaseTodolistResponseType<T = {}> = {
    data: {
        fieldsErrors: []
        messages: string[]
        resultCode: number
        data: T
    }
}
type TasksResponseType = {
    items: TaskType[]
    error: string
    totalCount: number
}
type BaseResponseTasksType<T = {}> = {
data: {
    resultCode: number
    messages: string[],
    fieldsErrors: string[]
    data: T
}
}