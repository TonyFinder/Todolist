import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from './reducer-todolist';
import {tasksAPI, TaskType} from '../api/api';
import {AppStateRootType, AppThunk} from '../app/store';
import {AppActionType, changeAppErrorValue, changeAppLoadingStatus} from './app-reducer';
import {AxiosError} from 'axios';
import {handlerForAppErrorInThen} from '../utils/common-commands';
import {ApiResultCode, RequestStatusType, TaskPriorities, TaskStatuses} from '../utils/enums';

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
            return {...tasks, [action.todolistId]: action.tasks.map(task => ({...task, entityStatus: RequestStatusType.idle}))}
        case 'ADD-TASK':
            return {...tasks, [action.todolistId]: [{...action.task, entityStatus: RequestStatusType.idle}, ...tasks[action.todolistId]]}
        case 'UPDATE-TASK':
            return {...tasks,
                [action.todolistId]: tasks[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.updateObject} : t)}
        case 'REMOVE-TASK':
            return {...tasks, [action.todolistId]: tasks[action.todolistId].filter(task => task.id !== action.taskId)}
        case 'CHANGE-TASK-ENTITY-STATUS':
            return {...tasks, [action.todolistId]: tasks[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, entityStatus: action.status} : task)}
        case 'ADD-TODOLIST':
            return {[action.todolist.id]: [], ...tasks}
        case 'REMOVE-TODOLIST':
            let newState = {...tasks}
            delete newState[action.todolistId]
            return newState
        case 'CLEAR-TASKS':
            return {}
        default:
            return tasks
    }
}

// actions
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todolistId, tasks} as const)
export const addTaskAC = (todolistId: string, task: TaskType) => ({type: 'ADD-TASK', todolistId, task} as const)
export const updateTaskAC = (taskId: string, todolistId: string, updateObject: TaskUpdateDomainType) => (
    {type: 'UPDATE-TASK', taskId, todolistId, updateObject} as const)
export const changeTaskEntityStatusAC = (taskId: string, todolistId: string, status: RequestStatusType) => (
    {type: 'CHANGE-TASK-ENTITY-STATUS', taskId, todolistId, status} as const)
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const clearTasksAC = () => ({type: 'CLEAR-TASKS'} as const)

// thunks
export const setTasksTC = (todolistId: string): AppThunk => dispatch => {
    dispatch(changeAppLoadingStatus(RequestStatusType.loading))
    tasksAPI.getTasks(todolistId)
        .then(res => dispatch(setTasksAC(todolistId, res.data.items)))
        .catch((err: AxiosError) => dispatch(changeAppErrorValue(err.message)))
        .finally(()=> dispatch(changeAppLoadingStatus(RequestStatusType.succeeded)))
}
export const addTaskTC = (title: string, todolistId: string): AppThunk => dispatch => {
    dispatch(changeAppLoadingStatus(RequestStatusType.loading))
    tasksAPI.createTask(todolistId, title)
        .then(res => res.data.resultCode === ApiResultCode.success
                ? dispatch(addTaskAC(todolistId, res.data.data.item))
                : handlerForAppErrorInThen(dispatch, res.data.messages))
        .catch((err: AxiosError) => dispatch(changeAppErrorValue(err.message)))
        .finally(()=> dispatch(changeAppLoadingStatus(RequestStatusType.succeeded)))
}
export const updateTaskTC = (todolistId: string, taskId: string, updateObject: TaskUpdateDomainType): AppThunk => (dispatch, getState: () => AppStateRootType) => {
    dispatch(changeAppLoadingStatus(RequestStatusType.loading))
    dispatch(changeTaskEntityStatusAC(taskId, todolistId, RequestStatusType.loading))
    let task = getState().tasks[todolistId].find(t => t.id === taskId)
    if (!task) return console.warn('Task was not found')

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
        .then(res => res.data.resultCode === ApiResultCode.success
                ? dispatch(updateTaskAC(taskId, todolistId, updateObject))
                : handlerForAppErrorInThen(dispatch, res.data.messages))
        .catch((err: AxiosError) => dispatch(changeAppErrorValue(err.message)))
        .finally(()=> {
            dispatch(changeAppLoadingStatus(RequestStatusType.succeeded))
            dispatch(changeTaskEntityStatusAC(taskId, todolistId, RequestStatusType.succeeded))
        })
}
export const removeTaskTC = (taskId: string, todolistId: string): AppThunk => dispatch => {
    dispatch(changeAppLoadingStatus(RequestStatusType.loading))
    dispatch(changeTaskEntityStatusAC(taskId, todolistId, RequestStatusType.loading))
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => res.data.resultCode === ApiResultCode.success
                ? dispatch(removeTaskAC(taskId, todolistId))
                : handlerForAppErrorInThen(dispatch, res.data.messages))
        .catch((err: AxiosError) => dispatch(changeAppErrorValue(err.message)))
        .finally(()=> dispatch(changeAppLoadingStatus(RequestStatusType.succeeded)))
}

// types
export type TasksPropsType = { [key: string]: TaskDomainType[] }
export type TasksActionTypes =
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskEntityStatusAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof clearTasksAC>
    | SetTodolistsAT
    | AddTodolistAT
    | RemoveTodolistAT
    | AppActionType
export type TaskUpdateDomainType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TaskDomainType = TaskType & {entityStatus: RequestStatusType}
