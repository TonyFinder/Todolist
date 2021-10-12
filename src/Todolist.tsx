import {Button, Checkbox, IconButton, List, ListItem} from '@material-ui/core';
import React, {ChangeEvent} from 'react';
import {FilterProps} from './App';
import {AddItemForm} from './Components/AddItemForm/AddItemForm';
import {EditableSpan} from './Components/EditableSpan/EditableSpan';
import {DeleteForeverTwoTone, DeleteTwoTone} from '@material-ui/icons';

type TaskPropsType = {
    id: string
    term: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    task: TaskPropsType[]
    filter: FilterProps
    removeTask: (taskID: string, toDoListId: string) => void
    filterTask: (filterId: FilterProps, toDoListId: string) => void
    addTask: (title: string, toDoListId: string) => void
    changeCheckbox: (id: string, checked: boolean, toDoListId: string) => void
    removeToDoList: (toDoListId: string) => void
    changedTitleTask: (title: string, toDoListId: string, taskId: string) => void
    changeToDoListTitle: (title: string, toDoListId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const removeTaskHandler = (id: string) => {
        props.removeTask(id, props.id)
    }

    const callbackFilterHandler = (fil: FilterProps) => {
        props.filterTask(fil, props.id)
    }

    const callbackChangeStatus = (id: string, event: ChangeEvent<HTMLInputElement>) => {
        props.changeCheckbox(id, event.currentTarget.checked, props.id)
    }

    const removeToDoList = () => {
        props.removeToDoList(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeToDoListTitle = (title: string) => {
        props.changeToDoListTitle(title, props.id)
    }

    return (
        <div>
            <IconButton onClick={removeToDoList}>
                <DeleteForeverTwoTone color={'secondary'}/>
            </IconButton>
            <h3><EditableSpan changedTitle={changeToDoListTitle} title={props.title} completed={false}/></h3>
            <AddItemForm addItem={addTask} filter={props.filter}/>
            <div>
                <Button variant={'contained'} color={props.filter === 'All' ? 'primary' : 'inherit'} size={'small'}
                        onClick={() => callbackFilterHandler('All')}>All</Button>
                <Button variant={'contained'} color={props.filter === 'Active' ? 'primary' : 'inherit'} size={'small'}
                        onClick={() => callbackFilterHandler('Active')} style={{margin: "0px 5px"}}>Active</Button>
                <Button variant={'contained'} color={props.filter === 'Completed' ? 'primary' : 'inherit'}
                        size={'small'} onClick={() => callbackFilterHandler('Completed')}>Completed</Button>
            </div>
            <List>
                {props.task.map(mf => {
                        const changedTitleTask = (title: string) => {
                            props.changedTitleTask(title, props.id, mf.id)
                        }

                        return (
                            <ListItem key={mf.id} style={{padding: "0px"}}>
                                    <IconButton onClick={() => removeTaskHandler(mf.id)} size={'small'}>
                                        <DeleteTwoTone color={'secondary'}/>
                                    </IconButton>
                                    <Checkbox size={'small'} color={'primary'} onChange={(event) => callbackChangeStatus(mf.id, event)} checked={mf.isDone}/>
                                    <EditableSpan title={mf.term} changedTitle={changedTitleTask} completed={mf.isDone}/>
                            </ListItem>
                        )
                    }
                )
                }
            </List>
        </div>
    )
}