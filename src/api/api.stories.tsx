import React, {ChangeEvent, useEffect, useState} from 'react';
import {todolistsAPI} from './api';

export default {
    title: 'TODOLIST/API Requests',
};

export const GetTodolistsStory = () => {
    const [state, setState] = useState<any>('')
    const [getter, setGetter] = useState<boolean>(false)
    const [disableButton, setDisableButton] = useState<boolean>(false)

    const onClickHandler = () => {
        setState("")
        setGetter(true)
    }

    useEffect(() => {
        if (getter) {
            setDisableButton(true)
            todolistsAPI.getTodolists()
                .then(response => {
                    setState(response.data)
                    setDisableButton(false)
                    setGetter(false)
                })
        }
    }, [getter])

    return <div>
        <button disabled={disableButton} onClick={onClickHandler}>Get Todolists</button>
        <div style={{marginTop: '20px'}}>{JSON.stringify(state)}</div>
    </div>
}

export const CreateTodolistStory = () => {
    const [state, setState] = useState<any>('')
    const [valueNewTitle, setValueNewTitle] = useState<string>('')
    const [valueToCreate, setValueToCreate] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValueNewTitle(e.currentTarget.value)
    }
    const onclickHandler = () => {
        setValueToCreate(valueNewTitle)
        setValueNewTitle("")
    }
    useEffect(() => {
        if (valueToCreate.length > 0) {
            todolistsAPI.createTodolist(valueToCreate)
                .then(response => setState(response.data))
        }
    }, [valueToCreate])

    return <div>
        <input placeholder={'New todolist title'} value={valueNewTitle} onChange={onChangeHandler}/>
        <button onClick={onclickHandler}>Create Todolist</button>
        <div style={{marginTop: '20px'}}>{JSON.stringify(state)}</div>
    </div>
}

export const UpdateTodolistStory = () => {
    const [state, setState] = useState<any>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [newTitle, setNewTitle] = useState<string>('')
    const [valueToUpdate, setValueToUpdate] = useState<string[]>(["", ""])

    const onChangeTodolistHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onclickHandler = () => {
        setValueToUpdate([todolistId, newTitle])
    }

    useEffect(() => {
        if (valueToUpdate[0].length > 0 && valueToUpdate[1].length > 0) {
            setTodolistId('')
            setNewTitle('')
            todolistsAPI.updateTodolist(valueToUpdate[0], valueToUpdate[1])
                .then(response => setState(response.data))
        }
    }, [valueToUpdate])

    return <div>
        <input placeholder={'Indicate Todolist ID to update'} value={todolistId} onChange={onChangeTodolistHandler}/>
        <input placeholder={'New title'} value={newTitle} onChange={onChangeTitleHandler}/>
        <button onClick={onclickHandler}>Update Todolist title</button>
        <div style={{marginTop: '20px'}}>{JSON.stringify(state)}</div>
    </div>
}

export const DeleteTodolistStory = () => {
    const [state, setState] = useState<any>('')
    const [valueDeleteTitle, setValueDeleteTitle] = useState<string>('')
    const [valueToDelete, setValueToDelete] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValueDeleteTitle(e.currentTarget.value)
    }
    const onclickHandler = () => {
        setValueToDelete(valueDeleteTitle)
        setValueDeleteTitle("")
    }

    useEffect(() => {
        if (valueToDelete.length > 0) {
            todolistsAPI.deleteTodolist(valueToDelete)
                .then(response => setState(response.data))
        }
    }, [valueToDelete])

    return <div>
        <input placeholder={'Indicate Todolist ID to delete'} value={valueDeleteTitle} onChange={onChangeHandler}/>
        <button onClick={onclickHandler}>Delete Todolist</button>
        <div style={{marginTop: '20px'}}>{JSON.stringify(state)}</div>
    </div>
}