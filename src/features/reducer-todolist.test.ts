import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistTitleAC,
    disableTodolistAC,
    FilterProps,
    filterTaskAC,
    removeTodolistAC,
    setTodolistsAC,
    todolistsReducer,
    TodolistStateType
} from './reducer-todolist';
import {TodolistType} from '../api/api';
import {DisableStatuses} from '../utils/enums';

//Можно обойтись без использования beforeEach и в теле объявить все переменные, так как редьюсеры не меняют входящие данные
//Использовал два разных подхода в тестах для todolist и tasks
let todolistId1: string
let todolistId2: string
let startState: Array<TodolistStateType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "All", order: 0, addedDate: "", disabled: DisableStatuses.disableFalse },
        {id: todolistId2, title: "What to buy", filter: "All", order: 0, addedDate: "", disabled: DisableStatuses.disableFalse}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(startState).toEqual([
        {id: todolistId1, title: "What to learn", filter: "All", order: 0, addedDate: "", disabled: DisableStatuses.disableFalse },
        {id: todolistId2, title: "What to buy", filter: "All", order: 0, addedDate: "", disabled: DisableStatuses.disableFalse}
    ])
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {
    let newTodolist: TodolistType = {id: "todolistId1", title: "How to talk", order: 0, addedDate: ""}

    const endState = todolistsReducer(startState, addTodolistAC(newTodolist))

    expect(startState).toEqual([
        {id: todolistId1, title: "What to learn", filter: "All", order: 0, addedDate: "", disabled: DisableStatuses.disableFalse },
        {id: todolistId2, title: "What to buy", filter: "All", order: 0, addedDate: "", disabled: DisableStatuses.disableFalse}
    ])
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("How to talk");
});
test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, changeTodolistTitleAC(newTodolistTitle, todolistId2));

    expect(startState).toEqual([
        {id: todolistId1, title: "What to learn", filter: "All", order: 0, addedDate: "", disabled: DisableStatuses.disableFalse },
        {id: todolistId2, title: "What to buy", filter: "All", order: 0, addedDate: "", disabled: DisableStatuses.disableFalse}
    ])
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterProps = "Completed";

    const endState = todolistsReducer(startState, filterTaskAC(newFilter, todolistId2));

    expect(startState).toEqual([
        {id: todolistId1, title: "What to learn", filter: "All", order: 0, addedDate: "", disabled: DisableStatuses.disableFalse },
        {id: todolistId2, title: "What to buy", filter: "All", order: 0, addedDate: "", disabled: DisableStatuses.disableFalse}
    ])
    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});
test('set todolists', () => {
    let state: TodolistStateType[] = []
    let todolists: TodolistType[] = [
        {id: todolistId1, title: "What to sing", order: 0, addedDate: ""},
        {id: todolistId2, title: "What to wash", order: 0, addedDate: ""}
    ]
    let endState = todolistsReducer(state, setTodolistsAC(todolists))

    expect(state).toEqual([])
    expect(endState).toEqual([
        {id: todolistId1, title: "What to sing", filter: "All", order: 0, addedDate: "", disabled: DisableStatuses.disableFalse},
        {id: todolistId2, title: "What to wash", filter: "All", order: 0, addedDate: "", disabled: DisableStatuses.disableFalse}
    ])
})
test('todolist have to be disabled', () => {
    let endState = todolistsReducer(startState, disableTodolistAC(todolistId1, DisableStatuses.disableTrue))

    expect(startState).toEqual([
        {id: todolistId1, title: "What to learn", filter: "All", order: 0, addedDate: "", disabled: DisableStatuses.disableFalse },
        {id: todolistId2, title: "What to buy", filter: "All", order: 0, addedDate: "", disabled: DisableStatuses.disableFalse}
    ])
    expect(endState).toEqual([
        {id: todolistId1, title: "What to learn", filter: "All", order: 0, addedDate: "", disabled: DisableStatuses.disableTrue },
        {id: todolistId2, title: "What to buy", filter: "All", order: 0, addedDate: "", disabled: DisableStatuses.disableFalse}
    ])
})