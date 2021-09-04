import React, {ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterProps } from './App';
import { Button } from './Components/Button';

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
}

export const Todolist = (props: TodolistPropsType) => {
    let [inputTextValue, setInputTextValue] = useState("")

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setInputTextValue(event.currentTarget.value)

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            props.addTask(inputTextValue)
            setInputTextValue("")
        }
    }

    const onClickPressHandler = () => {
        props.addTask(inputTextValue)
        setInputTextValue("")
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }

    const callbackFilterHandler = (fil: FilterProps) => {
        props.filterTask(fil)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <input value={inputTextValue}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickPressHandler}>+</button>
            <div>
               <Button title={"All"} callback={() => callbackFilterHandler("All")}/>
               <Button title={"Active"} callback={() => callbackFilterHandler("Active")}/>
               <Button title={"Completed"} callback={() => callbackFilterHandler("Completed")}/>
            </div>
            <ul>
                {props.task.map(mf => {
                        return (
                                <li key={mf.id}>
                                    <Button title={"x"} callback={() => removeTaskHandler(mf.id)}/>
                                    <input type="checkbox" checked={mf.isDone}/>
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