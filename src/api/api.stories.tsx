import React, {ChangeEvent, useEffect, useState} from 'react';
import {tasksAPI, TaskUpdateType, todolistsAPI} from './api';

export default {
    title: 'TODOLIST/API Requests',
};

// Todolists stories
export const GetTodolistsStory = () => {
    const [state, setState] = useState<any>(null)
    const [getter, setGetter] = useState<boolean>(false)
    const [disableButton, setDisableButton] = useState<boolean>(false)

    const onClickHandler = () => {
        setState('')
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
        <div style={{marginTop: '20px'}}>{state ? state.map((m: any) => <div>id: {m.id},
            title: {m.title}</div>) : ''}</div>
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
        setValueNewTitle('')
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
        <div style={{marginTop: '20px'}}>Created todolist: id - {state ? state.data.item.id : ''} title
            - {state ? state.data.item.title : ''}</div>
    </div>
}
export const UpdateTodolistStory = () => {
    const [state, setState] = useState<any>('')
    const [stateTodolists, setStateTodolists] = useState<any>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [newTitle, setNewTitle] = useState<string>('')
    const [valueToUpdate, setValueToUpdate] = useState<string[]>(['', ''])

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
        todolistsAPI.getTodolists()
            .then(response => {
                setStateTodolists(response.data)
            })
    }, [])

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
        <div style={{marginTop: '20px'}}>{stateTodolists ? stateTodolists.map((m: any) => <div>id: {m.id},
            title: {m.title}</div>) : ''}</div>
        <div style={{marginTop: '20px'}}>{JSON.stringify(state)}</div>
    </div>
}
export const DeleteTodolistStory = () => {
    const [state, setState] = useState<any>('')
    const [stateTodolists, setStateTodolists] = useState<any>('')
    const [valueDeleteTitle, setValueDeleteTitle] = useState<string>('')
    const [valueToDelete, setValueToDelete] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValueDeleteTitle(e.currentTarget.value)
    }
    const onclickHandler = () => {
        setValueToDelete(valueDeleteTitle)
        setValueDeleteTitle('')
    }

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(response => {
                setStateTodolists(response.data)
            })
    }, [])

    useEffect(() => {
        if (valueToDelete.length > 0) {
            todolistsAPI.deleteTodolist(valueToDelete)
                .then(response => setState(response.data))
        }
    }, [valueToDelete])

    return <div>
        <input placeholder={'Indicate Todolist ID to delete'} value={valueDeleteTitle} onChange={onChangeHandler}/>
        <button onClick={onclickHandler}>Delete Todolist</button>
        <div style={{marginTop: '20px'}}>{stateTodolists ? stateTodolists.map((m: any) => <div>id: {m.id},
            title: {m.title}</div>) : ''}</div>
        <div style={{marginTop: '20px'}}>{JSON.stringify(state)}</div>
    </div>
}

