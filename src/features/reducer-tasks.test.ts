import {
    addTaskAC,
    removeTaskAC,
    setTasksAC,
    TasksPropsType,
    tasksReducer,
    TaskUpdateDomainType,
    updateTaskAC
} from './reducer-tasks';
import {addTodolistAC, removeTodolistAC, setTodolistsAC, todolistsReducer, TodolistStateType} from './reducer-todolist';
import {TodolistType} from '../api/api';
import {TaskPriorities, TaskStatuses} from '../utils/enums';

//Можно обойтись без использования beforeEach и в теле объявить все переменные, так как редьюсеры не меняют входящие данные.
//Использовал два разных подхода в тестах для todolist и tasks
let todolists: Array<TodolistStateType> = [
    {id: "toDoList_1", title: "What to learn", filter: "All", order: 0, addedDate: ""},
    {id: "toDoList_2", title: "What to buy", filter: "All", order: 0, addedDate: ""}
]
let tasks: TasksPropsType = {
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
    const endTasks: TasksPropsType = tasksReducer(tasks, action)

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
    const taskToAdd = {
        description: "",
        title: "I am a new TASK",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        id: "hlmgp45lg",
        todolistId: "toDoList_1",
        order: 0,
        addedDate: ""
    }
    const action = addTaskAC( 'toDoList_2', taskToAdd)
    const newTasks = tasksReducer(tasks, action)

    expect(newTasks['toDoList_2'][0].title).toBe('I am a new TASK')
    expect(newTasks['toDoList_2'][0].id).toBeDefined()
    expect(newTasks['toDoList_2'][0].status).toBe(TaskStatuses.New)
    expect(newTasks['toDoList_1'].length).toBe(3)
    expect(newTasks['toDoList_2'].length).toBe(4)
})
test('change status of the task', () => {
    const obj: TaskUpdateDomainType = {
        status: TaskStatuses.Completed
    }
    const action = updateTaskAC('3', 'toDoList_2', obj)
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
    let obj: TaskUpdateDomainType = {
        title: 'Kefirok'
    }
    const action = updateTaskAC("2",  "toDoList_2", obj)
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
            {id: "2", title: 'Kefirok', status: TaskStatuses.Completed, todolistId: 'toDoList_2', order: 0,
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
test('new todolist have to be added', () => {
    let newTodolist: TodolistType = {id: "todolistId19", title: "How to talk", order: 0, addedDate: ""}
    const action = addTodolistAC(newTodolist)
    const endTodolists = todolistsReducer(todolists, action)
    const endTasks = tasksReducer(tasks, action)
    const keys = Object.keys(endTasks)

    expect(endTodolists.length).toBe(3)
    expect(endTodolists[0].id).toBeDefined()
    expect(endTodolists[0].title).toBe("How to talk")
    expect(endTodolists[0].filter).toBe("All")
    expect(keys.length).toBe(3)
    expect(keys[0]).toBeDefined()
    expect(endTasks[keys[0]]).toEqual([])
    expect(keys[0]).toBe(endTodolists[0].id)
})
test('set todolists', () => {
    let state = {}
    let todolists: TodolistStateType[] = [
        {id: 'first', title: "What to sing", filter: "All", order: 0, addedDate: ""},
        {id: 'second', title: "What to wash", filter: "All", order: 0, addedDate: ""}
    ]
    let endState = tasksReducer(state, setTodolistsAC(todolists))

    expect(state).toEqual({})
    expect(todolists).toEqual([
        {id: 'first', title: "What to sing", filter: "All", order: 0, addedDate: ""},
        {id: 'second', title: "What to wash", filter: "All", order: 0, addedDate: ""}
    ])
    expect(endState).toEqual({
        'first': [],
        'second': []
    })
})
test('set tasks', () => {
    let state: TasksPropsType = {
        'toDoList_1': []
    }
    let tasks = [
        {id: '1', title: 'Mine book', status: TaskStatuses.Completed, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
        {id: '2', title: 'JSON', status: TaskStatuses.Completed, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
        {id: '3', title: 'React+Redux', status: TaskStatuses.New, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""}
    ]

    let endState: TasksPropsType = tasksReducer(state, setTasksAC('toDoList_1', tasks))

    expect(state).toEqual({
        'toDoList_1': []
    })
    expect(tasks).toEqual([
        {id: '1', title: 'Mine book', status: TaskStatuses.Completed, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
        {id: '2', title: 'JSON', status: TaskStatuses.Completed, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
        {id: '3', title: 'React+Redux', status: TaskStatuses.New, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""}
    ])
    expect(endState['toDoList_1']).toEqual([
        {id: '1', title: 'Mine book', status: TaskStatuses.Completed, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
        {id: '2', title: 'JSON', status: TaskStatuses.Completed, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""},
        {id: '3', title: 'React+Redux', status: TaskStatuses.New, todolistId: 'toDoList_1', order: 0,
            startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: ""}
    ])
})