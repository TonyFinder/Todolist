import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from './reducer-todolist';
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType} from '../api/api';
import {Dispatch} from 'redux';
import {AppStateRootType} from '../app/store';

let initialState: TasksPropsType = {}

export const tasksReducer = (tasks: TasksPropsType = initialState, action: TasksActionTypes): TasksPropsType => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            let newTasks = {...tasks}
            action.todolists.forEach(t => {
                newTasks[t.id] = []
            })
            return newTasks
        case 'SET-TASKS':
            return {...tasks, [action.todolistId]: action.tasks}
        case 'ADD-TASK':
            return {...tasks, [action.todolistId]: [action.task, ...tasks[action.todolistId]]}
        case 'UPDATE-TASK':
            return {...tasks, [action.todolistId]: tasks[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.updateObject} : t)}
        case 'REMOVE-TASK':
            return {...tasks, [action.todolistId]: tasks[action.todolistId].filter(task => task.id !== action.taskId)}
        case 'ADD-TODOLIST':
            return {[action.todolist.id]: [], ...tasks}
        case 'REMOVE-TODOLIST':
            let newState = {...tasks}
            delete newState[action.todolistId]
            return newState
        default:
            return tasks
    }
}

// actions
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todolistId, tasks} as const)
export const addTaskAC = (todolistId: string, task: TaskType) => ({type: 'ADD-TASK', todolistId, task} as const)
export const updateTaskAC = (taskId: string, todolistId: string, updateObject: TaskUpdateDomainType) => ({type: 'UPDATE-TASK', taskId, todolistId, updateObject} as const)
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)

// thunks
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch<TasksActionTypes>) => {
    tasksAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<TasksActionTypes>) => {
    tasksAPI.createTask(todolistId, title)
        .then(res => dispatch(addTaskAC(todolistId, res.data.data.item)))
}
export const updateTaskTC = (todolistId: string, taskId: string, updateObject: TaskUpdateDomainType) => (dispatch: Dispatch<TasksActionTypes>, getState: () => AppStateRootType) => {
    let task = getState().tasks[todolistId].find(t => t.id === taskId)
    if (!task) return console.warn("Task was not found")

    let model: TaskUpdateDomainType = {
        status: task.status,
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        startDate: task.startDate,
        priority: task.priority,
        ...updateObject
    }
    tasksAPI.updateTask(todolistId, taskId, model)
        .then(res => dispatch(updateTaskAC(taskId, todolistId, updateObject)))
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<TasksActionTypes>) => {
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => dispatch(removeTaskAC(taskId, todolistId)))
}

// types
export type TasksPropsType = {[key: string]: TaskType[]}
export type TasksActionTypes =
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof removeTaskAC>
    | SetTodolistsAT
    | AddTodolistAT
    | RemoveTodolistAT
export type TaskUpdateDomainType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
