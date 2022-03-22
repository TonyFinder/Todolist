import React, {useEffect, useState} from 'react';
import {todolistsAPI} from './api';

export default {
    title: 'TODOLIST/API Requests',
};

export const GetTodolistsStory = () => {
    const [state, setState] = useState<any>('')

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolistStory = () => {
    const [state, setState] = useState<any>('')

    useEffect(() => {
        const title = "Super new"
        todolistsAPI.createTodolist(title)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistStory = () => {
    const [state, setState] = useState<any>('')

    useEffect(() => {
        const todolist = "47c1b806-f591-44ae-ac0c-55cc04594ae1"
        const title = "Mine"
        todolistsAPI.updateTodolist(todolist, title)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolistStory = () => {
    const [state, setState] = useState<any>('')

    useEffect(() => {
        const todolist = "a4b9da54-1996-451b-8f57-c06c1e5605c6"
        todolistsAPI.deleteTodolist(todolist)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}