// Tasks stories
export const GetTasksStory = () => {
    const [state, setState] = useState<any>(null)
    const [stateTodolists, setStateTodolists] = useState<any>(null)
    const [todolistIdValue, setTodolistIdValue] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistIdValue(e.currentTarget.value)
    }
    const onClickHandler = () => {
        setTodolistId(todolistIdValue)
        setTodolistIdValue('')
    }
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(response => {
                setStateTodolists(response.data)
            })
    }, [])

    useEffect(() => {
        if (todolistId.length > 0) {
            tasksAPI.getTasks(todolistId)
                .then(response => {
                    setState(response.data)
                })
        }
    }, [todolistId])

    return <div>
        <input placeholder={'todolistId For Tasks'} value={todolistIdValue} onChange={onChangeHandler}/>
        <button onClick={onClickHandler}>Get tasks</button>
        <div style={{marginTop: '20px'}}>Available Todolists: {stateTodolists ? stateTodolists.map((m: any) =>
            <div>{m.id}</div>) : ''}</div>
        <div style={{marginTop: '20px'}}>Requested tasks: {state ? state.items.map((m: any) =>
            <div>id: {m.id} title: {m.title}</div>) : ''}</div>
        {/*<div style={{marginTop: '20px'}}>Requested tasks: {JSON.stringify(state)}</div>*/}
    </div>
}
export const PostTaskStory = () => {
    const [state, setState] = useState<any>(null)
    const [stateTodolists, setStateTodolists] = useState<any>(null)
    const [todolistIdValue, setTodolistIdValue] = useState<string>('')
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [taskToSet, setTaskToSet] = useState<string[]>(['', ''])
    const [disableButton, setDisableButton] = useState<boolean>(false)

    const onChangeHandlerTodolist = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistIdValue(e.currentTarget.value)
    }
    const onChangeHandlerTask = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onClickHandler = () => {
        setTaskToSet([todolistIdValue, newTaskTitle])
        setTodolistIdValue('')
        setNewTaskTitle('')
    }
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(response => {
                setStateTodolists(response.data)
            })
    }, [])

    useEffect(() => {
        if (taskToSet[0].length > 0 && taskToSet[1].length > 0) {
            setDisableButton(true)
            tasksAPI.createTask(taskToSet[0], taskToSet[1])
                .then(response => {
                    setState(response.data)
                })
            setTaskToSet(['', ''])
            setDisableButton(false)
        }
    }, [taskToSet])

    return <div>
        <input placeholder={'todolistId For New Task'} value={todolistIdValue} onChange={onChangeHandlerTodolist}/>
        <input placeholder={'New Task Title'} value={newTaskTitle} onChange={onChangeHandlerTask}/>
        <button onClick={onClickHandler} disabled={disableButton}>Create task</button>
        <div style={{marginTop: '20px'}}>Available Todolists: {stateTodolists ? stateTodolists.map((m: any) =>
            <div>{m.id}</div>) : ''}</div>
        <div style={{marginTop: '20px'}}>Created task: {state ? state.data.item.title : ''}</div>
    </div>
}
export const UpdateTaskStory = () => {
    const [stateTodolists, setStateTodolist] = useState<any>(null)
    const [stateTasks, setStateTasks] = useState<any>(null)
    const [changedTask, setChangedTask] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [todolistIdGetTask, setTodolistIdGetTask] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [updateObject, setUpdateObject] = useState<TaskUpdateType>({
        title: '',
        description: '',
        completed: false,
        status: 0,
        priority: 0,
        startDate: '',
        deadline: ''
    })
    const [updateObjectToSet, setUpdateObjectToSet] = useState<TaskUpdateType>({
        title: '',
        description: '',
        completed: false,
        status: 0,
        priority: 0,
        startDate: '',
        deadline: ''
    })

    useEffect(() => {
            todolistsAPI.getTodolists()
                .then(response => {
                    setStateTodolist(response.data)
                })
        }, []
    )
    useEffect(() => {
        if (todolistIdGetTask.length > 0) {
            tasksAPI.getTasks(todolistIdGetTask)
                .then(response => {
                    setStateTasks(response.data)
                })
        }
    }, [todolistIdGetTask])

    useEffect(() => {
        if (taskId.length > 0) {
            tasksAPI.updateTask(todolistIdGetTask, taskId, updateObjectToSet)
                .then(response => setChangedTask(response.data))
        }
    }, [updateObjectToSet])


    return <div>
        <div style={{marginTop: '20px'}}>Available todolists: {stateTodolists ? stateTodolists.map((m: any) =>
            <div>id: {m.id},
                title: {m.title}</div>) : ''}</div>
        <input placeholder={'Insert TodolistId'} value={todolistId}
               onChange={e => setTodolistId(e.currentTarget.value)}/>
        <button style={{marginTop: '20px'}} onClick={() => setTodolistIdGetTask(todolistId)}>Get tasks</button>
        <div style={{marginTop: '20px', marginBottom: '20px'}}>Available
            tasks: {stateTasks ? stateTasks.items.map((m: any) => <div>id: {m.id},
                title: {m.title}</div>) : ''}</div>
        <input placeholder={'Task Id to change'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
        <input placeholder={'New title'} value={updateObject.title}
               onChange={e => setUpdateObject({...updateObject, title: e.currentTarget.value})}/>
        <button style={{marginBottom: '20px'}} onClick={() => setUpdateObjectToSet(updateObject)}>Update task</button>
        <div>Updated task:</div>
        <div>{changedTask ? `todolistId: ${changedTask.data.item.todoListId}, taskId: ${changedTask.data.item.id}, title: ${changedTask.data.item.title}` : ''}</div>
    </div>
}
export const DeleteTaskStory = () => {
    const [state, setState] = useState<any>(null)
    const [todolistState, setTodolistState] = useState<any>(null)
    const [todolistIdToChoose, setTodolistIdToChoose] = useState<string>('')
    const [taskIdState, setTaskIdState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistAndTaskIdToSet, setTodolistAndTaskIdToSet] = useState<string[]>(['', ''])

    const onClickHandler = () => {
        tasksAPI.getTasks(todolistIdToChoose)
            .then(response => setTaskIdState(response.data))
    }
    const onclickHandlerFinal = () => {
        setTodolistAndTaskIdToSet([todolistIdToChoose, taskId])
    }

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(response => setTodolistState(response.data))
    }, [])

    useEffect(() => {
        if (todolistAndTaskIdToSet[0].length > 0 && todolistAndTaskIdToSet[1].length > 0) {
            tasksAPI.deleteTask(todolistAndTaskIdToSet[0], todolistAndTaskIdToSet[1])
                .then(response => setState(response.data))
        }
    }, [todolistAndTaskIdToSet])

    return <div>
        <div>Available Todolists:</div>
        <div>{todolistState ? todolistState.map((m: any) => <div>id: {m.id}, title: {m.title}</div>) : ''}</div>

        <div style={{margin: '20px 0'}}><input placeholder={'Input TodolistId'} value={todolistIdToChoose}
                                               onChange={e => setTodolistIdToChoose(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>Get tasks</button>
        </div>

        <div>Available Tasks:</div>
        <div>{taskIdState ? taskIdState.items.map((m: any) => <div>id: {m.id}, title: {m.title}</div>) : ''}</div>

        <div style={{margin: '20px 0'}}>
            <input placeholder={'TaskId to remove'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
            <button onClick={onclickHandlerFinal}>Remove task</button>
        </div>

        <div>Result for deleted task:</div>
        <div>{JSON.stringify(state)}</div>
    </div>
}