import {v1} from 'uuid';
import {AddTodolistAT, RemoveTodolistAT} from './reducer-todolist';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/api';

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

// actions
export const removeTaskAC = (taskID: string, todolistId: string) => ({type: 'REMOVE-TASK', taskID, todolistId} as const)
export const addTaskAC = (title: string, todolistId: string) => ({type: 'ADD-TASK', title, todolistId} as const)
export const changeCheckboxAC = (id: string, checked: number, todolistId: string) => ({type: 'CHANGE-TASK-STATUS', id, checked, todolistId} as const)
export const changedTitleTaskAC = (title: string, todolistId: string, taskId: string) => ({type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const)

// types
export type tasksActionTypes =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeCheckboxAC>
    | ReturnType<typeof changedTitleTaskAC>
    | RemoveTodolistAT
    | AddTodolistAT

export type tasksPropsType = {[key: string]: TaskType[]}