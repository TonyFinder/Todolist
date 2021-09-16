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
    title: string
    task: TaskPropsType[]
    removeTask: (taskID: string) => void
    filterTask: (filterId: FilterProps) => void
    addTask: (title: string) => void
    changeCheckbox: (id: string, checked: boolean) => void
    filter: FilterProps
}

export const Todolist = (props: TodolistPropsType) => {
    let [inputTextValue, setInputTextValue] = useState('')
    let [error, setError] = useState(false)

    const onClickPressHandler = () => {
        if (inputTextValue.trim() !== '') props.addTask(inputTextValue)
        setInputTextValue('')
        setError(true)
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }

    const callbackFilterHandler = (fil: FilterProps) => {
        props.filterTask(fil)
    }

    const callbackChangeStatus = (id: string, event: ChangeEvent<HTMLInputElement>) => {
        props.changeCheckbox(id, event.currentTarget.checked)
    }

    return (
        <div>
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
                        return (
                            <li key={mf.id} className={mf.isDone ? style.completedTasks : ''}>
                                <Button title={'x'} callback={() => removeTaskHandler(mf.id)}  filter={props.filter}/>
                                <input onChange={(event) => callbackChangeStatus(mf.id, event)} type="checkbox"
                                       checked={mf.isDone}/>
                                <span>{mf.term}</span>
                            </li>
                        )
                    }
                )
                }
            </ul>
        </div>
    )
}