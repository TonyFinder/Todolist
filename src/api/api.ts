import axios from 'axios';

type TodolistResponseType = {
    addedDate: string
    id: string
    order: number
    title: string
}
type BaseTodolistResponseType<T = {}> = {
    data: T
    fieldsErrors: []
    messages: []
    resultCode: 0
}
type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    todoList?: number
}
export type TaskUpdateType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}
type TasksResponseType = {
    items: TaskType[]
    error: string
    totalCount: number
}
type BaseResponseTasksType<T = {}> = {
    resultCode: number
    messages: string[],
    fieldsErrors: string[]
    data: T
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': '7c15e34d-028e-4653-86ec-6c53c32699db'
    }
})

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistResponseType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<any, BaseTodolistResponseType<{item: TodolistResponseType}>, {title: string}>('todo-lists', {title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<any, BaseTodolistResponseType, {title: string}>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<BaseTodolistResponseType>(`todo-lists/${todolistId}`)
    }
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<any, BaseResponseTasksType<{item: TaskType}>, {title: string}>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, updateObject: TaskUpdateType) {
        return instance.put<any, BaseResponseTasksType<{item: TaskType}>, TaskUpdateType>(`todo-lists/${todolistId}/tasks/${taskId}`, updateObject)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<BaseResponseTasksType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
