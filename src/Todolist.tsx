import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterProps} from './App';
import {Button} from './Components/Button';
import {Input} from './Components/Input';
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
}

export const Todolist = (props: TodolistPropsType) => {
    let [inputTextValue, setInputTextValue] = useState('')
    let [error, setError] = useState(false)

    const onClickPressHandler = () => {
        if (inputTextValue.trim() !== '') {
            props.addTask(inputTextValue, props.id)
            setInputTextValue('')
        } else {
            setError(true)
        }
    }

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

    return (
        <div>
            <Button title={'x'} callback={removeToDoList}  filter={props.filter}/>
            <h3>{props.title}</h3>
            <Input inputTextValue={inputTextValue} setInputTextValue={setInputTextValue}
                   callback={onClickPressHandler} setError={setError} error={error}/>
            <Button title={'+'} callback={onClickPressHandler} filter={props.filter}/>
            {error && <div className={style.redText}>Title is required</div>}
            <div>
                <Button title={'All'} callback={() => callbackFilterHandler('All')} filter={props.filter}/>
                <Button title={'Active'} callback={() => callbackFilterHandler('Active')} filter={props.filter}/>
                <Button title={'Completed'} callback={() => callbackFilterHandler('Completed')} filter={props.filter}/>
            </div>
            <ul>
                {props.task.map(mf => {
                    const completedTaskHandler = mf.isDone ? style.completedTasks : ''

                    return (
                            <li key={mf.id}>
                                <Button title={'x'} callback={() => removeTaskHandler(mf.id)}  filter={props.filter}/>
                                <input onChange={(event) => callbackChangeStatus(mf.id, event)} type="checkbox"
                                       checked={mf.isDone}/>
                                <span className={completedTaskHandler}>{mf.term}</span>
                            </li>
                        )
                    }
                )
                }
            </ul>
        </div>
    )
}