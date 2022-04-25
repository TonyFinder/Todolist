import React from 'react';
import {Provider} from 'react-redux';
import {AppStateRootType} from '../app/store';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './reducer-tasks';
import {todolistsReducer} from './reducer-todolist';
import {RequestStatusType, TaskPriorities, TaskStatuses} from '../utils/enums';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppStateRootType = {
    todolists: [
        {id: "todolistId1", title: "Movies to watch", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle},
        {id: "todolistId2", title: "What to take", filter: "All", order: 0, addedDate: "", entityStatus: RequestStatusType.idle}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: "1", title: "Transformers", status: TaskStatuses.Completed, todolistId: "todolistId1", order: 0,
                startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: "", entityStatus: RequestStatusType.idle},
            {id: "2", title: "Marvel Super Hero", status: TaskStatuses.New, todolistId: "todolistId1", order: 0,
                startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: "", entityStatus: RequestStatusType.idle},
            {id: "3", title: "Heroes", status: TaskStatuses.Completed, todolistId: "todolistId1", order: 0,
                startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: "", entityStatus: RequestStatusType.idle}
        ],
        ["todolistId2"]: [
            {id: "4", title: "Hammer", status: TaskStatuses.New, todolistId: "todolistId2", order: 0,
                startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: "", entityStatus: RequestStatusType.idle},
            {id: "5", title: "Screw driver", status: TaskStatuses.New, todolistId: "todolistId2", order: 0,
                startDate: "", addedDate: "", priority: TaskPriorities.Low, deadline: "", description: "", entityStatus: RequestStatusType.idle}
        ]
    },
    app: {
        loadingStatus: RequestStatusType.idle,
        errorServer: null
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const decoratorHOC = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}