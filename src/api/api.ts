import axios from 'axios';
import {TaskUpdateDomainType} from '../features/reducer-tasks';
import {TaskPriorities, TaskStatuses} from '../utils/enums';

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
        return instance.post<any, BaseResponseType<{item: TodolistType}>, {title: string}>('todo-lists', {title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<any, BaseResponseType, {title: string}>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<any, BaseResponseType, {}>(`todo-lists/${todolistId}`)
    }
}
export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<any, BaseResponseType<{item: TaskType}>, {title: string}>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, updateObject: TaskUpdateDomainType) {
        return instance.put<any, BaseResponseType<{item: TaskType}>, TaskUpdateDomainType>(`todo-lists/${todolistId}/tasks/${taskId}`, updateObject)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<any, BaseResponseType, {}>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
export const authAPI = {
    login(data: LoginRequestType) {
        return instance.post<any, BaseResponseType<{userId: number}>, LoginRequestType>(`auth/login`, {...data})
    },
    me() {
        return instance.get<any, BaseResponseType<MeResponseDataType>, {}>('auth/me')
    }
}


// types
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
type BaseResponseType<T = {}> = {
    data: {
        resultCode: number
        messages: string[]
        fieldsErrors: []
        data: T
    }
}
type TasksResponseType = {
    items: TaskType[]
    error: string
    totalCount: number
}
export type LoginRequestType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}
type MeResponseDataType = {
    id: number
    email: string
    login: string
}