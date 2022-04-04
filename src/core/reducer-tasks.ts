import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from './reducer-todolist';
import {tasksAPI, TaskType, TaskUpdateType} from '../api/api';
import {Dispatch} from 'redux';
import {AppStateRootType} from './store/store';

let initialState: tasksPropsType = {}

export const tasksReducer = (tasks: tasksPropsType = initialState, action: tasksActionTypes): tasksPropsType => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            let newTasks = {...tasks}
            action.todolists.forEach(t => {
                newTasks[t.id] = []
            })
            return newTasks
        case 'SET-TASKS':
            return {...tasks, [action.todolistId]: action.tasks.map(t => t)}
        case 'ADD-TASK':
            return {...tasks, [action.todolistId]: [{...action.task}, ...tasks[action.todolistId]]}
        case 'CHANGE-TASK-STATUS':
            return {...tasks, [action.todolistId]: tasks[action.todolistId].map(task => task.id === action.id ? {...task, ...action.updateObject} : task)}
        case 'CHANGE-TASK-TITLE':
            return {...tasks, [action.todolistId]: tasks[action.todolistId].map(task => task.id === action.taskId ? {...task, ...action.updateObject} : task)}
        case 'REMOVE-TASK':
            return {...tasks, [action.todolistId]: tasks[action.todolistId].filter(task => task.id !== action.taskID)}
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
export const changeCheckboxAC = (id: string, updateObject: TaskUpdateType, todolistId: string) => ({type: 'CHANGE-TASK-STATUS', id, updateObject, todolistId} as const)
export const changedTitleTaskAC = (updateObject: TaskUpdateType, todolistId: string, taskId: string) => ({type: 'CHANGE-TASK-TITLE', updateObject, todolistId, taskId} as const)
export const removeTaskAC = (taskID: string, todolistId: string) => ({type: 'REMOVE-TASK', taskID, todolistId} as const)

// thunks
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title)
        .then(res => dispatch(addTaskAC(todolistId, res.data.data.item)))
}
export const changeCheckboxTC = (id: string, status: number, todolistId: string) => (dispatch: Dispatch, setState: () => AppStateRootType) => {
    let task = setState().tasks[todolistId].find(t => t.id === id)
    if (!task) return console.warn("Task was not found")

    let updateObject: TaskUpdateType = {
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        priority: task.priority,
        startDate: task.startDate,
        status
    }
    tasksAPI.updateTask(todolistId, id, updateObject)
        .then(res => dispatch(changeCheckboxAC(id, updateObject, todolistId)))
}
export const changedTitleTaskTC = (title: string, todolistId: string, id: string) => (dispatch: Dispatch, getState: () => AppStateRootType) => {
    let task = getState().tasks[todolistId].find(t => t.id === id)
    if (!task) return console.warn("Task was not found")

    let updateObject: TaskUpdateType = {
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        description: task.description,
        deadline: task.deadline,
        title
    }
    tasksAPI.updateTask(todolistId, id, updateObject)
        .then(res => dispatch(changedTitleTaskAC(updateObject, todolistId, id)))
}
export const removeTaskTC = (id: string, todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, id)
        .then(res => dispatch(removeTaskAC(id, todolistId)))
}

// types
export type tasksActionTypes =
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeCheckboxAC>
    | ReturnType<typeof changedTitleTaskAC>
    | ReturnType<typeof removeTaskAC>
    | SetTodolistsAT
    | AddTodolistAT
    | RemoveTodolistAT

export type tasksPropsType = {[key: string]: TaskType[]}