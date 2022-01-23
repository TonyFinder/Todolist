import React from 'react';
import {Provider} from 'react-redux';
import {AppStateRootType} from './store/store';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './reducer-tasks';
import {todolistsReducer} from './reducer-todolist';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "Movies to watch", filter: "all"},
        {id: "todolistId2", title: "What to take", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: "1", title: "Transformers", isDone: true},
            {id: "2", title: "Marvel Super Hero", isDone: false},
            {id: "3", title: "Heroes", isDone: true}
        ],
        ["todolistId2"]: [
            {id: "4", title: "Hammer", isDone: false},
            {id: "5", title: "Screw driver", isDone: false}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateRootType);

export const decoratorHOC = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}