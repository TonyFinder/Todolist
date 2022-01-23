import {addTaskAC, changeCheckboxAC, changedTitleTaskAC, removeTaskAC, tasksReducer} from './reducer-tasks';
import {addTodolistAC, removeTodolistAC, todolistsReducer} from './reducer-todolist';
import {tasksPropsType, todolistsPropsType} from '../App';

//Можно обойтись без использования beforeEach и в теле объявить все переменные, так как редьюсеры не меняют входящие данные.
//Использовал два разных подхода в тестах для todolist и tasks
let todolists: Array<todolistsPropsType> = [
    {id: "toDoList_1", title: "What to learn", filter: "All"},
    {id: "toDoList_2", title: "What to buy", filter: "All"}
]
let tasks: tasksPropsType = {
    ['toDoList_1']: [
        {id: '1', title: 'HTML&CSS', isDone: true},
        {id: '2', title: 'JS', isDone: true},
        {id: '3', title: 'React', isDone: false}
    ],
    ['toDoList_2']: [
        {id: '1', title: 'Bread', isDone: false},
        {id: '2', title: 'Milk', isDone: true},
        {id: '3', title: 'Soap', isDone: false}
    ]
}

test('task should be removed', () => {
    const action = removeTaskAC('2', 'toDoList_1')
    const endTasks = tasksReducer(tasks, action)

    expect(endTasks).toEqual({
        ['toDoList_1']: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        ['toDoList_2']: [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Soap', isDone: false}
        ]
    })
})
test('new task have to be added', () => {
    const action = addTaskAC('Apples', 'toDoList_2')
    const newTasks = tasksReducer(tasks, action)

    expect(newTasks['toDoList_2'][0].title).toBe('Apples')
    expect(newTasks['toDoList_2'][0].id).toBeDefined()
    expect(newTasks['toDoList_2'][0].isDone).toBeFalsy()
    expect(newTasks['toDoList_1'].length).toBe(3)
    expect(newTasks['toDoList_2'].length).toBe(4)
})
test('change status of the task', () => {
    const action = changeCheckboxAC('3', true, 'toDoList_2')
    const endTasks = tasksReducer(tasks, action)

    expect(endTasks['toDoList_2'][2].isDone).toBeTruthy()
    expect(endTasks).toEqual({
        ['toDoList_1']: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        ['toDoList_2']: [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Soap', isDone: true}
        ]
    })
})
test('change title for the task', () => {
    const action = changedTitleTaskAC("Kefir", "toDoList_2", "2")
    const endTasks = tasksReducer(tasks, action)

    expect(endTasks).toEqual({
        ["toDoList_1"]: [
            {id: "1", title: 'HTML&CSS', isDone: true},
            {id: "2", title: 'JS', isDone: true},
            {id: "3", title: 'React', isDone: false}
        ],
        ["toDoList_2"]: [
            {id: "1", title: 'Bread', isDone: false},
            {id: "2", title: 'Kefir', isDone: true},
            {id: "3", title: 'Soap', isDone: false}
        ]
    })
})
test('todolist have to be deleted from tasks', () => {
    const action = removeTodolistAC("toDoList_1")
    const newTodolists = todolistsReducer(todolists, action)
    const newTasks = tasksReducer(tasks, action)

    expect(newTodolists).toEqual([
        {id: "toDoList_2", title: "What to buy", filter: "All"}
    ])
    expect(newTasks).toEqual({
        ["toDoList_2"]: [
            {id: "1", title: 'Bread', isDone: false},
            {id: "2", title: 'Milk', isDone: true},
            {id: "3", title: 'Soap', isDone: false}
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