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