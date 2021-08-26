import React from 'react';
import { FilterProps } from './App';
import { Button } from './Components/Button';

type TaskPropsType = {
    id: number
    term: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    task: TaskPropsType[]
    removeTask: (taskID: number) => void
    filterTask: (filterId: FilterProps) => void
}

export const Todolist = (props: TodolistPropsType) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <input/>
            <button>+</button>
            <div>
                <Button filterTask={props.filterTask} buttonValue="All"/>
                <Button filterTask={props.filterTask} buttonValue="Active"/>
                <Button filterTask={props.filterTask} buttonValue="Completed"/>
            </div>
            <ul>
                {props.task.map(mf => {
                        return (
                                <li key={mf.id}>
                                    <button onClick={()=> props.removeTask(mf.id)}>X</button>
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