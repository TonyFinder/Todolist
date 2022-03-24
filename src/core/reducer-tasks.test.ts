import {
    addTaskAC,
    changeCheckboxAC,
    changedTitleTaskAC,
    removeTaskAC,
    tasksPropsType,
    tasksReducer
} from './reducer-tasks';
import {addTodolistAC, removeTodolistAC, todolistsReducer, TodolistStateType} from './reducer-todolist';
import {TaskPriorities, TaskStatuses} from '../api/api';

//Можно обойтись без использования beforeEach и в теле объявить все переменные, так как редьюсеры не меняют входящие данные.
//Использовал два разных подхода в тестах для todolist и tasks
let todolists: Array<TodolistStateType> = [
    {id: "toDoList_1", title: "What to learn", filter: "All", order: 0, addedDate: ""},
    {id: "toDoList_2", title: "What to buy", filter: "All", order: 0, addedDate: ""}
]
let tasks: tasksPropsType = {
    ['toDoList_1']: [
        {id: '1', title: 'HTML&CSS', status: TaskStatuses.Completed, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
        {id: '2', title: 'JS', status: TaskStatuses.Completed, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
        {id: '3', title: 'React', status: TaskStatuses.New, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""}
    ],
    ['toDoList_2']: [
        {id: '1', title: 'Bread', status: TaskStatuses.New, todolistId: 'toDoList_2', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
        {id: '2', title: 'Milk', status: TaskStatuses.Completed, todolistId: 'toDoList_2', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
        {id: '3', title: 'Soap', status: TaskStatuses.New, todolistId: 'toDoList_2', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""}
    ]
}

test('task should be removed', () => {
    const action = removeTaskAC('2', 'toDoList_1')
    const endTasks: tasksPropsType = tasksReducer(tasks, action)

    expect(endTasks).toEqual({
        ['toDoList_1']: [
            {id: '1', title: 'HTML&CSS', status: TaskStatuses.Completed, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
            {id: '3', title: 'React', status: TaskStatuses.New, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""}
        ],
        ['toDoList_2']: [
            {id: '1', title: 'Bread', status: TaskStatuses.New, todolistId: 'toDoList_2', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
            {id: '2', title: 'Milk', status: TaskStatuses.Completed, todolistId: 'toDoList_2', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
            {id: '3', title: 'Soap', status: TaskStatuses.New, todolistId: 'toDoList_2', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""}
        ]
    })
})
test('new task have to be added', () => {
    const action = addTaskAC('Apples', 'toDoList_2')
    const newTasks = tasksReducer(tasks, action)

    expect(newTasks['toDoList_2'][0].title).toBe('Apples')
    expect(newTasks['toDoList_2'][0].id).toBeDefined()
    expect(newTasks['toDoList_2'][0].status).toBe(TaskStatuses.New)
    expect(newTasks['toDoList_1'].length).toBe(3)
    expect(newTasks['toDoList_2'].length).toBe(4)
})
test('change status of the task', () => {
    const action = changeCheckboxAC('3', TaskStatuses.Completed, 'toDoList_2')
    const endTasks = tasksReducer(tasks, action)

    expect(endTasks['toDoList_2'][2].status).toBe(TaskStatuses.Completed)
    expect(endTasks).toEqual({
        ['toDoList_1']: [
            {id: '1', title: 'HTML&CSS', status: TaskStatuses.Completed, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
            {id: '3', title: 'React', status: TaskStatuses.New, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""}
        ],
        ['toDoList_2']: [
            {id: '1', title: 'Bread', status: TaskStatuses.New, todolistId: 'toDoList_2', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
            {id: '2', title: 'Milk', status: TaskStatuses.Completed, todolistId: 'toDoList_2', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
            {id: '3', title: 'Soap', status: TaskStatuses.Completed, todolistId: 'toDoList_2', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""}
        ]
    })
})
test('change title for the task', () => {
    const action = changedTitleTaskAC("Kefir", "toDoList_2", "2")
    const endTasks = tasksReducer(tasks, action)

    expect(endTasks).toEqual({
        ['toDoList_1']: [
            {id: "1", title: 'HTML&CSS', status: TaskStatuses.Completed, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
            {id: "2", title: 'JS', status: TaskStatuses.Completed, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
            {id: "3", title: 'React', status: TaskStatuses.New, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""}
        ],
        ['toDoList_2']: [
            {id: "1", title: 'Bread', status: TaskStatuses.New, todolistId: 'toDoList_2', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
            {id: "2", title: 'Kefir', status: TaskStatuses.Completed, todolistId: 'toDoList_2', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
            {id: "3", title: 'Soap', status: TaskStatuses.New, todolistId: 'toDoList_2', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""}
        ]
    })
})
test('todolist have to be deleted from tasks', () => {
    const action = removeTodolistAC("toDoList_1")
    const newTodolists = todolistsReducer(todolists, action)
    const newTasks = tasksReducer(tasks, action)

    expect(newTodolists).toEqual([
        {id: 'toDoList_2', title: "What to buy", filter: "All", order: 0, addedDate: ""}
    ])
    expect(newTasks).toEqual({
        ['toDoList_2']: [
            {id: "1", title: 'Bread', status: TaskStatuses.New, todolistId: 'toDoList_2', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
            {id: "2", title: 'Milk', status: TaskStatuses.Completed, todolistId: 'toDoList_2', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
            {id: "3", title: 'Soap', status: TaskStatuses.New, todolistId: 'toDoList_2', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""}
        ]
    })
})
test('new empty todolist have to be added', () => {
    const action = addTodolistAC("What to do")
    const endTodolists = todolistsReducer(todolists, action)
    const endTasks = tasksReducer(tasks, action)
    const keys = Object.keys(endTasks)

    expect(endTodolists.length).toBe(3)
    expect(endTodolists[0].id).toBeDefined()
    expect(endTodolists[2].title).toBe("What to do")
    expect(endTodolists[0].filter).toBe("All")
    expect(keys.length).toBe(3)
    expect(keys[0]).toBeDefined()
    expect(endTasks[keys[0]]).toEqual([])
    expect(keys[0]).toBe(endTodolists[2].id)
})