import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistEntityStatusAC,
    changeTodolistTitleAC,
    FilterProps,
    filterTaskAC,
    removeTodolistAC,
    setTodolistsAC,
    todolistsReducer,
    TodolistDomainType, clearTodolistsAC
} from './reducer-todolist';
import {TodolistType} from '../api/api';
import {RequestStatusType} from '../utils/enums';

//Можно обойтись без использования beforeEach и в теле объявить все переменные, так как редьюсеры не меняют входящие данные
//Использовал два разных подхода в тестах для todolist и tasks
let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle},
        {id: todolistId2, title: "What to buy", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle}
    ]
})

test('set todolists', () => {
    let state: TodolistDomainType[] = []
    let todolists: TodolistType[] = [
        {id: todolistId1, title: "What to sing", order: 0, addedDate: ""},
        {id: todolistId2, title: "What to wash", order: 0, addedDate: ""}
    ]
    let endState = todolistsReducer(state, setTodolistsAC(todolists))

    expect(state).toEqual([])
    expect(endState).toEqual([
        {id: todolistId1, title: "What to sing", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle},
        {id: todolistId2, title: "What to wash", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle}
    ])
})
test('correct todolist should be added', () => {
    let newTodolist: TodolistType = {id: "todolistId1", title: "How to talk", order: 0, addedDate: ""}

    const endState = todolistsReducer(startState, addTodolistAC(newTodolist))

    expect(startState).toEqual([
        {id: todolistId1, title: "What to learn", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle},
        {id: todolistId2, title: "What to buy", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle}
    ])
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("How to talk");
});
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterProps = "Completed";

    const endState = todolistsReducer(startState, filterTaskAC(newFilter, todolistId2));

    expect(startState).toEqual([
        {id: todolistId1, title: "What to learn", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle},
        {id: todolistId2, title: "What to buy", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle}
    ])
    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});
test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, changeTodolistTitleAC(newTodolistTitle, todolistId2));

    expect(startState).toEqual([
        {id: todolistId1, title: "What to learn", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle},
        {id: todolistId2, title: "What to buy", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle}
    ])
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(startState).toEqual([
        {id: todolistId1, title: "What to learn", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle},
        {id: todolistId2, title: "What to buy", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle}
    ])
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('todolist have to be disabled', () => {
    let endState = todolistsReducer(startState, changeTodolistEntityStatusAC(todolistId1, RequestStatusType.loading))

    expect(startState).toEqual([
        {id: todolistId1, title: "What to learn", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle },
        {id: todolistId2, title: "What to buy", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle}
    ])
    expect(endState).toEqual([
        {id: todolistId1, title: "What to learn", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.loading},
        {id: todolistId2, title: "What to buy", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle}
    ])
})
test('todolists have to be cleared', () => {
    let finalState = todolistsReducer(startState, clearTodolistsAC())

    expect(startState).toEqual([
        {id: todolistId1, title: "What to learn", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle},
        {id: todolistId2, title: "What to buy", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle}
    ])
    expect(finalState).toEqual([])
})