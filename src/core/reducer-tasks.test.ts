import {addTaskAC, changeCheckboxAC, changedTitleTaskAC, removeTaskAC, tasksReducer} from './reducer-tasks';
import {addToDoListAC, removeToDoListAC, todolistsReducer} from './reducer-todolist';
import {toDoListsPropsType} from '../App';

test('task should be removed', () => {
    const tasks = {
        ['toDoList_1']: [
            {id: '1', term: 'HTML&CSS', isDone: true},
            {id: '2', term: 'JS', isDone: true},
            {id: '3', term: 'React', isDone: false},
            {id: '4', term: 'Redux', isDone: false},
            {id: '5', term: 'Node', isDone: false},
            {id: '6', term: 'React Native', isDone: false}
        ],
        ['toDoList_2']: [
            {id: '1', term: 'Bread', isDone: false},
            {id: '2', term: 'Milk', isDone: true},
            {id: '3', term: 'Soap', isDone: false}
        ]
    }

    const action = removeTaskAC('4', 'toDoList_1')
    const endTasks = tasksReducer(tasks, action)

    expect(endTasks).toEqual({
        ['toDoList_1']: [
            {id: '1', term: 'HTML&CSS', isDone: true},
            {id: '2', term: 'JS', isDone: true},
            {id: '3', term: 'React', isDone: false},
            {id: '5', term: 'Node', isDone: false},
            {id: '6', term: 'React Native', isDone: false}
        ],
        ['toDoList_2']: [
            {id: '1', term: 'Bread', isDone: false},
            {id: '2', term: 'Milk', isDone: true},
            {id: '3', term: 'Soap', isDone: false}
        ]
    })
})

test('new task have to be added', () => {
    const tasks = {
        ['toDoList_1']: [
            {id: '1', term: 'HTML&CSS', isDone: true},
            {id: '2', term: 'JS', isDone: true},
            {id: '3', term: 'React', isDone: false}
        ],
        ['toDoList_2']: [
            {id: '1', term: 'Bread', isDone: false},
            {id: '2', term: 'Milk', isDone: true},
            {id: '3', term: 'Soap', isDone: false}
        ]
    }

    const action = addTaskAC('Apples', 'toDoList_2')
    const newTasks = tasksReducer(tasks, action)

    expect(newTasks['toDoList_2'][0].term).toBe('Apples')
    expect(newTasks['toDoList_2'][0].id).toBeDefined()
    expect(newTasks['toDoList_2'][0].isDone).toBeFalsy()
    expect(newTasks['toDoList_1'].length).toBe(3)
    expect(newTasks['toDoList_2'].length).toBe(4)
})

test('change status of the task', () => {
    const tasks = {
        ['toDoList_1']: [
            {id: '1', term: 'HTML&CSS', isDone: true},
            {id: '2', term: 'JS', isDone: true},
            {id: '3', term: 'React', isDone: false}
        ],
        ['toDoList_2']: [
            {id: '1', term: 'Bread', isDone: false},
            {id: '2', term: 'Milk', isDone: true},
            {id: '3', term: 'Soap', isDone: false}
        ]
    }

    const action = changeCheckboxAC('3', true, 'toDoList_2')
    const endTasks = tasksReducer(tasks, action)

    expect(endTasks['toDoList_2'][2].isDone).toBeTruthy()
    expect(endTasks).toEqual({
        ['toDoList_1']: [
            {id: '1', term: 'HTML&CSS', isDone: true},
            {id: '2', term: 'JS', isDone: true},
            {id: '3', term: 'React', isDone: false}
        ],
        ['toDoList_2']: [
            {id: '1', term: 'Bread', isDone: false},
            {id: '2', term: 'Milk', isDone: true},
            {id: '3', term: 'Soap', isDone: true}
        ]
    })
})

test('change title for the task', () => {
    const tasks = {
        ["toDoList_1"]: [
            {id: "1", term: 'HTML&CSS', isDone: true},
            {id: "2", term: 'JS', isDone: true},
            {id: "3", term: 'React', isDone: false}
        ],
        ["toDoList_2"]: [
            {id: "1", term: 'Bread', isDone: false},
            {id: "2", term: 'Milk', isDone: true},
            {id: "3", term: 'Soap', isDone: false}
        ]
    }

    const action = changedTitleTaskAC("Kefir", "toDoList_2", "2")
    const endTasks = tasksReducer(tasks, action)

    expect(endTasks).toEqual({
        ["toDoList_1"]: [
            {id: "1", term: 'HTML&CSS', isDone: true},
            {id: "2", term: 'JS', isDone: true},
            {id: "3", term: 'React', isDone: false}
        ],
        ["toDoList_2"]: [
            {id: "1", term: 'Bread', isDone: false},
            {id: "2", term: 'Kefir', isDone: true},
            {id: "3", term: 'Soap', isDone: false}
        ]
    })
})

test('todolist have to be deleted from tasks', () => {
    const todolists: Array<toDoListsPropsType> = [
        {id: "toDoList_1", title: "What to learn", filter: "All"},
        {id: "toDoList_2", title: "What to buy", filter: "All"}
    ]
    const tasks = {
        ["toDoList_1"]: [
            {id: "1", term: 'HTML&CSS', isDone: true},
            {id: "2", term: 'JS', isDone: true},
            {id: "3", term: 'React', isDone: false}
        ],
        ["toDoList_2"]: [
            {id: "1", term: 'Bread', isDone: false},
            {id: "2", term: 'Milk', isDone: true},
            {id: "3", term: 'Soap', isDone: false}
        ]
    }

    const action = removeToDoListAC("toDoList_1")
    const newTodolists = todolistsReducer(todolists, action)
    const newTasks = tasksReducer(tasks, action)

    expect(newTodolists).toEqual([
        {id: "toDoList_2", title: "What to buy", filter: "All"}
    ])
    expect(newTasks).toEqual({
        ["toDoList_2"]: [
            {id: "1", term: 'Bread', isDone: false},
            {id: "2", term: 'Milk', isDone: true},
            {id: "3", term: 'Soap', isDone: false}
        ]
    })
})

test('new empty todolist have to be added', () => {
    const todolists: Array<toDoListsPropsType> = [
        {id: "toDoList_1", title: "What to learn", filter: "All"},
        {id: "toDoList_2", title: "What to buy", filter: "All"}
    ]
    const tasks = {
        ["toDoList_1"]: [
            {id: "1", term: 'HTML&CSS', isDone: true},
            {id: "2", term: 'JS', isDone: true},
            {id: "3", term: 'React', isDone: false}
        ],
        ["toDoList_2"]: [
            {id: "1", term: 'Bread', isDone: false},
            {id: "2", term: 'Milk', isDone: true},
            {id: "3", term: 'Soap', isDone: false}
        ]
    }

    const action = addToDoListAC("What to do")
    const endTodolists = todolistsReducer(todolists, action)
    const endTasks = tasksReducer(tasks, action)
    const keys = Object.keys(endTasks)

    expect(endTodolists.length).toBe(3)
    expect(endTodolists[0].id).toBeDefined()
    expect(endTodolists[0].title).toBe("What to do")
    expect(endTodolists[0].filter).toBe("All")
    expect(keys.length).toBe(3)
    expect(keys[0]).toBeDefined()
    expect(endTasks[keys[0]]).toEqual([])
    expect(keys[0]).toBe(endTodolists[0].id)
})