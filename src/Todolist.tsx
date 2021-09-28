import React, {ChangeEvent} from 'react';
import {FilterProps} from './App';
import {AddItemForm} from './Components/AddItemForm/AddItemForm';
import {Button} from './Components/Button';
import {EditableSpan} from './Components/EditableSpan/EditableSpan';
import style from './Todolist.module.css'

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
            <Button title={'x'} callback={removeToDoList} filter={props.filter}/>
            <h3><EditableSpan changedTitle={changeToDoListTitle} title={props.title} completed={false}/></h3>
            <AddItemForm addItem={addTask} filter={props.filter}/>
            <div>
                <Button title={'All'} callback={() => callbackFilterHandler('All')} filter={props.filter}/>
                <Button title={'Active'} callback={() => callbackFilterHandler('Active')} filter={props.filter}/>
                <Button title={'Completed'} callback={() => callbackFilterHandler('Completed')} filter={props.filter}/>
            </div>
            <ul>
                {props.task.map(mf => {
                        const changedTitleTask = (title: string) => {
                            props.changedTitleTask(title, props.id, mf.id)
                        }

                        return (
                            <li key={mf.id}>
                                <div className={style.blocks}>
                                    <Button title={'x'} callback={() => removeTaskHandler(mf.id)} filter={props.filter}/>
                                    <input onChange={(event) => callbackChangeStatus(mf.id, event)} type="checkbox"
                                           checked={mf.isDone}/>
                                    <EditableSpan title={mf.term} changedTitle={changedTitleTask} completed={mf.isDone}/>
                                </div>
                            </li>
                        )
                    }
                )
                }
            </ul>
        </div>
    )
}